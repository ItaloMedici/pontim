import { LoadingLogo } from "@/components/loading-logo/loading";
import { toast } from "@/components/toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
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
import { DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
  availableRounds: number;
  closestStoryPoint: number;
  handleChoice: (choice: string) => Promise<void>;
  handlePlay: () => Promise<void>;
  loadingPlay: boolean;
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
  const router = useRouter();
  const [boardStatus, setBoardStatus] = useState<BoardStatus>(
    {} as BoardStatus,
  );
  const [isOnFirstLoad, setIsOnFirstLoad] = useState(true);
  const [loadingPlay, setPlayLoading] = useState(false);

  const [selfChoice, setSelfChoice] = useState("");
  const [revealOptimistc, setRevealOptimistc] = useState(
    boardStatus?.reveal || false,
  );
  const [openPlanOfferDialog, setOpenPlanOfferDialog] = useState(false);

  const selfChoiceRef = useRef(selfChoice);
  const othersPrev = useRef(boardStatus?.others);
  const selfId = useRef(boardStatus?.self?.id);
  const isFirstRender = useRef(true);
  const seenNotifications = useRef<string[]>([]);
  const boardSnapshot = useRef<string>();
  const closeEventSource = useRef<() => void>();
  const hasSubscribed = useRef(false);

  const choiceSignal = useRef<AbortController>(new AbortController());
  const revealSignal = useRef<AbortController>(new AbortController());

  const joinBoard = useCallback(async () => {
    const board = await http.put<BoardStatus>(`${roomId}/board/join`);

    if (board === null) {
      router.push("/");
      return;
    }

    setBoardStatus(board as BoardStatus);
    return board;
  }, [roomId, router]);

  const onEventSourceMessage = useCallback((event: MessageEvent) => {
    const data = JSON.parse(event.data) as BoardStatus;

    if (isOnFirstLoad) setIsOnFirstLoad(false);

    if (boardSnapshot.current === JSON.stringify(data)) return;

    boardSnapshot.current = JSON.stringify(data);

    setBoardStatus(data);

    if (!selfChoiceRef.current && typeof data?.self?.choice === "string") {
      setSelfChoice(data.self.choice);
    }

    if (typeof data?.reveal === "boolean") {
      setRevealOptimistc(data.reveal);
    }

    selfId.current = data?.self?.id;
  }, []);

  const subscribeToBoardStatus = useCallback(async () => {
    if (hasSubscribed.current) return;

    const board = await joinBoard();

    if (!board?.self) return;

    const eventSource = new EventSource(
      `/api/${roomId}/board/status-sse?playerId=${board.self.id}`,
    );

    closeEventSource.current = () => eventSource.close();
    hasSubscribed.current = true;

    eventSource.onmessage = onEventSourceMessage;

    eventSource.onerror = (event) => {
      console.error("SSE connection failed.", event);
      eventSource.close();
    };
  }, [joinBoard, onEventSourceMessage, roomId]);

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
  }, [roomId, unsubscribeToBoardStatus]);

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

  const handleChoice = useCallback(
    async (choice: string) => {
      if (!boardStatus.self) return;
      setSelfChoice(choice);

      if (!choiceSignal.current.signal.aborted) {
        choiceSignal.current.abort("Aborted previous request.");
      }

      choiceSignal.current = new AbortController();

      const updatedStatus = await http.post<BoardStatus>(
        `/${roomId}/board/make-choice`,
        {
          playerId: boardStatus.self.id,
          choice,
        },
        choiceSignal.current.signal,
      );

      if (updatedStatus) setBoardStatus(updatedStatus);
    },
    [boardStatus.self, roomId],
  );

  const handleRevealCards = useCallback(async () => {
    setRevealOptimistc((prev) => !prev);

    if (!revealSignal.current.signal.aborted) {
      revealSignal.current.abort("Aborted previous request.");
    }

    revealSignal.current = new AbortController();

    const updatedStatus = await http.post<BoardStatus>(
      `/${roomId}/board/reveal?playerId=${boardStatus.self?.id}`,
    );

    if (updatedStatus) setBoardStatus(updatedStatus);
  }, [boardStatus.availableRounds, boardStatus.self?.id, roomId]);

  const handleReset = useCallback(async () => {
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
  }, [
    boardStatus.availableRounds,
    boardStatus.boardId,
    boardStatus.self?.id,
    roomId,
  ]);

  const handlePlay = useCallback(async () => {
    try {
      setPlayLoading(true);

      if (boardStatus.availableRounds === 0) {
        toast.error("Você atingiu o limite de rodadas.");
        setOpenPlanOfferDialog(true);
        return;
      }

      if (revealOptimistc) {
        setRevealOptimistc(false);
        await handleReset();
        return;
      }

      await handleRevealCards();
    } finally {
      setPlayLoading(false);
    }
  }, [
    handleRevealCards,
    handleReset,
    boardStatus.availableRounds,
    revealOptimistc,
  ]);

  const handleNotifyPlayer = useCallback(
    async (playerId: string, notification?: EnumNotification) => {
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
    },
    [boardStatus.boardId, boardStatus.self?.id, roomId],
  );

  const contextValue = useMemo(
    () => ({
      roomId,
      ...(boardStatus as Required<BoardStatus>),
      choiceOptions: fibonacciChoiceOptions,
      reveal: revealOptimistc,
      selfChoice,
      handleChoice,
      handlePlay,
      loadingPlay,
      handleNotifyPlayer,
      handleLeave: leaveBoard,
    }),
    [
      roomId,
      boardStatus,
      revealOptimistc,
      selfChoice,
      handleChoice,
      handleRevealCards,
      handleReset,
      handleNotifyPlayer,
      leaveBoard,
      loadingPlay,
      handlePlay,
    ],
  );

  if (!boardStatus?.self || isOnFirstLoad) {
    return <LoadingLogo />;
  }

  return (
    <BoardContext.Provider value={contextValue}>
      {children}
      <Dialog open={openPlanOfferDialog} onOpenChange={setOpenPlanOfferDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Limite de rodadas atingido 😢</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Oops! Você atingiu o limite de rodadas desta sala. Não deixe a
            diversão parar! Entre em contato com o dono da sala e descubra
            nossos planos incríveis para continuar jogando sem interrupções.
          </DialogDescription>
          <DialogFooter>
            <Button
              variant={"outline"}
              onClick={() => setOpenPlanOfferDialog(false)}
            >
              Continuar
            </Button>
            <Button onClick={() => router.push("/pricing")}>Ver planos</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </BoardContext.Provider>
  );
};
