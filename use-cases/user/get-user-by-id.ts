import { db } from "@/lib/db";

export async function getUserById(userId: string) {
  return await db.user.findUnique({
    where: { id: userId },
  });
}
