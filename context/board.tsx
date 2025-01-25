import { LoadingLogo } from "@/components/loading-logo/loading";
import { toast } from "@/components/toast";
import { http } from "@/lib/api";
import { Player } from "@/lib/schemas/player";
import {
  notificationIcons,
  notificationMessages,
  notificationMessageThirdPerson,
} from "@/messages/notification";
import { randomLeaveMessage, randomWellcomeMessage } from "@/messages/wellcome";
import { BoardStatus, BoardStatusNotification } from "@/types/board-status";
import { ChoiceOptions } from "@/types/choice-options";
import { EnumNotification } from "@/types/notifications";
import { fibonacciChoiceOptions } from "@/use-cases/board/choice-options";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type BoardContextProps = {
  roomId: string;
  self: Player;
  others: Player[];
  reveal: boolean;
  choiceOptions: ChoiceOptions;
  selfChoice?: string | null;
  totalPlayers: number;
  totalChoices: number;
  average: number;
  agreementPercentage: number;
  handleChoice: (choice: string) => Promise<void>;
  handleRevealCards: () => Promise<void>;
  handleReset: () => Promise<void>;
  handleNotifyPlayer: (
    playerId: string,
    notification?: EnumNotification,
  ) => Promise<void>;
  handleLeave: () => Promise<void>;
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
  const [boardStatus, setBoardStatus] = useState<BoardStatus>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [selfChoice, setSelfChoice] = useState("");
  const [revealOptimistc, setRevealOptimistc] = useState(
    boardStatus?.reveal || false,
  );

  const othersPrev = useRef(boardStatus?.others);
  const selfId = useRef(boardStatus?.self?.id);
  const isFirstRender = useRef(true);
  const seenNotifications = useRef<string[]>([]);
  const boardSnapshot = useRef<string>();
  const closeEventSource = useRef<() => void>();

  const joinBoard = async () => {
    try {
      const board = await http.put<BoardStatus>(`/${roomId}/board/join`);
      setBoardStatus(board as BoardStatus);
      return board;
    } catch (error: any) {
      setError(error.message);
    }
  };

  const subscribeToBoardStatus = useCallback(async () => {
    const board = await joinBoard();

    if (!board?.self) return;

    const eventSource = new EventSource(
      `/api/${roomId}/board/status-sse?playerId=${board.self.id}`,
    );

    closeEventSource.current = () => eventSource.close();

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data) as BoardStatus;

      if (boardSnapshot.current !== JSON.stringify(data)) {
        boardSnapshot.current = JSON.stringify(data);

        setBoardStatus(data);

        if (!selfChoice && typeof data?.self?.choice === "string") {
          console.log("Setting self choice", data.self.choice);
          setSelfChoice(data.self.choice);
        }

        if (typeof data?.reveal === "boolean") {
          setRevealOptimistc(data.reveal);
        }

        selfId.current = data?.self?.id;
      }

      if (isLoading) setIsLoading(false);
    };

    eventSource.onerror = (event) => {
      console.error("SSE connection failed.", event);
      eventSource.close();
    };
  }, []);

  const unsubscribeToBoardStatus = useCallback(() => {
    closeEventSource.current?.();
  }, []);

  useEffect(() => {
    subscribeToBoardStatus();

    return () => {
      unsubscribeToBoardStatus();
    };
  }, []);

  useEffect(() => {
    if (!boardStatus?.boardId) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      othersPrev.current = boardStatus?.others ?? [];
      return;
    }

    if (othersPrev.current?.length === boardStatus?.others?.length) return;

    const newPlayers = boardStatus?.others?.filter(
      (player) => !othersPrev.current?.find((prev) => prev.id === player.id),
    );

    if (newPlayers?.length) {
      newPlayers.forEach((player) => {
        toast(`${player.nickname}, ${randomWellcomeMessage}`);
      });
    }

    const leftPlayers = othersPrev.current?.filter(
      (player) => !boardStatus?.others?.find((prev) => prev.id === player.id),
    );

    if (leftPlayers?.length) {
      leftPlayers.forEach((player) => {
        toast(`${player.nickname}, ${randomLeaveMessage}`);
      });
    }

    othersPrev.current = boardStatus?.others;
  }, [boardStatus?.others, boardStatus?.boardId]);

  const leaveBoard = useCallback(async () => {
    unsubscribeToBoardStatus();

    await http.post(`/${roomId}/board/leave`, {
      playerId: selfId.current,
    });
  }, [roomId]);

  useEffect(() => {
    return () => {
      seenNotifications.current = [];
    };
  }, []);

  const handleDeleteNotification = useCallback(
    async (notificationId: string) => {
      await http.delete(`/${roomId}/board/notification`, {
        notificationId,
      });
    },
    [roomId],
  );

  const handleNotification = useCallback(
    async (notification: BoardStatusNotification) => {
      if (!boardStatus?.notifications?.length) return;

      const audio = new Audio(
        `/sounds/${notification.sound.toLowerCase()}.mp3`,
      );

      audio.play();

      toast(notificationMessages[notification.sound as EnumNotification], {
        duration: 5000,
      });

      handleDeleteNotification(notification.id);
    },
    [boardStatus?.notifications?.length, handleDeleteNotification],
  );

  useEffect(() => {
    if (!boardStatus?.notifications?.length || !boardStatus.self) return;

    boardStatus.notifications.forEach((notification) => {
      if (notification.isSelf) {
        handleNotification(notification);
        return;
      }

      if (seenNotifications.current.includes(notification.id)) return;
      seenNotifications.current.push(notification.id);

      const soundMessage =
        notificationMessageThirdPerson[notification.sound as EnumNotification];

      const message = `${notification.sender} ${soundMessage} ${notification.target}`;

      toast(message, {
        duration: 5000,
        icon: notificationIcons[notification.sound as EnumNotification],
      });
    });
  }, [boardStatus?.notifications, boardStatus?.self, handleNotification]);

  if (error) {
    toast.error(error);
  }

  if (!boardStatus?.self || isLoading) {
    return <LoadingLogo />;
  }

  const handleChoice = async (choice: string) => {
    if (!boardStatus.self) return;
    setSelfChoice(choice);

    const updatedStatus = await http.post<BoardStatus>(
      `/${roomId}/board/make-choice`,
      {
        playerId: boardStatus.self.id,
        choice,
      },
    );

    if (updatedStatus) setBoardStatus(updatedStatus);
  };

  const handleRevealCards = async () => {
    setRevealOptimistc((prev) => !prev);

    const updatedStatus = await http.post<BoardStatus>(
      `/${roomId}/board/reveal?playerId=${boardStatus.self?.id}`,
    );

    if (updatedStatus) setBoardStatus(updatedStatus);
  };

  const handleReset = async () => {
    setSelfChoice("");
    setBoardStatus((prev) => {
      return {
        ...prev,
        others: prev?.others?.map((player) => ({
          ...player,
          choice: null,
        })),
      } as BoardStatus;
    });

    const updatedStatus = await http.post<BoardStatus>(
      `/${roomId}/board/reset`,
      {
        boardId: boardStatus.boardId,
        playerId: boardStatus.self?.id,
      },
    );
    if (updatedStatus) setBoardStatus(updatedStatus);
  };

  const handleNotifyPlayer = async (
    playerId: string,
    notification?: EnumNotification,
  ) => {
    const updatedStatus = await http.post<BoardStatus>(
      `/${roomId}/board/notification`,
      {
        targetId: playerId,
        senderId: boardStatus.self?.id,
        boardId: boardStatus.boardId,
        notification,
      },
    );
    if (updatedStatus) setBoardStatus(updatedStatus);
  };

  return (
    <BoardContext.Provider
      value={{
        roomId,
        ...(boardStatus as Required<BoardStatus>),
        choiceOptions: fibonacciChoiceOptions,
        reveal: revealOptimistc,
        selfChoice,
        handleChoice,
        handleRevealCards,
        handleReset,
        handleNotifyPlayer,
        handleLeave: leaveBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
