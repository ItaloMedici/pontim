import { env } from "@/env";
import { db } from "@/lib/db";
import { addHours } from "date-fns";

type Input = {
  userEmail: string;
};

export const subscribeGuestToFreePlan = async ({ userEmail }: Input) => {
  const freePlan = await db.plan.findFirst({
    where: {
      priceId: env.FREE_PLAN_PRICE_ID,
    },
  });

  if (!freePlan) return;

  const fakeCustomerId = `free-plan-${userEmail}`;
  const fakeSubscriptionId = `free-plan-subscription-${userEmail}`;

  const currentPeriodEnd = addHours(Date.now(), 24);

  const subscription = await db.subscription.create({
    data: {
      customerId: fakeCustomerId,
      status: "active",
      currentPeriodEnd: currentPeriodEnd,
      stripeSubscriptionId: fakeSubscriptionId,
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

  return db.user.update({
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
