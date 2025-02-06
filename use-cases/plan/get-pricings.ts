"use server";

import { Pricing } from "@/lib/schemas/pricings";
import stripe from "@/lib/stripe";
import { getPlans } from "./get-plans";

export async function getPlanPricings(): Promise<Pricing[]> {
  const plans = await getPlans();

  const { data: stripePlans } = await stripe.plans.list();
  const { data: stripeProducts } = await stripe.products.list();

  const pricings = plans
    .map((plan): Pricing | undefined => {
      const stripePlan = stripePlans.find(
        (stripePlan) => stripePlan.id === plan.priceId,
      );
      const product = stripeProducts.find(
        (product) => product.id === stripePlan?.product,
      );

      if (typeof stripePlan?.amount !== "number" || !product) return;

      const cta =
        stripePlan.amount === 0
          ? "Começar grátis"
          : `Escolher plano ${product.name}`;

      return {
        id: plan.id,
        name: product.name,
        price: stripePlan.amount / 100,
        currency: stripePlan.currency.toUpperCase(),
        description: product.description || "",
        features: product.marketing_features.map(
          (feature) => feature.name ?? "",
        ),
        cta,
        highlighted: product.metadata.highlighted === "true",
      } satisfies Pricing;
    })
    .filter((plan): plan is Pricing => plan !== undefined);

  pricings.sort((a, b) => a.price - b.price);

  return pricings;
}
