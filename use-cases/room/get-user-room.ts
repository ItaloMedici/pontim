"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import { validator } from "../validator";

export const getUserRoom = validator({
  input: z.object({
    roomId: z.string().uuid(),
  }),
  handler: async ({ roomId }, user) => {
    const userRoom = await db.userRoom.findFirst({
      where: {
        userEmail: user.email,
        roomId,
      },
    });

    if (!userRoom) {
      throw new Error("Room not found");
    }

    return userRoom;
  },
});
