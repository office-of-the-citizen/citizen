import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBySlug } from "@office-of-the-citizen/caos-sdk";
import type { ContextEntry } from "@office-of-the-citizen/caos-sdk";
import * as fs from "fs";
import * as path from "path";

import { getOfficeConfig } from "@/presentation/offices/registry";
import { OfficeProfileTemplate } from "@/components/offices/OfficeProfileTemplate";

/**
 * Dynamic office profile page.
 * 1. Resolves OfficeConfig from registry by [level] + [office] slugs.
 * 2. Reads ?from= and ?district= query params for LGA context.
 * 3. Reads the LGA's projection file to find the SPECIFIC officeholder.
 * 4. Overrides the generic office holder with the projected person.
 *
 * This is how individuality works: the Senate page shows Godswill Akpabio
 * when visited directly, but shows YOUR senator when reached from your LGA.
 */
export const dynamic = "force-dynamic";

interface Params {
  params: { level: string; office: string };
  searchParams: { from?: string; district?: string };
}

/** Map office slug to the relationship label used in projections. */
const OFFICE_TO_LABEL: Record<string, string> = {
  senate: "Senator",
  house: "Representative",
  president: "President",
  governor: "Governor",
  chairman: "Chairman",
};

/** Path to the projection directory */
const PROJECTION_DIR = path.join(
  process.cwd(),
  "..",
  "CAOS",
  "runtime",
  "state",
  "projections",
  "prj_public_record"
);

/** Read an LGA projection file directly (avoids SDK import issues in dev) */
function readLgaProjection(slug: string): { context: ContextEntry[] } | null {
  try {
    const filePath = path.join(PROJECTION_DIR, "lga", `${slug}.json`);
    const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return raw as { context: ContextEntry[] };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const office = getOfficeConfig(params.level, params.office);
  if (!office) return { title: "Office not found" };
  return {
    title: `${office.shortTitle} — ${office.institution}`,
    description: `The constitutional profile of the ${office.title}. ${office.constitutionalBasis}.`,
  };
}

export default async function OfficeProfilePage({ params, searchParams }: Params) {
  const office = getOfficeConfig(params.level, params.office);
  if (!office) notFound();

  // Resolve LGA context from ?from= query param
  const fromSlug = searchParams?.from;
  const district = searchParams?.district;
  let lgaContext: { name: string; slug: string; district?: string } | null = null;
  let projectedHolder: { name: string | null; portrait: string | null; party?: string; detail?: string } | null = null;

  if (fromSlug) {
    const lga = getBySlug(fromSlug);
    if (lga) {
      lgaContext = { name: lga.primary_name, slug: fromSlug, district };

      // Read the LGA's projection file directly to find the SPECIFIC officeholder
      const truth = readLgaProjection(fromSlug);
      if (truth) {
        const targetLabel = OFFICE_TO_LABEL[params.office];
        if (targetLabel) {
          const entry = truth.context.find(
            (e: ContextEntry) => e.layout_slot === "RELATIONSHIPS" && e.label === targetLabel
          );
          if (entry?.display_name) {
            projectedHolder = {
              name: entry.display_name,
              portrait: entry.portrait_url ?? null,
              party: entry.party?.name ?? undefined,
              detail: entry.detail ?? undefined,
            };
          }
        }
      }
    }
  }

  // Override the generic office holder with the projected person
  const effectiveOffice = projectedHolder
    ? {
        ...office,
        holder: {
          ...office.holder,
          name: projectedHolder.name,
          portrait: projectedHolder.portrait,
          party: projectedHolder.party ?? office.holder.party,
          // Term dates remain from the generic config — projection doesn't carry them yet
        },
      }
    : office;

  return <OfficeProfileTemplate office={effectiveOffice} lgaContext={lgaContext} />;
}
