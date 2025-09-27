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
import { ChoiceSelectOptions } from "@/types/choice-options";
import { canAddMoreRoom } from "@/use-cases/plan/can-add-more-room";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { CreateRoomForm } from "./create-room-form";

type CreateRoomDialog = {
  trigger?: ReactNode;
  decks: ChoiceSelectOptions[];
};

export function CreateRoomDialog({ trigger, decks }: CreateRoomDialog) {
  const t = useTranslations();
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
      toast.error(t("dashboard.home.createRoomDialog.error"), {
        icon: "😢",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild disabled={isPending}>
        {trigger ?? (
          <Button size="lg">
            {t("dashboard.home.createRoomDialog.trigger")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-screen-sm">
        <DialogHeader>
          <DialogTitle>
            {t("dashboard.home.createRoomDialog.title")}
          </DialogTitle>
        </DialogHeader>
        <CreateRoomForm decks={decks} />
      </DialogContent>
    </Dialog>
  );
}
