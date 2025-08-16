"use server";

import { db } from "@/lib/db";
import { userSchema } from "@/lib/schemas/user";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { validator } from "../validator";

export const leaveRoom = validator({
  input: z.object({
    roomId: z.string().uuid(),
    user: userSchema,
  }),
  handler: async ({ roomId, user }) => {
    const userRoom = await db.userRoom.findFirst({
      where: {
        userEmail: user.email,
        roomId,
      },
    });

    if (!userRoom) {
      throw Error("User not in this room");
    }

    await db.userRoom.delete({
      where: {
        id: userRoom.id,
      },
    });

    revalidatePath("/(dasgboard)/(home)", "page");
  },
});
