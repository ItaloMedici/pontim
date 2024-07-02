import { db } from "@/lib/db";
import { z } from "zod";
import { validator } from "../validator";

export const leaveBoard = validator({
  input: z.object({
    boardId: z.string().uuid(),
    playerId: z.string().uuid(),
  }),
  handler: async ({ boardId, playerId }) => {
    const player = await db.player.findFirst({
      where: {
        id: playerId,
      },
    });

    if (!player) {
      throw new Error("Player not found");
    }

    return await db.player.delete({
      where: {
        id: player.id,
        boardId: boardId,
      },
    });
  },
});
