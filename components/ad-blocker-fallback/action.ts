"use server";

import { env } from "@/env";
import { createCheckoutSession } from "@/use-cases/stripe/create-checkout-session";

export const createAdFreeSession = async () => {
  const response = await createCheckoutSession(env.AD_FREE_PLAN_PRICE_ID);

  return response;
};
