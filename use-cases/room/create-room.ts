"use server";

import {
  DECK_DELIMITER,
  DECK_MAX_CARD_LENGTH,
  DECK_MAX_CARDS,
  DefaultDecks,
} from "@/lib/consts";
import { db } from "@/lib/db";
import { userSchema } from "@/lib/schemas/user";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { fetchRandomImage } from "../image/fetch-ramdom-image";
import { canAddMoreRoom } from "../plan/can-add-more-room";
import { validator } from "../validator";

const input = z.object({
  name: z.string(),
  imageUrl: z.string().optional(),
  user: userSchema,
  deckId: z.string().optional(),
  customDeck: z
    .object({
      name: z.string().optional(),
      values: z.string().optional(),
    })
    .optional(),
});

export const createRoom = validator({
  input,
  handler: async ({ name, imageUrl, user, deckId, customDeck }) => {
    const allowedToCreateRoom = await canAddMoreRoom();

    if (!allowedToCreateRoom) {
      redirect("/pricing");
    }

    const image = imageUrl ?? (await fetchRandomImage());

    let deckIdToUse = deckId ?? DefaultDecks.FIBONACCI;

    if (customDeck) {
      const { name, values } = customDeck;

      if (!name || !values) {
        throw new Error("Custom deck name and values are required");
      }

      if (values.endsWith(DECK_DELIMITER)) {
        values.slice(0, -1);
      }

      const sanitizedValue = values.replace(/,+/g, ",");

      const sanitizedArray = sanitizedValue
        .split(DECK_DELIMITER)
        .map((value) => value.trim().slice(0, DECK_MAX_CARD_LENGTH))
        .filter(Boolean);

      const uniqueChoices = Array.from(new Set(sanitizedArray)).slice(
        0,
        DECK_MAX_CARDS,
      );

      const finalValue = uniqueChoices.join(DECK_DELIMITER);

      const createdCustomDeck = await db.deck.create({
        data: {
          name,
          value: finalValue,
          cutomRoomId: null,
        },
      });

      deckIdToUse = createdCustomDeck.id;
    }

    const room = await db.room.create({
      data: {
        name,
        imageUrl: image,
        ownerEmail: user.email,
        deckId: deckIdToUse,
      },
    });

    await db.userRoom.create({
      data: {
        userEmail: user.email,
        roomId: room.id,
      },
    });

    if (customDeck) {
      await db.deck.update({
        where: {
          id: deckIdToUse,
        },
        data: {
          cutomRoomId: room.id,
        },
      });
    }

    revalidatePath("/(dashboard)/(home)", "page");

    return room;
  },
});
