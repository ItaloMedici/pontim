"use client";

import { Actions } from "@/components/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { Room } from "@/lib/schemas/room";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MoreHorizontal, Star } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export function RoomCard({ room }: { room: Room }) {
  const { userId } = useAuth();
  const { isPending, mutation } = useApiMutation(api.room.favoriteRoom);

  const ownerLabel = room.onwerId === userId ? "Você" : room.onwerId;
  const lastUpdated = formatDistanceToNow(room._creationTime, {
    addSuffix: true,
    locale: ptBR,
  });

  const onFavoriteClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();

    mutation({
      roomId: room._id as Id<"rooms">,
      favorite: !room.favorite,
    }).catch(() => {
      toast.error("Ops, algo deu errado", { icon: "🚨" });
    });
  };

  return (
    <div className="group relative flex flex-col bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow w-[150px]">
      <div className="overflow-hidden">
        <Image
          src={room.imageUrl}
          alt={room.name}
          width={150}
          height={100}
          className="h-[100px] w-full object-cover group-hover:blur-sm group-hover:scale-105 group-hover:brightness-95 transition-all"
        />
      </div>
      <Actions
        id={room._id}
        name={room.name}
        roomOwnerId={room.onwerId}
        side="right"
      >
        <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity outline-none px-2 py-2 bg-black/25 rounded-sm">
          <MoreHorizontal className="text-white w-4 h-4" />
        </button>
      </Actions>
      <button
        className={cn(
          "absolute top-1 left-1 transition-opacity outline-none bg-black/10 px-2 py-2 rounded-sm",
          !room.favorite && "opacity-0 group-hover:opacity-100 bg-black/25"
        )}
        onClick={onFavoriteClick}
        disabled={isPending}
      >
        <Star
          className={cn(
            "text-white w-4 h-4",
            room.favorite && "fill-yellow-500 text-yellow-500"
          )}
        />
      </button>
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
