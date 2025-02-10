import { db } from "@/lib/db";
import { z } from "zod";
import { validator } from "../validator";
import { getBoardByRoomId } from "./get-board-by-room";

export const createBoard = validator({
  input: z.object({
    roomId: z.string().uuid(),
  }),
  handler: async ({ roomId }) => {
    const board = await getBoardByRoomId({ roomId });

    if (board) {
      return board;
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
