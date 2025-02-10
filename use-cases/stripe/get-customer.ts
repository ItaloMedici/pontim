import { User } from "@/lib/schemas/user";
import stripe from "@/lib/stripe";

export async function getCustomer({ email }: User) {
  const customers = await stripe.customers.list({ email });
  return customers.data?.[0];
}
