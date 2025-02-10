import { createBoard } from "@/use-cases/board/create-board";
import { getBoardByRoomId } from "@/use-cases/board/get-board-by-room";
import { getBoardStatus } from "@/use-cases/board/get-board-status";
import { canJoinBoard } from "@/use-cases/plan/can-join-board";
import { getUserPlayer } from "@/use-cases/player/get-user-player";
import { joinBoard } from "@/use-cases/player/join-board";
import { getUserRoom } from "@/use-cases/room";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const PUT = async (
  _: Request,
  { params }: { params: { roomId: string } },
) => {
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
      return Response.json({ message: "Room not found" }, { status: 404 });
    }

    let board = await getBoardByRoomId({ roomId });

    if (!board) {
      board = await createBoard({ roomId });
    }

    let player = await getUserPlayer({ boardId: board.id, user: session.user });

    if (!player) {
      const canAddMorePlayers = await canJoinBoard({
        roomId,
      });

      if (!canAddMorePlayers) {
        return redirect(`/room/${roomId}/is-full`);
      }

      player = await joinBoard({ boardId: board.id, user: session.user });
    }

    if (!player) {
      return Response.json(
        { message: "Error while creating player" },
        { status: 500 },
      );
    }

    const status = await getBoardStatus({ roomId, playerId: player.id });

    return Response.json(status);
  } catch (error: any) {
    console.error(error);
    return Response.json({ message: error?.message }, { status: 500 });
  }
};
