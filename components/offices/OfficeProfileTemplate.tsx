import type { OfficeConfig } from "@/presentation/offices/types";
import { OfficeIdentityHeader } from "./OfficeIdentityHeader";
import { OfficeHolderCard } from "./OfficeHolderCard";
import { ResponsibilitiesSection } from "./ResponsibilitiesSection";
import { OfficeMetricsGrid } from "./OfficeMetricsGrid";
import { OfficeEducationCard } from "./OfficeEducationCard";
import { CitizenQuestionsCard } from "./CitizenQuestionsCard";
import { CommitmentsTimeline } from "./CommitmentsTimeline";
import { OfficeTimeline } from "./OfficeTimeline";
import { RightToKnowCard } from "./RightToKnowCard";

/**
 * THE stable Office template — config-driven, renders any office from
 * President to Councillor. One template, many offices. It never branches
 * on identity, only on configuration shape.
 *
 * Mirrors LgaProfileTemplate structure:
 *   OfficeIdentityHeader → rounded sheet → OfficeHolderCard →
 *   ResponsibilitiesSection → OfficeMetricsGrid → OfficeTimeline →
 *   CommitmentsTimeline → OfficeEducationCard → CitizenQuestionsCard →
 *   RightToKnowCard
 *
 * When CAOS Engine begins projecting office records, the template will
 * consume them identically to how LgaProfileTemplate consumes LGA records.
 */
export function OfficeProfileTemplate({ office }: { office: OfficeConfig }) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-surface-sunken pb-32">
      <OfficeIdentityHeader office={office} />

      {/* Rounded sheet overlapping the hero — white surface per reference */}
      <div className="relative -mt-9 rounded-t-sheet bg-surface">
        <div className="space-y-4 bg-surface-sunken px-4 pb-2 pt-5">
          <OfficeHolderCard
            holder={office.holder}
            officeTitle={office.shortTitle}
            verificationLabel={office.verificationLabel}
            verificationCode={office.verificationCode}
          />

          <ResponsibilitiesSection responsibilities={office.responsibilities} />

          <OfficeMetricsGrid groups={office.metricGroups} />

          <OfficeTimeline entries={office.timeline} officeTitle={office.shortTitle} />

          <CommitmentsTimeline commitments={office.commitments} />

          <OfficeEducationCard education={office.education} />

          <CitizenQuestionsCard
            data={office.citizenQuestions}
            officeSlug={`${office.level}/${office.slug}`}
          />

          <RightToKnowCard
            items={office.rightToKnow}
            officeInstitution={office.institution}
          />

          <OfficeFootnote office={office} />
        </div>
      </div>
    </div>
  );
}

/**
 * Quiet note about the constitutional basis and provenance of this office
 * profile. Links to the constitutional section that establishes this office.
 */
function OfficeFootnote({ office }: { office: OfficeConfig }) {
  return (
    <div className="mx-auto flex min-h-tap w-fit items-center gap-2 rounded-chip px-4 py-2 text-[11px] leading-relaxed text-ink-faint">
      <span className="shrink-0 text-primary/60">⚖</span>
      <span>
        {office.constitutionalBasis}
      </span>
    </div>
  );
}
