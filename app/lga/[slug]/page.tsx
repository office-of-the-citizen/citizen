import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { projectionSource } from "@/sdk/source";
import { LgaProfileTemplate } from "@/components/lga/LgaProfileTemplate";

export const dynamic = "force-dynamic";

interface Params {
  params: { slug: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const record = await projectionSource().getRecord("lga", params.slug);
  if (!record) return { title: "Not found" };
  const owner = record.display.owner?.name;
  return {
    title: `${record.display.subject_name}${owner ? `, ${owner}` : ""}`,
    description: `The constitutional profile of ${record.display.subject_name}.`,
  };
}

export default async function LgaProfilePage({ params }: Params) {
  const record = await projectionSource().getRecord("lga", params.slug);
  if (!record) notFound();
  return <LgaProfileTemplate record={record} />;
}
