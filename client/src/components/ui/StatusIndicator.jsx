const STATUS_COLORS = {
  online: "text-terminal",
  idle: "text-warning",
  offline: "text-error",
};

export default function StatusIndicator({ status = "online", label }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`
          ${STATUS_COLORS[status]}
          animate-pulseSlow
        `}
      >
        ●
      </span>
      {label && <span className="text-terminalMuted">{label}</span>}
    </div>
  );
}
