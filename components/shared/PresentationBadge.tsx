/**
 * Renders a verification/recognition chip EXACTLY as projected by the OS.
 * The application never chooses badge wording or colour — both arrive on the
 * projection (IR-C1: no marketing “Verified by CAOS”; the OS decides labels).
 */
import type { BadgePresentation } from "@/sdk/contracts";
import { Icon } from "@/presentation/icons/Icon";

export function PresentationBadge({ badge }: { badge: BadgePresentation }) {
  const positive = badge.badge_code === "BADGE_VERIFIED";
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-chip px-3 py-1 text-[11px] font-bold uppercase tracking-wide"
      style={{ color: badge.colour_hex, backgroundColor: `${badge.colour_hex}1a` }}
    >
      <Icon name={positive ? "seal-check" : "info"} size={13} strokeWidth={2.5} />
      {badge.label}
    </span>
  );
}
