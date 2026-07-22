"use client";

/**
 * DemandIndicator — shows collective demand on an unknown or silent subject.
 *
 * Renders the number of citizens who have asked about a governed subject,
 * and offers the viewer a one-tap way to join that demand. Teaches the
 * citizen that silence is shared, and that asking together strengthens the
 * public record.
 */
import Link from "next/link";
import { Icon } from "@/presentation/icons/Icon";
import { cn } from "@/lib/cn";

interface DemandIndicatorProps {
  /** CRN of the subject being demanded. */
  subjectRef: string;
  /** Current demand count. */
  count: number;
}

export function DemandIndicator({ subjectRef, count }: DemandIndicatorProps) {
  if (count <= 0) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-2xl",
        "bg-surface-sunken px-3.5 py-2.5",
      )}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
        <Icon name="people" size={14} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-semibold leading-snug text-ink-soft">
          {count === 1
            ? "1 citizen has asked this question"
            : `${count.toLocaleString()} citizens have asked this question`}
        </p>
      </div>
      <Link
        href={`/participate/question?subject=${encodeURIComponent(subjectRef)}`}
        className={cn(
          "pressable-subtle shrink-0 rounded-chip bg-primary-soft px-3 py-1.5",
          "text-[11px] font-bold text-primary transition-colors",
          "hover:bg-primary hover:text-white",
        )}
      >
        Join
      </Link>
    </div>
  );
}
