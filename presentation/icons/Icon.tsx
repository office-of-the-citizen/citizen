import { iconGlyph, type IconAlias } from "./registry";

export function Icon({
  name,
  size = 24,
  className,
  strokeWidth,
}: {
  name: IconAlias;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      style={strokeWidth ? ({ strokeWidth } as React.CSSProperties) : undefined}
    >
      {iconGlyph(name)}
    </svg>
  );
}
