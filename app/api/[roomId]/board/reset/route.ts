import { authOptions } from "@/authOptions";
import { logger } from "@/lib/logger";
import { BoardService } from "@/use-cases/board/board-service";
import { PlanService } from "@/use-cases/plan/plan-board-service";
import { getServerSession } from "next-auth";

export async function POST(
  _: Request,
  { params }: { params: { roomId: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const boardService = new BoardService(params.roomId, session);

    const planService = new PlanService(params.roomId, boardService);

    const canPlay = await planService.canPlayMoreRound();

    if (!canPlay) {
      return Response.json(
        { message: "Board reach limit of rounds" },
        { status: 403 },
      );
    }

    const updatedBoard = boardService.nextRound();

    if (!updatedBoard)
      return Response.json(
        { message: "Error while reseting board" },
        { status: 404 },
      );

    return Response.json(updatedBoard);
  } catch (error: any) {
    logger.error({
      error,
      message: "Error while reseting board",
      metadata: {
        userId: error?.userId,
        roomId: error?.roomId,
      },
    });
    return Response.json({ message: error?.message }, { status: 500 });
  }
}
