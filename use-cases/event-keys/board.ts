const createBoardEventKey = (event: string) => {
  return (boardId: string) => `board:${boardId}:${event}`;
};

export const joinBoardKey = createBoardEventKey("join");
export const leaveBoardKey = createBoardEventKey("leave");
export const playerChoice = createBoardEventKey("choice");
