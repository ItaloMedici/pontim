import { db } from "@/lib/db";
import { z } from "zod";
import { validator } from "../validator";
import { getBoard } from "./get-board";

export const createBoard = validator({
  input: z.object({
    roomId: z.string().uuid(),
  }),
  handler: async ({ roomId }) => {
    const board = await getBoard({ roomId });

    if (board) {
      throw new Error("Board already exists");
    }

    const newBoard = await db.board.create({
      data: {
        roomId,
      },
    });

    if (!newBoard) {
      throw new Error("Board not created");
    }

    return newBoard;
  },
});
