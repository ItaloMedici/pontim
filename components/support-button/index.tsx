"use client";

import { env } from "@/env";
import confetti from "canvas-confetti";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "../ui/button";

export const SupportButton = () => {
  const t = useTranslations();
  const [buttonText, setButtonText] = useState(
    t("dashboard.supportButton.text"),
  );

  const handleClick = () => {
    setButtonText(t("dashboard.supportButton.thanks"));

    const scalar = 2;
    const supportSymbolShape = confetti.shapeFromText({ text: "🫰", scalar });

    const defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.96,
      startVelocity: 20,
      shapes: [supportSymbolShape],
      scalar,
      angle: Math.random() * 360,
      origin: {
        x: 0.06,
        y: 0.97,
      },
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 30,
      });

      confetti({
        ...defaults,
        particleCount: 5,
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
    setTimeout(() => {
      window.open(env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK, "_blank");
    }, 800);

    setTimeout(() => {
      setButtonText(t("dashboard.supportButton.text"));
    }, 800);
  };

  return (
    <div className="fixed bottom-4 left-4 z-[101] group">
      <p className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out absolute bottom-full mb-1 whitespace-nowrap">
        {t("dashboard.supportButton.tooltip")}
      </p>
      <Button
        variant={"pinkOnHover"}
        className="flex items-center justify-start transition-transform duration-300 ease-out"
        onClick={handleClick}
        aria-label={t("dashboard.supportButton.label")}
      >
        <Heart className="min-w-4 h-4" />
        <span className="">{buttonText}</span>
      </Button>
    </div>
  );
};
