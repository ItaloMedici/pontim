"use server";
import { createCheckoutSession } from "@/use-cases/stripe/create-checkout-session";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const createCheckoutSessionAction = async (form: FormData) => {
  const planId = form.get("planId") as string;

  const authSession = await getServerSession();

  if (!authSession?.user) {
    redirect(
      `/login?callbackUrl=/api/create-checkout-session/?planId=${planId}`,
    );
  }

  const response = await createCheckoutSession(planId);

  if ("error" in response) {
    throw new Error(response.error);
  }

  redirect(response.sessionUrl);
};
