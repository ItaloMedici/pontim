import { db } from "@/lib/db";

export const getRoomOwnerSubscription = async ({
  roomId,
}: {
  roomId: string;
}) => {
  const room = await db.room.findUnique({
    where: { id: roomId },
    select: { ownerEmail: true },
  });

  if (!room) {
    throw new Error("Room not found");
  }

  const subscription = await db.subscription.findFirst({
    where: { user: { email: room.ownerEmail } },
    include: { plan: true },
  });

  if (!subscription) {
    throw new Error("Subscription not found for the room owner");
  }

  return subscription;
};
