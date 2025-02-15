import { db } from "@/lib/db";

export const updateBoardRound = async ({ boardId }) => {
  const board = await db.board.findUnique({
    where: {
      id: boardId,
    },
  });

  if (!board) {
    throw new Error("Board not found");
  }

  const newRound = board.round + 1;

  return await db.board.update({
    where: {
      id: boardId,
    },
    data: {
      round: newRound,
      reveal: false,
    },
  });
};
