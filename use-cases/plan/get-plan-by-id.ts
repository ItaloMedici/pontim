import { db } from "@/lib/db";

export async function getPlanById(id: string) {
  return db.plan.findUnique({
    where: {
      id,
    },
  });
}
