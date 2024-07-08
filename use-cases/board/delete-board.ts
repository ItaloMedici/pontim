import { db } from "@/lib/db";
import { z } from "zod";
import { validator } from "../validator";

export const deleteBoard = validator({
  input: z.object({
    boardId: z.string().uuid(),
  }),
  handler: async ({ boardId }) => {
    const board = await db.board.findFirst({
      where: {
        id: boardId,
      },
    });

    if (!board) {
      throw new Error("Board not found");
    }

    await db.board.delete({
      where: {
        id: board.id,
      },
    });
  },
});
