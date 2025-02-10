"use server";

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

  console.log(subscription);

  if (!subscription) {
    throw new Error("User plan not found");
  }

  const plan = await db.plan.findFirst({
    where: {
      id: subscription.planId,
    },
  });

  if (!plan) {
    throw new Error("Plan not found");
  }

  const usersRooms = await db.userRoom.count({
    where: {
      userEmail: user.email,
    },
  });

  const canJoinInMoreRooms = plan.maxRooms > usersRooms;

  if (!canJoinInMoreRooms) {
    const response = {
      can: false,
      reason: ValidationState.USER_REACH_MAX_ROOMS,
    };
    return response;
  }

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
    const can = plan.maxPlayers > boardPlayers;

    return {
      can,
      reason: can ? undefined : ValidationState.BOARD_IS_FULL,
    };
  }

  const roomOwnerPlan = await db.user.findFirst({
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

  if (!roomOwnerPlan?.Subscription?.plan) {
    throw new Error("Room owner plan not found");
  }

  const can = roomOwnerPlan.Subscription.plan.maxPlayers > boardPlayers;

  return {
    can,
    reason: can ? undefined : ValidationState.BOARD_IS_FULL,
  };
}
