import { useEffect } from "react";
import clsx from "clsx";
import TerminalPanel from "./TerminalPanel";

export default function ModalShell({
  open,
  title,
  children,
  onClose,
  closeOnOverlay = true,
  className,
}) {
  
  useEffect(() => {
    if (!open) return;

    const handleKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        p-3 sm:p-6
      "
    >
      {/* Overlay */}
      <div
        className="
          absolute inset-0
          bg-black/70
          backdrop-blur-[1px]
        "
        onClick={closeOnOverlay ? onClose : undefined}
      />

      {/* Modal */}
      <div
        className={clsx(
          `
          relative z-10
          w-full
          max-w-sm sm:max-w-lg
          max-h-[90vh]
          `,
          className
        )}
      >
        <TerminalPanel>
          {/* Header */}
          <div
            className="
              flex items-center justify-between
              px-2 py-1
              sm:px-3 sm:py-2
              border-b border-borderGreen
              text-[10px] sm:text-xs
              text-terminalMuted
              truncate
            "
          >
            <span className="truncate">{title}</span>

            <button
              onClick={onClose}
              className="
                ml-2
                text-terminalMuted
                hover:text-terminal
                transition-colors
                select-none
              "
            >
              [ X ]
            </button>
          </div>

          {/* Body */}
          <div
            className="
              p-3 sm:p-4
              overflow-y-auto
              max-h-[70vh]
            "
          >
            {children}
          </div>
        </TerminalPanel>
      </div>
    </div>
  );
}
