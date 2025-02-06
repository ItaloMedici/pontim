"use client";

import { Pricing } from "@/lib/schemas/pricings";
import { createCheckoutSessionAction } from "./action";
import { PricingCard } from "./card";

interface PricingSectionProps {
  title: string;
  subtitle: string;
  pricings: Pricing[];
}

export function PricingSection({
  title,
  subtitle,
  pricings,
}: PricingSectionProps) {
  return (
    <section className="flex flex-col items-center gap-10 py-10">
      <div className="space-y-7 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-medium md:text-5xl">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <div className="grid w-full max-w-6xl gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {pricings.map((plan) => (
          <form key={plan.name} action={createCheckoutSessionAction}>
            <input type="hidden" name="planId" value={plan.id} />
            <PricingCard {...plan} />
          </form>
        ))}
      </div>
    </section>
  );
}
