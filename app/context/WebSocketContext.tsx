import { createContext, useContext, useEffect, useState } from "react";
import { ReactFC } from "../types/TReactFC";

type WebSocketContextType = {
  socket: WebSocket | null;
  message: string | null;
  userId: string | null;
};

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  message: null,
  userId: null,
});

export const WebSocketContextProvider: ReactFC = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  let activeUserId: string;

  useEffect(() => {
    const url =
      process.env.NODE_ENV == "development"
        ? "ws://localhost:9003"
        : "wss://ws.be.anbuksv.com";
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setMessage("WebSocket connection established");
    };

    ws.onmessage = function (event) {
      const { type, message, userId } = JSON.parse(event.data);
      if (!activeUserId) {
        activeUserId = userId;
        return setUserId(userId);
      }
      if (type == "string") return setMessage(message);
      return setMessage(event.data);
    };

    ws.onclose = () => {
      setMessage("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setSocket(ws);

    // return () => {
    //   ws.close();
    // };
  }, []);
  const contextValue: WebSocketContextType = {
    socket,
    message,
    userId,
  };
  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
