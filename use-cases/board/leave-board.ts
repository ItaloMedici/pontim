import { db } from "@/lib/db";
import { z } from "zod";
import { getPlayersByBoardId } from "../player/get-players-by-board-id";
import { validator } from "../validator";
import { deleteBoard } from "./delete-board";
import { getBoardByRoomId } from "./get-board-by-room";

export const leaveBoard = validator({
  input: z.object({
    roomId: z.string().uuid(),
    playerId: z.string().uuid(),
  }),
  handler: async ({ roomId, playerId }) => {
    const board = await getBoardByRoomId({ roomId });

    if (!board) {
      throw new Error("Board not found");
    }

    const player = await db.player.findFirst({
      where: {
        id: playerId,
      },
    });

    if (!player) {
      throw new Error("Player not found");
    }

    const result = await db.player.delete({
      where: {
        id: player.id,
        boardId: board?.id,
      },
    });

    const players = await getPlayersByBoardId({ boardId: board.id });

    if (!players?.length) {
      await deleteBoard({ boardId: board.id });
    }

    return result;
  },
});
