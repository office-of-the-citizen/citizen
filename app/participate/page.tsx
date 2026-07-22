import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/presentation/icons/Icon";

/**
 * Participation Hub — the citizen's constitutional doorway.
 *
 * Each card is a civic capability, not a feature. The language teaches the
 * right at the moment the citizen chooses to exercise it. Participation
 * is a continuation of understanding, not a separate section.
 */
export const metadata: Metadata = {
  title: "Participate",
  description:
    "Ask questions, request information, submit contributions, and challenge records. Your constitutional rights, exercised where they matter most.",
};

interface ParticipationAction {
  title: string;
  description: string;
  icon: "question" | "hand-raise" | "document" | "judgement" | "flag";
  href: string;
  education: string;
}

const ACTIONS: ParticipationAction[] = [
  {
    title: "Ask a Question",
    description: "Ask a governed question about any public subject.",
    icon: "question",
    href: "/participate/question",
    education: "Every citizen has the right to ask — the system records your question and tracks whether it receives an answer.",
  },
  {
    title: "Request Information",
    description: "File a Freedom of Information request to a public institution.",
    icon: "hand-raise",
    href: "/participate/foi",
    education: "You have a legal right to ask for public information. The institution must respond within the statutory period.",
  },
  {
    title: "Submit a Contribution",
    description: "Contribute evidence or information to fill a gap in the public record.",
    icon: "document",
    href: "/participate/question?type=contribution",
    education: "When the record is silent, you can bring evidence. Contributions are assessed through the same governed process as every other claim.",
  },
  {
    title: "Challenge a Record",
    description: "Formally challenge a constitutional assertion you believe is incorrect.",
    icon: "judgement",
    href: "/participate/question?type=challenge",
    education: "The record is never above question. A challenge triggers governed review — the assertion is examined against admitted evidence.",
  },
  {
    title: "Report an Issue",
    description: "Flag a problem with the application, a record, or a governed process.",
    icon: "flag",
    href: "/participate/question?type=report",
    education: "Reports feed into the operational failure spine. Every issue is classified and tracked — nothing is lost.",
  },
];

export default function ParticipatePage() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-surface-sunken pb-32">
      {/* Header */}
      <header className="bg-primary-deep px-4 pb-8 pt-safe-t text-white">
        <div className="pt-3">
          <p className="text-[11px] font-bold uppercase tracking-label text-white/60">
            Constitutional participation
          </p>
          <h1 className="mt-1.5 text-[1.65rem] font-extrabold leading-tight tracking-display">
            Your voice in the record
          </h1>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/75">
            Every silence in the public record is an invitation. Ask, request,
            contribute, or challenge — each action is governed, tracked, and
            strengthens the record for everyone.
          </p>
        </div>
      </header>

      {/* Actions */}
      <div className="space-y-3 px-4 pt-4">
        {ACTIONS.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="pressable-subtle block rounded-card bg-surface p-4 shadow-card transition-colors duration-quick ease-out hover:shadow-card-hover"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <Icon name={action.icon} size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-bold text-ink">{action.title}</p>
                <p className="mt-0.5 text-[13px] leading-relaxed text-ink-soft">
                  {action.description}
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-ink-faint">
                  {action.education}
                </p>
              </div>
              <Icon name="chevron-right" size={16} className="mt-1 shrink-0 text-ink-faint" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
