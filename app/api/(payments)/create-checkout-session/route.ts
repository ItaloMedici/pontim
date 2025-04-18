import { env } from "@/env";
import { createCheckoutSession } from "@/use-cases/stripe/create-checkout-session";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const planId = searchParams.get("planId");

    if (!planId) {
      return Response.redirect(`${env.SITE_URL}/home/?error=Plan not found`);
    }

    const response = await createCheckoutSession(planId);

    if ("error" in response) {
      return Response.redirect(`/home/?error=${response.error}`);
    }

    return Response.redirect(response.sessionUrl);
  } catch {
    return Response.redirect(
      `${env.SITE_URL}/home/?error=Error creating checkout session`,
    );
  }
}
