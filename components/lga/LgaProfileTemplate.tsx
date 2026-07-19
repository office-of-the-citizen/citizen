import type { PublicRecord } from "@/sdk/contracts";
import { Icon } from "@/presentation/icons/Icon";
import { IdentityHeader } from "./IdentityHeader";
import { ChairmanCard } from "./ChairmanCard";
import { RelationshipRow } from "./RelationshipRow";
import { BudgetCard } from "./BudgetCard";
import { ActivityTimeline } from "./ActivityTimeline";
import { CivicJourney } from "./CivicJourney";

/**
 * THE stable Local Government template.
 *
 * One template for all 774 LGAs — it never branches on identity, only on
 * projected constitutional state. New truth domains (projects, procurement,
 * audits…) plug into new regions without redesign.
 */
export function LgaProfileTemplate({ record }: { record: PublicRecord }) {
  const name = record.display.subject_name;

  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-surface-sunken pb-32">
      <IdentityHeader record={record} />

      {/* Rounded sheet overlapping the hero */}
      <div className="relative -mt-9 rounded-t-[1.75rem] bg-surface-sunken">
        {/* Section banner */}
        <div className="flex items-center gap-2.5 px-4 pb-3 pt-5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
            <Icon name="people" size={16} strokeWidth={2.4} />
          </span>
          <p className="truncate text-[13px] font-bold text-ink">
            People responsible for {name}
          </p>
        </div>

        <div className="space-y-4 px-4">
          <ChairmanCard record={record} />
          <RelationshipRow record={record} />
          <BudgetCard record={record} />
          <ActivityTimeline record={record} />
          <CivicJourney record={record} />

          {/* Provenance — almost invisible, per doctrine */}
          <p className="px-2 pb-2 pt-1 text-center text-[10px] leading-relaxed text-ink-faint">
            Public record built{" "}
            {new Date(record.provenance.built_at).toLocaleDateString("en-NG", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
            {" · "}
            {record.provenance.build_input_hash.slice(0, 19)}…
          </p>
        </div>
      </div>
    </div>
  );
}
