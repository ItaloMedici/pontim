import { db } from "@/lib/db";
import { z } from "zod";
import { validator } from "../validator";

const input = z.object({
  boardId: z.string(),
});

export const resetBoardChoices = validator({
  input,
  handler: async ({ boardId }) => {
    return await db.player.updateMany({
      where: {
        boardId,
      },
      data: {
        choice: null,
      },
    });
  },
});
