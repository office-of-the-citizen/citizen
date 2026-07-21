import type { Metadata } from "next";
import { breadcrumb, getBySlug } from "@office-of-the-citizen/caos-sdk";

import { SPECIMEN_RECORD } from "@/sdk/fixtures/specimen";
import { LgaProfileTemplate } from "@/components/lga/LgaProfileTemplate";

/**
 * Template verification surface. Permanent shell from snapshot + sample truth.
 */
export const metadata: Metadata = {
  title: "Design specimen",
  robots: { index: false, follow: false },
};

export default function SpecimenPage() {
  const permanent =
    getBySlug(SPECIMEN_RECORD.slug) ??
    getBySlug("lg-oy-ibadan-north") ??
    null;
  if (!permanent) {
    return (
      <p className="p-8 text-center text-sm text-ink-soft">
        Specimen permanent object unavailable in snapshot.
      </p>
    );
  }
  const chain = breadcrumb(permanent.canonical_id);

  return (
    <div className="relative">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 mx-auto w-full max-w-md">
        <p className="bg-accent-amber px-4 py-1.5 text-center text-[11px] font-bold uppercase tracking-wide text-white">
          Design specimen — sample data, not a public record
        </p>
      </div>
      <LgaProfileTemplate permanent={permanent} breadcrumb={chain} truth={SPECIMEN_RECORD} />
    </div>
  );
}
