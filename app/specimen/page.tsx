import type { Metadata } from "next";

import { SPECIMEN_RECORD } from "@/sdk/fixtures/specimen";
import { LgaProfileTemplate } from "@/components/lga/LgaProfileTemplate";

/**
 * Template verification surface. Renders the stable LGA template with a
 * fully-populated SAMPLE projection so designers can compare against the
 * ratified visual specification. Clearly bannered; never linked from
 * navigation; excluded from indexing.
 */
export const metadata: Metadata = {
  title: "Design specimen",
  robots: { index: false, follow: false },
};

export default function SpecimenPage() {
  return (
    <div className="relative">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 mx-auto w-full max-w-md">
        <p className="bg-accent-amber px-4 py-1.5 text-center text-[11px] font-bold uppercase tracking-wide text-white">
          Design specimen — sample data, not a public record
        </p>
      </div>
      <LgaProfileTemplate record={SPECIMEN_RECORD} />
    </div>
  );
}
