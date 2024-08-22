import { useBoard } from "@/context/board";
import { convertChoice } from "@/use-cases/player/convert-choice";
import { useMemo } from "react";
import { PlayerCard } from "./player-card";

export const Deck = () => {
  const { others, self, reveal } = useBoard();

  const formatedOthers = useMemo(() => {
    const formated = others.map((player) => ({
      ...player,
      choice:
        reveal && player.choice ? convertChoice(player.choice) : player.choice,
    }));

    if (reveal) {
      formated.sort((a, b) => {
        if (!a.choice || !b.choice) {
          return -1;
        }

        return b.choice.localeCompare(a.choice);
      });
    }
    return formated;
  }, [others, reveal]);

  const players = [self, ...formatedOthers];

  if (!others.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Sozinho por aqui... 😴</p>
        {/* adicionar botão de convidar */}
      </div>
    );
  }

  return (
    <div className="flex flex-row flex-wrap gap-4 md:gap-8 items-center justify-center max-w-md">
      {players.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </div>
  );
};
