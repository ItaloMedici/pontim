"use client";

import { BoardProvider } from "@/context/board";
import { SocketClientProvider } from "@/context/socket-client";

type RoomProps = {
  children: React.ReactNode;
  roomId: string;
};

export const Room = ({ children, roomId }: RoomProps) => {
  return (
    <SocketClientProvider>
      <BoardProvider roomId={roomId}>{children}</BoardProvider>
    </SocketClientProvider>
  );
};
