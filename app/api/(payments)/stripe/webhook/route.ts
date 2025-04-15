import Stripe from "stripe";

import { env } from "@/env";
import { logger } from "@/lib/logger";
import stripe from "@/lib/stripe";
import { processDeleteCustomer } from "@/use-cases/stripe/process-delete-customer";
import { processDeleteSubscription } from "@/use-cases/stripe/process-delete-subscription";
import { processUpdateSubscription } from "@/use-cases/stripe/process-update-subscription";
import { headers } from "next/headers";

export async function POST(req: Request) {
  logger.info("Received webhook");
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  logger.info(`Received webhook with signature ${signature}`);

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

  logger.info(`Received event: ${event.type}`);

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
      await processUpdateSubscription(event.data);
      break;
    case "customer.subscription.deleted":
      processDeleteSubscription(event.data);
      break;
    case "customer.deleted":
      processDeleteCustomer(event.data);
      break;
    default:
      logger.info(`Unhandled event type ${event.type}`);
  }

  return new Response('{ "received": true }', { status: 200 });
}
