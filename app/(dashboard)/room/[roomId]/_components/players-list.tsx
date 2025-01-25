import { useBoard } from "@/context/board";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { buildPlayerFallbackImage, cn } from "@/lib/utils";
import Image from "next/image";
import { useMemo } from "react";

const MAX_AVATAR_DISPLAY_DESKTOP = 5;
const MAX_AVATAR_DISPLAY_MOBILE = 2;

export const PlayersList = () => {
  const { others, self } = useBoard();
  const isMobile = useIsMobile();

  const avatarList = useMemo(() => {
    if (!others.length) {
      return [];
    }

    let list = others.map((player) => ({
      key: player.id,
      name: buildPlayerFallbackImage(player),
      imagemLabel: `Imagem de perfil do jogador ${player.nickname}`,
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
        imagemLabel: "Mais jogadores",
      });
    }

    return list.map((player, index) => {
      return (
        <div
          key={player.key}
          className={cn(
            "rounded-full overflow-hidden w-8 h-8 text-xs border-2 border-gray-100",
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
  }, [isMobile, others]);

  if (!avatarList.length) {
    return null;
  }

  return <div className="flex items-center">{avatarList}</div>;
};
