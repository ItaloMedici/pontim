import { db } from "@/lib/db";
import Stripe from "stripe";

export const processUpdateSubscription = async (event: {
  object: Stripe.Subscription;
}) => {
  console.log(
    `Updating subscription ${event.object.id} with price id ${event.object.items.data[0].price.id}`,
  );

  const stripeCustomerId = event.object.customer as string;
  const stripeSubscriptionId = event.object.id as string;
  const stripeSubscriptionStatus = event.object.status;
  const stripePriceId = event.object.items.data[0].price.id;

  const subscription = await db.subscription.findFirst({
    where: {
      OR: [
        {
          stripeSubscriptionId: stripeSubscriptionId,
        },
        {
          customerId: stripeCustomerId,
        },
      ],
    },
    include: {
      plan: true,
    },
  });

  if (!subscription) {
    throw new Error("subscription not found");
  }

  const newPlan = await db.plan.findFirst({
    where: {
      priceId: stripePriceId,
    },
  });

  if (!newPlan) {
    throw new Error("plan not found");
  }

  console.log(
    `Updating subscription ${subscription.plan.name} to plan ${newPlan.name}`,
  );

  await db.subscription.update({
    where: {
      id: subscription.id,
    },
    data: {
      stripeSubscriptionId,
      planId: newPlan.id,
      status: stripeSubscriptionStatus,
      customerId: stripeCustomerId,
    },
  });
};
