"use client";

/**
 * ParticipationPrompt — contextual civic affordance at the point of silence.
 *
 * Wherever missingness is displayed in a constitutional record, this component
 * offers the citizen an immediate, relevant action: request the information,
 * join existing demand, or challenge a record. The prompt teaches the right
 * at the moment it is most relevant.
 */
import Link from "next/link";
import { Icon } from "@/presentation/icons/Icon";
import { cn } from "@/lib/cn";

interface ParticipationPromptProps {
  /** The missingness state code from the record section. */
  missingnessState: string;
  /** CRN of the subject (e.g. the LGA canonical ID). */
  subjectRef: string;
  /** Optional institution identifier for FOI routing. */
  institutionId?: string;
}

const PROMPT_CONFIG: Record<
  string,
  { message: string; cta: string; href: (subjectRef: string, institutionId?: string) => string; icon: "question" | "flag" | "hand-raise" }
> = {
  NEVER_ASSESSED: {
    message: "This information has not been assessed — you can request it.",
    cta: "Request information",
    href: (subjectRef, instId) =>
      instId
        ? `/participate/foi?institution=${encodeURIComponent(instId)}&subject=${encodeURIComponent(subjectRef)}`
        : `/participate/foi?subject=${encodeURIComponent(subjectRef)}`,
    icon: "hand-raise",
  },
  NON_RESPONSE: {
    message: "This institution has not responded — join the demand.",
    cta: "Join the demand",
    href: (subjectRef) => `/participate/question?subject=${encodeURIComponent(subjectRef)}`,
    icon: "question",
  },
  DEFAULT: {
    message: "This information is not publicly available — request it.",
    cta: "Request it",
    href: (subjectRef, instId) =>
      instId
        ? `/participate/foi?institution=${encodeURIComponent(instId)}&subject=${encodeURIComponent(subjectRef)}`
        : `/participate/question?subject=${encodeURIComponent(subjectRef)}`,
    icon: "question",
  },
};

function resolvePrompt(missingnessState: string) {
  return PROMPT_CONFIG[missingnessState] ?? PROMPT_CONFIG.DEFAULT;
}

export function ParticipationPrompt({
  missingnessState,
  subjectRef,
  institutionId,
}: ParticipationPromptProps) {
  const config = resolvePrompt(missingnessState);
  const href = config.href(subjectRef, institutionId);

  return (
    <Link
      href={href}
      className={cn(
        "pressable-subtle mt-2 flex items-center gap-2.5 rounded-2xl",
        "border border-dashed border-primary/25 bg-primary-soft/40",
        "px-3.5 py-2.5 transition-colors duration-quick ease-out",
        "hover:border-primary/40 hover:bg-primary-soft/60",
      )}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon name={config.icon} size={15} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[12px] leading-snug text-ink-soft">{config.message}</p>
      </div>
      <span className="shrink-0 text-[11px] font-bold text-primary">{config.cta}</span>
    </Link>
  );
}
