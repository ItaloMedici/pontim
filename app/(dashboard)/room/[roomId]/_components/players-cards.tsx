import { Button } from "@/components/ui/button";
import { useBoard } from "@/context/board";
import { PlayerCard } from "./player-card";

export const PlayersCards = () => {
  const { others, self, handleRevealCards, revealCards, handleReset } =
    useBoard();

  const players = [self, ...others];

  if (!others.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Sozinho por aqui... 😴</p>
        {/* adicionar botão de convidar */}
      </div>
    );
  }

  const onRevealClick = () => {
    if (revealCards) {
      handleReset();
    }
    handleRevealCards();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-center flex-wrap gap-4">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
      {/* <div className="flex items-center gap-2"> */}
      <Button onClick={onRevealClick}>
        {revealCards ? "Iniciar outro jogo" : "Revelar cartas 👀"}
      </Button>

      {/* </div> */}
      <Button variant={"ghost"} onClick={handleReset}>
        Limpar
      </Button>
    </div>
  );
};
