import { getBoardStatus } from "@/use-cases/board/get-board-status";
import { toggleRevealBoard } from "@/use-cases/board/revel-board";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { roomId: string } },
) {
  try {
    const { roomId } = params;

    if (!roomId) {
      return Response.json({ message: "Invalid input" }, { status: 400 });
    }

    const searchParams = req.nextUrl.searchParams;
    const playerId = searchParams.get("playerId");

    if (!playerId) {
      return Response.json({ message: "Invalid input" }, { status: 400 });
    }

    await toggleRevealBoard({ roomId });

    const status = await getBoardStatus({ roomId, playerId });

    return Response.json(status);
  } catch (error: any) {
    console.error(error);
    return Response.json({ message: error?.message }, { status: 500 });
  }
}
