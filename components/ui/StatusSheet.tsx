"use client";

/**
 * StatusSheet — tap any status, learn the system.
 *
 * The sheet answers the citizen's first question immediately ("what does
 * Verified mean?") and lets curiosity unfold the rest one drawer at a time:
 * how the status is decided, then what it implies for the citizen. The copy
 * is civic education from the status registry — it explains the SYSTEM,
 * never a specific fact.
 */
import type { BadgePresentation } from "@/sdk/contracts";
import { Icon } from "@/presentation/icons/Icon";
import { statusEducation, statusTone } from "@/presentation/status/registry";
import { LayeredReveal } from "./LayeredReveal";
import { Sheet } from "./Sheet";
import { cn } from "@/lib/cn";

export function StatusSheet({
  badge,
  open,
  onClose,
}: {
  badge: BadgePresentation;
  open: boolean;
  onClose: () => void;
}) {
  const code = badge.badge_code ?? badge.colour_role;
  const education = statusEducation(code);
  const tone = statusTone(code);

  return (
    <Sheet open={open} onClose={onClose} label={`What “${badge.label}” means`}>
      <div className="px-5 pb-6 pt-2">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
              tone.soft,
              tone.text,
            )}
          >
            <Icon name={education.icon} size={22} strokeWidth={2.2} />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-label text-ink-faint">
              Status
            </p>
            <h2 className={cn("truncate text-lg font-extrabold tracking-display", tone.text)}>
              {badge.label}
            </h2>
          </div>
        </div>

        <p className="mt-4 text-[14px] leading-relaxed text-ink">{education.meaning}</p>

        <div className="mt-3">
          <LayeredReveal
            layers={[
              {
                key: "mechanics",
                title: `How “${badge.label}” is decided`,
                body: (
                  <p className="text-[13px] leading-relaxed text-ink-soft">
                    {education.mechanics}
                  </p>
                ),
              },
              {
                key: "implication",
                title: "What it means for you",
                body: (
                  <p className="text-[13px] leading-relaxed text-ink-soft">
                    {education.implication}
                  </p>
                ),
              },
            ]}
          />
        </div>
      </div>
    </Sheet>
  );
}
