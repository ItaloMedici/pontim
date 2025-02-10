import { db } from "@/lib/db";
import { z } from "zod";
import { validator } from "../validator";
import { getBoardByRoomId } from "./get-board-by-room";

const input = z.object({
  roomId: z.string(),
});

export const toggleRevealBoard = validator({
  input,
  handler: async ({ roomId }) => {
    const board = await getBoardByRoomId({ roomId });

    return await db.board.update({
      where: {
        id: board?.id,
      },
      data: {
        reveal: !board?.reveal,
      },
    });
  },
});
