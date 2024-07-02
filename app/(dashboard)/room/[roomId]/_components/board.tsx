"use client";

import { useBoard } from "@/context/board";

export function Board() {
  const { self, others, handleChoice, choice } = useBoard();

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-gray-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <nav className="fixed top-0 w-full max-w-screen-lg">
        <BoardNavbar />
      </nav>
      <div className="flex h-full items-center justify-center">
        <PlayersCards players={[self, ...others]} choice={choice} />
      </div>
      <div className="fixed bottom-0 mx-auto">
        <CardsPicker onPick={(choice) => handleChoice(choice)} />
      </div>
    </div>
  );
}
