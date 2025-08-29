"use client";

import confetti from "canvas-confetti";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export const SupportButton = () => {
  const [buttonText, setButtonText] = useState("Apoiar");

  const handleClick = () => {
    setButtonText("Obrigado! 🫰");

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
      window.open(
        "https://buy.stripe.com/test_eVq5kFd6F70qf3ydtu7g400",
        "_blank",
      );
    }, 800);

    setTimeout(() => {
      setButtonText("Apoiar");
    }, 800);
  };

  return (
    <div className="fixed bottom-4 left-4 z-[101] group">
      <p className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out absolute bottom-full mb-1 whitespace-nowrap">
        Ajude a alimentar nossos servidores 🫰
      </p>
      <Button
        variant={"pinkOnHover"}
        className="flex items-center justify-start transition-transform duration-300 ease-out"
        onClick={handleClick}
      >
        <Heart className="min-w-4 h-4" />
        <span className="">{buttonText}</span>
      </Button>
    </div>
  );
};
