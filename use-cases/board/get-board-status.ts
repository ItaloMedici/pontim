import { BoardStatus, BoardStatusNotification } from "@/types/board-status";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { getNotifications } from "../notification/get-notifications";
import { getBoardOwnerPlan } from "../plan/get-board-owner-plan";
import { hideChoice } from "../player/convert-choice";
import { getOthersPlayersOnBoard } from "../player/get-others-players-on-board";
import { getUserPlayer } from "../player/get-user-player";
import { validator } from "../validator";
import { getBoardByRoomId } from "./get-board-by-room";

export const getBoardStatus = validator({
  input: z.object({
    roomId: z.string().uuid(),
    playerId: z.string().uuid(),
  }),
  handler: async ({ roomId }) => {
    const session = await getServerSession();

    if (!session?.user) {
      throw { message: "Unauthorized", status: 401 };
    }

    const board = await getBoardByRoomId({ roomId });

    if (!board) {
      throw { message: "Board not found", status: 404 };
    }

    const player = await getUserPlayer({
      boardId: board.id,
      user: session.user,
    });

    if (!player) {
      throw { message: "Player not found", status: 404 };
    }

    const others = await getOthersPlayersOnBoard({
      boardId: board.id,
      userPlayerId: player.id,
    });

    others.sort((a, b) => {
      return a.createdAt > b.createdAt ? 1 : -1;
    });

    const othersWithHiddenChoice = others.map((other) => ({
      ...other,
      choice: !other.choice ? other.choice : hideChoice(other.choice),
    }));

    const totalPlayers = othersWithHiddenChoice.length + 1;

    let totalChoices =
      others.reduce((acc, player) => {
        return player.choice ? acc + 1 : acc;
      }, 0) ?? 0;

    if (player.choice) {
      totalChoices += 1;
    }

    const playersChoices = [
      player.choice,
      ...others.map((player) => player.choice),
    ]
      .map((choice) => Number(choice))
      .filter((choice) => !isNaN(choice) && choice > 0);

    const sumOfPlayerChoices = playersChoices.reduce(
      (acc, choice) => acc + choice,
      0,
    );

    const average = board.reveal
      ? Math.round(sumOfPlayerChoices / totalPlayers)
      : 0;

    const choiceCounts = playersChoices.reduce<Record<number, number>>(
      (counts, choice) => {
        counts[choice] = (counts[choice] || 0) + 1;
        return counts;
      },
      {},
    );

    const majorityChoice = Math.max(...Object.values(choiceCounts));

    const agreementPercentage =
      majorityChoice > 1 ? (majorityChoice / playersChoices.length) * 100 : 0;

    const notifications = await getNotifications({ boardId: board.id });

    const boardNotifications = notifications.map(
      (notification) =>
        ({
          id: notification.id,
          sound: notification.sound,
          target: notification.target.nickname,
          sender:
            notification.sender.id === player?.id
              ? "Você"
              : notification.sender.nickname,
          isSelf: notification.target.id === player?.id,
        }) as BoardStatusNotification,
    );

    const ownerPlan = await getBoardOwnerPlan({ boardId: board.id });
    const availableRounds = ownerPlan.plan.maxRounds - board.round;

    const boardStatus: Required<BoardStatus> = {
      boardId: board.id,
      self: player,
      others: othersWithHiddenChoice,
      reveal: board.reveal,
      firstTime: false,
      totalPlayers,
      totalChoices,
      average,
      notifications: boardNotifications,
      agreementPercentage,
      availableRounds,
    };

    return boardStatus;
  },
});
