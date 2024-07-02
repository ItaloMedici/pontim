"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { fetchRandomImage } from "../image/fetch-ramdom-image";
import { validator } from "../validator";

const input = z.object({
  name: z.string(),
  imageUrl: z.string().optional(),
});

export const createRoom = validator({
  input,
  handler: async ({ name, imageUrl }, user) => {
    const image = imageUrl ?? (await fetchRandomImage());

    const room = await db.room.create({
      data: {
        name,
        imageUrl: image,
        ownerEmail: user.email,
      },
    });

    await db.userRoom.create({
      data: {
        userEmail: user.email,
        roomId: room.id,
      },
    });

    revalidatePath("/(dasgboard)/(home)", "page");

    return room;
  },
});
