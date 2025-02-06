"use server";

import { db } from "@/lib/db";
import { userSchema } from "@/lib/schemas/user";
import { z } from "zod";

type Input = {
  roomId: string;
  user: z.infer<typeof userSchema>;
};

export const getUserRoom = async ({ user, roomId }: Input) => {
  return await db.userRoom.findFirst({
    where: {
      userEmail: user.email,
      roomId,
    },
  });
};
