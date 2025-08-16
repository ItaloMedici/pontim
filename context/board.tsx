import { LoadingLogo } from "@/components/loading-logo/loading";
import { RoundsReachLimitDialog } from "@/components/rounds-reach-limit-dialog";
import { toast } from "@/components/toast";
import { useBoardEvents } from "@/hooks/use-board-events";
import { useHttp } from "@/hooks/use-http";
import { useNotification } from "@/hooks/use-notification";
import { EventAction } from "@/lib/consts";
import { randomLeaveMessage, randomWellcomeMessage } from "@/messages/wellcome";
import { BoardNotification, BoardStatus } from "@/types/board-status";
import { ChoiceOptions } from "@/types/choice-options";
import { EnumNotification } from "@/types/notifications";
import { Player } from "@/types/player";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

type BoardContextProps = {
  roomId: string;
  self: Player;
  others: Player[];
  reveal: boolean;
  choiceOptions: ChoiceOptions[];
  selfChoice?: string | null;
  totalPlayers: number;
  totalChoices: number;
  average: number;
  agreementPercentage: number;
  agreementEmoji: string;
  availableRounds: number;
  majorityChoice: string;
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
  const http = useHttp({ baseUrl: `/api/${roomId}/board` });
  const router = useRouter();
  const [boardStatus, setBoardStatus] = useState<BoardStatus>(
    {} as BoardStatus,
  );

  const [loadingPlay, setPlayLoading] = useState(false);

  const [selfChoice, setSelfChoice] = useState("");
  const [revealOptimistc, setRevealOptimistc] = useState(
    boardStatus?.reveal || false,
  );
  const [openPlanOfferDialog, setOpenPlanOfferDialog] = useState(false);
  const [choiceOptions, setChoiceOptions] = useState<ChoiceOptions[]>([]);

  const selfId = useRef(boardStatus?.self?.id);

  const { play: handleNotification, send: sendNotification } =
    useNotification(roomId);

  const eventHandlers = useMemo<Record<EventAction, (data: any) => void>>(
    () => ({
      [EventAction.BOARD_UPDATED]: (data: BoardStatus) => {
        setBoardStatus((prev) => ({ ...prev, ...data }));
      },
      [EventAction.PLAYER_JOINED]: (data: Player) => {
        toast(`${data.nickname}, ${randomWellcomeMessage}`, {
          duration: 5000,
        });
      },
      [EventAction.PLAYER_LEFT]: (data: Player) => {
        toast(`${data.nickname}, ${randomLeaveMessage}`, {
          duration: 5000,
        });
      },
      [EventAction.NOTIFICATION]: (data: BoardNotification) => {
        handleNotification(data, boardStatus.others);
      },
      [EventAction.HAND_SHAKE]: () => {},
      [EventAction.KEEP_ALIVE]: () => {},
      [EventAction.REVEAL]: (data: { reveal: boolean }) => {
        setRevealOptimistc(data.reveal);
      },
      [EventAction.NEXT_ROUND]: () => {
        setRevealOptimistc(false);
        setSelfChoice("");
      },
    }),
    [handleNotification, boardStatus.others],
  );

  const joinBoard = useCallback(async () => {
    const board = await http.put<BoardStatus>(`/join`);

    if (!board) {
      router.push("/");
      return;
    }

    selfId.current = board?.self?.id;
    setBoardStatus(board as BoardStatus);
    setSelfChoice(board.self?.choice || "");
    setChoiceOptions(board.choiceOptions ?? []);

    return board;
  }, [http, router]);

  const leaveBoard = useCallback(async () => {
    await http.post(`/leave`);
    router.push("/");
  }, [http, router]);

  const { isLoading: isEventLoading } = useBoardEvents({
    roomId,
    onBeforeSubscribe: joinBoard,
    onUnsubscribe: leaveBoard,
    handlers: eventHandlers,
  });

  const handleChoice = useCallback(
    async (choice: string) => {
      if (!boardStatus.self) return;
      setSelfChoice(choice);

      await http.post(`/make-choice`, {
        choice,
      });
    },
    [boardStatus.self, http],
  );

  const handleRevealCards = useCallback(async () => {
    setRevealOptimistc((prev) => !prev);

    await http.put(`/reveal`);
  }, [http]);

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

    await http.post(`/reset`);
  }, [http]);

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

  const contextValue = useMemo(
    () => ({
      roomId,
      ...(boardStatus as Required<BoardStatus>),
      choiceOptions,
      reveal: revealOptimistc,
      selfChoice,
      handleChoice,
      handlePlay,
      loadingPlay,
      handleNotifyPlayer: sendNotification,
      handleLeave: leaveBoard,
    }),
    [
      roomId,
      boardStatus,
      revealOptimistc,
      selfChoice,
      handleChoice,
      handlePlay,
      loadingPlay,
      sendNotification,
      leaveBoard,
      choiceOptions,
    ],
  );

  if (!boardStatus?.self || isEventLoading) {
    return <LoadingLogo />;
  }

  return (
    <BoardContext.Provider value={contextValue}>
      {children}
      <RoundsReachLimitDialog
        open={openPlanOfferDialog}
        onOpenChange={setOpenPlanOfferDialog}
      />
    </BoardContext.Provider>
  );
};
