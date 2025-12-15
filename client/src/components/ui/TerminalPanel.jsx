import clsx from "clsx";

export default function TerminalPanel({
  title,
  children,
  active = false,
  className,
}) {
  return (
    <div
      className={clsx(
        `
        w-full
        bg-bg
        border border-borderGreen
        font-mono text-terminal
        transition-all
        `,
        "text-xs sm:text-sm",

        active && "shadow-terminalFocus",

        className
      )}
    >
      {title && (
        <div
          className="
            px-2 py-1
            sm:px-3 sm:py-2
            border-b border-borderGreen
            text-[10px] sm:text-xs
            text-terminalMuted
            tracking-wide
            truncate
          "
        >
          {title}
        </div>
      )}

      <div
        className="
          p-3 sm:p-4
          overflow-x-auto
        "
      >
        {children}
      </div>
    </div>
  );
}
