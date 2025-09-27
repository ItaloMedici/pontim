"use client";

import { Button } from "@/components/ui/button";
import { SearchParams } from "@/lib/consts";
import { Room } from "@/lib/schemas/room";
import { ChoiceSelectOptions } from "@/types/choice-options";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CreateRoomDialog } from "./create-room-dialog";
import { RoomCard } from "./room-card";

export function RoomListSkeleton() {
  return (
    <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
      <RoomCard.Skeleton />
      <RoomCard.Skeleton />
      <RoomCard.Skeleton />
      <RoomCard.Skeleton />
    </div>
  );
}

export function RoomList({
  rooms,
  decks,
}: {
  rooms: Room[];
  decks: ChoiceSelectOptions[];
}) {
  const t = useTranslations();
  const params = useSearchParams();

  if (rooms === undefined) {
    return <RoomListSkeleton />;
  }

  const isFavorites = params?.get(SearchParams.FAVORITES);
  const isSearching = params?.get(SearchParams.SEARCH);

  if (!rooms?.length && (isFavorites || isSearching)) {
    return (
      <div className="flex items-center justify-center flex-col space-y-2">
        <span className="text-4xl">
          {t("dashboard.home.roomList.empty.noResults.emoji")}
        </span>
        <h1 className="font-semibold text-xl">
          {t("dashboard.home.roomList.empty.noResults.title")}
        </h1>
        <Button asChild variant={"ghost"}>
          <Link href={"/"}>
            {t("dashboard.home.roomList.empty.noResults.button")}
          </Link>
        </Button>
      </div>
    );
  }

  if (!rooms?.length)
    return (
      <div className="flex items-center justify-center flex-col">
        <span className="text-4xl">
          {t("dashboard.home.roomList.empty.welcome.emoji")}
        </span>
        <h1 className="font-semibold text-2xl">
          {t("dashboard.home.roomList.empty.welcome.title")}
        </h1>
        <p className="text-sm text-gray-500 mt-2 mb-4">
          {t("dashboard.home.roomList.empty.welcome.description")}
        </p>
        <CreateRoomDialog decks={decks} />
      </div>
    );

  return (
    <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
      {rooms.map((room) => (
        <Link key={room.id} href={`/room/${room.id}`}>
          <RoomCard room={room} />
        </Link>
      ))}
      <CreateRoomDialog
        decks={decks}
        trigger={
          <button className="flex flex-col gap-2 bg-gray-50 w-[150px] min-h-[140px] border-2 border-dashed rounded-lg overflow-hidden hover:shadow-md transition-shadow items-center justify-center outline-none">
            <Plus className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-muted-foreground text-sm">
              {t("dashboard.home.roomList.createRoom.title")}
            </h2>
          </button>
        }
      />
    </div>
  );
}
