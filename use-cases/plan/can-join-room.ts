"use server";

import { env } from "@/env";
import { UNLIMITED_PLAN_VALUE } from "@/lib/consts";
import { db } from "@/lib/db";
import { ValidationState } from "@/messages/state";
import { getSubscriptionByUser } from "../subscription/get-subscription-by-user";
import { getUserByEmail } from "../user/get-user-by-email";

type Input = {
  roomId: string;
  userEmail: string;
};

export async function canJoinRoom({ roomId, userEmail }: Input) {
  const user = await getUserByEmail(userEmail);

  if (!user) {
    throw new Error("User not found");
  }

  const subscription = await getSubscriptionByUser({ userId: user.id });

  if (!subscription) {
    throw new Error("User plan not found");
  }

  const userPlan = await db.plan.findFirst({
    where: {
      id: subscription.planId,
    },
  });

  if (!userPlan) {
    throw new Error("Plan not found");
  }

  const userRoomsCount = await db.userRoom.count({
    where: {
      userEmail: user.email,
    },
  });

  const boardPlayers = await db.player.count({
    where: {
      board: {
        roomId: roomId,
      },
    },
  });

  const roomOwner = await db.room.findFirst({
    where: {
      id: roomId,
    },
    select: {
      ownerEmail: true,
    },
  });

  if (!roomOwner) {
    throw new Error("Room not found");
  }

  const isOwner = roomOwner.ownerEmail === user.email;

  if (isOwner) {
    const canJoinBoard =
      userPlan.maxRooms !== UNLIMITED_PLAN_VALUE &&
      userPlan.maxPlayers > boardPlayers;

    return {
      can: canJoinBoard,
      reason: canJoinBoard ? undefined : ValidationState.BOARD_IS_FULL,
    };
  }

  const owner = await db.user.findFirst({
    where: {
      email: roomOwner.ownerEmail,
    },
    select: {
      Subscription: {
        select: {
          plan: true,
        },
      },
    },
  });

  if (!owner?.Subscription?.plan) {
    throw new Error("Room owner plan not found");
  }

  const roomOwnerPlan = owner.Subscription.plan;

  const isFreePlan = roomOwnerPlan.priceId === env.FREE_PLAN_PRICE_ID;

  if (isFreePlan && userRoomsCount >= roomOwnerPlan.maxRooms) {
    return {
      can: false,
      reason: ValidationState.USER_REACH_MAX_ROOMS,
    };
  }

  const unlimitedPlayers = roomOwnerPlan.maxPlayers === UNLIMITED_PLAN_VALUE;

  const canPlayerJoin =
    unlimitedPlayers || roomOwnerPlan.maxPlayers > boardPlayers;

  return {
    can: canPlayerJoin,
    reason: canPlayerJoin ? undefined : ValidationState.BOARD_IS_FULL,
  };
}
