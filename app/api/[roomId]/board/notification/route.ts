import { authOptions } from "@/authOptions";
import { NotificationService } from "@/use-cases/notification/notification-service";
import { getServerSession } from "next-auth";

export async function POST(
  request: Request,
  { params }: { params: { roomId: string } },
) {
  try {
    const { targetId, notification } = await request.json();

    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const notificationService = new NotificationService(params.roomId, session);

    notificationService.sendNotification(notification, targetId);

    return Response.json(`Notification sent to ${targetId}`);
  } catch (error: any) {
    console.error(error);
    return Response.json({ message: error?.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { roomId: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const notificationService = new NotificationService(params.roomId, session);

    notificationService.deleteNotifications();

    return Response.json({ message: "Succefully delete notifications" });
  } catch (error: any) {
    console.error(error);
    return Response.json({ message: error?.message }, { status: 500 });
  }
}
