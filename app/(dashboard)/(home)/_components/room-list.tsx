"use client";

import { Button } from "@/components/ui/button";
import { Room } from "@/lib/schemas/room";
import { Plus } from "lucide-react";
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

export function RoomList({ rooms }: { rooms: Room[] }) {
  const params = useSearchParams();

  if (rooms === undefined) {
    return <RoomListSkeleton />;
  }

  if (!rooms?.length && params?.size !== 0) {
    return (
      <div className="flex items-center justify-center flex-col space-y-2">
        <span className="text-4xl">🧐</span>
        <h1 className="font-semibold text-xl">Nada encontrado por aqui...</h1>
        <Button asChild variant={"ghost"}>
          <Link href={"/"}>Voltar</Link>
        </Button>
      </div>
    );
  }

  if (!rooms?.length)
    return (
      <div className="flex items-center justify-center flex-col">
        <span className="text-4xl">🎉</span>
        <h1 className="font-semibold text-2xl">
          Olá, seja bem-vindo ao Pontim!
        </h1>
        <p className="text-sm text-gray-500 mt-2 mb-4">
          Cria uma nova sala e convide os participantes 👇
        </p>
        <CreateRoomDialog />
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
        trigger={
          <button className="flex flex-col gap-2 bg-gray-50 w-[150px] min-h-[140px] border-2 border-dashed rounded-lg overflow-hidden hover:shadow-md transition-shadow items-center justify-center">
            <Plus className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-muted-foreground text-sm">Nova sala</h2>
          </button>
        }
      />
    </div>
  );
}
