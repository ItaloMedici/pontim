import { db } from "@/lib/db";
import { z } from "zod";
import { validator } from "../validator";

export const getOthersPlayersOnBoard = validator({
  input: z.object({
    boardId: z.string().uuid(),
    userPlayerId: z.string().uuid(),
  }),
  handler: async ({ boardId, userPlayerId }) => {
    return await db.player.findMany({
      where: {
        boardId: boardId,
        NOT: {
          id: userPlayerId,
        },
      },
    });
  },
});
