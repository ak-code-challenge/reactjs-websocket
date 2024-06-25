"use client";
import TradeButton from "./components/TradeButton";
import TradeDetails from "./components/TradeDetails";
import { WebSocketContextProvider } from "./context/WebSocketContext";

export default function Home() {
  return (
    <WebSocketContextProvider>
      <div className="h-lvh flex p-12 w-lvw">
        <TradeDetails />
      </div>
    </WebSocketContextProvider>
  );
}
