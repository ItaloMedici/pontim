import { db } from "@/lib/db";
import { z } from "zod";
import { getBoard } from "../board/get-board";
import { getUserRoom } from "../room";
import { validator } from "../validator";

export const joinBoardAsPlayer = validator({
  input: z.object({
    roomId: z.string().uuid(),
  }),
  handler: async ({ roomId }, user) => {
    await getUserRoom({ roomId });

    const board = await getBoard({ roomId });

    if (!board) {
      throw new Error("Board not found");
    }

    const player = await db.player.create({
      data: {
        name: user.name,
        imageUrl: user.image,
        boardId: board.id,
      },
    });

    return player;
  },
});
