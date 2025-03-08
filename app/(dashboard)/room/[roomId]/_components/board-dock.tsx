import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useBoard } from "@/context/board";
import { UNLIMITED_PLAN_VALUE } from "@/lib/consts";
import { cn } from "@/lib/utils";
import { fibonacciAverageOptions } from "@/use-cases/board/choice-options";
import { ArrowRight, Eye, Loader, Plus, Users } from "lucide-react";
import { useMemo } from "react";

export const BoardDock = () => {
  const {
    reveal,
    average,
    totalChoices,
    totalPlayers,
    availableRounds,
    closestStoryPoint,
    handlePlay,
    loadingPlay,
    agreementPercentage,
  } = useBoard();

  const averageEmoji = useMemo(() => {
    if (!reveal || !average) return "🃏";

    if (average <= fibonacciAverageOptions.small) return "☕";
    if (average <= fibonacciAverageOptions.medium) return "👍";
    if (average <= fibonacciAverageOptions.large) return "🤔";

    return "💀";
  }, [average, reveal]);

  const formatAverage = (value: number | null | undefined) => {
    if (value === null || value === undefined) return "-";
    return Number(value).toFixed(1).replace(/\.0$/, "");
  };

  const votingProcess = useMemo(() => {
    return `${totalChoices}/${totalPlayers} votos`;
  }, [totalChoices, totalPlayers]);

  const playAction = useMemo(() => {
    if (loadingPlay)
      return (
        <>
          <Loader className="h-4 w-4 animate-spin" />
          <span>Carregando...</span>
        </>
      );

    if (reveal)
      return (
        <>
          <Plus className="h-4 w-4" />
          <span>Nova Rodada</span>
        </>
      );

    return (
      <>
        <Eye className="h-4 w-4" />
        <span>Revelar</span>
      </>
    );
  }, [reveal, loadingPlay]);

  return (
    <TooltipProvider>
      <Card className="flex flex-col items-stretch gap-2 p-2 shadow-lg transition-all duration-200 hover:shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={handlePlay} disabled={loadingPlay}>
              {playAction}
            </Button>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="ml-6 flex items-center gap-4 rounded-md">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{averageEmoji}</span>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground opacity-95">
                      Média
                    </span>
                    <span className="text-xs">
                      {average === 0 || !reveal ? (
                        "-"
                      ) : (
                        <div className="flex items-center gap-1">
                          <span>{formatAverage(average)}</span>
                          <ArrowRight className="h-3 w-3 opacity-70" />
                          <span>{closestStoryPoint}</span>
                        </div>
                      )}
                    </span>
                  </div>
                </div>
                <Separator orientation="vertical" className="h-8" />
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {votingProcess}
                  </span>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex flex-col gap-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Média atual:</span>
                  <span className="font-semibold">
                    {formatAverage(average)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">
                    Pontuação sugerida:
                  </span>
                  <span className="font-semibold">{closestStoryPoint}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Concordância:</span>
                  <span className="font-semibold">{agreementPercentage}%</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">
                    Rodadas restantes:
                  </span>
                  <span
                    className={cn("font-semibold", {
                      "text-red-500": availableRounds === 0,
                      "text-orange-500": availableRounds <= 1,
                      "text-green-500":
                        availableRounds === UNLIMITED_PLAN_VALUE,
                    })}
                  >
                    {availableRounds === UNLIMITED_PLAN_VALUE
                      ? "Ilimitadas"
                      : availableRounds}
                  </span>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </Card>
    </TooltipProvider>
  );
};
