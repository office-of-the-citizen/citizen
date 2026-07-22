"use client";

/**
 * FOI Request — governed Freedom of Information surface.
 *
 * A citizen files an FOI request to a public institution. The system
 * dispatches it, starts the statutory clock, and tracks the obligation
 * through to response or recorded silence. Teaches the citizen their
 * legal right at the moment they exercise it.
 */
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { participationSource } from "@/sdk/participation";
import { Icon } from "@/presentation/icons/Icon";
import { Card } from "@/components/ui/Card";

export default function FOIRequestPage() {
  const searchParams = useSearchParams();
  const institutionParam = searchParams.get("institution") ?? "";
  const subjectParam = searchParams.get("subject") ?? "";

  const [institution, setInstitution] = useState(institutionParam);
  const [questionText, setQuestionText] = useState("");
  const [recordDescription, setRecordDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<{
    id: string;
    institutionName: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!institution.trim() || !questionText.trim() || !recordDescription.trim() || submitting)
      return;
    setSubmitting(true);
    setError(null);
    try {
      const source = participationSource();
      const result = await source.createFOIRequest({
        institution_id: institution.trim(),
        question_text: questionText.trim(),
        record_description: recordDescription.trim(),
      });
      setSubmitted({
        id: result.participation_id,
        institutionName: result.institution_name,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-surface-sunken px-6 pb-32 pt-safe-t text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-status-verified-soft text-status-verified">
          <Icon name="check" size={28} />
        </span>
        <h1 className="mt-5 text-xl font-extrabold text-ink">
          Your FOI request has been filed
        </h1>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">
          Case <span className="font-mono font-bold">{submitted.id.slice(0, 8)}</span>{" "}
          has been dispatched to{" "}
          <span className="font-bold">{submitted.institutionName || "the institution"}</span>.
        </p>
        <div className="mt-4 rounded-2xl bg-primary-soft/40 px-4 py-3">
          <p className="text-[13px] font-bold text-primary">The clock is now running</p>
          <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">
            The institution has a legal obligation to respond within the
            statutory period. If they do not, their silence is itself recorded
            as a governed fact.
          </p>
        </div>
        <div className="mt-6">
          <Link
            href="/participate"
            className="pressable rounded-chip bg-primary px-5 py-2.5 text-[13px] font-bold text-white"
          >
            Back to Participate
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-surface-sunken pb-32">
      <header className="bg-primary-deep px-4 pb-8 pt-safe-t text-white">
        <div className="flex items-center justify-between pt-3">
          <Link
            href="/participate"
            className="pressable flex min-h-tap items-center gap-1.5 rounded-chip py-2 pr-3 text-sm font-semibold text-white/85 transition-colors duration-quick ease-out hover:text-white"
          >
            <Icon name="chevron-left" size={17} />
            Participate
          </Link>
        </div>
        <h1 className="mt-4 text-[1.65rem] font-extrabold leading-tight tracking-display">
          Request Information
        </h1>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/75">
          File a Freedom of Information request to any public institution.
        </p>
      </header>

      {/* Constitutional literacy — the right */}
      <div className="mx-4 -mt-4 rounded-2xl bg-primary/10 px-4 py-3">
        <p className="text-[13px] font-bold text-white">
          You have a legal right to ask for this.
        </p>
        <p className="mt-0.5 text-[12px] leading-relaxed text-white/80">
          You do not need to give a reason. The institution must respond within
          the statutory period — and if they don&apos;t, their silence is
          recorded as a governed fact.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 px-4 pt-4">
        <Card>
          <label className="block">
            <span className="text-[11px] font-bold uppercase tracking-label text-ink-faint">
              Institution
            </span>
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="Name or ID of the public institution"
              required
              className="mt-2 w-full rounded-2xl border border-line bg-surface-sunken px-4 py-3 text-[15px] text-ink placeholder:text-ink-faint/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <p className="mt-2 text-[11px] leading-relaxed text-ink-faint">
            The public body you are requesting information from.
          </p>
        </Card>

        <Card>
          <label className="block">
            <span className="text-[11px] font-bold uppercase tracking-label text-ink-faint">
              What information are you requesting?
            </span>
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Describe the information you need…"
              rows={3}
              required
              className="mt-2 w-full resize-none rounded-2xl border border-line bg-surface-sunken px-4 py-3 text-[15px] text-ink placeholder:text-ink-faint/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>
        </Card>

        <Card>
          <label className="block">
            <span className="text-[11px] font-bold uppercase tracking-label text-ink-faint">
              Specific records description
            </span>
            <textarea
              value={recordDescription}
              onChange={(e) => setRecordDescription(e.target.value)}
              placeholder="Describe any specific documents, datasets, or records you are looking for…"
              rows={3}
              required
              className="mt-2 w-full resize-none rounded-2xl border border-line bg-surface-sunken px-4 py-3 text-[15px] text-ink placeholder:text-ink-faint/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <p className="mt-2 text-[11px] leading-relaxed text-ink-faint">
            The more specific you are, the easier it is for the institution to
            locate and provide the records.
          </p>
        </Card>

        {error ? (
          <div className="rounded-2xl bg-status-contested-soft px-4 py-3">
            <p className="text-[13px] font-semibold text-status-contested">{error}</p>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={
            submitting ||
            !institution.trim() ||
            !questionText.trim() ||
            !recordDescription.trim()
          }
          className="pressable w-full rounded-chip bg-primary py-3 text-[14px] font-bold text-white transition-colors duration-quick ease-out hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Filing request…" : "File FOI request"}
        </button>

        <p className="text-center text-[11px] leading-relaxed text-ink-faint">
          Your request enters the governed participation process. The institution
          is legally obligated to respond. Silence beyond the statutory deadline
          is recorded and may be escalated.
        </p>
      </form>
    </div>
  );
}
