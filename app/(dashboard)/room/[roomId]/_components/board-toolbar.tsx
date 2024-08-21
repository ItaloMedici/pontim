import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useBoard } from "@/context/board";
import { cn } from "@/lib/utils";

const MAX_AVATAR_DISPLAY = 5;

export const BoardToolbar = () => {
  const { others, self, handleRevealCards, reveal, handleReset } = useBoard();

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
      name: player.name
        .split(" ")
        .map((name) => name[0])
        .slice(0, 2)
        .join(""),
      imageUrl: player.imageUrl ?? undefined,
    }));

    if (avatarList.length > MAX_AVATAR_DISPLAY) {
      avatarList = avatarList.slice(0, MAX_AVATAR_DISPLAY);
      avatarList.push({
        name: `+${others.length - MAX_AVATAR_DISPLAY}`,
        imageUrl: undefined,
      });
    }

    return (
      <div className="flex items-center gap-[-4px]">
        {avatarList.map((player, index) => (
          <Avatar
            key={player.name}
            className={cn("border-2 border-white", {
              "-ml-2": index > 0,
            })}
          >
            <AvatarImage src={player.imageUrl ?? undefined} />
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
