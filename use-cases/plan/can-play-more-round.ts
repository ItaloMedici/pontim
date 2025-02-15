import { UNLIMITED_PLAN_VALUE } from "@/lib/consts";
import { db } from "@/lib/db";
import { getUserByEmail } from "../user/get-user-by-email";

type Input = {
  boardId: string;
  userEmail: string;
};

export const canPlayMoreRound = async ({ boardId, userEmail }: Input) => {
  const board = await db.board.findFirst({
    where: {
      id: boardId,
    },
    select: {
      room: true,
      round: true,
    },
  });

  if (!board?.room) {
    throw new Error("Board not found");
  }

  const user = await getUserByEmail(userEmail);

  if (!user) {
    throw new Error("User not found");
  }

  const isBoardOwner = board.room.ownerEmail === user.email;

  if (isBoardOwner) {
    const userPlan = await db.subscription.findFirst({
      where: {
        userId: user.id,
      },
      select: {
        plan: true,
      },
    });

    if (!userPlan) {
      throw new Error("User plan not found");
    }

    if (userPlan.plan.maxRounds === UNLIMITED_PLAN_VALUE) return true;

    return userPlan.plan.maxRounds > board.round;
  }

  const ownerPlan = await db.subscription.findFirst({
    where: {
      user: {
        email: board.room.ownerEmail,
      },
    },
    select: {
      plan: true,
    },
  });

  if (!ownerPlan) {
    throw new Error("Owner plan not found");
  }

  if (ownerPlan.plan.maxRounds === UNLIMITED_PLAN_VALUE) return true;

  return ownerPlan.plan.maxRounds > board.round;
};
