"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useBoard } from "@/context/board";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { buildPlayerFallbackImage, cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo } from "react";

const MAX_AVATAR_DISPLAY_DESKTOP = 5;
const MAX_AVATAR_DISPLAY_MOBILE = 2;

export const PlayersList = () => {
  const t = useTranslations();
  const { others } = useBoard();
  const isMobile = useIsMobile();

  const avatarList = useMemo(() => {
    if (!others.length) {
      return [];
    }

    let list = others.map((player) => ({
      key: player.id,
      name: buildPlayerFallbackImage(player),
      imagemLabel: t("dashboard.room.playersList.playerImageAlt", {
        nickname: player.nickname,
      }),
      imageUrl: player.imageUrl ?? undefined,
    }));

    const maxAvatarDisplay = isMobile
      ? MAX_AVATAR_DISPLAY_MOBILE
      : MAX_AVATAR_DISPLAY_DESKTOP;

    if (list.length > maxAvatarDisplay) {
      list = list.slice(0, maxAvatarDisplay);

      list.push({
        name: `+${others.length - maxAvatarDisplay + 1}`,
        imageUrl: undefined,
        key: "more",
        imagemLabel: t("dashboard.room.playersList.morePlayersAlt"),
      });
    }

    return list.map((player, index) => {
      return (
        <div
          key={player.key}
          className={cn(
            "rounded-full overflow-hidden w-8 h-8 text-xs border-2 border-border",
            {
              "-ml-2": index > 0,
            },
          )}
        >
          {player.imageUrl ? (
            <Image
              src={player.imageUrl}
              alt={player.imagemLabel}
              width={32}
              height={32}
              layout="fixed"
              key={player.key}
            />
          ) : (
            <span className="flex items-center justify-center h-full w-full bg-gradient-to-tr from-sky-300 to-gray-300 ">
              {player.name}
            </span>
          )}
        </div>
      );
    });
  }, [isMobile, others, t]);

  const tooltipContent = useMemo(() => {
    if (!others.length) {
      return null;
    }

    return (
      <div className="space-y-2 max-w-64">
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {others.map((player) => (
            <div key={player.id} className="flex items-center gap-2">
              <div className="rounded-full overflow-hidden w-6 h-6 text-xs border border-border flex-shrink-0">
                {player.imageUrl ? (
                  <Image
                    src={player.imageUrl}
                    alt={t("dashboard.room.playersList.playerImageAlt", {
                      nickname: player.nickname,
                    })}
                    width={24}
                    height={24}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="flex items-center justify-center h-full w-full bg-gradient-to-tr from-sky-300 to-gray-300 text-[10px] font-medium text-gray-800">
                    {buildPlayerFallbackImage(player)}
                  </span>
                )}
              </div>
              <span className="text-xs truncate">{player.nickname}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }, [others, t]);

  if (!avatarList.length) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <div className="flex items-center cursor-pointer">{avatarList}</div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-64 px-4 py-2">
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
