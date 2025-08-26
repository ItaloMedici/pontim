"use client";

import BlurFade from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Glow } from "@/components/ui/glow";
import confetti from "canvas-confetti";
import { CheckCircle2, Home, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function CloseWindowPage() {
  const searchParams = useSearchParams();
  const isSuccess = useRef(searchParams.get("success") === "true");

  useEffect(() => {
    if (isSuccess.current) {
      triggerConfetti();
    }
  }, []);

  const triggerConfetti = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  const handleCloseWindow = () => {
    window.close();
  };

  const handleGoHome = () => {
    window.location.href = "/home";
  };

  if (isSuccess.current) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Glow Effects for Success */}
        <div className="absolute top-0 left-0 w-full h-full">
          <Glow variant="top" className="!-top-20 !h-[400px]" />
          <Glow variant="bottom" className="!-bottom-20 !h-[400px]" />
        </div>

        <BlurFade delay={0.4} yOffset={8} inView>
          <Card className="relative z-10 max-w-2xl w-full p-8 md:p-12 text-center shadow-2xl border-2 backdrop-blur-sm bg-card/95">
            <div className="space-y-6">
              {/* Success Icon with Animation */}
              <BlurFade delay={0.6} inView>
                <div className="relative mx-auto w-24 h-24 mb-6">
                  <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping"></div>
                  <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-green-500/10 border-2 border-green-500/30">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                </div>
              </BlurFade>

              {/* Success Heading */}
              <BlurFade delay={1} inView>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Obrigado! 🎉
                </h1>
              </BlurFade>

              {/* Thankful Message */}
              <BlurFade delay={1.4} inView>
                <p className="text-md text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
                  Agradecemos por confiar no Pontim! Tudo foi processado
                  corretamente e você pode fechar esta janela tranquilamente.
                </p>
              </BlurFade>

              {/* Action Buttons with Confetti */}
              <BlurFade delay={1.8} inView>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={handleCloseWindow}
                    className="font-semibold"
                  >
                    <X className="w-5 h-5 mr-2" />
                    Fechar Janela
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleGoHome}
                    className="font-semibold"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Continuar no Pontim
                  </Button>
                </div>
              </BlurFade>

              {/* Success Footer */}
              <BlurFade delay={2} inView>
                <p className="text-sm text-muted-foreground mt-8 opacity-75">
                  Você faz a diferença! Muito obrigado! 💚
                </p>
              </BlurFade>
            </div>
          </Card>
        </BlurFade>
      </div>
    );
  }

  // Default state (non-success)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/50 flex items-center justify-center p-4 relative overflow-hidden">
      <BlurFade delay={0.4} yOffset={8} inView>
        <Card className="relative z-10 max-w-2xl w-full p-8 md:p-12 text-center shadow-md border-2 backdrop-blur-sm bg-card/95">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-4xl font-bold text-foreground mb-4">
              Tudo em ordem! 👍
            </h1>

            <p className="text-md text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
              Esta janela pode ser fechada sem problemas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleCloseWindow}
                className="font-semibold"
              >
                <X className="w-5 h-5 mr-2" />
                Fechar Janela
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleGoHome}
                className="font-semibold"
              >
                <Home className="w-5 h-5 mr-2" />
                Ir para o Pontim
              </Button>
            </div>
          </div>
        </Card>
      </BlurFade>
    </div>
  );
}
