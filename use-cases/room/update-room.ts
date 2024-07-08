"use server";

import { db } from "@/lib/db";
import { userSchema } from "@/lib/schemas/user";
import { z } from "zod";
import { validator } from "../validator";

export const updateRoom = validator({
  input: z.object({
    roomId: z.string().uuid(),
    name: z.string().optional(),
    imageUrl: z.string().optional(),
    user: userSchema,
  }),
  handler: async ({ roomId, name, user }) => {
    const room = await db.room.findUniqueOrThrow({ where: { id: roomId } });

    if (room.ownerEmail !== user.email) {
      throw new Error("Unauthorized");
    }

    await db.room.update({
      where: {
        id: roomId,
      },
      data: {
        name,
      },
    });
  },
});
