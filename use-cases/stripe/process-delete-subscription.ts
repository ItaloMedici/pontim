import { db } from "@/lib/db";
import stripe from "@/lib/stripe";
import Stripe from "stripe";
import { subscribeToFreePlan } from "./subscribe-free-plan";

export const processDeleteSubscription = async (event: {
  object: Stripe.Subscription;
}) => {
  const stripeSubscriptionId = event.object.id;
  const stripeCustomerId = event.object.customer as string;

  const customerExists = await stripe.customers.retrieve(stripeCustomerId);

  if (!customerExists) {
    return;
  }

  const subscription = await db.subscription.findFirst({
    where: {
      stripeSubscriptionId,
    },
    include: {
      user: true,
    },
  });

  if (!subscription) {
    throw new Error("subscription not found");
  }

  await db.subscription.delete({
    where: {
      id: subscription.id,
    },
  });

  await subscribeToFreePlan({
    stripeCustomerId: stripeCustomerId,
    userEmail: subscription.user.email,
  });
};
