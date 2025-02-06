import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SearchParams } from "@/lib/consts";
import { ValidationState } from "@/messages/state";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useState } from "react";

const DialogBase = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const onOpenChange = (change: boolean) => {
    if (!change) {
      router.replace("/home");
    }
    setOpen(change);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog>
  );
};

const UserReachMaxRooms = () => {
  const router = useRouter();

  return (
    <DialogBase>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Calma lá parceiro 🤠✋</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Você atingiu o limite de salas permitidas no seu plano. Para criar
          mais salas, atualize seu plano.
        </DialogDescription>
        <DialogFooter>
          <Button variant={"ghost"} onClick={() => router.replace("/home")}>
            Cancelar
          </Button>
          <Button autoFocus onClick={() => router.push("/pricing")}>
            Atualizar plano
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogBase>
  );
};

const BoardIsFull = () => {
  const router = useRouter();

  return (
    <DialogBase>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sala cheia parceiro 🤠✋</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Esta sala atingiu o limite máximo de participantes. Caso seja o
          proprietário da sala, você pode aumentar o limite de participantes
          atualizando seu plano. Alternativamente, entre em contato com o
          proprietário da sala para solicitar o aumento do limite de
          participantes.
        </DialogDescription>
        <DialogFooter>
          <Button variant={"ghost"} onClick={() => router.replace("/home")}>
            Cancelar
          </Button>
          <Button autoFocus onClick={() => router.push("/pricing")}>
            Atualizar plano
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogBase>
  );
};

const states: Record<ValidationState, ReactNode> = {
  [ValidationState.USER_REACH_MAX_ROOMS]: <UserReachMaxRooms />,
  [ValidationState.BOARD_IS_FULL]: <BoardIsFull />,
};

export const StateMessages = () => {
  const sarchParams = useSearchParams();
  const state = sarchParams.get(SearchParams.STATE);

  if (!state) return null;

  return states[state];
};
