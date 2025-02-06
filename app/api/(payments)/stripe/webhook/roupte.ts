import Stripe from "stripe";

import { env } from "@/env";
import stripe from "@/lib/stripe";
import { processUpdateSubscription } from "@/use-cases/stripe/process-update-subscription";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error: any) {
    console.error(`Webhook Error: ${error.message}`);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
      await processUpdateSubscription(event.data);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response('{ "received": true }', { status: 200 });
}
