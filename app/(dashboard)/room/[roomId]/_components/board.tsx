"use client";

import { useBoard } from "@/context/board";
import { BoardNavbar } from "./board-navbar";
import { CardsPicker } from "./cards-picker";
import { PlayersCards } from "./players-cards";

export function Board() {
  const { self, others } = useBoard();

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-gray-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <BoardNavbar />
      <div className="flex h-full items-center justify-center">
        <PlayersCards />
      </div>
      <div className="fixed bottom-0 mx-auto">
        <CardsPicker />
      </div>
    </div>
  );
}
