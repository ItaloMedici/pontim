"use server";

import { db } from "@/lib/db";
import { isBefore } from "date-fns";
import { z } from "zod";
import { validator } from "../validator";

export const getRoom = validator({
  input: z.object({
    roomId: z.string().uuid(),
  }),
  handler: async ({ roomId }) => {
    const room = await db.room.findUnique({ where: { id: roomId } });

    const roomExpireAt = room?.expireAt;
    const isTemporary = Boolean(roomExpireAt);

    const isExpired = roomExpireAt ? isBefore(roomExpireAt, Date.now()) : false;

    if (!room) {
      throw new Error("Room not found");
    }

    return {
      ...room,
      isTemporary: isTemporary,
      isExpired: isExpired,
    };
  },
});
