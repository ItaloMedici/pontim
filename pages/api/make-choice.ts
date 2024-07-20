import { ResponseWithSocket } from "@/types/response-with-socket";
import { playerChoiceKey } from "@/use-cases/event-keys/board";
import { makeChoice } from "@/use-cases/player/make-choice";
import { NextApiRequest } from "next";

const makeChoiceHandler = async (
  req: NextApiRequest,
  res: ResponseWithSocket
) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { choice, playerId } = req.body;

  if (!choice) {
    res.status(400).json({ message: "Choice is required" });
    return;
  }

  if (!playerId) {
    res.status(400).json({ message: "Player ID is required" });
    return;
  }

  try {
    const updatedPlayer = await makeChoice({ playerId, choice });

    const eventKey = playerChoiceKey(updatedPlayer.boardId);

    const message = {
      player: {
        ...updatedPlayer,
        choice: "hidden",
      },
    };

    res.socket?.server?.io?.emit(eventKey, message);

    return res.status(200).json(updatedPlayer);
  } catch (error: any) {
    return res.status(500).json({ message: error.message ?? error });
  }
};

export default makeChoiceHandler;
