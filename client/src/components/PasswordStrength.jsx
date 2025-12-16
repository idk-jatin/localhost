import { useRef } from "react";
import clsx from "clsx";

export default function PasswordStrengthBar({ score }) {
  const prevScore = useRef(score);

  const pulse = score > prevScore.current;
  prevScore.current = score;

  const labels = ["Weak", "Medium", "Strong"];
  const colors = [
    "bg-error",
    "bg-warning",
    "bg-terminal",
  ];

  return (
    <div className="mt-2 space-y-2  flex flex-col items-end">
      <div className="flex justify-end gap-2 ">
        {[2,1,0].map((i) => (
          <div
            key={i}
            className={clsx(
              "h-1 w-9  transition-all",
              i <= score
                ? colors[score]
                : "bg-transparent",
              pulse && i === score && "animate-terminalPulse"
            )}
          />
        ))}
      </div>

      <div className="font-mono text-xs  text-terminalMuted">
         $strength:{" "}
        <span
          className={clsx(
            score === 0 && "text-error",
            score === 1 && "text-warning",
            score === 2 && "text-terminal"
          )}
        >
          {labels[score]}
        </span>
      </div>
    </div>
  );
}
