import { ResponseWithSocket } from "@/types/response-with-socket";
import { leaveBoardKey } from "@/use-cases/event-keys/board";
import { getPlayersByRoomId } from "@/use-cases/player/get-players-by-roomId";
import { leaveBoard } from "@/use-cases/player/leave-board";
import { NextApiRequest } from "next";

const leaveRoom = async (req: NextApiRequest, res: ResponseWithSocket) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { boardId, playerId, roomId } = req.body;

    if (!boardId || !playerId || !roomId) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const player = await leaveBoard({ boardId, playerId });

    const eventKey = leaveBoardKey(roomId);

    const message = { roomId, player };

    res?.socket?.server?.io?.emit(eventKey, message);

    const players = await getPlayersByRoomId({ roomId });

    const others = players.filter((p) => p.id !== player.id);

    res.status(200).json({ player, others });
  } catch (error: any) {
    return res.status(400).json({ message: error?.message });
  }
};
