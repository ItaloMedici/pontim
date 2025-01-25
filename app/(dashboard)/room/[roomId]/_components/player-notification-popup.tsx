import { useBoard } from "@/context/board";
import { Player } from "@/lib/schemas/player";
import { cn } from "@/lib/utils";
import { notificationIcons } from "@/messages/notification";
import { EnumNotification } from "@/types/notifications";
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { ReactNode, useState } from "react";

export function PlayerNotificationPopup({
  children,
  player,
}: {
  children: ReactNode;
  player: Player;
}) {
  const { handleNotifyPlayer, reveal } = useBoard();
  const [open, setOpen] = useState(false);

  if (reveal) return <>{children}</>;

  const onNotifificationClick = (notification: EnumNotification) => {
    setOpen(false);
    if (player.choice) return;

    handleNotifyPlayer(player.id, notification);
  };

  return (
    <Popover open={open} onOpenChange={(open) => setOpen(open)}>
      <PopoverTrigger
        onClick={() => setOpen((prev) => !prev)}
        disabled={!!player.choice}
      >
        <div
          className={cn(
            "before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:z-10 before:scale-0 before:hover:scale-100 before:transition-transform relative before:rounded-full before:w-8 before:h-8 before:flex before:items-center before:justify-center",
            {
              "before:content-['🔉'] before:bg-gray-50": !player.choice,
              "before:scale-100": open,
            },
          )}
        >
          {children}
        </div>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent side="top" sideOffset={10}>
          <div className="flex items-center rounded-full p-1 bg-white shadow-md gap-4 border border-gray-200">
            {Object.keys(notificationIcons).map((notification) => (
              <div
                key={notification}
                role="presentation"
                onClick={() =>
                  onNotifificationClick(notification as EnumNotification)
                }
                className="p-1 w-10 cursor-pointer aspect-square rounded-full hover:bg-gray-100"
              >
                <span className="text-2xl flex items-center justify-center">
                  {notificationIcons[notification as EnumNotification]}
                </span>
              </div>
            ))}
          </div>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
}
