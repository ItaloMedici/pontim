"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAction } from "@/hooks/use-action";
import { Heart } from "lucide-react";
import { toast } from "../toast";
import { createAdFreeSession } from "./action";

export const AdBlockerFallback = () => {
  const { isPending, mutation } = useAction(createAdFreeSession);

  const onSupport = () => {
    mutation({}).then((data) => {
      if ("error" in data) {
        toast.error(data.error);
        return;
      }

      window.open(data.sessionUrl, "_blank");
    });
  };

  const onDisableAdBlock = () => {
    const instructions = instructionsMap[getBrowser()];

    alert(
      `Como desativar o AdBlock para este site:\n\n${instructions}\n\nIsto nos ajuda a manter o Pontim gratuito para todos! 🙏`,
    );
  };

  return (
    <Card className="p-3 w-full h-full max-w-none flex flex-col mx-auto shadow-sm">
      <CardContent className="text-center space-y-3 p-0 flex flex-col justify-between h-full">
        <div className="flex items-center justify-center gap-1 mb-2">
          <span className="text-2xl">🫰</span>
        </div>

        <div className="flex-1 flex flex-col justify-center gap-4">
          <div className="space-y-1 mb-3">
            <h3 className="font-semibold text-adblock-text-primary text-base">
              AdBlock Ativo
            </h3>
            <p className="text-xs text-adblock-text-secondary leading-tight px-1">
              Ajude-nos a manter este conteúdo gratuito!
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              onClick={onSupport}
              size="sm"
              variant={"outline"}
              disabled={isPending}
              className="transition-colors duration-200 ease-in-out text-xs px-2 h-8 hover:bg-pink-600 hover:border-pink-800 border-b-2 hover:text-white"
            >
              <Heart className="mr-1 w-3 h-3" />
              Nos apoie
            </Button>

            <button
              onClick={onDisableAdBlock}
              className="text-xs text-adblock-text-secondary hover:text-adblock-accent transition-colors underline decoration-dotted underline-offset-2 px-1"
            >
              Desativar AdBlock
            </button>
          </div>
        </div>

        <p className="text-[10px] text-gray-600 mt-2 px-1 leading-tight">
          ✨ Obrigado!
        </p>
      </CardContent>
    </Card>
  );
};

const instructionsMap: Record<
  "chrome" | "firefox" | "safari" | "edge" | "other",
  string
> = {
  chrome: `Para Chrome:
1. Clique no ícone do AdBlock/uBlock na barra de ferramentas
2. Selecione "Desativar neste site" ou "Pausar em pontim.com"
3. Recarregue a página (F5)`,
  firefox: `Para Firefox:
1. Clique no ícone do AdBlock/uBlock na barra de ferramentas
2. Selecione "Desativar nesta página" ou "Desativar no domínio pontim.com"
3. Recarregue a página (F5)`,
  safari: `Para Safari:
1. Vá em Safari > Preferências > Extensões
2. Desmarque as extensões de bloqueio de anúncios
3. Recarregue a página (⌘+R)`,
  edge: `Para Edge:
1. Clique no ícone do AdBlock na barra de ferramentas
2. Selecione "Desativar neste site"
3. Recarregue a página (F5)`,
  other: `Para outros navegadores:
1. Consulte a extensão que você está usando e desative-a
2. Recarregue a página (F5)`,
};

const getBrowser = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isChrome = userAgent.includes("chrome") && !userAgent.includes("edge");

  if (isChrome) {
    return "chrome";
  }

  const isFirefox = userAgent.includes("firefox");

  if (isFirefox) {
    return "firefox";
  }

  const isSafari =
    userAgent.includes("safari") && !userAgent.includes("chrome");

  if (isSafari) {
    return "safari";
  }

  const isEdge = userAgent.includes("edge");
  if (isEdge) {
    return "edge";
  }

  return "other";
};
