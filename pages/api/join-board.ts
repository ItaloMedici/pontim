"use server";

import { authOptions } from "@/authOptions";
import { ResponseWithSocket } from "@/types/response-with-socket";
import { joinBoardKey } from "@/use-cases/event-keys/board";
import { getPlayersByBoardId } from "@/use-cases/player/get-players-by-board-id";
import { joinOrCreateBoardAsPlayer } from "@/use-cases/player/join-or-create-board-as-player";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";

const joinRoomHandler = async (
  req: NextApiRequest,
  res: ResponseWithSocket
) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { roomId } = req.body;

    const session = await getServerSession(req, res, authOptions);

    if (!session?.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const player = await joinOrCreateBoardAsPlayer({
      roomId: roomId,
      user: session.user,
    });

    if (!player) {
      return res.status(500).json({ message: "Failed to join the room" });
    }

    const eventKey = joinBoardKey(player.boardId);

    const message = { roomId, player };

    res?.socket?.server?.io?.emit(eventKey, message);

    const players = await getPlayersByBoardId({
      boardId: player.boardId,
    });

    const others = players?.filter((p) => p.id !== player.id);

    res.status(200).json({ player, others });
  } catch (error: any) {
    console.error(`Error joining room: ${error?.message}`);
    return res
      .status(400)
      .json({ message: `Error joining room: ${error?.message}` });
  }
};

export default joinRoomHandler;
