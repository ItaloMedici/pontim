"use server";

import { authOptions } from "@/authOptions";
import { env } from "@/env";
import { Pricing } from "@/lib/schemas/pricings";
import stripe from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { getSubscriptionByUser } from "../subscription/get-subscription-by-user";
import { getPlans } from "./get-plans";

export async function getPlanPricings(): Promise<Pricing[]> {
  const allPlans = await getPlans();

  const plansWithoutAdFree = allPlans.filter(
    (plan) => plan.priceId !== env.AD_FREE_PLAN_PRICE_ID,
  );

  const session = await getServerSession(authOptions);

  let userPlanId: string;

  if (session?.user) {
    const subscription = await getSubscriptionByUser({
      userId: session.user.id,
    });

    if (subscription && subscription.status === "active") {
      userPlanId = subscription.planId;
    }
  }

  const { data: stripePlans } = await stripe.plans.list();
  const { data: stripeProducts } = await stripe.products.list();

  const pricings = plansWithoutAdFree
    .map((plan): Pricing | undefined => {
      const stripePlan = stripePlans.find(
        (stripePlan) => stripePlan.id === plan.priceId,
      );
      const product = stripeProducts.find(
        (product) => product.id === stripePlan?.product,
      );

      if (typeof stripePlan?.amount !== "number" || !product) return;

      const freePlanCta = userPlanId
        ? "Perder funcionalidades"
        : "Começar grátis";

      const cta =
        stripePlan.amount === 0
          ? freePlanCta
          : `Escolher plano ${product.name}`;

      const isPlanSameAsUser = userPlanId === plan.id;

      return {
        id: plan.id,
        name: product.name,
        price: stripePlan.amount / 100,
        currency: stripePlan.currency.toUpperCase(),
        description: product.description || "",
        features: product.marketing_features.map(
          (feature) => feature.name ?? "",
        ),
        cta: isPlanSameAsUser ? "Plano ativo" : cta,
        ctaDisabled: isPlanSameAsUser,
        highlighted: product.metadata.highlighted === "true",
      } satisfies Pricing;
    })
    .filter((plan): plan is Pricing => plan !== undefined);

  pricings.sort((a, b) => a.price - b.price);

  return pricings;
}
