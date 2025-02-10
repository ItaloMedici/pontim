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
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const OrderSuccessDialog = () => {
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
          <DialogTitle>Oba! 🤩</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Parabéns! Seu plano está ativo e pronto para ser utilizado. Aproveite
          todas as funcionalidades exclusivas e leve sua experiência ao próximo
          nível! 🎉
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>
            Começar a aproveitar
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
