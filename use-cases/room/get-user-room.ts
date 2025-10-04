"use server";

import { db } from "@/lib/db";

type Input = {
  roomId: string;
  userEmail: string;
};

export const getUserRoom = async ({ userEmail, roomId }: Input) => {
  return await db.userRoom.findFirst({
    where: {
      userEmail,
      roomId,
    },
  });
};
