"use client";

import { useIsMobile } from "@/hooks/use-is-mobile";
import { cn } from "@/lib/utils";
import { FlagIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export const ReportButton = () => {
  const t = useTranslations();
  const isMobile = useIsMobile();

  return (
    <Link
      href="/report"
      target="_blank"
      className={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        "fixed bottom-4 right-4 z-10 flex items-center justify-start group overflow-hidden max-w-[39px] hover:max-w-[200px] transition-all duration-500",
        {
          hidden: isMobile,
        },
      )}
      aria-label={t("dashboard.reportButton.label")}
    >
      <FlagIcon className="min-w-4 h-4" />
      <span className="">{t("dashboard.reportButton.text")}</span>
    </Link>
  );
};
