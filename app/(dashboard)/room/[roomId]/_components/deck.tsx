import { useBoard } from "@/context/board";
import { PlayerCard } from "./player-card";

export const Deck = () => {
  const { others, self } = useBoard();

  const players = [self, ...others];

  return (
    <div className="flex flex-row flex-wrap gap-4 items-center justify-center max-w-lg">
      {players.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </div>
  );
};
