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
  useRef,
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
  handleRevealCards: () => Promise<void>;
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
  const [revealCards, setRevealCards] = useState(false);

  const selfRef = useRef<Player | undefined>(self);

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
      selfRef.current = player;
      setOthers(others);
    };

    joinBoard();
  }, []);

  console.log({ self, others });

  const leaveBoard = async () => {
    if (!selfRef.current?.boardId) return;
    console.log("leave board", selfRef.current);

    await http.post("/leave-board", {
      playerId: selfRef.current.id,
      boardId: selfRef.current.boardId,
      roomId: roomId,
    });

    setSelf({} as Player);
    setOthers([]);
    selfRef.current = undefined;
  };

  useEffect(() => {
    return () => {
      leaveBoard();
    };
  }, []);

  useEffect(() => {
    if (!socket || !self) return;

    const joinBoardEventKey = joinBoardKey(self.boardId);

    socket.on(joinBoardEventKey, (message) => {
      console.log(`[${joinBoardEventKey}] for ${self.name}:`, message);

      const newPlayer = message.player;
      if (newPlayer.id === self?.id) return;

      const alreadyExist = others.find((p) => p.id === newPlayer.id);

      if (alreadyExist) return;

      toast(`${newPlayer.name} entrou na sala 🎉`);

      setOthers((prev) => [...prev, message.player]);
    });

    const leaveBoardEventKey = leaveBoardKey(roomId);

    socket.on(leaveBoardEventKey, (message) => {
      console.log(`[${leaveBoardEventKey}] for ${self.name}:`, message);
      const player = message.player;

      toast(`${player.name} saiu da sala 🏃‍♂️💨`);

      setOthers((prev) => prev.filter((p) => p.id !== player.id));
    });

    const choiceEventKey = playerChoiceKey(self.boardId);

    socket.on(choiceEventKey, (message) => {
      console.log(`[${choiceEventKey}] for ${self.name}:`, message);
      if (!message?.player) return;

      const updatedPlayer = message.player;

      if (updatedPlayer.id === self.id) {
        return;
      }

      setOthers((prev) =>
        prev.map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p))
      );
    });

    const revealCardsEventKey = playerChoiceKey(self.boardId);

    socket.on(revealCardsEventKey, (message) => {
      console.log(`[${revealCardsEventKey}] for ${self.name}:`, message);
      setRevealCards(message.reveal);
    });

    return () => {
      socket.off(joinBoardEventKey);
      socket.off(leaveBoardEventKey);
      socket.off(choiceEventKey);
    };
  }, [others, roomId, self, socket]);

  if (!isConnected || !self?.id) {
    return <LoadingLogo />;
  }

  const handleChoice = async (choice: string) => {
    const updatedSelf = await http.post<Player>("/make-choice", {
      playerId: self.id,
      choice,
    });

    if (!updatedSelf) return;

    setSelf(updatedSelf);
  };

  const handleRevealCards = async () => {
    await http.post("/reveal-cards", {
      boardId: self.boardId,
      reveal: !revealCards,
    });
  };

  return (
    <BoardContext.Provider
      value={{
        roomId,
        self,
        others,
        choiceOptions: fibonacciChoiceOptions,
        handleChoice,
        revealCards,
        handleRevealCards,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
