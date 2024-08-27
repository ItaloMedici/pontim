"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import { validator } from "../validator";

export const getNotifications = validator({
  input: z.object({
    boardId: z.string().uuid(),
  }),
  handler: async ({ boardId }) => {
    return await db.notification.findMany({
      where: { boardId },
      select: {
        id: true,
        sound: true,
        sender: {
          select: {
            id: true,
            nickname: true,
          },
        },
        target: {
          select: {
            id: true,
            nickname: true,
          },
        },
      },
    });
  },
});
