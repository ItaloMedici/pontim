import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

const RoomIsFullPage = async ({ params }: { params: { roomId: string } }) => {
  const t = await getTranslations();

  return (
    <main className="mx-auto w-4/12 flex flex-col mt-20 items-center space-y-6 p-6 rounded-2xl border border-gray-200">
      <span className="text-4xl w-full text-center">
        {t("dashboard.room.roomFull.emoji")}
      </span>
      <h1 className="text-lg font-semibold">
        {t("dashboard.room.roomFull.title")}
      </h1>
      <p className="text-gray-700 text-center">
        {t("dashboard.room.roomFull.description")}
      </p>
      <div className="flex gap-x-4 mt-6">
        <Link href={"/"} className={cn(buttonVariants({ variant: "ghost" }))}>
          {t("dashboard.room.roomFull.buttons.back")}
        </Link>
        <Link
          href={`/room/${params.roomId}`}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          {t("dashboard.room.roomFull.buttons.tryAgain")}
        </Link>
        <Link
          href={"/pricing"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          {t("dashboard.room.roomFull.buttons.viewPlans")}
        </Link>
      </div>
    </main>
  );
};

export default RoomIsFullPage;
