import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import Stripe from "stripe";

export const processDeleteCustomer = async (event: {
  object: Stripe.Customer;
}) => {
  logger.info(`Deleting customer ${event.object.id}`);

  const stripeCustomerId = event.object.id as string;

  const subscription = await db.subscription.findFirst({
    where: {
      customerId: stripeCustomerId,
    },
    include: {
      user: true,
    },
  });

  if (!subscription) {
    throw new Error("subscription not found");
  }

  await db.user.delete({
    where: {
      email: subscription.user.id,
    },
  });

  logger.info(`Deleted user ${subscription.user.email}`);
};
