import { authOptions } from "@/authOptions";
import { BoardService } from "@/use-cases/board/board-service";
import { getServerSession } from "next-auth";
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

    const session = await getServerSession(authOptions);

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
    console.error(error);
    return Response.json({ message: error?.message }, { status: 500 });
  }
}
