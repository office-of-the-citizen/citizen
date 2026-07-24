import { InstitutionSealArt } from "@/presentation/placeholders/art";
import type { OfficeLevel } from "@/presentation/offices/types";

/**
 * Institution badge — compact seal + name for institutional branding.
 * Used in hub cards and profile headers.
 */
export function InstitutionBadge({
  label,
  level,
}: {
  label: string;
  level: OfficeLevel;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full">
        <InstitutionSealArt label={label} level={level} />
      </div>
      <span className="text-[12px] font-semibold text-ink-soft">{label}</span>
    </div>
  );
}
