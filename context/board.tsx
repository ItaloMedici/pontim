import { Loading } from "@/components/auth/loading";
import { joinBoardKey, leaveBoardKey } from "@/use-cases/event-keys/board";
import { Player } from "@prisma/client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { useSocketClient } from "./socket-client";

type BoardContextProps = {
  roomId: string;
  self: Player;
  others: Player[];
};

export const BoardContext = createContext<BoardContextProps>(
  {} as BoardContextProps
);

export const useBoard = () => {
  return useContext(BoardContext);
};

export const BoardProvider = ({
  roomId,
  children,
}: {
  roomId: string;
  children: ReactNode;
}) => {
  const { socket, isConnected } = useSocketClient();
  const [self, setSelf] = useState<Player>({} as Player);
  const [others, setOthers] = useState<Player[]>([]);

  useEffect(() => {
    if (!socket) return;

    const joinBoard = async () => {
      const result = await fetch("/api/player/join-board", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomId }),
      });

      const { player, others } = await result.json();

      setSelf(player);
      setOthers(others);
    };

    joinBoard();
  }, [socket, roomId]);

  useEffect(() => {
    if (!socket || !self) return;

    const joinBoardEventKey = joinBoardKey(self.boardId);

    socket.on(joinBoardEventKey, (message) => {
      const newPlayer = message.player;
      if (newPlayer.id === self?.id) return;

      const alreadyExist = others.find((p) => p.id === newPlayer.id);

      if (alreadyExist) return;

      toast(`${newPlayer.name} entrou na sala 🎉`);

      setOthers((prev) => [...prev, message.player]);
    });

    const leaveBoardEventKey = leaveBoardKey(roomId);

    socket.on(leaveBoardEventKey, (message) => {
      const player = message.player;

      toast(`${player.name} saiu da sala 😢`);

      setOthers((prev) => prev.filter((p) => p.id !== player.id));
    });

    return () => {
      socket.off(joinBoardEventKey);
    };
  }, [others, roomId, self, socket]);

  if (!isConnected || !self.id) {
    return <Loading />;
  }

  return (
    <BoardContext.Provider value={{ roomId, self, others }}>
      {children}
    </BoardContext.Provider>
  );
};
