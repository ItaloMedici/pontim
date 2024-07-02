import { db } from "@/lib/db";
import { z } from "zod";
import { getBoard } from "../board/get-board";
import { getUserRoom } from "../room";
import { validator } from "../validator";

export const getPlayersByRoomId = validator({
  input: z.object({
    roomId: z.string().uuid(),
  }),
  handler: async ({ roomId }) => {
    await getUserRoom({ roomId });

    const board = await getBoard({ roomId });

    if (!board) {
      throw new Error("Board not found");
    }

    return await db.player.findMany({
      where: {
        boardId: board.id,
      },
    });
  },
});
