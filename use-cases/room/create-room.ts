"use server";

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
});

export const createRoom = validator({
  input,
  handler: async ({ name, imageUrl, user }) => {
    const allowedToCreateRoom = await canAddMoreRoom();

    if (!allowedToCreateRoom) {
      redirect("/pricing");
    }

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

    revalidatePath("/(dashboard)/(home)", "page");

    return room;
  },
});
