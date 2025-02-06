"use server";

import { env } from "@/env";
import stripe from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { getPlanById } from "../plan/get-plan-by-id";
import { getSubscriptionByUser } from "../subscription/get-subscription-by-user";
import { getUserByEmail } from "../user/get-user-by-email";
import { createCustomer } from "./create-customer";

export async function createCheckoutSession(
  planId: string,
): Promise<{ error: string } | { sessionUrl: string }> {
  try {
    const authSession = await getServerSession();

    const plan = await getPlanById(planId);

    if (!plan) return { error: "Plan not found" };

    if (!authSession?.user) {
      return { error: "User not logged" };
    }

    const user = await getUserByEmail(authSession.user.email);

    if (!user) return { error: "User not found" };

    const customer = await createCustomer(user);

    if (!customer) return { error: "Error creating customer" };

    const userSubscription = await getSubscriptionByUser({ userId: user.id });

    if (!userSubscription?.stripeSubscriptionId) {
      return { error: "User don't have subscription" };
    }

    const subscription = await stripe.subscriptionItems.list({
      subscription: userSubscription?.stripeSubscriptionId,
      limit: 1,
    });

    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${env.NEXTAUTH_URL}/home`,
      flow_data: {
        type: "subscription_update_confirm",
        after_completion: {
          type: "redirect",
          redirect: {
            return_url: `${env.NEXTAUTH_URL}/home?session_id={CHECKOUT_SESSION_ID}&order=success`,
          },
        },
        subscription_update_confirm: {
          subscription: userSubscription?.stripeSubscriptionId,
          items: [
            {
              id: subscription.data[0].id,
              price: plan.priceId,
              quantity: 1,
            },
          ],
        },
      },
    });

    console.log(session);

    if (!session?.url) return { error: "Error creating checkout session" };

    return { sessionUrl: session.url };
  } catch (error: any) {
    console.log(error);
    return { error: error?.message };
  }
}
