"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import { validator } from "../validator";

export const sendNotification = validator({
  input: z.object({
    senderId: z.string().uuid(),
    targetId: z.string().uuid(),
    boardId: z.string().uuid(),
    sound: z.string(),
  }),
  handler: async ({ senderId, targetId, sound, boardId }) => {
    return await db.notification.create({
      data: {
        senderId,
        targetId,
        sound,
        boardId,
      },
    });
  },
});
