import clsx from "clsx";

export default function TerminalButton({
  children,
  onClick,
  type = "button",
  variant = "default",
  disabled = false,
  className,
}) {
  const isDanger = variant === "danger";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        `
        inline-flex items-center justify-center
        px-2 sm:px-3
        py-1 sm:py-1.5
        bg-bg
        border
        font-mono
        text-xs sm:text-sm
        transition-all
        select-none
        `,
        isDanger
          ? "border-error text-error"
          : "border-borderGreen text-terminal",

        !disabled &&
          (isDanger
            ? "hover:bg-error hover:text-black hover:border-error"
            : "hover:bg-terminal hover:text-black hover:border-terminal"),

        !disabled && "active:shadow-terminalFocus active:translate-y-[1px]",

        disabled && "opacity-40 cursor-not-allowed",

        className
      )}
    >
      <span className="whitespace-nowrap">[ {children} ]</span>
    </button>
  );
}
