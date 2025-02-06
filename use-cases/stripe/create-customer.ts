"use server";

import { env } from "@/env";
import { db } from "@/lib/db";
import { User } from "@/lib/schemas/user";
import stripe from "@/lib/stripe";
import { getCustomer } from "./get-customer";

export async function createCustomer(user: User) {
  const customer = await getCustomer(user);
  if (customer) return customer;

  const createdCustomer = await stripe.customers.create({
    email: user.email,
    name: user.name,
  });

  const freePlan = await db.plan.findFirst({
    where: {
      name: env.FREE_PLAN_NAME,
    },
  });

  if (!freePlan) return;

  const stripeCustomerSubscription = await stripe.subscriptions.create({
    customer: createdCustomer.id,
    items: [{ price: freePlan?.priceId }],
  });

  const subscription = await db.subscription.create({
    data: {
      customerId: createdCustomer.id,
      status: stripeCustomerSubscription.status,
      currentPeriodEnd: new Date(
        stripeCustomerSubscription.current_period_end * 1000,
      ),
      stripeSubscriptionId: stripeCustomerSubscription.id,
      user: {
        connect: {
          email: user.email,
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
      email: user.id,
    },
    data: {
      Subscription: {
        connect: {
          id: subscription.id,
        },
      },
    },
  });

  return createdCustomer;
}
