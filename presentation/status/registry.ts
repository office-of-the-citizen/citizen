/**
 * Status presentation registry — how constitutional postures LOOK and TEACH.
 *
 * The operating system decides WHICH status applies to a fact; that arrives
 * on the projection (badge codes, colour roles, missingness states). This
 * registry only decides how each governed posture is presented and explained
 * in this application: tone, icon, and the layered civic-education copy a
 * curious citizen can unfold.
 *
 * Education copy is presentation, not truth — it explains the system itself,
 * never a specific fact. Specific facts always render projected copy.
 */
import type { IconAlias } from "../icons/registry";

export type StatusTone =
  | "verified"
  | "reference"
  | "contested"
  | "pending"
  | "unknown"
  | "historical";

export interface StatusToneClasses {
  /** Chip text + icon colour. */
  text: string;
  /** Quiet wash behind the chip. */
  soft: string;
  /** Solid bubble (timeline dots, seals). */
  solid: string;
  /** Hairline in the family colour. */
  ring: string;
}

/** One place that says how each tone renders in Tailwind token classes. */
export const TONE_CLASSES: Record<StatusTone, StatusToneClasses> = {
  verified: {
    text: "text-status-verified",
    soft: "bg-status-verified-soft",
    solid: "bg-status-verified text-white",
    ring: "ring-status-verified/25",
  },
  reference: {
    text: "text-status-reference",
    soft: "bg-status-reference-soft",
    solid: "bg-status-reference text-white",
    ring: "ring-status-reference/25",
  },
  contested: {
    text: "text-status-contested",
    soft: "bg-status-contested-soft",
    solid: "bg-status-contested text-white",
    ring: "ring-status-contested/25",
  },
  pending: {
    text: "text-status-pending",
    soft: "bg-status-pending-soft",
    solid: "bg-status-pending text-white",
    ring: "ring-status-pending/25",
  },
  unknown: {
    text: "text-status-unknown",
    soft: "bg-status-unknown-soft",
    solid: "bg-status-unknown text-white",
    ring: "ring-status-unknown/25",
  },
  historical: {
    text: "text-status-historical",
    soft: "bg-status-historical-soft",
    solid: "bg-status-historical text-white",
    ring: "ring-status-historical/25",
  },
};

export interface StatusEducation {
  tone: StatusTone;
  icon: IconAlias;
  /** Plain-language answer to “what does this status mean?” */
  meaning: string;
  /** Why the system assigns it — the constitutional mechanics. */
  mechanics: string;
  /** What it implies for the citizen — the legal-standing layer. */
  implication: string;
}

/**
 * Education per governed posture. Keys cover the badge codes and colour
 * roles the OS emits today; unknown codes fall back to UNKNOWN education
 * (honest silence rather than invented certainty).
 */
const STATUS_EDUCATION: Record<string, StatusEducation> = {
  VERIFIED: {
    tone: "verified",
    icon: "seal-check",
    meaning:
      "This answer was checked against admitted evidence before it was published.",
    mechanics:
      "A claim becomes Verified only after the operating system compiles it from admitted source documents and the verification survives constitutional review. Nothing is verified by opinion.",
    implication:
      "You can cite this answer. Every Verified claim keeps a permanent trail to the evidence and the authority it rests on — you can open that trail below.",
  },
  BADGE_VERIFIED: {
    tone: "verified",
    icon: "seal-check",
    meaning:
      "This answer was checked against admitted evidence before it was published.",
    mechanics:
      "A claim becomes Verified only after the operating system compiles it from admitted source documents and the verification survives constitutional review. Nothing is verified by opinion.",
    implication:
      "You can cite this answer. Every Verified claim keeps a permanent trail to the evidence and the authority it rests on — you can open that trail below.",
  },
  GOVERNED_OBJECT: {
    tone: "reference",
    icon: "landmark",
    meaning:
      "This is a recognised entry in a constitutional repository, shown by reference.",
    mechanics:
      "Some facts are not re-verified on every page — they are references to objects the system already governs, like a recognised office or office holder.",
    implication:
      "The reference is authoritative for identity, but claims about the object (dates, actions) carry their own separate verification.",
  },
  BADGE_REPOSITORY_REFERENCE: {
    tone: "reference",
    icon: "landmark",
    meaning:
      "This is a recognised entry in a constitutional repository, shown by reference.",
    mechanics:
      "Some facts are not re-verified on every page — they are references to objects the system already governs, like a recognised office or office holder.",
    implication:
      "The reference is authoritative for identity, but claims about the object (dates, actions) carry their own separate verification.",
  },
  CONTESTED: {
    tone: "contested",
    icon: "judgement",
    meaning: "This answer is under active challenge and may change.",
    mechanics:
      "When admitted evidence conflicts — two documents that cannot both be true — the system records the contest instead of silently choosing a side.",
    implication:
      "Treat this answer as provisional. The record shows every position in the contest and will update when the conflict resolves.",
  },
  CONFLICT: {
    tone: "contested",
    icon: "judgement",
    meaning: "This answer is under active challenge and may change.",
    mechanics:
      "When admitted evidence conflicts — two documents that cannot both be true — the system records the contest instead of silently choosing a side.",
    implication:
      "Treat this answer as provisional. The record shows every position in the contest and will update when the conflict resolves.",
  },
  ATTENTION: {
    tone: "contested",
    icon: "info",
    meaning: "The record flags this for your awareness.",
    mechanics:
      "Attention marks facts the system published with a caveat — an audit finding, an anomaly, a matter a citizen should not scroll past.",
    implication:
      "The fact stands, but read the surrounding context before relying on it.",
  },
  PENDING: {
    tone: "pending",
    icon: "clock",
    meaning: "A claim exists but has not finished verification.",
    mechanics:
      "Evidence has been admitted and a claim registered; the verification clock is still running. Nothing is wrong — the system simply refuses to publish early certainty.",
    implication:
      "Check back. When verification completes, this becomes Verified or Contested — never silently deleted.",
  },
  UNKNOWN: {
    tone: "unknown",
    icon: "info",
    meaning: "The public record is honestly silent here.",
    mechanics:
      "Unknown is a governed state, not an error. The system never fills a gap with a guess — if no admitted evidence answers the question, the record says so.",
    implication:
      "Silence is information: it tells you what has not yet been brought into the public record. When evidence is admitted, the answer appears with its own status.",
  },
  HISTORICAL: {
    tone: "historical",
    icon: "archive",
    meaning: "True of its time — no longer the present record.",
    mechanics:
      "The record never deletes truth. When a fact is replaced, the old fact is preserved with the period it was true for.",
    implication:
      "Use it for history, not for the present. The current answer is always shown alongside.",
  },
  SUPERSEDED: {
    tone: "historical",
    icon: "archive",
    meaning: "A newer verified answer has replaced this one.",
    mechanics:
      "Supersession is recorded, never silent: the newer claim points back to the one it replaced, so the chain of change is itself part of the record.",
    implication:
      "Follow the chain to see when — and on what evidence — the answer changed.",
  },
};

const UNKNOWN_FALLBACK = STATUS_EDUCATION.UNKNOWN;

/** Resolve education for an OS-emitted badge code or colour role. */
export function statusEducation(code: string | null | undefined): StatusEducation {
  if (!code) return UNKNOWN_FALLBACK;
  return (
    STATUS_EDUCATION[code] ??
    STATUS_EDUCATION[code.replace(/^BADGE_/, "")] ??
    UNKNOWN_FALLBACK
  );
}

/** Tone classes for a code, via its education entry. */
export function statusTone(code: string | null | undefined): StatusToneClasses {
  return TONE_CLASSES[statusEducation(code).tone];
}
