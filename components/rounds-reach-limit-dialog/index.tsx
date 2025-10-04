"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type RoundsReachLimitDialogProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
};

export const RoundsReachLimitDialog = ({
  onOpenChange,
  open,
}: RoundsReachLimitDialogProps) => {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Limite de rodadas atingido 😢</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Oops! Você atingiu o limite de rodadas desta sala. Não deixe a
          diversão parar! Entre em contato com o dono da sala e descubra nossos
          planos incríveis para continuar jogando sem interrupções.
        </DialogDescription>
        <DialogFooter>
          <Button variant={"outline"} onClick={() => onOpenChange(false)}>
            Continuar
          </Button>
          <Button onClick={() => router.push("/pricing")}>Ver planos</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
