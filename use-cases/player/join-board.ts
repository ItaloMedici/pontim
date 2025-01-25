"use server";

import { db } from "@/lib/db";
import { userSchema } from "@/lib/schemas/user";
import { z } from "zod";
import { validator } from "../validator";

export const joinBoard = validator({
  input: z.object({
    boardId: z.string().uuid(),
    user: userSchema,
  }),
  handler: async ({ boardId, user }) => {
    return await db.player.create({
      data: {
        imageUrl: user.image,
        email: user.email,
        boardId: boardId,
        nickname: user.name,
      },
    });
  },
});
