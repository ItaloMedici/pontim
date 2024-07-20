import { authOptions } from "@/authOptions";
import { ResponseWithSocket } from "@/types/response-with-socket";
import { leaveBoard } from "@/use-cases/board/leave-board";
import { leaveBoardKey } from "@/use-cases/event-keys/board";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";

const leaveBoardHandler = async (
  req: NextApiRequest,
  res: ResponseWithSocket
) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { boardId, playerId, roomId } = req.body;

    const session = await getServerSession(req, res, authOptions);

    if (!session?.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!boardId || !playerId || !roomId) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const player = await leaveBoard({ boardId, playerId, user: session?.user });

    const eventKey = leaveBoardKey(roomId);

    const message = { roomId, player };

    res?.socket?.server?.io?.emit(eventKey, message);

    res.status(200).json({ message: "Succefully leave board" });
  } catch (error: any) {
    return res.redirect("/");
  }
};

export default leaveBoardHandler;
