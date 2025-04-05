import { EventAction, EventEnvelope, UNLIMITED_PLAN_VALUE } from "@/lib/consts";
import { redis } from "@/lib/redis";
import { Board, BoardStatus } from "@/types/board-status";
import { Player } from "@/types/player";
import { Session } from "next-auth";
import { getSubscriptionByUser } from "../subscription/get-subscription-by-user";
import { fibonacciChoiceOptions } from "./choice-options";

type Actions = "join" | "leave" | "choice" | "reveal" | "nextRound";

type DataMap = {
  join: {};
  leave: {};
  choice: { choice: string };
  reveal: {};
  nextRound: {};
};

type Data<T extends Actions> = DataMap[T];

class BoardEntity {
  protected _board: Board | undefined = undefined;

  constructor(
    readonly roomId: string,
    readonly session: Session,
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

    const userSubscripton = await getSubscriptionByUser({
      userId: this.session.user.id,
    });

    const maxRounds = userSubscripton?.plan.maxRounds ?? 0;

    const board: Board = {
      roomId: this.roomId,
      players: [selfPlayer],
      reveal: false,
      totalPlayers: 1,
      totalChoices: 0,
      currentRound: 1,
      average: 0,
      agreementPercentage: 0,
      availableRounds: 0,
      closestStoryPoint: 0,
      maxRounds,
    };

    await this.setBoard(board);
    await redis.expire(this.boardKey, 60 * 60 * 24);

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
    const choices = board.players
      .map((player) => Number(player.choice))
      .filter((choice) => !isNaN(choice) && choice > 0);

    const totalSum = choices.reduce((acc, choice) => acc + choice, 0);
    const average = board.reveal ? Math.round(totalSum / choices.length) : 0;

    const choiceCounts = choices.reduce<Record<number, number>>(
      (counts, choice) => {
        counts[choice] = (counts[choice] || 0) + 1;
        return counts;
      },
      {},
    );

    const majorityChoice = Math.max(...Object.values(choiceCounts));

    const agreementPercentage =
      majorityChoice > 1 ? (majorityChoice / choices.length) * 100 : 0;

    const closestStoryPoint = fibonacciChoiceOptions.reduce((prev, curr) => {
      return Math.abs(curr.weight - average) < Math.abs(prev - average)
        ? curr.weight
        : prev;
    }, 0);

    const availableRounds =
      board.maxRounds === UNLIMITED_PLAN_VALUE
        ? UNLIMITED_PLAN_VALUE
        : board.maxRounds - board.currentRound;

    board.agreementPercentage = agreementPercentage;
    board.average = average;
    board.closestStoryPoint = closestStoryPoint;
    board.totalChoices = choices.length;
    board.totalPlayers = board.players.length;

    board.availableRounds = availableRounds;

    return board;
  }
}

export class BoardService {
  private boardEntity: BoardEntity;

  constructor(roomId: string, session: Session) {
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
