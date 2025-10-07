import { getCombinedSession } from "@/lib/auth/universal-auth";
import { logger } from "@/lib/logger";
import { BoardService } from "@/use-cases/board/board-service";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { roomId: string } },
) {
  try {
    const { roomId } = params;

    if (!roomId) {
      return Response.json({ message: "Invalid input" }, { status: 400 });
    }

    const session = await getCombinedSession();

    if (!session?.user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const service = new BoardService(roomId, session);

    if (!service.getBoard()) {
      return Response.json({ message: "Board not found" }, { status: 404 });
    }

    const newBoard = await service.reveal();

    return Response.json(newBoard);
  } catch (error: any) {
    logger.error({
      error,
      message: "Error while revealing board",
      metadata: {
        userId: error?.userId,
        roomId: error?.roomId,
      },
    });
    return Response.json({ message: error?.message }, { status: 500 });
  }
}
