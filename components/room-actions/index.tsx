"use client";

import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAction } from "@/hooks/use-action";
import { buildInviteUrl } from "@/use-cases/invite/build-invite-url";
import { deleteRoom, leaveRoom } from "@/use-cases/room";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { Link2, LogOut, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { toast } from "../toast";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  name: string;
  roomOwnerEmail: string;
}

export const RoomActions = ({
  children,
  side,
  sideOffset,
  id,
  roomOwnerEmail,
}: ActionsProps) => {
  const t = useTranslations();
  const { data } = useSession();
  const roomOwner = roomOwnerEmail === data?.user?.email;
  const { isPending, mutation } = useAction(deleteRoom);
  const { isPending: isLeavePending, mutation: leaveMutation } =
    useAction(leaveRoom);

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(buildInviteUrl(id, window.location.origin))
      .then(() =>
        toast.success(t("dashboard.room.roomActions.copySuccess"), {
          icon: "📋",
        }),
      )
      .catch(() => toast.error(t("dashboard.room.roomActions.copyError")));
  };

  const onDelete = () => {
    if (!data?.user) return;

    mutation({ roomId: id, user: data?.user })
      .then(() =>
        toast.success(t("dashboard.room.roomActions.deleteSuccess"), {
          icon: "🗑️",
        }),
      )
      .catch(() => toast.error(t("dashboard.room.roomActions.deleteError")));
  };

  const onLeaveRoomClick = () => {
    if (!data?.user) return;

    leaveMutation({ roomId: id, user: data?.user })
      .then(() =>
        toast.success(t("dashboard.room.roomActions.leaveSuccess"), {
          icon: "👋",
        }),
      )
      .catch((error) => toast.error(error));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60"
      >
        <DropdownMenuItem onClick={onCopyLink} className="cursor-pointer">
          <Link2 className="h-4 w-4 mr-2" />
          {t("dashboard.room.roomActions.copyInvite")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {roomOwner ? (
          <ConfirmDialog
            header={t("dashboard.room.roomActions.confirmDelete.header")}
            description={t(
              "dashboard.room.roomActions.confirmDelete.description",
            )}
            onConfirm={onDelete}
          >
            <Button
              variant={"ghost"}
              disabled={isPending}
              className="w-full justify-start cursor-pointer text-sm font-normal"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {t("dashboard.room.roomActions.deleteRoom")}
            </Button>
          </ConfirmDialog>
        ) : (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={onLeaveRoomClick}
            disabled={isLeavePending}
          >
            <div className="flex-1 hover:text-red-700 flex items-center">
              <LogOut className="h-4 w-4 mr-2" />
              <span>{t("dashboard.room.roomActions.leaveRoom")}</span>
            </div>
          </DropdownMenuItem>
        )}
        {/* <DropdownMenuItem
          onClick={() => onOpen(id, title)}
          className="p-3 cursor-pointer"
        >
          <Pencil className="h-4 w-4 mr-2" />
          Rename
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
