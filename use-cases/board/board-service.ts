import { EventAction, EventEnvelope, UNLIMITED_PLAN_VALUE } from "@/lib/consts";
import { redis } from "@/lib/redis";
import { Board, BoardStatus } from "@/types/board-status";
import { CombinedSession } from "@/types/guest-auth";
import { Player } from "@/types/player";
import { getRoomChoiceOptions } from "../deck";
import { getRoomOwnerSubscription } from "../subscription/get-room-owner-subscription";

type Actions = "join" | "leave" | "choice" | "reveal" | "nextRound";

type DataMap = {
  join: object;
  leave: object;
  choice: { choice: string };
  reveal: object;
  nextRound: object;
};

type Data<T extends Actions> = DataMap[T];

class BoardEntity {
  protected _board: Board | undefined = undefined;

  constructor(
    readonly roomId: string,
    readonly session: CombinedSession,
  ) {}

  get boardKey() {
    return `room:${this.roomId}:board` as const;
  }

  get eventsKey() {
    return `room:${this.roomId}:events` as const;
  }

  async getBoard(): Promise<Board | undefined> {
    const board = await redis.get(this.boardKey);

    if (!board) {
      return undefined;
    }

    this._board = JSON.parse(board) as Board;

    return this._board;
  }

  async setBoard(board: Board): Promise<void> {
    this._board = board;
    await redis.set(this.boardKey, JSON.stringify(board));
  }

  async deleteBoard(): Promise<void> {
    this._board = undefined;
    await redis.del(this.boardKey);
  }

  async create(): Promise<Board> {
    const selfPlayer: Player = {
      id: this.session.user.id,
      nickname: this.session.user.name,
      choice: null,
      email: this.session.user.email,
      imageUrl: this.session.user.image as string,
    };

    const userSubscripton = await getRoomOwnerSubscription({
      roomId: this.roomId,
    });

    const maxRounds = userSubscripton?.plan.maxRounds ?? 0;

    const choiceOptions = await getRoomChoiceOptions({
      roomId: this.roomId,
    });

    const board: Board = {
      roomId: this.roomId,
      players: [selfPlayer],
      reveal: false,
      totalPlayers: 1,
      totalChoices: 0,
      currentRound: 1,
      agreementPercentage: 0,
      agreementEmoji: "🃏",
      availableRounds: maxRounds,
      maxRounds,
      choiceOptions,
    };

    const boardWithInititalMetrics = this.calculateBoardMetrics(board);

    await this.setBoard(boardWithInititalMetrics);
    await redis.expire(this.boardKey, 60 * 60 * 24); // 24 hours

    return board;
  }

  parseToBoardStatus(board: Board): BoardStatus {
    const { players, ...boardData } = board;

    const { self, others } = players.reduce(
      (acc, player) => {
        if (player.id === this.session?.user?.id) {
          acc.self = player;
          return acc;
        }

        const choice = player.choice;
        const hiddenChoice = choice ? "?" : null;

        const otherPlayer = {
          ...player,
          choice: board.reveal ? choice : hiddenChoice,
        };

        acc.others.push(otherPlayer);
        return acc;
      },
      { self: {} as Player, others: [] as Player[] },
    );

    return {
      ...boardData,
      self,
      others,
    };
  }

  async updateBoard<T extends Actions>({
    action,
    data,
  }: {
    action: T;
    data: Data<T>;
  }): Promise<Board | undefined> {
    if (!this._board) {
      this._board = await this.getBoard();

      if (!this._board) {
        return undefined;
      }
    }

    const actionHandlers: Record<
      Actions,
      (board: Board, data?: any) => Promise<Board | undefined>
    > = {
      join: this.joinAction.bind(this),
      leave: this.leaveAction.bind(this),
      choice: this.choiceAction.bind(this),
      reveal: this.revealAction.bind(this),
      nextRound: this.nextRoundAction.bind(this),
    };

    this._board = await actionHandlers[action](this._board, data);

    if (typeof this._board !== "undefined") {
      this._board = this.calculateBoardMetrics(this._board);

      await this.setBoard(this._board);

      const boardUptatedEvent: EventEnvelope = {
        action: EventAction.BOARD_UPDATED,
        data: JSON.stringify(this._board),
        from: this.session.user.id,
      };

      redis.publish(this.eventsKey, JSON.stringify(boardUptatedEvent));
    }

    if (action === "leave") {
      const leaveEvent: EventEnvelope = {
        action: EventAction.PLAYER_LEFT,
        data: JSON.stringify({
          playerId: this.session.user.id,
          nickname: this.session.user.name,
        }),
        from: this.session.user.id,
      };

      redis.publish(this.eventsKey, JSON.stringify(leaveEvent));
    }

    if (action === "join") {
      const joinEvent: EventEnvelope = {
        action: EventAction.PLAYER_JOINED,
        data: JSON.stringify({
          playerId: this.session.user.id,
          nickname: this.session.user.name,
        }),
        from: this.session.user.id,
      };

      redis.publish(this.eventsKey, JSON.stringify(joinEvent));
    }

    if (action === "reveal" && this._board) {
      const revealEvent: EventEnvelope = {
        action: EventAction.REVEAL,
        data: JSON.stringify({ reveal: this._board.reveal }),
        from: this.session.user.id,
      };

      redis.publish(this.eventsKey, JSON.stringify(revealEvent));
    }

    if (action === "nextRound") {
      const nextRoundEvent: EventEnvelope = {
        action: EventAction.NEXT_ROUND,
        data: "",
        from: this.session.user.id,
      };

      redis.publish(this.eventsKey, JSON.stringify(nextRoundEvent));
    }

    return this._board;
  }

  async joinAction(board: Board): Promise<Board> {
    const selfPlayer = {
      id: this.session.user.id,
      nickname: this.session.user.name,
      choice: null,
      email: this.session.user.email,
      imageUrl: this.session.user.image,
    };

    board.players.push(selfPlayer);
    board.totalPlayers += 1;

    return board;
  }

  async leaveAction(board: Board): Promise<Board | undefined> {
    board.players = board.players.filter(
      (player) => player.id !== this.session.user.id,
    );
    board.totalPlayers -= 1;

    if (board.totalPlayers === 0) {
      await this.deleteBoard();
      await redis.del(this.eventsKey);
      return undefined;
    }

    return board;
  }

  async choiceAction(board: Board, data: { choice: string }): Promise<Board> {
    const player = board.players.find(
      (player) => player.id === this.session.user.id,
    );

    if (!player) {
      return board;
    }

    player.choice = data.choice;

    return board;
  }

  async revealAction(board: Board): Promise<Board> {
    board.reveal = true;

    return board;
  }

  async nextRoundAction(board: Board): Promise<Board> {
    board.currentRound += 1;
    board.reveal = false;
    board.players.forEach((player) => {
      player.choice = null;
    });

    return board;
  }

  private calculateBoardMetrics(board: Board) {
    const choiceOptions = board.choiceOptions;
    const valuableChoices = choiceOptions.filter((choice) => choice.weight > 0);

    const filledChoices = board.players
      .map((player) => player.choice)
      .filter((choice) => choice !== null) as string[];

    const isChoicesNumeric = valuableChoices.every(
      (choice) => !isNaN(Number(choice.value)),
    );

    const choiceCounts = filledChoices.reduce<Record<string, number>>(
      (counts, choice) => {
        counts[choice] = (counts[choice] || 0) + 1;
        return counts;
      },
      {},
    );

    const majorityChoiceCount = Math.max(...Object.values(choiceCounts));

    if (isChoicesNumeric) {
      const choices = filledChoices
        .map((choice) => Number(choice))
        .filter((choice) => !isNaN(choice) && choice > 0);

      const totalSum = choices.reduce((acc, choice) => acc + choice, 0);
      const average = board.reveal ? Math.round(totalSum / choices.length) : 0;

      board.average = average;
    }

    const majorityChoice = Object.keys(choiceCounts).find(
      (choice) => choiceCounts[choice] === majorityChoiceCount,
    );

    board.majorityChoice = majorityChoice;

    board.agreementPercentage =
      filledChoices.length > 0
        ? (majorityChoiceCount / filledChoices.length) * 100
        : 0;

    board.agreementEmoji = this.calculateBoardAgreetmentEmoji(board);

    board.totalChoices = filledChoices.length;
    board.totalPlayers = board.players.length;

    const availableRounds =
      board.maxRounds === UNLIMITED_PLAN_VALUE
        ? UNLIMITED_PLAN_VALUE
        : board.maxRounds - board.currentRound;

    board.availableRounds = availableRounds;

    return board;
  }

  private calculateBoardAgreetmentEmoji(board: Board): string {
    if (!board.reveal || board.totalChoices === 0) return "🃏";

    const { agreementPercentage } = board;

    if (agreementPercentage === 100) return "🤝";

    if (agreementPercentage >= 80) return "👍";

    if (agreementPercentage >= 60) return "😊";

    if (agreementPercentage >= 40) return "😐";

    if (agreementPercentage >= 20) return "😕";

    if (agreementPercentage > 0) return "😞";

    return "🤷";
  }
}

export class BoardService {
  private boardEntity: BoardEntity;

  constructor(roomId: string, session: CombinedSession) {
    this.boardEntity = new BoardEntity(roomId, session);
    this.boardEntity.getBoard();
  }

  get boardKey() {
    return this.boardEntity.boardKey;
  }

  get eventsKey() {
    return this.boardEntity.eventsKey;
  }

  async getBoard() {
    return this.boardEntity.getBoard();
  }

  parse(board: Board): BoardStatus {
    return this.boardEntity.parseToBoardStatus(board);
  }

  async create() {
    return this.boardEntity.create();
  }

  async leave() {
    return this.boardEntity.updateBoard({
      action: "leave",
      data: {},
    });
  }

  async makeChoice(data: Data<"choice">) {
    return this.boardEntity.updateBoard({
      action: "choice",
      data,
    });
  }

  async reveal() {
    return this.boardEntity.updateBoard({
      action: "reveal",
      data: {},
    });
  }

  async join() {
    return this.boardEntity.updateBoard({
      action: "join",
      data: {},
    });
  }

  async nextRound() {
    return this.boardEntity.updateBoard({
      action: "nextRound",
      data: {},
    });
  }
}
