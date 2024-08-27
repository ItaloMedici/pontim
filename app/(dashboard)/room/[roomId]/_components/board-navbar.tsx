"use client";

import { toast } from "@/components/toast";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserButton } from "@/components/user-button";
import { cn } from "@/lib/utils";
import { buildInviteUrl } from "@/use-cases/invite/build-invite-url";
import { CheckIcon, ChevronLeft, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const BoardNavbar = () => {
  const params = useParams<{ roomId: string }>();
  const [copiedInvite, setCopiedInvite] = useState(false);

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
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Voltar
        </Link>

        <Button
          onClick={handleInvite}
          disabled={copiedInvite}
          variant={"outline"}
        >
          <Icon className="w-4 h-4 mr-2" />
          Convidar jogadores
        </Button>
        <UserButton />
      </div>
    </nav>
  );
};
