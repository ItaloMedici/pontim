import { getBoardStatus } from "@/use-cases/board/get-board-status";
import { deleteNotification } from "@/use-cases/notification/delete-notification";
import { sendNotification } from "@/use-cases/notification/send-notification";

export async function POST(
  request: Request,
  { params }: { params: { roomId: string } },
) {
  try {
    const { senderId, targetId, boardId, notification } = await request.json();

    await sendNotification({
      senderId,
      targetId,
      boardId,
      sound: notification,
    });

    const status = await getBoardStatus({
      roomId: params.roomId,
      playerId: senderId,
    });

    return Response.json(status);
  } catch (error: any) {
    console.error(error);
    return Response.json({ message: error?.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { notificationId } = await request.json();

    await deleteNotification({ notificationId });

    return Response.json({ message: "Succefully delete notification" });
  } catch (error: any) {
    console.error(error);
    return Response.json({ message: error?.message }, { status: 500 });
  }
}
