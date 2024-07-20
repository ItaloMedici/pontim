const createBoardEventKey = (event: string) => {
  return (boardId: string) => `board:${boardId}:${event}`;
};

export const joinBoardKey = createBoardEventKey("join");
export const leaveBoardKey = createBoardEventKey("leave");
export const playerChoiceKey = createBoardEventKey("choice");
export const revealCardsKey = createBoardEventKey("reveal");
export const resetBoardKey = createBoardEventKey("reset");
