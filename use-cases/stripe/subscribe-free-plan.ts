import { db } from "@/lib/db";
import stripe from "@/lib/stripe";
import { env } from "process";

type Input = {
  stripeCustomerId: string;
  userEmail: string;
};

export const subscribeToFreePlan = async ({
  stripeCustomerId,
  userEmail,
}: Input) => {
  const customer = await stripe.customers.retrieve(stripeCustomerId);

  const freePlan = await db.plan.findFirst({
    where: {
      priceId: env.FREE_PLAN_PRICE_ID,
    },
  });

  if (!freePlan) return;

  const stripeCustomerSubscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: freePlan?.priceId }],
  });

  const subscription = await db.subscription.create({
    data: {
      customerId: customer.id,
      status: stripeCustomerSubscription.status,
      currentPeriodEnd: new Date(
        stripeCustomerSubscription.current_period_end * 1000,
      ),
      stripeSubscriptionId: stripeCustomerSubscription.id,
      user: {
        connect: {
          email: userEmail,
        },
      },
      plan: {
        connect: {
          id: freePlan.id,
        },
      },
    },
  });

  await db.user.update({
    where: {
      email: userEmail,
    },
    data: {
      Subscription: {
        connect: {
          id: subscription.id,
        },
      },
    },
  });
};
