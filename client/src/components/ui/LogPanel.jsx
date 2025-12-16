import { useEffect, useRef } from "react";
import clsx from "clsx";

const LEVEL_COLORS = {
  info: "text-terminalMuted",
  warn: "text-warning",
  error: "text-error",
};

function formatTime(ts) {
  const date = new Date(ts);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function LogPanel({
  logs = [],
  maxHeight = "200px",
  className,
}) {
  const containerRef = useRef(null);

 
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div
      ref={containerRef}
      style={{ maxHeight }}
      className={clsx(
        `
        w-full
        overflow-y-auto
        bg-bg
        font-mono
        text-[10px] sm:text-xs
        leading-relaxed
        `,
        className
      )}
    >
      {logs.map((raw, index) => {
        const entry =
          typeof raw === "string"
            ? {
                message: raw,
                level: "info",
                time: Date.now(),
              }
            : {
                level: "info",
                ...raw,
                time: raw.time ?? Date.now(),
              };

        return (
          <div
            key={`${entry.time}-${index}`}
            className={clsx(
              `
              flex items-start gap-1
              py-0.5 px-1
              `,
              LEVEL_COLORS[entry.level]
            )}
          >
     
            <span className="opacity-60 shrink-0 tabular-nums">
              [{formatTime(entry.time)}]
            </span>
            {"~$"}
            <span className="whitespace-pre-wrap break-words">
              {entry.message}
            </span>
          </div>
        );
      })}
    </div>
  );
}
