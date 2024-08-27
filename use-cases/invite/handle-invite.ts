"use server";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getRoom, joinRoom } from "../room";

const EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30; // 30 days

export const handleInvite = async (code: string) => {
  if (!code) {
    throw new Error("No invite code found in URL");
  }

  const invalidMap: Record<string, true> = {
    undefined: true,
    null: true,
    NaN: true,
  };

  const [roomId, createdAt] = Buffer.from(code, "base64")
    .toString()
    .split(":")
    .filter((part) => !invalidMap[part]);

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

  const session = await getServerSession();

  if (!session?.user) {
    const inviteUrl = `/invite?code=${code}`;

    return redirect(`/login?callbackUrl=${inviteUrl}`);
  }

  await joinRoom({ roomId, user: session?.user });

  const url = `/room/${roomId}`;

  return redirect(url);
};
