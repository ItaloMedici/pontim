import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useBoard } from "@/context/board";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { cn } from "@/lib/utils";

const MAX_AVATAR_DISPLAY_DESKTOP = 5;
const MAX_AVATAR_DISPLAY_MOBILE = 2;

export const BoardDock = () => {
  const { others, self, handleRevealCards, reveal, handleReset } = useBoard();
  const isMobile = useIsMobile();

  if (!others.length) {
    return null;
  }

  const onRevealClick = () => {
    if (reveal) {
      handleReset();
    }
    handleRevealCards();
  };

  const playersAvatar = () => {
    let avatarList = [self, ...others].map((player) => ({
      key: player.id,
      name: player.nickname
        .toUpperCase()
        .split(" ")
        .map((name) => name[0])
        .slice(0, 2)
        .join(""),
      imagemLabel: `Imagem de perfil do jogador ${player.nickname}`,
      imageUrl: player.imageUrl ?? undefined,
    }));

    const maxAvatarDisplay = isMobile
      ? MAX_AVATAR_DISPLAY_MOBILE
      : MAX_AVATAR_DISPLAY_DESKTOP;

    if (avatarList.length > maxAvatarDisplay) {
      avatarList = avatarList.slice(0, maxAvatarDisplay);

      avatarList.push({
        name: `+${others.length - maxAvatarDisplay + 1}`,
        imageUrl: undefined,
        key: "more",
        imagemLabel: "Mais jogadores",
      });
    }

    return (
      <div className="flex items-center gap-[-4px]">
        {avatarList.map((player, index) => (
          <Avatar
            key={player.key}
            className={cn("border-2 border-white", {
              "-ml-2": index > 0,
            })}
          >
            <AvatarImage
              src={player.imageUrl ?? undefined}
              aria-label={player.imagemLabel}
            />
            <AvatarFallback className="text-xs bg-gradient-to-tr from-sky-300 to-gray-300 ">
              {player.name}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
    );
  };

  return (
    <div className=" border border-gray-200 p-2 rounded-xl flex items-center justify-between gap-2">
      <Button onClick={onRevealClick} size={"sm"}>
        {reveal ? "Iniciar outro jogo" : "Revelar cartas 👀"}
      </Button>

      <Button variant={"ghost"} onClick={handleReset} size={"sm"}>
        Limpar
      </Button>

      <hr className="w-[1px] border-l border-gray-200 h-full" />

      {playersAvatar()}
    </div>
  );
};
