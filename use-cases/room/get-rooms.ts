"use server";

import { db } from "@/lib/db";
import { userSchema } from "@/lib/schemas/user";
import { z } from "zod";
import { validator } from "../validator";

const inputSchema = z.object({
  favorite: z.boolean().optional(),
  search: z.string().optional().nullish(),
  user: userSchema,
});

export const getRooms = validator({
  input: inputSchema,
  handler: async ({ favorite, search, user }) => {
    if (favorite) {
      const userRooms = await db.userRoom.findMany({
        where: {
          userEmail: user.email,
          favorite: true,
        },
        select: {
          room: true,
        },
      });

      return userRooms.map((userRoom) => ({
        ...userRoom.room,
        favorite: true,
      }));
    }

    let userRooms = await db.userRoom.findMany({
      where: {
        userEmail: user.email,
      },
      select: {
        room: true,
        favorite: true,
      },
    });

    if (typeof search === "string") {
      userRooms = userRooms.filter((userRoom) =>
        userRoom.room.name.includes(search),
      );
    }

    const roomsWithFavoriteRelation = userRooms.map((userRoom) => ({
      ...userRoom.room,
      favorite: !!userRoom.favorite,
    }));

    return roomsWithFavoriteRelation;
  },
});
