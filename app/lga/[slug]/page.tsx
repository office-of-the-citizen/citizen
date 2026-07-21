import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { breadcrumb, getBySlug } from "@office-of-the-citizen/caos-sdk";

import { projectionSource } from "@/sdk/source";
import { LgaProfileTemplate } from "@/components/lga/LgaProfileTemplate";

/**
 * Permanent-first LGA page.
 * 1. Resolve place from SDK permanent snapshot (sync, no network).
 * 2. Overlay CAOS truth when available (network; may fail).
 * Missing truth does not 404 — only missing permanent identity does.
 */
export const dynamic = "force-dynamic";

interface Params {
  params: { slug: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const permanent = getBySlug(params.slug);
  if (!permanent) return { title: "Not found" };
  const chain = breadcrumb(permanent.canonical_id);
  const owner = chain.find((b) => b.classification === "STATE")?.primary_name;
  return {
    title: `${permanent.primary_name}${owner ? `, ${owner}` : ""}`,
    description: `The constitutional profile of ${permanent.primary_name}.`,
  };
}

export default async function LgaProfilePage({ params }: Params) {
  const permanent = getBySlug(params.slug);
  if (!permanent) notFound();

  const chain = breadcrumb(permanent.canonical_id);
  let truth = null;
  try {
    truth = await projectionSource().getRecord("lga", params.slug);
  } catch {
    truth = null;
  }

  return (
    <LgaProfileTemplate permanent={permanent} breadcrumb={chain} truth={truth} />
  );
}
