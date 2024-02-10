"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Room } from "@/lib/schemas/room";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";

export function RoomCard({ room }: { room: Room }) {
  const { userId } = useAuth();
  const ownerLabel = room.onwerId === userId ? "Você" : room.onwerId;
  const lastUpdated = formatDistanceToNow(room._creationTime, {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <div className="group relative flex flex-col bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow w-[150px]">
      <Image
        src={room.imageUrl}
        alt={room.name}
        width={150}
        height={100}
        className="h-[100px] w-full object-cover"
      />
      <span className="px-4 py-2 space-y-1 h-full">
        <h2 className="truncate">{room.name}</h2>
        <p className="text-xs truncate text-gray-500 opacity-0 group-hover:opacity-100">
          {ownerLabel}, {lastUpdated}
        </p>
      </span>
    </div>
  );
}

RoomCard.Skeleton = function RoomCardSkeleton() {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden w-[150px] h-[160px]">
      <Skeleton className="w-full h-full" />
    </div>
  );
};
