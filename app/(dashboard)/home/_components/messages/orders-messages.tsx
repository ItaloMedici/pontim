"use client";

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
import confetti from "canvas-confetti";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const OrderSuccessDialog = () => {
  const t = useTranslations();
  const [open, setOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    triggerConffeti();
  }, []);

  const triggerConffeti = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  const onOpenChange = (change: boolean) => {
    if (!change) {
      router.replace("/home");
    }
    setOpen(change);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("dashboard.home.orderMessages.success.title")}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {t("dashboard.home.orderMessages.success.description")}
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>
            {t("dashboard.home.orderMessages.success.button")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const OrderMessages = () => {
  const searchParams = useSearchParams();
  const order = searchParams.get(SearchParams.ORDER);

  if (!order) return null;

  return orders[order];
};

const orders = {
  success: <OrderSuccessDialog />,
};
