import { env } from "@/env";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";

type SocketClientContextProps = {
  isConnected: boolean;
  socket: Socket | null;
};

const SocketClientContext = createContext<SocketClientContextProps>({
  isConnected: false,
  socket: null,
});

export const useSocketClient = () => {
  return useContext(SocketClientContext);
};

export const SocketClientProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const socketIo: Socket = new (io as any)(env.NEXT_PUBLIC_SITE_URL, {
      path: "/api/socket",
      addTraillingSlash: false,
    });

    socketIo.on("connect", () => {
      setIsConnected(true);
    });

    socketIo.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return (
    <SocketClientContext.Provider value={{ isConnected, socket }}>
      {children}
    </SocketClientContext.Provider>
  );
};
