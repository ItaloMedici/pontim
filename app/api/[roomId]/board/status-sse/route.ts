import { getBoardStatus } from "@/use-cases/board/get-board-status";
import { NextRequest, NextResponse } from "next/server";

const INTERVAL_POOLING = 500;

const textEnconder = {
  encodeData: (data: object) =>
    new TextEncoder().encode(`data: ${JSON.stringify(data)}\n\n`),
  encodeError: (error: string) =>
    new TextEncoder().encode(`event: error\ndata: ${error}\n\n`),
};

const handleBoardUpdate = async (
  controller: ReadableStreamDefaultController,
  roomId: string,
  playerId: string,
) => {
  try {
    const boardStatus = await getBoardStatus({ roomId, playerId });

    controller.enqueue(textEnconder.encodeData(boardStatus));
  } catch (error: any) {
    controller.enqueue(
      textEnconder.encodeError(error?.message ?? "Internal Server Error"),
    );
  }
};

export async function GET(
  req: NextRequest,
  { params }: { params: { roomId: string } },
) {
  const searchParams = req.nextUrl.searchParams;
  const playerId = searchParams.get("playerId");

  if (!playerId) {
    return new NextResponse(null, { status: 400 });
  }

  const startController = async (
    controller: ReadableStreamDefaultController,
  ) => {
    const interval = setInterval(
      () => handleBoardUpdate(controller, params.roomId, playerId),
      INTERVAL_POOLING,
    );

    req.signal.addEventListener("abort", () => {
      clearInterval(interval);
      controller.close();
    });
  };

  const stream = new ReadableStream({
    start: startController,
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
