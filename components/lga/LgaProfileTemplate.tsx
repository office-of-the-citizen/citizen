import type { PermanentSpatialObject } from "@office-of-the-citizen/caos-sdk";
import type { PublicRecord } from "@/sdk/contracts";
import { Icon } from "@/presentation/icons/Icon";
import { IdentityHeader } from "./IdentityHeader";
import { ChairmanCard } from "./ChairmanCard";
import { RelationshipRow } from "./RelationshipRow";
import { BudgetCard } from "./BudgetCard";
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
      <div className="relative -mt-9 rounded-t-[1.75rem] bg-white">
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
              <ActivityTimeline record={truth} />
              <CivicJourney record={truth} />
              <p className="px-2 pb-2 pt-1 text-center text-[10px] leading-relaxed text-ink-faint">
                Public record built{" "}
                {new Date(truth.provenance.built_at).toLocaleDateString("en-NG", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
                {" · "}
                {truth.provenance.build_input_hash.slice(0, 19)}…
              </p>
            </>
          ) : (
            <div className="rounded-2xl bg-white px-4 py-6 text-center shadow-sm ring-1 ring-black/[0.04]">
              <p className="text-sm font-semibold text-ink">Live constitutional truth unavailable</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
                Place identity and permanent statistics are shown from the published
                geography snapshot. Chairman, representatives, and population will
                appear when the operating system is reachable.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
