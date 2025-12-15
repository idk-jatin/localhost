import { useEffect, useState } from "react";

import StatusIndicator from "./StatusIndicator";

export default function SystemBar({ version = "v0.1.0" }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const clock = setInterval(updateTime, 1000);
    return () => clearInterval(clock);
  }, []);

  return (
    <div
      className="
        w-full h-10
        flex items-center
        px-4
        bg-bg
        border-b border-borderGreen
        font-mono text-xs text-terminalMuted
        select-none
      "
    >
      <div className="flex items-center gap-3 flex-1">
        <span className="text-terminal  sm:inline">LOCALHOST</span>
        <span className="opacity-60  sm:inline">{version}</span>
      </div>

      <div className="flex items-center gap-4 flex-1 justify-end">
        <StatusIndicator status="online" label="ONLINE" />
        <span className="hidden sm:inline">{time}</span>
      </div>
    </div>
  );
}
