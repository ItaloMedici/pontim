import { db } from "@/lib/db";
import { userSchema } from "@/lib/schemas/user";
import { z } from "zod";
import { getPlayersByBoardId } from "../player/get-players-by-board-id";
import { validator } from "../validator";
import { deleteBoard } from "./delete-board";

export const leaveBoard = validator({
  input: z.object({
    boardId: z.string().uuid(),
    playerId: z.string().uuid(),
    user: userSchema,
  }),
  handler: async ({ boardId, playerId, user }) => {
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
        boardId: boardId,
      },
    });

    const players = await getPlayersByBoardId({ boardId });

    if (!players?.length) {
      await deleteBoard({ boardId });
    }

    return result;
  },
});
