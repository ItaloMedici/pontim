import { authOptions } from "@/authOptions";
import { BoardService } from "@/use-cases/board/board-service";
import { getServerSession } from "next-auth";

export async function POST(
  _: Request,
  { params }: { params: { roomId: string } },
) {
  try {
    const { roomId } = params;

    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const service = new BoardService(roomId, session);

    if (!service.getBoard()) {
      return Response.json({ message: "Board not found" }, { status: 404 });
    }

    const newBoard = service.leave();

    return Response.json({
      message: "Succefully leave board",
      data: newBoard,
    });
  } catch (error: any) {
    console.error(error);
    return Response.json({ message: error?.message }, { status: 500 });
  }
}
