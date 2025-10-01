import { getCombinedSession } from "@/lib/auth/universal-auth";
import { logger } from "@/lib/logger";
import { NotificationService } from "@/use-cases/notification/notification-service";

export async function POST(
  request: Request,
  { params }: { params: { roomId: string } },
) {
  try {
    const { targetId, notification } = await request.json();

    const session = await getCombinedSession();

    if (!session?.user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const notificationService = new NotificationService(params.roomId, session);

    notificationService.sendNotification(notification, targetId);

    return Response.json(`Notification sent to ${targetId}`);
  } catch (error: any) {
    logger.error({
      error,
      message: "Error while sending notification",
      metadata: {
        userId: error?.userId,
        roomId: error?.roomId,
      },
    });
    return Response.json({ message: error?.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { roomId: string } },
) {
  try {
    const session = await getCombinedSession();

    if (!session?.user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const notificationService = new NotificationService(params.roomId, session);

    notificationService.deleteNotifications();

    return Response.json({ message: "Succefully delete notifications" });
  } catch (error: any) {
    logger.error({
      error,
      message: "Error while deleting notifications",
      metadata: {
        userId: error?.userId,
        roomId: error?.roomId,
      },
    });
    return Response.json({ message: error?.message }, { status: 500 });
  }
}
