import { authOptions } from "@/authOptions";
import { EventAction, EventEnvelope } from "@/lib/consts";
import { logger } from "@/lib/logger";
import { redis } from "@/lib/redis";
import { BoardService } from "@/use-cases/board/board-service";
import { NotificationService } from "@/use-cases/notification/notification-service";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { roomId: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    logger.info(`User ${session.user.id} connected to board ${params.roomId}`);

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

      subscriberBoard.on("error", (err) => {
        logger.error({
          error: err,
          message: "Error on board subscriber",
          metadata: {
            roomId: params.roomId,
            userId: session.user.id,
          },
        });
      });

      subscriberNotification.on("error", (err) => {
        logger.error({
          error: err,
          message: "Error on notification subscriber",
          metadata: {
            roomId: params.roomId,
            userId: session.user.id,
          },
        });
      });

      const interval = setInterval(() => {
        if (isControllerClosed) return;
        sendEvent({
          action: EventAction.KEEP_ALIVE,
          data: "",
          from: session.user.id,
        });
      }, 60000); // 1 minute

      sendEvent({
        action: EventAction.HAND_SHAKE,
        data: "",
        from: session.user.id,
      });

      req.signal.onabort = () => {
        isControllerClosed = true;
        clearInterval(interval);

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
  } catch (error) {
    logger.error({
      error,
      message: "Error on SSE connection",
      metadata: {
        roomId: params.roomId,
      },
    });

    return Response.json(
      { message: "Error while getting events" },
      { status: 500 },
    );
  }
}
