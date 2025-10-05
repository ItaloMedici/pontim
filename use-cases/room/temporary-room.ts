"use server";

import { DefaultDecks } from "@/lib/consts";
import { db } from "@/lib/db";
import { CombinedSession } from "@/types/guest-auth";
import { addHours, isBefore } from "date-fns";
import { z } from "zod";
import { createGuestUserAndSignIn } from "../guest/create-guest";
import { fetchRandomImage } from "../image/fetch-ramdom-image";
import { validator } from "../validator";

const input = z.object({
  name: z.string(),
  imageUrl: z.string().optional(),
  deckId: z.string().optional(),
  userName: z.string(),
});

export const createInstantRoom = validator({
  input,
  handler: async ({ name, imageUrl, userName, deckId }) => {
    const image = imageUrl ?? (await fetchRandomImage());

    const deckIdToUse = deckId ?? DefaultDecks.FIBONACCI;

    const guestUser = await createGuestUserAndSignIn({ userName });

    const expireAt = addHours(Date.now(), 24);

    const room = await db.room.create({
      data: {
        name,
        imageUrl: image,
        ownerEmail: guestUser.email,
        deckId: deckIdToUse,
        expireAt,
      },
    });

    await db.userRoom.create({
      data: {
        userEmail: guestUser.email,
        roomId: room.id,
      },
    });

    return room;
  },
});

export async function isRoomTemporary(roomId: string) {
  const room = await db.room.findUnique({
    where: { id: roomId },
    select: { expireAt: true },
  });

  return room?.expireAt !== null;
}

export async function getValidTemporaryRoomByGuestEmail(
  user?: CombinedSession["user"],
) {
  if (!user?.isGuest || !user.email) return null;

  const room = await db.room.findFirst({
    where: { ownerEmail: user.email },
  });

  if (!room) return null;

  const isValid = room.expireAt !== null && isBefore(room.expireAt, Date.now());

  return isValid ? room : null;
}
