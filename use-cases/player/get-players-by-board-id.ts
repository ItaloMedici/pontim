import { db } from "@/lib/db";
import { z } from "zod";
import { validator } from "../validator";

export const getPlayersByBoardId = validator({
  input: z.object({
    boardId: z.string().uuid(),
  }),
  handler: async ({ boardId }) => {
    return await db.player.findMany({
      where: {
        boardId: boardId,
      },
    });
  },
});
