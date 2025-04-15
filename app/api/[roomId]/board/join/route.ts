import { authOptions } from "@/authOptions";
import { logger } from "@/lib/logger";
import { BoardService } from "@/use-cases/board/board-service";
import { PlanService } from "@/use-cases/plan/plan-board-service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const PUT = async (
  _: Request,
  { params }: { params: { roomId: string } },
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { roomId } = params;

    if (!roomId) {
      return Response.json({ message: "Invalid input" }, { status: 400 });
    }

    const boardService = new BoardService(roomId, session);

    const boardData = await boardService.getBoard();

    if (!boardData) {
      const newBoard = await boardService.create();

      return Response.json(boardService.parse(newBoard));
    }

    const alreadyJoined = boardData.players.some(
      (player) => player.id === session.user.id,
    );

    if (alreadyJoined) {
      return Response.json(boardService.parse(boardData));
    }

    const planService = new PlanService(roomId, boardService);

    if (!planService.canJoinBoard(boardData.totalPlayers)) {
      return redirect(`/room/${roomId}/is-full`);
    }

    const updated = await boardService.join();

    if (!updated) {
      logger.error({
        message: "Error while creating player",
        metadata: {
          userId: session.user.id,
          roomId,
        },
      });
      return Response.json(
        { message: "Error while creating player" },
        { status: 500 },
      );
    }

    return Response.json(boardService.parse(updated));
  } catch (error: any) {
    logger.error({
      error,
      message: "Error while joining board",
      metadata: {
        roomId: params.roomId,
      },
    });
    return Response.json({ message: error?.message }, { status: 500 });
  }
};
