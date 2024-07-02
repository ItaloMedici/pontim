import { db } from "@/lib/db";
import { z } from "zod";
import { validator } from "../validator";

export const makeChoice = validator({
  input: z.object({
    playerId: z.string().uuid(),
    choice: z.string(),
  }),
  handler: async ({ playerId, choice }) => {
    const player = await db.player.findFirst({
      where: {
        id: playerId,
      },
    });

    if (!player) {
      throw new Error("Player not found");
    }

    let newChoice: string | null = choice;

    if (player.choice === choice) {
      newChoice = null;
    }

    return await db.player.update({
      where: {
        id: player.id,
      },
      data: {
        choice,
      },
    });
  },
});
