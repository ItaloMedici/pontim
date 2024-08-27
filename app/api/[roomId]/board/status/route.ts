import { BoardStatus, BoardStatusNotification } from "@/types/board-status";
import { createBoard } from "@/use-cases/board/create-board";
import { getBoard } from "@/use-cases/board/get-board";
import { getNotifications } from "@/use-cases/notification/get-notifications";
import { hideChoice } from "@/use-cases/player/convert-choice";
import { getOthersPlayersOnBoard } from "@/use-cases/player/get-others-players-on-board";
import { getUserPlayer } from "@/use-cases/player/get-user-player";
import { joinBoardAndValidateLimit } from "@/use-cases/player/join-board-and-validate-limit";
import { getUserRoom } from "@/use-cases/room";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

export async function GET(
  _: Request,
  { params }: { params: { roomId: string } },
) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { roomId } = params;

    if (!roomId) {
      return Response.json({ message: "Invalid input" }, { status: 400 });
    }

    const userRoom = await getUserRoom({ roomId, user: session.user });

    if (!userRoom) {
      return Response.json({ message: "User not in room" }, { status: 403 });
    }

    if (!userRoom.nickname) {
      const boardStatus: Partial<BoardStatus> = {
        firstTime: true,
      };

      return Response.json(boardStatus);
    }

    let board = await getBoard({ roomId });

    if (!board) {
      board = await createBoard({ roomId });
    }

    let player = await getUserPlayer({ boardId: board.id, user: session.user });

    if (!player) {
      player = await joinBoardAndValidateLimit({
        boardId: board.id,
        user: session.user,
        nickname: userRoom.nickname,
      });
    }

    if (!player) {
      return Response.json({ message: "Player not found" }, { status: 404 });
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

    const average = Math.round(
      playersChoices.reduce((acc, choice) => acc + choice, 0) / totalPlayers,
    );

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
    };

    return Response.json(boardStatus);
  } catch (error: any) {
    console.error(error);
    return Response.json(
      { message: error?.message },
      { status: error?.status ?? 500 },
    );
  }
}
