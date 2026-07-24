import Link from "next/link";
import { Icon } from "@/presentation/icons/Icon";

/**
 * Office entry card — quiet doorway to the Public Offices hub.
 * Same pattern as ParticipateCard. Shown on the home page and explore flow.
 */
export function OfficeEntryCard() {
  return (
    <Link
      href="/offices"
      className="pressable-subtle block rounded-card bg-surface p-4 shadow-card transition-colors duration-quick ease-out hover:shadow-card-hover"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
          <Icon name="landmark" size={20} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-bold text-ink">
            Explore Public Offices
          </p>
          <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">
            Federal, State, and Local government offices — their roles, responsibilities, and records.
          </p>
        </div>
        <Icon name="chevron-right" size={16} className="shrink-0 text-ink-faint" />
      </div>
    </Link>
  );
}
