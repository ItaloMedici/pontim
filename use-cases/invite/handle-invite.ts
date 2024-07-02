"use server";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getRoom } from "../room";

const EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30; // 30 days

export const handleInvite = async (code: string) => {
  if (!code) {
    throw new Error("No invite code found in URL");
  }

  const [roomId, createdAt] = Buffer.from(code, "base64").toString().split(":");

  if (!roomId || !createdAt) {
    throw new Error("Invalid invite code");
  }

  const isExperired = Date.now() - parseInt(createdAt, 10) > EXPIRATION_TIME;

  if (isExperired) {
    throw new Error("Invite code has expired");
  }

  const room = await getRoom({ roomId });

  if (!room) {
    throw new Error("Room not found");
  }

  const url = `/room/${roomId}`;

  const session = await getServerSession();

  if (!session?.user) {
    return redirect(`/login?callbackUrl=${url}`);
  }

  return redirect(url);
};
