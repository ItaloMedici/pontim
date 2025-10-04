"use server";

import { signInGuest } from "@/lib/auth/guest-auth";
import { GUEST_USER_EMAIL_DOMAIN } from "@/lib/consts";
import { db } from "@/lib/db";
import { addHours } from "date-fns";
import { subscribeGuestToFreePlan } from "../subscription/subscribe-guest-free-plan";

export const createGuestUserAndSignIn = async ({
  userName,
}: {
  userName: string;
}) => {
  const uuid = crypto.randomUUID();

  const fakeEmail = `${uuid}${GUEST_USER_EMAIL_DOMAIN}`;

  const expireAt = addHours(Date.now(), 24);

  const user = await db.user.create({
    data: {
      email: fakeEmail,
      name: userName,
      expireAt,
    },
  });

  const updatedUser = await subscribeGuestToFreePlan({ userEmail: user.email });

  if (!updatedUser) {
    throw new Error("Failed to subscribe guest to free plan");
  }

  await signInGuest(updatedUser);

  return updatedUser;
};
