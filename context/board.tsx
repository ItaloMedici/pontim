"use client";

import { LoadingLogo } from "@/components/loading-logo/loading";
import { RoundsReachLimitDialog } from "@/components/rounds-reach-limit-dialog";
import { toast } from "@/components/toast";
import { EventHandler, useBoardEvents } from "@/hooks/use-board-events";
import { useHttp } from "@/hooks/use-http";
import { useNotification } from "@/hooks/use-notification";
import { EventAction } from "@/lib/consts";
import {
  getRandomLeaveMessage,
  getRandomWelcomeMessage,
} from "@/messages/wellcome";
import { BoardNotification, BoardStatus } from "@/types/board-status";
import { ChoiceOptions } from "@/types/choice-options";
import { EnumNotification } from "@/types/notifications";
import { Player } from "@/types/player";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
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
  initalBoardStatus,
}: {
  roomId: string;
  children: ReactNode;
  initalBoardStatus: BoardStatus;
}) => {
  const t = useTranslations();
  const http = useHttp({ baseUrl: `/api/${roomId}/board` });
  const router = useRouter();
  const [boardStatus, setBoardStatus] =
    useState<BoardStatus>(initalBoardStatus);

  const [loadingPlay, setPlayLoading] = useState(false);

  const [selfChoice, setSelfChoice] = useState(
    initalBoardStatus.self?.choice || "",
  );
  const [revealOptimistc, setRevealOptimistc] = useState(
    initalBoardStatus.reveal || false,
  );
  const [openPlanOfferDialog, setOpenPlanOfferDialog] = useState(false);
  const [choiceOptions, _] = useState<ChoiceOptions[]>(
    initalBoardStatus.choiceOptions || [],
  );
  const selfId = useRef(initalBoardStatus.self?.id);
  const alreadyLeft = useRef(false);

  const { play: handleNotification, send: sendNotification } =
    useNotification(roomId);

  const eventHandlers = useMemo<Record<EventAction, EventHandler>>(
    () => ({
      [EventAction.BOARD_UPDATED]: (data: BoardStatus) => {
        setBoardStatus((prev) => ({ ...prev, ...data }));
      },
      [EventAction.PLAYER_JOINED]: (
        data: { playerId: string; nickname: string },
        from: string,
      ) => {
        if (from === selfId.current) {
          return;
        }
        toast(`${data.nickname}, ${getRandomWelcomeMessage(t)}`, {
          duration: 5000,
        });
      },
      [EventAction.PLAYER_LEFT]: (
        data: { playerId: string; nickname: string },
        from: string,
      ) => {
        if (from === selfId.current) {
          return;
        }
        toast(`${data.nickname}, ${getRandomLeaveMessage(t)}`, {
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
    [handleNotification, boardStatus.others, t],
  );

  const leaveBoard = useCallback(async () => {
    if (alreadyLeft.current) return;
    alreadyLeft.current = true;

    await http.post(`/leave`);
    router.push("/");
  }, [http, router]);

  const { isLoading: isEventLoading } = useBoardEvents({
    roomId,
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
        toast.error(t("dashboard.shared.state.maxRounds"));
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
    t,
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
