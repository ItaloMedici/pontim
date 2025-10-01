"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { CreateInstantRoomForm } from "./form";

type CreateInstantRoomDialogProps = {
  children: React.ReactNode;
};

export const CreateInstantRoomDialog = ({
  children,
}: CreateInstantRoomDialogProps) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const t = useTranslations("components.createInstantRoom.dialog");

  if (session?.user) return null;

  const onOpenChange = (_open: boolean) => {
    setOpen(_open);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-screen-sm">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <CreateInstantRoomForm />
      </DialogContent>
    </Dialog>
  );
};
