import { useWebSocket } from "../context/WebSocketContext";
import TradeButton from "./TradeButton";

export default function TradeDetails() {
  const { message } = useWebSocket();
  return (
    <div className="flex bg-gray-200 flex-col p-8 gap-4 w-full">
      <div className="font-bold"> Your Trade Details</div>
      <div className="overflow-x-auto">
        <pre>{message}</pre>
      </div>
      <div className="flex-1" />
      <TradeButton />
    </div>
  );
}
