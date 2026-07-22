import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { breadcrumb, getBySlug } from "@office-of-the-citizen/caos-sdk";

import { projectionSource } from "@/sdk/source";
import { EmptyState } from "@/components/ui/EmptyState";
import { ConstitutionalRecord } from "@/components/truth/ConstitutionalRecord";

/**
 * The dedicated constitutional record — the deepest layer of the reveal
 * journey. Everything here is the projection rendered verbatim: questions,
 * answers, claims, evidence, provenance. The page a curious citizen earns.
 */
export const dynamic = "force-dynamic";

interface Params {
  params: { slug: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const permanent = getBySlug(params.slug);
  if (!permanent) return { title: "Not found" };
  return { title: `Constitutional record — ${permanent.primary_name}` };
}

export default async function RecordPage({ params }: Params) {
  const permanent = getBySlug(params.slug);
  if (!permanent) notFound();

  const chain = breadcrumb(permanent.canonical_id);
  let truth = null;
  try {
    truth = await projectionSource().getRecord("lga", params.slug);
  } catch {
    truth = null;
  }

  if (!truth) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-surface-sunken pb-32 pt-safe-t">
        <EmptyState
          icon="document"
          tone="unknown"
          title="The constitutional record is unreachable"
          body={
            <>
              {permanent.primary_name}&rsquo;s permanent identity is safe. The live record
              will reappear when the operating system is reachable.
            </>
          }
          action={
            <Link
              href={`/lga/${params.slug}`}
              className="pressable rounded-chip bg-primary px-5 py-2.5 text-[13px] font-bold text-white"
            >
              Back to {permanent.primary_name}
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <ConstitutionalRecord permanent={permanent} breadcrumb={chain} record={truth} />
  );
}
