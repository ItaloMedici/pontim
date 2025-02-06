"use client";

import { toast } from "@/components/toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAction } from "@/hooks/use-action";
import { SearchParams } from "@/lib/consts";
import { ValidationState } from "@/messages/state";
import { canAddMoreRoom } from "@/use-cases/plan/can-add-more-room";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreateRoomForm } from "./create-room-form";

export function CreateRoomDialog({ trigger }: { trigger?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { mutation, isPending } = useAction(canAddMoreRoom);
  const router = useRouter();

  const onOpenChange = async (_open: boolean) => {
    if (!_open) {
      setOpen(false);
      return;
    }

    try {
      const allowed = await mutation({});

      if (!allowed) {
        router.replace(
          `/home?${SearchParams.STATE}=${ValidationState.USER_REACH_MAX_ROOMS}`,
        );
        return;
      }

      setOpen(true);
    } catch (error) {
      console.error(error);
      toast.error("Algo deu errado ao tentar criar a sala", {
        icon: "😢",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild disabled={isPending}>
        {trigger ?? <Button size="lg">Criar nova sala</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar nova sala</DialogTitle>
        </DialogHeader>
        <CreateRoomForm />
      </DialogContent>
    </Dialog>
  );
}
