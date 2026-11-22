import { UI_COPY } from "@/presentation/copy";
import Link from "next/link";
export default function ParticipationPage() {
 return <main className="mx-auto min-h-screen max-w-md px-5 pb-32 pt-12">
  <h1 className="text-2xl font-bold">Ask a question</h1>
  <p className="mt-4 text-sm text-ink-soft">{UI_COPY.workspace_participation_unavailable}</p>
  <Link href="/explore" className="mt-6 inline-block text-primary">{UI_COPY.workspace_public_records}</Link>
 </main>;
}
