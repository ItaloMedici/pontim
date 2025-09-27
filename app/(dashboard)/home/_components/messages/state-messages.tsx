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
import { useTranslations } from "next-intl";
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
  const t = useTranslations("dashboard.shared.state.maxRooms");

  return (
    <DialogBase>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{t("description")}</DialogDescription>
        <DialogFooter>
          <Button variant={"ghost"} onClick={() => router.replace("/home")}>
            {t("cancel")}
          </Button>
          <Button autoFocus onClick={() => router.push("/pricing")}>
            {t("upgrade")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogBase>
  );
};

const BoardIsFull = () => {
  const router = useRouter();
  const t = useTranslations("dashboard.shared.state.roomFull");

  return (
    <DialogBase>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{t("description")}</DialogDescription>
        <DialogFooter>
          <Button variant={"ghost"} onClick={() => router.replace("/home")}>
            {t("cancel")}
          </Button>
          <Button autoFocus onClick={() => router.push("/pricing")}>
            {t("upgrade")}
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
