import { db } from "@/lib/db";
import { userSchema } from "@/lib/schemas/user";
import { z } from "zod";
import { getUserRoom } from ".";
import { validator } from "../validator";

export const joinRoom = validator({
  input: z.object({
    roomId: z.string().uuid(),
    user: userSchema,
  }),
  handler: async ({ roomId, user }) => {
    const room = await db.room.findUnique({ where: { id: roomId } });

    if (!room) {
      throw new Error("Room not found");
    }

    const isTemporaryRoom = room?.expireAt !== null;

    if (isTemporaryRoom) return;

    const alreadyJoined = await getUserRoom({
      roomId,
      userEmail: user.email,
    });

    if (alreadyJoined) return;

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
