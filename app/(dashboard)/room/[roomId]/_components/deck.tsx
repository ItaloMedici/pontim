import { useBoard } from "@/context/board";
import { PlayerCard } from "./player-card";

export const Deck = () => {
  const { others, self } = useBoard();

  const players = [self, ...others];

  if (!others.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Sozinho por aqui... 😴</p>
        {/* adicionar botão de convidar */}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {players.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </div>
  );
};
