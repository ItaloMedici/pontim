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

    return await db.board.create({
      data: {
        roomId,
      },
    });
  },
});
