"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto w-6/12 flex flex-col items-center space-y-4 p-6 rounded-lg border border-border bg-card">
      <span className="text-4xl w-full text-center">🙁</span>
      <h2 className="text-lg font-semibold text-card-foreground">
        {t("components.homeError.title")}
      </h2>
      <Button className="w-full" variant={"secondary"} onClick={() => reset()}>
        {t("components.homeError.tryAgain")}
      </Button>
      <Link href={"/"} className={cn(buttonVariants({ variant: "link" }))}>
        {t("components.homeError.goBack")}
      </Link>
      <Link
        href={"/report"}
        className={cn(buttonVariants({ variant: "link" }))}
      >
        {t("components.homeError.reportError")}
      </Link>
    </div>
  );
}
