"use server";

import { db } from "@/lib/db";

export async function getPlansByPriceId(priceId: string) {
  return db.plan.findFirst({
    where: {
      priceId,
    },
  });
}
