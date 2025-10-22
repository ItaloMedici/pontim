import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buildPlayerFallbackImage, cn } from "@/lib/utils";
import { Player } from "@/types/player";
import { LoaderCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { useMemo } from "react";

type NumberCardsProps = {
  value: number | string | undefined | null;
  player: Player;
  reveal?: boolean;
  isSelf?: boolean;
};

const FallbackAvatar = ({ player }: { player: Player }) => {
  return (
    <span className="flex items-center justify-center h-full w-full bg-gradient-to-tr from-sky-300 to-gray-300 text-[10px] font-semibold text-sky-800">
      {buildPlayerFallbackImage(player)}
    </span>
  );
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
        "w-[60px] h-[80px] bg-card rounded-lg flex flex-col items-center justify-center p-[6px] gap-2 border border-border",
        {
          "outline outline-foreground outline-2": isSelf,
        },
      )}
    >
      {children}
    </div>
  );
};

const Front = ({ value, player, isSelf }: NumberCardsProps) => {
  const _value = useMemo(() => {
    if (value === "?")
      return (
        <LoaderCircle className="animate-spin w-4 h-4 text-muted-foreground/60" />
      );
    return value;
  }, [value]);

  return (
    <Card isSelf={isSelf}>
      <div className="bg-muted flex-1 w-full flex items-center justify-center rounded-md text-foreground font-medium">
        {_value}
      </div>
      <div>
        <Avatar className="w-5 h-5">
          <AvatarImage
            src={player.imageUrl as string}
            width={20}
            height={20}
            alt={player.nickname}
          />
          <AvatarFallback>
            <FallbackAvatar player={player} />
          </AvatarFallback>
        </Avatar>
      </div>
    </Card>
  );
};

const Back = ({ player, isSelf, value }: NumberCardsProps) => {
  const { theme } = useTheme();
  return (
    <Card isSelf={isSelf}>
      <div
        className={cn("border border-border overflow-hidden rounded-sm", {
          "border-[rgb(136_71_71)]": !!value,
        })}
      >
        <BackCardPattern
          className={cn("stroke-border", {
            "stroke-[rgb(136_71_71)]": !!value,
          })}
          fillColor={theme === "dark" ? "rgb(28 27 26)" : "white"}
        />
      </div>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-2 border-border rounded-full">
        <Avatar className="w-7 h-7">
          <AvatarImage
            src={player.imageUrl as string}
            width={28}
            height={28}
            alt={player.nickname}
          />
          <AvatarFallback>
            <FallbackAvatar player={player} />
          </AvatarFallback>
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

const BackCardPattern = ({
  className,
  fillColor,
}: {
  className: string;
  fillColor: string;
}) => (
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
        <rect width="10" height="10" fill={fillColor} strokeWidth="0.5" />
        <path d="M 0 0 L 10 10 M 10 0 L 0 10" strokeWidth="0.5" />
        <path d="M 5 0 L 5 10 M 0 5 L 10 5" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="45" height="67" fill="url(#plaid)" />
  </svg>
);
