"use server";

import { db } from "@/lib/db";
import { userSchema } from "@/lib/schemas/user";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { validator } from "../validator";

export const deleteRoom = validator({
  input: z.object({
    roomId: z.string().uuid(),
    user: userSchema,
  }),
  handler: async ({ roomId, user }) => {
    const room = await db.room.findUniqueOrThrow({ where: { id: roomId } });

    if (room.ownerEmail !== user.email) {
      throw new Error("Unauthorized");
    }

    await db.room.delete({
      where: {
        id: roomId,
      },
    });

    revalidatePath("/(dasgboard)/(home)", "page");
  },
});
