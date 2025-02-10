"use client";

import NumberFlow from "@number-flow/react";
import { ArrowRight, BadgeCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pricing } from "@/lib/schemas/pricings";
import { cn } from "@/lib/utils";

export function PricingCard({
  cta,
  price,
  currency,
  description,
  highlighted,
  name,
  features,
}: Pricing) {
  const isHighlighted = highlighted === true;

  return (
    <Card
      className={cn(
        "relative flex flex-col gap-8 overflow-hidden p-6",
        isHighlighted
          ? "bg-foreground text-background ring-2 ring-primary"
          : "bg-background text-foreground",
      )}
    >
      {isHighlighted && (
        <>
          <HighlightedBackground />
          <PopularBackground />
        </>
      )}

      <h2 className="flex items-center gap-3 text-xl font-medium capitalize">
        {name}
        {isHighlighted && (
          <Badge variant="secondary" className="mt-1 z-10">
            🔥 Mais Popular
          </Badge>
        )}
      </h2>

      <div className="relative h-12">
        {typeof price === "number" ? (
          <>
            <NumberFlow
              format={{
                style: "currency",
                currency,
              }}
              value={price}
              className="text-4xl font-medium"
              locales="pt-BR"
            />
            <p className="-mt-2 text-xs text-muted-foreground">/mês</p>
          </>
        ) : (
          <h1 className="text-4xl font-medium">{price}</h1>
        )}
      </div>

      <div className="flex-1 space-y-2">
        <h3 className="text-sm font-medium">{description}</h3>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li
              key={index}
              className={cn(
                "flex items-center gap-2 text-sm font-medium",
                isHighlighted ? "text-background" : "text-muted-foreground",
              )}
            >
              <BadgeCheck className="h-4 w-4" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <Button
        variant={isHighlighted ? "secondary" : "default"}
        className="w-full z-10"
        type="submit"
      >
        {cta}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Card>
  );
}

const HighlightedBackground = () => (
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:45px_45px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
);

const PopularBackground = () => (
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
);
