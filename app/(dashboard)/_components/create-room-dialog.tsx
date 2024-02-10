"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateRoomForm } from "./create-room-form";

export function CreateRoomDialog({ trigger }: { trigger?: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
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
