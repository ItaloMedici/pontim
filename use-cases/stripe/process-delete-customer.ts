import { db } from "@/lib/db";
import Stripe from "stripe";

export const processDeleteCustomer = async (event: {
  object: Stripe.Customer;
}) => {
  console.log(`Deleting customer ${event.object.id}`);

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

  console.log(`Deleted user ${subscription.user.email}`);
};
