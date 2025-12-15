import { useRef, useState } from "react";
import clsx from "clsx";

export default function TerminalInput({
  value,
  onChange,
  onKeyDown,
  prompt = ">",
  type = "text",
  disabled = false,
  autoFocus = false,
  className,
}) {
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={clsx(
        "flex items-center gap-3 font-mono text-sm",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Input Title */}
      <span className="text-terminal select-none min-w-[4.2rem]">{prompt}</span>
      {">"}
      {/* Input box */}
      <div
        className={clsx(
          `
          flex-1
          px-2 py-1
          bg-bg
          border border-borderGreen
          `,
          focused && "shadow-terminalFocus"
        )}
      >
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
          autoFocus={autoFocus}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="
            w-full
            bg-transparent
            outline-none
            border-none
            text-terminal
            caret-terminal
          "
        />
      </div>
    </div>
  );
}
