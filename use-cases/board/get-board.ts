import { db } from "@/lib/db";
import { z } from "zod";
import { validator } from "../validator";

export const getBoard = validator({
  input: z.object({
    roomId: z.string().uuid(),
  }),
  handler: async ({ roomId }) => {
    return await db.board.findFirst({
      where: {
        roomId,
      },
    });
  },
});
