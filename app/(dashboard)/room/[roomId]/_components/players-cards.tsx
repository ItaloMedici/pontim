import { Button } from "@/components/ui/button";
import { useBoard } from "@/context/board";
import { PlayerCard } from "./player-card";

export const PlayersCards = () => {
  const { others, self, handleRevealCards, revealCards } = useBoard();

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
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-center flex-wrap gap-4">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
      <Button onClick={handleRevealCards}>
        {revealCards ? "Iniciar outro jogo" : "Revelar cartas 👀"}
      </Button>
    </div>
  );
};
