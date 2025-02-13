"use server";

import { UNLIMITED_PLAN_VALUE } from "@/lib/consts";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getSubscriptionByUser } from "../subscription/get-subscription-by-user";
import { getUserByEmail } from "../user/get-user-by-email";

export async function canAddMoreRoom() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  const user = await getUserByEmail(session.user.email);

  if (!user) {
    throw new Error("User not found");
  }

  const subscription = await getSubscriptionByUser({ userId: user.id });

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

  if (plan.maxRooms === UNLIMITED_PLAN_VALUE) return true;

  return plan.maxRooms > usersRooms;
}
