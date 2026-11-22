import { UI_COPY } from "@/presentation/copy";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectionSource } from "@/sdk/source";
import { portraitLocator } from "@/presentation/offices/portrait";
export const dynamic = "force-dynamic";
const OFFICES: Record<string, { level: string; label: string }> = {
  president: {level: "federal", label: "President"}, governor: {level: "state", label: "Governor"},
  senate: {level: "federal", label: "Senator"}, house: {level: "federal", label: "Representative"},
  chairman: {level: "local", label: "Chairman"},
};
export default async function OfficePage({params, searchParams}: {
  params: {level: string; office: string}; searchParams: {from?: string}
}) {
  const office = OFFICES[params.office];
  if (!office || office.level !== params.level) notFound();
  const slug = searchParams.from;
  const record = slug && /^[a-z0-9-]+$/.test(slug) ? await projectionSource().getRecord("lga", slug) : null;
  const holder = record?.context.find(e => e.layout_slot === "RELATIONSHIPS" && e.label === office.label);
  const portrait = holder ? portraitLocator(holder) : null;
  return <main className="mx-auto min-h-screen max-w-md px-5 pb-32 pt-12">
    <h1 className="text-2xl font-bold">{office.label}</h1>
    {holder?.display_name ? <section className="mt-5 rounded-2xl bg-surface p-5">
      {portrait ? <img src={portrait} alt="" className="mb-4 h-24 w-24 rounded-full object-cover"/> : null}
      <p className="text-lg font-semibold">{holder.display_name}</p>
      <p className="mt-2 text-sm text-ink-soft">{holder.detail}</p>
      <p className="mt-2 text-sm">{holder.badge?.label ?? "Published reference"}</p>
      <p className="mt-3 text-xs text-ink-faint">{UI_COPY.workspace_profile_unavailable}</p>
    </section> : <p className="mt-4 text-sm text-ink-soft">{UI_COPY.workspace_office_unavailable}</p>}
    <Link className="mt-6 inline-block text-primary" href={record ? `/lga/${record.slug}` : "/explore"}>{UI_COPY.workspace_back}</Link>
  </main>;
}
