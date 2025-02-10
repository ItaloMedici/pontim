"use server";

import { db } from "@/lib/db";

export async function getUserByEmail(email: string) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}
