import { getBoardStatus } from "@/use-cases/board/get-board-status";
import { resetBoard } from "@/use-cases/board/reset-board";
import { getServerSession } from "next-auth";

export async function POST(
  request: Request,
  { params }: { params: { roomId: string } },
) {
  try {
    const { boardId, playerId } = await request.json();

    const session = await getServerSession();

    if (!session?.user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!boardId) {
      return Response.json({ message: "Invalid input" }, { status: 400 });
    }

    const result = await resetBoard({ boardId });

    if (!result.count)
      return Response.json(
        { message: "Error while reseting board" },
        { status: 404 },
      );

    const status = await getBoardStatus({
      roomId: params.roomId,
      playerId,
    });

    return Response.json(status);
  } catch (error: any) {
    console.error(error);
    return Response.json({ message: error?.message }, { status: 500 });
  }
}
