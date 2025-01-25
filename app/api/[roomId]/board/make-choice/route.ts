import { getBoardStatus } from "@/use-cases/board/get-board-status";
import { makeChoice } from "@/use-cases/player/make-choice";

export async function POST(
  request: Request,
  { params }: { params: { roomId: string } },
) {
  try {
    const { choice, playerId } = await request.json();

    if (!choice) {
      return Response.json({ message: "Choice is required" }, { status: 400 });
    }

    if (!playerId) {
      return Response.json(
        { message: "Player ID is required" },
        { status: 400 },
      );
    }

    await makeChoice({ playerId, choice });

    const status = await getBoardStatus({ roomId: params.roomId, playerId });

    return Response.json(status);
  } catch (error: any) {
    console.error(error);
    return Response.json({ message: error?.message }, { status: 500 });
  }
}
