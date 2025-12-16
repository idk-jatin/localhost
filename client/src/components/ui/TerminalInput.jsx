import { forwardRef, useState } from "react";
import clsx from "clsx";

const TerminalInput = forwardRef(function TerminalInput(
  {
    prompt = ">",
    type = "text",
    disabled = false,
    autoFocus = false,
    className,
    error,
    ...rest
  },
  ref
) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={clsx(
        "flex items-center gap-3 font-mono text-sm",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <span className="text-terminal select-none min-w-[4.2rem]" >{prompt}</span>
      {">"}
      <div
        className={clsx(
          `
          flex-1
          px-2 py-1
          bg-bg
          border`,error? "border-error":"border-borderGreen",
          focused && (error? "shadow-terminalError": "shadow-terminalFocus")
        )}
      >
        <input
          ref={ref}
          type={type}
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
          {...rest}
        />
      </div>
    </div>
  );
});

export default TerminalInput;
