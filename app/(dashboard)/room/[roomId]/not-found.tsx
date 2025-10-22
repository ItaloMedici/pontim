import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("dashboard.room.roomNotFound.title"),
    description: t("dashboard.room.roomNotFound.description"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <main className="mx-auto w-4/12 flex flex-col mt-20 items-center space-y-6 p-6 rounded-2xl border border-border bg-card">
      <span className="text-4xl w-full text-center">
        {t("dashboard.room.roomNotFound.emoji")}
      </span>
      <h1 className="text-lg font-semibold text-card-foreground">
        {t("dashboard.room.roomNotFound.title")}
      </h1>
      <p className="text-muted-foreground text-center">
        {t("dashboard.room.roomNotFound.description")}
      </p>
      <div className="flex gap-x-4 mt-6">
        <Link href={"/"} className={cn(buttonVariants({ variant: "ghost" }))}>
          {t("dashboard.room.roomNotFound.buttons.back")}
        </Link>
        <Link href={"/"} className={cn(buttonVariants({ variant: "default" }))}>
          {t("dashboard.room.roomNotFound.buttons.createRoom")}
        </Link>
      </div>
    </main>
  );
}
