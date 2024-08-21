"use client";

import { BoardProvider } from "@/context/board";

type RoomProps = {
  children: React.ReactNode;
  roomId: string;
};

export const Room = ({ children, roomId }: RoomProps) => {
  return <BoardProvider roomId={roomId}>{children}</BoardProvider>;
};
