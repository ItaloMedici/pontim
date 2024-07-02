import { LoadingLogo } from "@/components/loading-logo/loading";
import { http } from "@/lib/api";
import { Player } from "@/lib/schemas/player";
import { ChoiceOptions } from "@/types/choice-options";
import { fibonacciChoiceOptions } from "@/use-cases/board/choice-options";
import {
  joinBoardKey,
  leaveBoardKey,
  playerChoiceKey,
} from "@/use-cases/event-keys/board";
import { useRouter } from "next/navigation";
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
  revealCards: boolean;
  choiceOptions: ChoiceOptions;
  handleChoice: (choice: string) => Promise<void>;
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
  const router = useRouter();
  const { socket, isConnected } = useSocketClient();
  const [self, setSelf] = useState<Player>({} as Player);
  const [others, setOthers] = useState<Player[]>([]);

  useEffect(() => {
    if (!roomId || self?.id) return;

    const joinBoard = async () => {
      const result = await http.post<{
        player: Player;
        others: Player[];
      }>("/join-board", { roomId });

      if (!result) return router.push("/");

      const { player, others } = result;

      setSelf(player);
      setOthers(others);
    };

    joinBoard();
  }, [roomId, router, self]);

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

    const choiceEventKey = playerChoiceKey(self.boardId);

    socket.on(choiceEventKey, (message) => {
      const updatedPlayer = message.player;

      if (updatedPlayer.id === self.id) {
        return;
      }

      setOthers((prev) =>
        prev.map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p))
      );
    });

    return () => {
      socket.off(joinBoardEventKey);
      socket.off(leaveBoardEventKey);
    };
  }, [others, roomId, self, socket]);

  if (!isConnected || !self?.id) {
    return <LoadingLogo />;
  }

  const handleChoice = async (choice: string) => {
    const updatedSelf = await http.post<Player>("/player/make-choice", {
      playerId: self.id,
      choice,
    });

    if (!updatedSelf) return;

    setSelf(updatedSelf);
  };

  return (
    <BoardContext.Provider
      value={{
        roomId,
        self,
        others,
        choiceOptions: fibonacciChoiceOptions,
        handleChoice,
        revealCards: false,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
