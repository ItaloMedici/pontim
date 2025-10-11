"use client";

import { BoardDock } from "./board-dock";
import { BoardNavbar } from "./board-navbar";
import { CardsPickerRoom } from "./cards-picker-room";
import { Deck } from "./deck";

export function Board() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-muted/30 dark:bg-background overflow-hidden">
      <BoardNavbar />
      <div className="flex h-full flex-col items-center justify-between gap-6 p-4 pt-20 pb-8">
        <BoardDock />
        <Deck />
        <CardsPickerRoom />
      </div>
    </div>
  );
}
