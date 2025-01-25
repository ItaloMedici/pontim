import { getBoardStatus } from "@/use-cases/board/get-board-status";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { roomId: string } },
) {
  const searchParams = req.nextUrl.searchParams;
  const playerId = searchParams.get("playerId");

  if (!playerId) {
    return Response.json({ message: "Invalid input" }, { status: 400 });
  }

  try {
    const boardStatus = await getBoardStatus({
      roomId: params.roomId,
      playerId: playerId,
    });
    return Response.json(boardStatus);
  } catch (error: any) {
    console.error(error);
    return Response.json(
      { message: error?.message },
      { status: error?.status ?? 500 },
    );
  }
}
