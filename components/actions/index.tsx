"use client";

import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useAuth } from "@clerk/nextjs";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { Link2, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  name: string;
  roomOwnerId: string;
}

export const Actions = ({
  children,
  side,
  sideOffset,
  id,
  name,
  roomOwnerId,
}: ActionsProps) => {
  const { userId } = useAuth();
  const { isPending, mutation } = useApiMutation(api.room.remove);
  const roomOwner = roomOwnerId === userId;

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/room/${id}`)
      .then(() => toast.success("Copiado!", { icon: "📋" }))
      .catch(() => toast.error("Ops, algo deu errado", { icon: "🚨" }));
  };

  const onDelete = () => {
    mutation({ roomId: id as Id<"rooms"> })
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
