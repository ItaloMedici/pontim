import { ResponseWithSocket } from "@/types/response-with-socket";
import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as SocketServer } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: ResponseWithSocket) => {
  console.log("Socket server handler", res.socket.server);
  if (!res.socket.server.io) {
    const path = "/api/socket";
    const httpServer = res.socket.server as unknown as NetServer;
    const io = new SocketServer(httpServer, {
      path,
      addTrailingSlash: false,
    });
    console.log("Socket server created", io, httpServer);
    res.socket.server.io = io;
  }

  res.end();
};

export default ioHandler;
