"use client";

import { Button } from "@/components/ui/button";
import { buildInviteUrl } from "@/use-cases/invite/build-invite-url";
import { CheckIcon, PlusIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
      buildInviteUrl(roomId, window.location.origin)
    );

    setCopiedInvite(true);

    toast("Link de convite copiado para a área de transferência 🚀");
  };

  const Icon = copiedInvite ? CheckIcon : PlusIcon;

  return (
    <nav className="fixed top-0 w-full max-w-screen-lg">
      <div className="flex items-center justify-between p-4 mx-auto">
        <Button onClick={handleInvite} disabled={copiedInvite}>
          <Icon className="w-4 h-4 mr-2" />
          Convidar jogadores
        </Button>
      </div>
    </nav>
  );
};
