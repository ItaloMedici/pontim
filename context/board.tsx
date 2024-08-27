import { LoadingLogo } from "@/components/loading-logo/loading";
import { toast } from "@/components/toast";
import { fetcher, http } from "@/lib/api";
import { Player } from "@/lib/schemas/player";
import { notificationMessages } from "@/messages/notification";
import { randomLeaveMessage, randomWellcomeMessage } from "@/messages/wellcome";
import { BoardStatus } from "@/types/board-status";
import { ChoiceOptions } from "@/types/choice-options";
import { EnumNotification } from "@/types/notifications";
import { fibonacciChoiceOptions } from "@/use-cases/board/choice-options";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useSWR from "swr";

type BoardContextProps = {
  roomId: string;
  self: Player;
  others: Player[];
  reveal: boolean;
  choiceOptions: ChoiceOptions;
  selfChoice?: string | null;
  totalPlayers: number;
  totalChoices: number;
  handleChoice: (choice: string) => Promise<void>;
  handleRevealCards: () => Promise<void>;
  handleReset: () => Promise<void>;
  handleNotifyPlayer: (
    playerId: string,
    notification?: EnumNotification,
  ) => Promise<void>;
};

export const BoardContext = createContext<BoardContextProps>(
  {} as BoardContextProps,
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
  const {
    data: boardStatus,
    error,
    isLoading,
  } = useSWR<BoardStatus>(`/api/${roomId}/board/status`, fetcher, {
    refreshInterval: 1000,
  });

  const othersPrev = useRef(boardStatus?.others);
  const [selfChoice, setSelfChoice] = useState(boardStatus?.self?.choice);
  const selfId = useRef(boardStatus?.self?.id);

  const [revealOptimistc, setRevealOptimistc] = useState(
    boardStatus?.reveal || false,
  );

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current && boardStatus?.others?.length) {
      isFirstRender.current = false;
      othersPrev.current = boardStatus?.others;
      return;
    }

    if (othersPrev.current?.length === boardStatus?.others?.length) return;

    const newPlayers = boardStatus?.others?.filter(
      (player) => !othersPrev.current?.find((prev) => prev.id === player.id),
    );

    if (newPlayers?.length) {
      newPlayers.forEach((player) => {
        toast(`${player.name}, ${randomWellcomeMessage}`);
      });
    }

    const leftPlayers = othersPrev.current?.filter(
      (player) => !boardStatus?.others?.find((prev) => prev.id === player.id),
    );

    if (leftPlayers?.length) {
      leftPlayers.forEach((player) => {
        toast(`${player.name}, ${randomLeaveMessage}`);
      });
    }

    othersPrev.current = boardStatus?.others;
  }, [boardStatus?.others]);

  useEffect(() => {
    setSelfChoice(boardStatus?.self?.choice);
    setRevealOptimistc(boardStatus?.reveal || false);

    if (selfId.current === boardStatus?.self?.id) return;

    selfId.current = boardStatus?.self?.id;
  }, [boardStatus?.self]);

  const leaveBoard = useCallback(async () => {
    await http.post(`/${roomId}/board/leave`, {
      playerId: selfId.current,
    });
  }, [roomId]);

  useEffect(() => {
    return () => {
      leaveBoard();
    };
  }, []);

  const totalChoices = useMemo(() => {
    const othersSum =
      boardStatus?.others.reduce((acc, player) => {
        return player.choice ? acc + 1 : acc;
      }, 0) ?? 0;

    if (!boardStatus?.self.choice) return othersSum;

    return othersSum + 1;
  }, [boardStatus?.others, boardStatus?.self.choice]);

  const handleNotification = async () => {
    if (!boardStatus?.self.notified) return;

    const audio = new Audio(
      `/sounds/${boardStatus.self.notified.toLowerCase()}.mp3`,
    );

    audio.play();

    toast(notificationMessages[boardStatus.self.notified as EnumNotification], {
      duration: 5000,
    });

    handleNotifyPlayer(boardStatus?.self.id);
  };

  useEffect(() => {
    if (!boardStatus?.self.notified) return;

    handleNotification();
  }, [boardStatus?.self?.notified]);

  if (error) {
    toast.error(error);
  }

  if (boardStatus?.firstTime && !boardStatus?.self?.nickname) {
    return (
      <Fragment>
        <NicknameDialogForm roomId={roomId} />
        <LoadingLogo />
      </Fragment>
    );
  }

  if (!boardStatus?.self || isLoading) {
    return <LoadingLogo />;
  }

  const handleChoice = async (choice: string) => {
    await http.post<Player>(`/${roomId}/make-choice`, {
      playerId: boardStatus.self.id,
      choice,
    });

    setSelfChoice(choice);
  };

  const handleRevealCards = async () => {
    await http.post(`/${roomId}/board/reveal`);
    setRevealOptimistc((prev) => !prev);
  };

  const handleReset = async () => {
    await http.post(`/${roomId}/board/reset`, {
      boardId: boardStatus.boardId,
    });
  };

  const handleNotifyPlayer = async (
    playerId: string,
    notification?: EnumNotification,
  ) => {
    await http.post(`/${roomId}/player/notify`, {
      playerId,
      notification,
    });
  };

  const totalPlayers = boardStatus?.others.length + 1;

  return (
    <BoardContext.Provider
      value={{
        roomId,
        ...boardStatus,
        choiceOptions: fibonacciChoiceOptions,
        reveal: revealOptimistc,
        totalChoices,
        totalPlayers,
        selfChoice,
        handleChoice,
        handleRevealCards,
        handleReset,
        handleNotifyPlayer,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
