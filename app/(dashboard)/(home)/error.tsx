"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto w-6/12 flex flex-col items-center space-y-4 p-6 rounded-lg border border-gray-200">
      <span className="text-4xl w-full text-center">🙁</span>
      <h2 className="text-lg font-semibold">Eita não! Algo deu errado.</h2>
      <Button className="w-full" variant={"secondary"} onClick={() => reset()}>
        Tente novamente
      </Button>
      <Link href={"/"} className={cn(buttonVariants({ variant: "link" }))}>
        Voltar
      </Link>
    </div>
  );
}
