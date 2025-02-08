"use server";

import { User } from "@/lib/schemas/user";
import stripe from "@/lib/stripe";
import { getCustomer } from "./get-customer";
import { subscribeToFreePlan } from "./subscribe-free-plan";

export async function createCustomer(user: User) {
  const customer = await getCustomer(user);
  if (customer) return customer;

  const createdCustomer = await stripe.customers.create({
    email: user.email,
    name: user.name,
  });

  await subscribeToFreePlan({
    stripeCustomerId: createdCustomer.id,
    userEmail: user.email,
  });

  return createdCustomer;
}
