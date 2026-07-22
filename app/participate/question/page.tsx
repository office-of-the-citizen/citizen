"use client";

/**
 * Ask a Question — governed participation surface.
 *
 * A citizen asks a question; the system records it, assigns a participation
 * case, and tracks whether the question is answered. The form teaches the
 * citizen what happens next — no action is opaque.
 */
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { participationSource } from "@/sdk/participation";
import { Icon } from "@/presentation/icons/Icon";
import { Card } from "@/components/ui/Card";

export default function QuestionPage() {
  const searchParams = useSearchParams();
  const subjectRef = searchParams.get("subject") ?? "";
  const typeParam = searchParams.get("type");

  const [questionText, setQuestionText] = useState("");
  const [subject, setSubject] = useState(subjectRef);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<{ id: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const title =
    typeParam === "contribution"
      ? "Submit a Contribution"
      : typeParam === "challenge"
        ? "Challenge a Record"
        : typeParam === "report"
          ? "Report an Issue"
          : "Ask a Question";

  const placeholder =
    typeParam === "contribution"
      ? "Describe the evidence or information you are contributing…"
      : typeParam === "challenge"
        ? "Describe what you believe is incorrect and why…"
        : typeParam === "report"
          ? "Describe the issue you are reporting…"
          : "What would you like to know? Be as specific as possible…";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!questionText.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const source = participationSource();
      const result = await source.createQuestion({
        question_text: questionText.trim(),
        subject_ref: subject.trim() || undefined,
      });
      setSubmitted({ id: result.participation_id });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
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
        <h1 className="mt-5 text-xl font-extrabold text-ink">Your question is on the record</h1>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">
          Case <span className="font-mono font-bold">{submitted.id.slice(0, 8)}</span>{" "}
          has been filed. The system will track whether it receives a response.
          You will be notified of any change in its status.
        </p>
        <p className="mt-3 max-w-xs text-[12px] leading-relaxed text-ink-faint">
          Every question strengthens the public record. Even unanswered questions
          create governed demand that institutions must account for.
        </p>
        <div className="mt-6 flex gap-3">
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
          {title}
        </h1>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/75">
          Your question is recorded as a governed participation case. The system
          tracks whether it receives an answer, and silence itself becomes part
          of the public record.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4 px-4 pt-4">
        <Card>
          <label className="block">
            <span className="text-[11px] font-bold uppercase tracking-label text-ink-faint">
              Your question
            </span>
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder={placeholder}
              rows={4}
              required
              className="mt-2 w-full resize-none rounded-2xl border border-line bg-surface-sunken px-4 py-3 text-[15px] text-ink placeholder:text-ink-faint/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>
        </Card>

        <Card>
          <label className="block">
            <span className="text-[11px] font-bold uppercase tracking-label text-ink-faint">
              Subject reference <span className="text-ink-faint/60">(optional)</span>
            </span>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. crn:s2:lga:ikeja or the name of a subject"
              className="mt-2 w-full rounded-2xl border border-line bg-surface-sunken px-4 py-3 text-[15px] text-ink placeholder:text-ink-faint/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <p className="mt-2 text-[11px] leading-relaxed text-ink-faint">
            Link your question to a specific subject in the constitutional
            record. This helps route it to the right institution.
          </p>
        </Card>

        {error ? (
          <div className="rounded-2xl bg-status-contested-soft px-4 py-3">
            <p className="text-[13px] font-semibold text-status-contested">{error}</p>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={submitting || !questionText.trim()}
          className="pressable w-full rounded-chip bg-primary py-3 text-[14px] font-bold text-white transition-colors duration-quick ease-out hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Submitting…" : "Submit question"}
        </button>

        <p className="text-center text-[11px] leading-relaxed text-ink-faint">
          By submitting, your question enters the governed participation process.
          It will be tracked, and the institution responsible will be notified.
          You cannot be penalised for asking.
        </p>
      </form>
    </div>
  );
}
