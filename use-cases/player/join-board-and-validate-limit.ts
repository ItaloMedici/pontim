"use server";

import { db } from "@/lib/db";
import { userSchema } from "@/lib/schemas/user";
import { z } from "zod";
import { validateBoardLimit } from "../board/validate-board-limit";
import { validator } from "../validator";

export const joinBoardAndValidateLimit = validator({
  input: z.object({
    boardId: z.string().uuid(),
    user: userSchema,
    nickname: z.string(),
  }),
  handler: async ({ boardId, user, nickname }) => {
    await validateBoardLimit({ boardId: boardId });

    return await db.player.create({
      data: {
        imageUrl: user.image,
        email: user.email,
        boardId: boardId,
        nickname: nickname,
      },
    });
  },
});
