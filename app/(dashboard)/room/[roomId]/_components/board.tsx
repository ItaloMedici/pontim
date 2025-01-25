"use client";

import { BoardDock } from "./board-dock";
import { BoardNavbar } from "./board-navbar";
import { CardsPicker } from "./cards-picker";
import { Deck } from "./deck";

export function Board() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-gray-100 overflow-hidden">
      <BoardNavbar />
      <div className="flex h-full flex-col items-center justify-between gap-6 p-4 pt-20 pb-8">
        <BoardDock />
        <Deck />
        <CardsPicker />
      </div>
    </div>
  );
}
