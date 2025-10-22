"use server";

import { getCombinedSession } from "@/lib/auth/universal-auth";
import { logger } from "@/lib/logger";
import { BoardStatus } from "@/types/board-status";
import { BoardService } from "@/use-cases/board/board-service";
import { PlanService } from "@/use-cases/plan/plan-board-service";
import { joinRoom } from "@/use-cases/room";
import { redirect } from "next/navigation";

export async function getInitalBoardStatus(params: {
  roomId: string;
}): Promise<BoardStatus | { error: string }> {
  try {
    const { roomId } = params;

    if (!roomId) {
      return { error: "Invalid input" };
    }

    const session = await getCombinedSession();

    if (!session?.user) {
      const roomUrl = `/room/${params.roomId}`;

      return redirect(`/login?callbackUrl=${roomUrl}`);
    }

    const boardService = new BoardService(roomId, session);

    const boardData = await boardService.getBoard();

    if (!boardData) {
      const newBoard = await boardService.create();

      return boardService.parse(newBoard);
    }

    const alreadyJoined = boardData.players.some(
      (player) => player.id === session.user.id,
    );

    if (alreadyJoined) {
      return boardService.parse(boardData);
    }

    const planService = new PlanService(roomId, boardService);

    if (!planService.canJoinBoard(boardData.totalPlayers)) {
      return redirect(`/room/${roomId}/is-full`);
    }

    await joinRoom({ roomId, user: session?.user });

    const updated = await boardService.join();

    if (!updated) {
      logger.error({
        message: "Error while creating player",
        metadata: {
          userId: session.user.id,
          roomId,
        },
      });
      return { error: "Error while creating player" };
    }

    return boardService.parse(updated);
  } catch (error: any) {
    logger.error({
      error,
      message: "Error while joining board",
      metadata: {
        roomId: params.roomId,
      },
    });
    return { error: error?.message };
  }
}
