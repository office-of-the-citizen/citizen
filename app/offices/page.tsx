import { UI_COPY } from "@/presentation/copy";
import Link from "next/link";
export default function OfficesPage() {
  return <main className="mx-auto min-h-screen max-w-md px-5 pb-32 pt-12">
    <h1 className="text-2xl font-bold">Public offices</h1>
    <p className="mt-4 text-sm text-ink-soft">{UI_COPY.workspace_offices_unavailable}</p>
    <Link className="mt-6 inline-block text-primary" href="/explore">{UI_COPY.workspace_explore}</Link>
  </main>;
}
