import { useBoard } from "@/context/board";
import { convertChoice } from "@/use-cases/player/convert-choice";
import { useMemo } from "react";
import { PlayerCard } from "./player-card";

export const Deck = () => {
  const { others, self, reveal } = useBoard();


  const formatedOthers = useMemo(() => {
    return others.map((player) => ({
      ...player,
      choice:
        reveal && player.choice ? convertChoice(player.choice) : player.choice,
    }));
  }, [others, reveal]);

  const players = [self, ...formatedOthers];

  return (
    <div className="flex flex-row flex-wrap gap-4 md:gap-8 items-center justify-center max-w-md">
      {players.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </div>
  );
};
