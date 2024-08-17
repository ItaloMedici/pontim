import { NumericCard } from "@/components/card/numeric-card";
import { useBoard } from "@/context/board";
import { Player } from "@/lib/schemas/player";
import { PlayerNotificationPopup } from "./player-notification-popup";

type PlayerCardProps = {
  player: Player;
};

export const PlayerCard = ({ player }: PlayerCardProps) => {
  const { reveal, self, selfChoice } = useBoard();

  const isSelf = player.id === self.id;

  const formatedChoice =
    reveal && player.choice
      ? Buffer.from(player.choice, "base64").toString()
      : "";

  return (
    <>
      {isSelf ? (
        <NumericCard
          value={selfChoice}
          color={selfChoice ? "primary" : "gray"}
          size={"large"}
          label={"Você"}
        />
      ) : (
        <PlayerNotificationPopup player={player}>
          <NumericCard
            value={formatedChoice}
            color={reveal && player.choice ? "primary" : "gray"}
            bgColor={reveal ? "white" : player.choice ? "primary" : "gray"}
            size={"large"}
            label={player.name}
          />
        </PlayerNotificationPopup>
      )}
    </>
  );
};
