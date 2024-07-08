"use client";

import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAction } from "@/hooks/use-action";
import { deleteRoom } from "@/use-cases/room";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { Link2, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  name: string;
  roomOwnerEmail: string;
}

export const Actions = ({
  children,
  side,
  sideOffset,
  id,
  name,
  roomOwnerEmail,
}: ActionsProps) => {
  const { data } = useSession();
  const roomOwner = roomOwnerEmail === data?.user?.email;
  const { isPending, mutation } = useAction(deleteRoom);

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/room/${id}`)
      .then(() => toast.success("Copiado!", { icon: "📋" }))
      .catch(() => toast.error("Ops, algo deu errado", { icon: "🚨" }));
  };

  const onDelete = () => {
    if (!data?.user) return;

    mutation({ roomId: id, user: data?.user })
      .then(() => toast.success("Sala deletada!", { icon: "🗑️" }))
      .catch(() => toast.error("Ops, algo deu errado", { icon: "🚨" }));
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
        <DropdownMenuItem onClick={onCopyLink} className="p-3 cursor-pointer">
          <Link2 className="h-4 w-4 mr-2" />
          Copiar link da sala
        </DropdownMenuItem>
        {roomOwner && (
          <ConfirmDialog
            header="Tem certeza? 🤔"
            description="Ao confirmar você ira deletar a sala para todos os participantes!"
            onConfirm={onDelete}
          >
            <Button
              variant={"ghost"}
              disabled={isPending}
              className="p-3 cursor-pointer"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Deletar sala
            </Button>
          </ConfirmDialog>
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
