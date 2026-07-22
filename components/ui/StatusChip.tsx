"use client";

/**
 * StatusChip — renders a verification/recognition posture EXACTLY as
 * projected by the OS (IR-C1: the OS decides labels), styled through the
 * constitutional status tokens.
 *
 * The OS's colour_role picks the token family; the projected colour_hex is
 * only a fallback for roles this application does not know yet — governed
 * codes never render unstyled.
 *
 * With `interactive`, the chip becomes a tap target that opens the status
 * education sheet — every status teaches itself. Leave it off when the chip
 * sits inside another pressable surface (no nested buttons).
 */
import { useState } from "react";

import type { BadgePresentation } from "@/sdk/contracts";
import { Icon } from "@/presentation/icons/Icon";
import { statusEducation, statusTone } from "@/presentation/status/registry";
import { StatusSheet } from "./StatusSheet";
import { cn } from "@/lib/cn";

export function StatusChip({
  badge,
  interactive = false,
  className,
}: {
  badge: BadgePresentation | null | undefined;
  /** Tap opens the status education sheet. */
  interactive?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  if (!badge) return null;
  const known = Boolean(badge.badge_code || badge.colour_role);
  const code = badge.badge_code ?? badge.colour_role;
  const tone = statusTone(code);
  const education = statusEducation(code);

  const chipClasses = cn(
    "inline-flex items-center gap-1.5 rounded-chip px-3 py-1 text-[11px] font-bold uppercase tracking-label",
    known && tone.text,
    known && tone.soft,
    className,
  );
  const chipStyle = known
    ? undefined
    : { color: badge.colour_hex, backgroundColor: `${badge.colour_hex}1a` };

  if (!interactive) {
    return (
      <span className={chipClasses} style={chipStyle}>
        <Icon name={education.icon} size={13} strokeWidth={2.5} />
        {badge.label}
      </span>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${badge.label} — learn what this status means`}
        className={cn(chipClasses, "pressable cursor-pointer")}
        style={chipStyle}
      >
        <Icon name={education.icon} size={13} strokeWidth={2.5} />
        {badge.label}
        <Icon name="info" size={12} strokeWidth={2.5} className="opacity-60" />
      </button>
      <StatusSheet badge={badge} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
