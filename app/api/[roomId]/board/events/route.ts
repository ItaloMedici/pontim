import { authOptions } from "@/authOptions";
import { EventAction, EventEnvelope } from "@/lib/consts";
import { redis } from "@/lib/redis";
import { BoardService } from "@/use-cases/board/board-service";
import { NotificationService } from "@/use-cases/notification/notification-service";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { roomId: string } },
) {
  console.log("Subscribe to board events", params.roomId);

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const boardService = new BoardService(params.roomId, session);
  const notificationService = new NotificationService(params.roomId, session);

  let isControllerClosed = false;

  const startEventSource = async (
    controller: ReadableStreamDefaultController,
  ) => {
    const subscriberBoard = redis.duplicate();
    await subscriberBoard.subscribe(boardService.eventsKey);

    const subscriberNotification = redis.duplicate();
    await subscriberNotification.subscribe(notificationService.key);

    const sendEvent = (data: EventEnvelope | string) => {
      if (isControllerClosed) return;

      if (typeof data === "string") {
        const parsedData = JSON.parse(data) as EventEnvelope;

        if (parsedData.action === EventAction.BOARD_UPDATED) {
          const parsedBoard = boardService.parse(JSON.parse(parsedData.data));

          data = {
            ...parsedData,
            data: JSON.stringify(parsedBoard),
          };
        }
      }

      const value = typeof data === "string" ? data : JSON.stringify(data);

      const message = `data: ${value}\n\n`;

      controller.enqueue(new TextEncoder().encode(message));
    };

    subscriberBoard.on("message", (_, message) => {
      sendEvent(message);
    });

    subscriberNotification.on("message", (_, message) => {
      sendEvent(message);
    });

    sendEvent({
      action: EventAction.HAND_SHAKE,
      data: "",
      from: session.user.id,
    });

    req.signal.onabort = () => {
      isControllerClosed = true;

      subscriberBoard.unsubscribe(boardService.eventsKey);
      subscriberNotification.unsubscribe(notificationService.key);

      subscriberBoard.quit();
      subscriberNotification.quit();

      controller.close();
    };
  };

  const stream = new ReadableStream({
    start: startEventSource,
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
