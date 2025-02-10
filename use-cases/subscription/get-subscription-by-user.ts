import { db } from "@/lib/db";

export async function getSubscriptionByUser({ userId }: { userId: string }) {
  return db.subscription.findFirst({
    where: {
      userId,
    },
    include: {
      plan: true,
    },
  });
}
