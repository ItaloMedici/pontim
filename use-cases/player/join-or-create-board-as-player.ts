"use server";

import { db } from "@/lib/db";
import { userSchema } from "@/lib/schemas/user";
import { z } from "zod";
import { createBoard } from "../board/create-board";
import { getBoard } from "../board/get-board";
import { validateBoardLimit } from "../board/validate-board-limit";
import { getUserRoom } from "../room";
import { validator } from "../validator";

export const joinOrCreateBoardAsPlayer = validator({
  input: z.object({
    roomId: z.string().uuid(),
    user: userSchema,
  }),
  handler: async ({ roomId, user }) => {
    await getUserRoom({ roomId, user });

    let board = await getBoard({ roomId });

    if (!board) {
      board = await createBoard({ roomId });
    } else {
      await validateBoardLimit({ boardId: board.id });
    }

    const existingPlayer = await db.player.findFirst({
      where: {
        boardId: board.id,
        email: user.email,
      },
    });

    if (existingPlayer) {
      return existingPlayer;
    }

    return await db.player.create({
      data: {
        name: user.name,
        imageUrl: user.image,
        email: user.email,
        boardId: board.id,
      },
    });
  },
});
