import { useState } from "react";
import { useWebSocket } from "../context/WebSocketContext";

export default function TradeButton() {
  const { userId, socket } = useWebSocket();
  const [isDisabled, setDisabled] = useState<boolean>(false);

  return (
    <div className="flex flex-2 items-end justify-center sticky">
      <button
        disabled={isDisabled}
        onClick={() => {
          setDisabled(true);
          socket?.send(userId || "");
          setTimeout(() => {
            setDisabled(false);
          }, 1000 * 4);
        }}
        type="button"
        className="w-full h-12 justify-center uppercase text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Trade
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </div>
  );
}
