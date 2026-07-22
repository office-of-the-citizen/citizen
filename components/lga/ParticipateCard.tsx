import Link from "next/link";
import { Icon } from "@/presentation/icons/Icon";

/**
 * ParticipateCard — quiet doorway to constitutional participation.
 *
 * Shown at the bottom of every LGA profile, whether truth is available
 * or not. Invites the citizen to ask questions or request information
 * about their local government. Never shouts — always offers.
 */
export function ParticipateCard({ slug }: { slug: string }) {
  return (
    <Link
      href={`/participate?subject=${encodeURIComponent(slug)}`}
      className="pressable-subtle block rounded-card bg-surface p-4 shadow-card transition-colors duration-quick ease-out hover:shadow-card-hover"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
          <Icon name="hand-raise" size={20} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-bold text-ink">
            Ask questions about this LGA
          </p>
          <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">
            Request information, submit contributions, or challenge a record.
          </p>
        </div>
        <Icon name="chevron-right" size={16} className="shrink-0 text-ink-faint" />
      </div>
    </Link>
  );
}
