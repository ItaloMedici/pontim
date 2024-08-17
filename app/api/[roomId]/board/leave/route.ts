import { leaveBoard } from "@/use-cases/board/leave-board";

export async function POST(
  request: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const { roomId } = params;
    const { playerId } = await request.json();

    if (!playerId || !roomId) {
      return Response.json({ message: "Invalid input" }, { status: 400 });
    }

    await leaveBoard({ roomId, playerId });

    return Response.json({ message: "Succefully leave board" });
  } catch (error: any) {
    console.error(error);
    return Response.json({ message: error?.message }, { status: 500 });
  }
}
