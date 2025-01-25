import { NumberCard } from "@/components/number-cards";
import { useBoard } from "@/context/board";
import { Player } from "@/lib/schemas/player";
import { PlayerNotificationPopup } from "./player-notification-popup";

type PlayerCardProps = {
  player: Player;
};

export const PlayerCard = ({ player }: PlayerCardProps) => {
  const { reveal, self, selfChoice } = useBoard();

  const isSelf = player.id === self.id;

  return (
    <>
      {isSelf ? (
        <NumberCard value={selfChoice} player={self} reveal={true} isSelf />
      ) : (
        <PlayerNotificationPopup player={player}>
          <NumberCard value={player.choice} player={player} reveal={reveal} />
        </PlayerNotificationPopup>
      )}
    </>
  );
};
