import { ResponseWithSocket } from "@/types/response-with-socket";
import { joinBoardKey } from "@/use-cases/event-keys/board";
import { getPlayersByRoomId } from "@/use-cases/player/get-players-by-roomId";
import { joinBoardAsPlayer } from "@/use-cases/player/join-board-as-player";
import { NextApiRequest } from "next";

const joinRoomHandler = async (
  req: NextApiRequest,
  res: ResponseWithSocket
) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { roomId } = req.body;

    const player = await joinBoardAsPlayer({ roomId: req.body.roomId });

    if (!player) {
      return res.status(500).json({ message: "Failed to join the room" });
    }

    const eventKey = joinBoardKey(player.boardId);

    const message = { roomId, player };

    res?.socket?.server?.io?.emit(eventKey, message);

    const players = await getPlayersByRoomId({ roomId });

    const others = players.filter((p) => p.id !== player.id);

    res.status(200).json({ player, others });
  } catch (error: any) {
    return res.status(400).json({ message: error?.message });
  }
};

export default joinRoomHandler;
