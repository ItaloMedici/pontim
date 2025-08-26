"use server";

import { env } from "@/env";
import { getPlansByPriceId } from "@/use-cases/plan/get-plans-by-price-id";
import { createCheckoutSession } from "@/use-cases/stripe/create-checkout-session";

export const createAdFreeSession = async () => {
  const adFreePlan = await getPlansByPriceId(env.AD_FREE_PLAN_PRICE_ID);

  if (!adFreePlan) return { error: "Plan not found" };

  const response = await createCheckoutSession(
    adFreePlan.id,
    "/close-window",
    "/close-window?success=true",
  );

  return response;
};
