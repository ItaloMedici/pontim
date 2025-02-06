import { db } from "@/lib/db";

type Input = {
  boardId: string;
};

export const getBoardOwnerPlan = async ({ boardId }: Input) => {
  const onwnerEmail = await db.board.findFirst({
    where: {
      id: boardId,
    },
    select: {
      room: {
        select: {
          ownerEmail: true,
        },
      },
    },
  });

  if (!onwnerEmail) {
    throw new Error("Board not found");
  }

  const userPlan = await db.subscription.findFirst({
    where: {
      user: {
        email: onwnerEmail.room.ownerEmail,
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
