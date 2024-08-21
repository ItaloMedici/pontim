import { BoardStatus } from "@/types/board-status";
import { createBoard } from "@/use-cases/board/create-board";
import { getBoard } from "@/use-cases/board/get-board";
import { getOthersPlayersOnBoard } from "@/use-cases/player/get-others-players-on-board";
import { getUserPlayer } from "@/use-cases/player/get-user-player";
import { joinBoardAndValidateLimit } from "@/use-cases/player/join-board-and-validate-limit";
import { getUserRoom } from "@/use-cases/room";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

export async function GET(
  _: Request,
  { params }: { params: { roomId: string } }
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

    let board = await getBoard({ roomId });

    if (!board) {
      board = await createBoard({ roomId });
    }

    let player = await getUserPlayer({ boardId: board.id, user: session.user });

    if (!player) {
      player = await joinBoardAndValidateLimit({
        boardId: board.id,
        user: session.user,
      });
    }

    const others = await getOthersPlayersOnBoard({
      boardId: board.id,
      userPlayerId: player.id,
    });

    const othersWithHiddenChoice = others.map((other) => ({
      ...other,
      choice: !other.choice
        ? other.choice
        : Buffer.from(other.choice).toString("base64"),
    }));

    const boardStatus: BoardStatus = {
      boardId: board.id,
      self: player,
      others: othersWithHiddenChoice,
      reveal: board.reveal,
    };

    return Response.json(boardStatus);
  } catch (error: any) {
    console.error(error);
    return Response.json({ message: error?.message }, { status: 500 });
  }
}
