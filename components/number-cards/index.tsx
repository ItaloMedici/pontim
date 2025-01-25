import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Player } from "@/lib/schemas/player";
import { buildPlayerFallbackImage, cn } from "@/lib/utils";

type NumberCardsProps = {
  value: number | string | undefined | null;
  player: Player;
  reveal?: boolean;
  isSelf?: boolean;
};

const Card = ({
  children,
  isSelf,
}: {
  children: React.ReactNode;
  isSelf?: boolean;
}) => {
  return (
    <div
      className={cn(
        "w-[60px] h-[80px] bg-gray-50 rounded-lg flex flex-col items-center justify-center p-[6px] gap-2 border border-gray-200",
        {
          "outline outline-gray-950 outline-2": isSelf,
        },
      )}
    >
      {children}
    </div>
  );
};

const Front = ({ value, player, isSelf }: NumberCardsProps) => {
  return (
    <Card isSelf={isSelf}>
      <div className="bg-gray-100 flex-1 w-full flex items-center justify-center rounded-md">
        {value}
      </div>
      <div>
        <Avatar className="w-5 h-5">
          <AvatarImage
            src={player.imageUrl as string}
            width={20}
            height={20}
            alt={player.nickname}
          />
          <AvatarFallback className="text-xs">
            {buildPlayerFallbackImage(player)}
          </AvatarFallback>
        </Avatar>
      </div>
    </Card>
  );
};

const Back = ({ player, isSelf, value }: NumberCardsProps) => {
  return (
    <Card isSelf={isSelf}>
      <div
        className={cn("border border-gray-200 overflow-hidden rounded-sm", {
          [`border-[--selected-card-color]`]: !!value,
        })}
      >
        <BackCardPattern
          className={cn("stroke-gray-200", {
            [`stroke-[--selected-card-color]`]: !!value,
          })}
        />
      </div>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-2 border-gray-200 rounded-full">
        <Avatar className="w-7 h-7">
          <AvatarImage
            src={player.imageUrl as string}
            width={28}
            height={28}
            alt={player.nickname}
          />
          <AvatarFallback>{buildPlayerFallbackImage(player)}</AvatarFallback>
        </Avatar>
      </div>
    </Card>
  );
};

export const NumberCard = ({ reveal, ...props }: NumberCardsProps) => {
  if (reveal) {
    return <Front {...props} />;
  }

  return <Back {...props} />;
};

const BackCardPattern = ({ className }: { className: string }) => (
  <svg
    width="45"
    height="67"
    viewBox="0 0 45 67"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <pattern id="plaid" width="10" height="10" patternUnits="userSpaceOnUse">
        <rect width="10" height="10" fill="white" strokeWidth="0.5" />
        <path d="M 0 0 L 10 10 M 10 0 L 0 10" strokeWidth="0.5" />
        <path d="M 5 0 L 5 10 M 0 5 L 10 5" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="45" height="67" fill="url(#plaid)" />
  </svg>
);
