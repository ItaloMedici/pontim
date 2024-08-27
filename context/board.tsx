import { NicknameDialogForm } from "@/app/(dashboard)/room/[roomId]/_components/nickname-dialog-form";
import { LoadingLogo } from "@/components/loading-logo/loading";
import { toast } from "@/components/toast";
import { fetcher, http } from "@/lib/api";
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
  Fragment,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
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
  average: number;
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
    if (!boardStatus?.others?.length) return;

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
    if (!boardStatus.self) return;

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
    await http.post(`/${roomId}/board/notification`, {
      targetId: playerId,
      senderId: boardStatus.self?.id,
      boardId: boardStatus.boardId,
      notification,
    });
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
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
