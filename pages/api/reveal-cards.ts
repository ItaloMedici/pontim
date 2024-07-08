import { ResponseWithSocket } from "@/types/response-with-socket";
import { revealCardsKey } from "@/use-cases/event-keys/board";
import { NextApiRequest } from "next";

const revealCardsHandler = (req: NextApiRequest, res: ResponseWithSocket) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  try {
    const { boardId, reveal } = req.body;

    if (!boardId) {
      res.status(400).json({ message: "Board ID is required" });
      return;
    }

    const eventKey = revealCardsKey(boardId);

    const message = { reveal };

    res.socket?.server?.io?.emit(eventKey, message);

    res.status(200).json({ message: "Reveal cards" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export default revealCardsHandler;
