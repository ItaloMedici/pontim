import { env } from "@/env";
import { z } from "zod";
import { getPlayersByBoardId } from "../player/get-players-by-board-id";
import { validator } from "../validator";

export const validateBoardLimit = validator({
  input: z.object({
    boardId: z.string().uuid(),
  }),
  handler: async ({ boardId }) => {
    const currentPlayers = await getPlayersByBoardId({ boardId: boardId });

    if (currentPlayers.length >= Number(env.MAXIMUM_PLAYERS_PER_BOARD)) {
      throw new Error("Board is full");
    }
  },
});
