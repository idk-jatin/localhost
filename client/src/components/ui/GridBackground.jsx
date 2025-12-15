import clsx from "clsx";

const DENSITY_MAP = {
  low: 80,
  medium: 50,
  high: 30,
};

export default function GridBackground({
  density = "low",
  className,
}) {
  const size = DENSITY_MAP[density] || DENSITY_MAP.low;

  return (
    <div
      className={clsx(
        `
        pointer-events-none
        absolute inset-0
        z-0
        `,
        className
      )}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(34,197,94,0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(34,197,94,0.08) 1px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`,
        animation: "grid-drift 60s linear infinite",
      }}
    />
  );
}
