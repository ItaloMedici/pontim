import { authOptions } from "@/authOptions";
import { logger } from "@/lib/logger";
import { BoardService } from "@/use-cases/board/board-service";
import { getServerSession } from "next-auth";

export async function POST(
  request: Request,
  { params }: { params: { roomId: string } },
) {
  if (request.signal.aborted) {
    return Response.json({ message: "Request aborted" }, { status: 408 });
  }

  try {
    const { choice } = await request.json();
    const session = await getServerSession(authOptions);

    if (!choice) {
      return Response.json({ message: "Choice is required" }, { status: 400 });
    }

    if (!session?.user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const service = new BoardService(params.roomId, session);

    if (!service.getBoard()) {
      return Response.json({ message: "Board not found" }, { status: 404 });
    }

    const updated = service.makeChoice({
      choice,
    });

    return Response.json(updated);
  } catch (error: any) {
    logger.error({
      error,
      message: "Error while making choice",
      metadata: {
        userId: error?.userId,
        roomId: error?.roomId,
      },
    });
    return Response.json({ message: error?.message }, { status: 500 });
  }
}
