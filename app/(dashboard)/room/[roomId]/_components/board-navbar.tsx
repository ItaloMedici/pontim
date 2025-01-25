"use client";

import { toast } from "@/components/toast";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserButton } from "@/components/user-button";
import { useBoard } from "@/context/board";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { cn } from "@/lib/utils";
import { buildInviteUrl } from "@/use-cases/invite/build-invite-url";
import { CheckIcon, ChevronLeft, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PlayersList } from "./players-list";

export const BoardNavbar = () => {
  const params = useParams<{ roomId: string }>();
  const [copiedInvite, setCopiedInvite] = useState(false);
  const isMobile = useIsMobile();
  const { handleLeave } = useBoard();

  useEffect(() => {
    if (!copiedInvite) return;

    setTimeout(() => {
      setCopiedInvite(false);
    }, 3000);
  }, [copiedInvite]);

  const handleInvite = () => {
    const roomId = params?.roomId;
    if (!roomId) return;

    navigator.clipboard.writeText(
      buildInviteUrl(roomId, window.location.origin),
    );

    setCopiedInvite(true);

    toast("Link de convite copiado para a área de transferência", {
      icon: "📋",
    });
  };

  const Icon = copiedInvite ? CheckIcon : PlusIcon;

  return (
    <nav className="fixed top-0 right-0 left-0 mx-auto">
      <div className="flex items-center justify-end p-4 gap-6 mx-auto">
        <Link
          className={cn(buttonVariants({ variant: "ghost" }), "mr-auto")}
          href={"/"}
          onClick={handleLeave}
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar
        </Link>

        <PlayersList />

        <Button
          onClick={handleInvite}
          disabled={copiedInvite}
          variant={"outline"}
          size={isMobile ? "icon" : "default"}
        >
          <Icon className="w-4 h-4" />
          {isMobile ? null : "Convidar jogadores"}
        </Button>
        <UserButton />
      </div>
    </nav>
  );
};
