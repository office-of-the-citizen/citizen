/**
 * Constitutional checkmark — indicates the office holder is a recognised
 * constitutional object in the operating system. It is NOT a verification
 * badge and carries no text (Founder: verification belongs to claims, not
 * objects; CAOS remains invisible).
 */
import { cn } from "@/lib/cn";
import { Icon } from "@/presentation/icons/Icon";

export function ConstitutionalMark({
  accent = "green",
  size = 20,
  className,
}: {
  accent?: "green" | "blue";
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full text-white ring-2 ring-surface",
        accent === "blue" ? "bg-status-reference" : "bg-status-verified",
        className,
      )}
      style={{ width: size, height: size }}
      aria-label="Constitutionally recognised office holder"
      role="img"
    >
      <Icon name="check" size={size * 0.62} strokeWidth={3} />
    </span>
  );
}
