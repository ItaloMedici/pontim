import { db } from "@/lib/db";
import { z } from "zod";
import { validator } from "../validator";

export const joinRoom = validator({
  input: z.object({
    roomId: z.string().uuid(),
  }),
  handler: async ({ roomId }, user) => {
    const room = await db.room.findUnique({ where: { id: roomId } });

    if (!room) {
      throw new Error("Room not found");
    }

    const userRoom = await db.userRoom.findFirst({
      where: {
        userEmail: user.email,
        roomId,
      },
    });

    if (userRoom) {
      throw new Error("Already joined");
    }

    await db.userRoom.create({
      data: {
        userEmail: user.email,
        roomId,
        favorite: false,
      },
    });

    return room;
  },
});
