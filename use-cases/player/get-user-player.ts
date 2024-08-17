"use server";

import { db } from "@/lib/db";
import { userSchema } from "@/lib/schemas/user";
import { z } from "zod";
import { validator } from "../validator";

export const getUserPlayer = validator({
  input: z.object({
    boardId: z.string().uuid(),
    user: userSchema,
  }),
  handler: async ({ boardId, user }) => {
    return await db.player.findFirst({
      where: {
        boardId: boardId,
        email: user.email,
      },
    });
  },
});
