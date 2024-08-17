"use server";

import { db } from "@/lib/db";
import { userSchema } from "@/lib/schemas/user";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { validator } from "../validator";

export const favoriteRoom = validator({
  input: z.object({
    roomId: z.string().uuid(),
    favorite: z.boolean(),
    user: userSchema,
  }),
  handler: async ({ roomId, favorite, user }) => {
    const userRoom = await db.userRoom.findFirst({
      where: {
        userEmail: user.email,
        roomId,
      },
    });

    if (!userRoom) {
      throw new Error("Room not found");
    }

    await db.userRoom.update({
      data: {
        favorite,
      },
      where: {
        id: userRoom.id,
      },
    });

    revalidatePath("/");
  },
});
