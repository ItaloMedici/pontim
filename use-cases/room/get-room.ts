"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import { validator } from "../validator";

export const getRoom = validator({
  input: z.object({
    roomId: z.string().uuid(),
  }),
  handler: async ({ roomId }) => {
    const room = await db.room.findUnique({ where: { id: roomId } });

    if (!room) {
      throw new Error("Room not found");
    }

    return room;
  },
});
