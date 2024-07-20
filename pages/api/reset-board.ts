import { authOptions } from "@/authOptions";
import { ResponseWithSocket } from "@/types/response-with-socket";
import { resetBoard } from "@/use-cases/board/reset-board";
import { resetBoardKey } from "@/use-cases/event-keys/board";
import { getPlayersByBoardId } from "@/use-cases/player/get-players-by-board-id";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";

const resetBoardHandler = async (
  req: NextApiRequest,
  res: ResponseWithSocket
) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  try {
    const { boardId } = req.body;

    if (!boardId) {
      res.status(400).json({ message: "Board ID is required" });
      return;
    }

    const session = await getServerSession(req, res, authOptions);

    if (!session?.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await resetBoard({ boardId });

    if (!result.count)
      return res.status(404).json({ message: "Error while reseting board" });

    const eventKey = resetBoardKey(boardId);

    const players = await getPlayersByBoardId({ boardId });

    const message = { boardId, players };

    res.socket?.server?.io?.emit(eventKey, message);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export default resetBoardHandler;
