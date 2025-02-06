"use server";

import { db } from "@/lib/db";
import { z } from "zod";

const input = z.object({
  email: z.string().email(),
  name: z.string(),
  image: z.string().optional(),
});

export async function createUser(authUser: z.infer<typeof input>) {
  const validUser = input.safeParse(authUser);

  if (!validUser.success) {
    return;
  }

  const user = await db.user.create({
    data: {
      email: validUser.data.email,
      name: validUser.data.name,
      imageUrl: validUser.data.image,
    },
  });

  return user;
}
