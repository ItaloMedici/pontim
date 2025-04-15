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
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="mx-auto w-4/12 flex flex-col items-center space-y-4 p-6 rounded-lg border border-gray-200">
        <span className="text-4xl w-full text-center">🙁</span>
        <h2 className="text-lg font-semibold">Eita não! Algo deu errado.</h2>
        <Button
          className="w-full"
          variant={"secondary"}
          onClick={() => reset()}
        >
          Tente novamente
        </Button>
        <Link
          href={"/report"}
          className={cn(buttonVariants({ variant: "link" }))}
        >
          Reportar erro
        </Link>
      </div>
    </main>
  );
}
