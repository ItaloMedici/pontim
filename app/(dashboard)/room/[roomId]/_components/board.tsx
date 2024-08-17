"use client";

import { BoardNavbar } from "./board-navbar";
import { BoardToolbar } from "./board-toolbar";
import { CardsPicker } from "./cards-picker";
import { Deck } from "./deck";

export function Board() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-gray-50 overflow-hidden">
      <BoardNavbar />
      <div className="flex h-full flex-col items-center justify-between gap-6 p-4 pt-20 pb-12">
        <BoardToolbar />
        <Deck />
        <CardsPicker />
      </div>
    </div>
  );
}
