import { db } from "@/lib/db";

type Input = {
  roomId: string;
};

export const getRoomOwnerPlan = async ({ roomId }: Input) => {
  const onwnerEmail = await db.room.findFirst({
    where: {
      id: roomId,
    },
    select: {
      ownerEmail: true,
    },
  });

  if (!onwnerEmail) {
    throw new Error("Board not found");
  }

  const userPlan = await db.subscription.findFirst({
    where: {
      user: {
        email: onwnerEmail.ownerEmail,
      },
    },
    select: {
      plan: true,
    },
  });

  if (!userPlan) {
    throw new Error("User plan not found");
  }

  return userPlan;
};
