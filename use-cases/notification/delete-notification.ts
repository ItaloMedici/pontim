"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import { validator } from "../validator";

export const deleteNotification = validator({
  input: z.object({
    notificationId: z.string().uuid(),
  }),
  handler: async ({ notificationId }) => {
    return await db.notification.delete({
      where: { id: notificationId },
    });
  },
});
