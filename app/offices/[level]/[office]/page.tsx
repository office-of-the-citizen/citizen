import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getOfficeConfig } from "@/presentation/offices/registry";
import { OfficeProfileTemplate } from "@/components/offices/OfficeProfileTemplate";

/**
 * Dynamic office profile page.
 * 1. Resolves OfficeConfig from registry by [level] + [office] slugs.
 * 2. Renders OfficeProfileTemplate.
 *
 * Missing office → 404 via notFound().
 * When CAOS Engine begins projecting office records, this page will call
 * ProjectionSource.getRecord("office", slug) identically to how the LGA
 * page consumes LGA records.
 */
export const dynamic = "force-dynamic";

interface Params {
  params: { level: string; office: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const office = getOfficeConfig(params.level, params.office);
  if (!office) return { title: "Office not found" };
  return {
    title: `${office.shortTitle} — ${office.institution}`,
    description: `The constitutional profile of the ${office.title}. ${office.constitutionalBasis}.`,
  };
}

export default async function OfficeProfilePage({ params }: Params) {
  const office = getOfficeConfig(params.level, params.office);
  if (!office) notFound();

  return <OfficeProfileTemplate office={office} />;
}
