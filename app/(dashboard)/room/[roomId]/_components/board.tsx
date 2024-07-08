"use client";

import { useBoard } from "@/context/board";
import { BoardNavbar } from "./board-navbar";
import { CardsPicker } from "./cards-picker";
import { PlayersCards } from "./players-cards";

export function Board() {
  const { self, others } = useBoard();

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-gray-50">
      <BoardNavbar />
      <div className="flex h-full items-center justify-center px-6">
        <PlayersCards />
      </div>
      <div className="fixed w-full bottom-16 mx-auto px-6">
        <CardsPicker />
      </div>
    </div>
  );
}
