import { NumericCard } from "@/components/card/numeric-card";
import { useBoard } from "@/context/board";
import { Player } from "@/lib/schemas/player";
import { cn } from "@/lib/utils";

type PlayerCardProps = {
  player: Player;
};

export const PlayerCard = ({ player }: PlayerCardProps) => {
  const { revealCards, self } = useBoard();

  const isSelf = player.id === self.id;

  return (
    <div className="perspective">
      <div
        className={cn("relative w-6 h-8 transition-transform duration-700", {
          "rotate-y-180": isSelf || revealCards,
        })}
      >
        <div className="absolute inset-0 backface-hidden bg-white border-2 border-gray-200 flex items-center justify-center">
          <NumericCard
            value={player.choice}
            color={isSelf ? "sky-500" : "sky-400"}
          />
        </div>
        <div className="absolute inset-0 backface-hidden bg-white border-2 border-gray-200 flex items-center justify-center rotate-y-180">
          <NumericCard value={null} color={isSelf ? "sky-400" : "gray"} />
        </div>
      </div>
    </div>
  );
};
