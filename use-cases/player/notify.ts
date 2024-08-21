"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import { validator } from "../validator";

export const notifyPlayer = validator({
  input: z.object({
    playerId: z.string().uuid(),
    notification: z.string().optional(),
  }),
  handler: async ({ playerId, notification }) => {
    const player = await db.player.findFirst({
      where: {
        id: playerId,
      },
    });

    const notified = player?.notified ? null : notification || null;

    console.log({ notified, notification });

    return await db.player.update({
      where: {
        id: playerId,
      },
      data: {
        notified,
      },
    });
  },
});
