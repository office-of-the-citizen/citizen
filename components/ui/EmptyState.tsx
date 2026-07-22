import { Icon } from "@/presentation/icons/Icon";
import type { IconAlias } from "@/presentation/icons/registry";
import type { StatusTone } from "@/presentation/status/registry";
import { TONE_CLASSES } from "@/presentation/status/registry";
import { cn } from "@/lib/cn";

/**
 * EmptyState — the one designed absence.
 *
 * Unreachable records, quiet inboxes and missing truth all speak with the
 * same calm voice: an icon in a soft tone, a plain-language heading, and an
 * honest explanation. Never a blank region, never an error scream.
 */
export function EmptyState({
  icon,
  tone = "unknown",
  title,
  body,
  action,
  className,
}: {
  icon: IconAlias;
  /** Constitutional tone of the absence — verified green for calm promises,
   * unknown grey for governed silence. */
  tone?: StatusTone | "primary";
  title: string;
  body: React.ReactNode;
  /** Optional doorway out (a Link or button). */
  action?: React.ReactNode;
  className?: string;
}) {
  const toneClasses =
    tone === "primary"
      ? "bg-primary-soft text-primary"
      : cn(TONE_CLASSES[tone].soft, TONE_CLASSES[tone].text);

  return (
    <div className={cn("flex flex-col items-center px-6 text-center", className)}>
      <span
        className={cn("flex h-14 w-14 items-center justify-center rounded-2xl", toneClasses)}
      >
        <Icon name={icon} size={26} />
      </span>
      <h2 className="mt-4 text-lg font-bold text-ink">{title}</h2>
      <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-ink-soft">{body}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
