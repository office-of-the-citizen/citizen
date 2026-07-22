import Link from "next/link";

import type { PermanentSpatialObject } from "@office-of-the-citizen/caos-sdk";
import type { PublicRecord } from "@/sdk/contracts";
import { Icon } from "@/presentation/icons/Icon";
import { EmptyState } from "@/components/ui/EmptyState";
import { IdentityHeader } from "./IdentityHeader";
import { ChairmanCard } from "./ChairmanCard";
import { RelationshipRow } from "./RelationshipRow";
import { BudgetCard } from "./BudgetCard";
import { AllocationSplitCard } from "./AllocationSplitCard";
import { MonthlyAllocationCard } from "./MonthlyAllocationCard";
import { ActivityTimeline } from "./ActivityTimeline";
import { CivicJourney } from "./CivicJourney";
import { StatisticsBar, buildStatisticsCells } from "./StatisticsBar";
import { populationFromTruth } from "@/lib/truth-facts";

/**
 * THE stable Local Government template.
 *
 * Permanent shell (name, hierarchy, area, wards, PUs) comes from the SDK
 * distribution of the Engine 10 permanent snapshot. Live truth (chairman,
 * relationships, population, budget…) overlays when CAOS is available.
 *
 * One template for all 774 LGAs — it never branches on identity, only on
 * projected constitutional state. Missing truth does not collapse the page.
 */
export function LgaProfileTemplate({
  permanent,
  breadcrumb,
  truth,
}: {
  permanent: PermanentSpatialObject;
  breadcrumb: PermanentSpatialObject[];
  truth: PublicRecord | null;
}) {
  const name = truth?.display.subject_name ?? permanent.primary_name;
  const banner = truth?.vocabulary?.PEOPLE_RESPONSIBLE?.replace("{name}", name);

  const pop = populationFromTruth(truth);
  const stats = buildStatisticsCells({
    population: pop.value,
    areaKm2: permanent.area_km2,
    wardCount: permanent.ward_count,
    pollingUnitCount: permanent.polling_unit_count,
  });

  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-surface-sunken pb-32">
      <IdentityHeader permanent={permanent} breadcrumb={breadcrumb} truth={truth} />

      {/* Rounded sheet overlapping the hero — white surface per reference */}
      <div className="relative -mt-9 rounded-t-sheet bg-surface">
        <div className="px-4 pb-4 pt-5">
          <StatisticsBar cells={stats} />
        </div>

        {banner ? (
          <div className="flex items-center gap-2.5 px-4 pb-3 pt-1">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Icon name="people" size={16} strokeWidth={2.4} />
            </span>
            <p className="truncate text-[13px] font-bold text-ink">{banner}</p>
          </div>
        ) : null}

        <div className="space-y-4 bg-surface-sunken px-4 pb-2 pt-3">
          {truth ? (
            <>
              <ChairmanCard record={truth} />
              <RelationshipRow record={truth} />
              <BudgetCard record={truth} />
              <AllocationSplitCard />
              <MonthlyAllocationCard record={truth} />
              <ActivityTimeline record={truth} />
              <CivicJourney record={truth} />
              <RecordFootnote truth={truth} />
            </>
          ) : (
            <div className="rounded-card bg-surface py-6 shadow-card">
              <EmptyState
                icon="document"
                tone="unknown"
                title="The record is not yet complete"
                body="Place identity and permanent statistics are shown. Chairman, representatives, budget and population will appear here as the constitutional record is built."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Quiet doorway to the full constitutional record. Provenance renders
 * verbatim; the link rewards the curious without shouting at anyone else.
 */
function RecordFootnote({ truth }: { truth: PublicRecord }) {
  return (
    <Link
      href={`/lga/${truth.slug}/record`}
      className="pressable-subtle mx-auto flex min-h-tap w-fit items-center gap-2 rounded-chip px-4 py-2 text-[11px] leading-relaxed text-ink-faint transition-colors duration-quick ease-out hover:text-ink-soft"
    >
      <Icon name="shield" size={13} className="shrink-0 text-primary/60" />
      <span>
        Constitutional record compiled{" "}
        {new Date(truth.provenance.built_at).toLocaleDateString("en-NG", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </span>
      <Icon name="chevron-right" size={12} className="shrink-0" />
    </Link>
  );
}
