"use client";

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
import { Eye, Loader, Plus, Target, TrendingUp, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export const BoardDock = () => {
  const t = useTranslations();
  const {
    reveal,
    average,
    totalChoices,
    totalPlayers,
    availableRounds,
    majorityChoice,
    handlePlay,
    loadingPlay,
    agreementPercentage,
    agreementEmoji,
  } = useBoard();

  const formatAverage = (value: number | null | undefined) => {
    if (value === null || value === undefined) return "-";
    return Number(value).toFixed(1).replace(/\.0$/, "");
  };

  const playAction = useMemo(() => {
    if (loadingPlay)
      return (
        <>
          <Loader className="h-4 w-4 animate-spin" />
          <span>{t("dashboard.room.dock.loading")}</span>
        </>
      );

    if (reveal)
      return (
        <>
          <Plus className="h-4 w-4" />
          <span>{t("dashboard.room.dock.newRound")}</span>
        </>
      );

    return (
      <>
        <Eye className="h-4 w-4" />
        <span>{t("dashboard.room.dock.reveal")}</span>
      </>
    );
  }, [reveal, loadingPlay, t]);

  const statsDisplay = () => {
    if (!reveal) return null;

    const avarageDisplay = (
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground opacity-95">
          {t("dashboard.room.dock.stats.average")}
        </span>
        <span className="text-xs">
          {average === 0 ? (
            "-"
          ) : (
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 opacity-70" />
              <span>{formatAverage(average)}</span>
            </div>
          )}
        </span>
      </div>
    );

    const mostVoted = majorityChoice ? (
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground opacity-95">
          {t("dashboard.room.dock.stats.mostVoted")}
        </span>
        <span className="text-xs">
          <div className="flex items-center gap-1">
            <Target className="h-3 w-3 opacity-70" />
            <span>{majorityChoice}</span>
          </div>
        </span>
      </div>
    ) : null;

    if (typeof average !== "number" || isNaN(average)) {
      return mostVoted;
    }

    return (
      <>
        {avarageDisplay}
        {mostVoted}
      </>
    );
  };

  return (
    <TooltipProvider>
      <Card className="flex flex-col items-stretch gap-2 p-2 pr-4 shadow-lg transition-all duration-200 hover:shadow-md">
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
                  <span className="text-3xl">
                    {loadingPlay ? "⏳" : agreementEmoji}
                  </span>
                  {statsDisplay()}
                </div>
                <Separator orientation="vertical" className="h-8" />
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {t("dashboard.room.dock.stats.votes", {
                      totalChoices,
                      totalPlayers,
                    })}
                  </span>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex flex-col gap-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">
                    {t("dashboard.room.dock.stats.currentAverage")}
                  </span>
                  <span className="font-semibold">
                    {formatAverage(average)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">
                    {t("dashboard.room.dock.stats.mostVoted")}:
                  </span>
                  <span className="font-semibold">{majorityChoice ?? "-"}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">
                    {t("dashboard.room.dock.stats.concordance")}
                  </span>
                  <span className="font-semibold">{agreementPercentage}%</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">
                    {t("dashboard.room.dock.stats.agreementThermometer")}
                  </span>
                  <span className="text-xl">{agreementEmoji}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">
                    {t("dashboard.room.dock.stats.remainingRounds")}
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
                      ? t("dashboard.room.dock.stats.unlimited")
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
