/**
 * Office presentation types — configuration that drives every office profile
 * page. The Citizen App renders offices from these types; no page branches on
 * identity, only on constitutional level and configuration shape.
 *
 * These types are presentation, not truth. When CAOS Engine begins emitting
 * office projections, ProjectionSource.getRecord("office", slug) will supply
 * the data; until then the presentation layer renders governed placeholders.
 */
import type { IconAlias } from "@/presentation/icons/registry";

/* ── Government levels ─────────────────────────────────────────────────── */

export type OfficeLevel = "federal" | "state" | "local";

export const LEVEL_LABELS: Record<OfficeLevel, string> = {
  federal: "Federal Government",
  state: "State Government",
  local: "Local Government",
};

export const LEVEL_ACCENT: Record<OfficeLevel, "green" | "blue" | "amber"> = {
  federal: "green",
  state: "blue",
  local: "amber",
};

/* ── Responsibility categories ─────────────────────────────────────────── */

export type ResponsibilityCategory = "constitutional" | "statutory" | "conventional";

export interface OfficeResponsibility {
  category: ResponsibilityCategory;
  label: string;
  items: {
    title: string;
    description: string;
    citation?: string;
  }[];
}

/* ── Office metrics ────────────────────────────────────────────────────── */

export type MetricStatus = "available" | "unavailable" | "pending";

export interface OfficeMetric {
  key: string;
  label: string;
  icon: IconAlias;
  status: MetricStatus;
  value: number | string | null;
  unavailableReason?: string;
  breakdown?: { label: string; value: number | string }[];
}

export interface OfficeMetricGroup {
  title: string;
  icon: IconAlias;
  metrics: OfficeMetric[];
}

/* ── Officeholder ──────────────────────────────────────────────────────── */

export interface OfficeHolderData {
  name: string | null;
  portrait: string | null;
  party?: string;
  assumedDate: string | null;
  termEnd: string | null;
  missingLabel?: string;
  missingExplanation?: string;
}

/* ── Timeline entries ──────────────────────────────────────────────────── */

export type OfficeTimelineCategory =
  | "INAUGURATION"
  | "LEGISLATIVE"
  | "OVERSIGHT"
  | "COMMITTEE"
  | "FOI"
  | "BUDGET"
  | "JUDICIAL"
  | "CONSTITUENCY"
  | "PUBLIC_STATEMENT";

export interface OfficeTimelineEntry {
  code: string;
  category: OfficeTimelineCategory;
  title: string;
  summary?: string;
  occurredAt: string;
  icon: IconAlias;
  colourRole: "verified" | "reference" | "contested" | "pending" | "unknown";
}

/* ── Commitments ───────────────────────────────────────────────────────── */

export type CommitmentStatus = "fulfilled" | "ongoing" | "broken" | "disputed" | "unverified";

export interface OfficeCommitment {
  promise: string;
  status: CommitmentStatus;
  evidenceSummary?: string;
  dateMade: string;
}

/* ── Education ─────────────────────────────────────────────────────────── */

export interface OfficeEducation {
  /** "Did you know?" hook — a short, engaging fact. */
  hook: string;
  /** Supporting facts — each is a citizen right or piece of civic knowledge. */
  facts: string[];
  /** Citizen rights in relation to this office. */
  rights: string[];
}

/* ── Citizen Questions ─────────────────────────────────────────────────── */

export interface CitizenQuestionsData {
  total: number;
  answered: number;
  pending: number;
}

/* ── Right to Know ─────────────────────────────────────────────────────── */

export interface RightToKnowItem {
  title: string;
  reason: string;
  metricKey: string;
}

/* ── Office configuration ──────────────────────────────────────────────── */

export interface OfficeConfig {
  /** URL slug — used in /offices/[level]/[office]. */
  slug: string;
  /** Government level. */
  level: OfficeLevel;
  /** Full office title (e.g. "President of the Federal Republic of Nigeria"). */
  title: string;
  /** Short display name (e.g. "President"). */
  shortTitle: string;
  /** Institution that houses this office (e.g. "The Presidency"). */
  institution: string;
  /** Icon for the office (used in hub cards, headers). */
  icon: IconAlias;
  /** Constitutional basis — the section(s) of the Constitution. */
  constitutionalBasis: string;
  /** Current term description (e.g. "2023–2027"). */
  currentTerm: string;
  /** Office status summary (e.g. "Active", "In election"). */
  officeStatus: string;
  /** Verification posture label (e.g. "Verified", "Governed Object"). */
  verificationLabel: string;
  /** Verification posture code for StatusChip. */
  verificationCode: string;

  /* ── Sections ─────────────────────────────────────────────────────── */
  holder: OfficeHolderData;
  responsibilities: OfficeResponsibility[];
  metricGroups: OfficeMetricGroup[];
  timeline: OfficeTimelineEntry[];
  commitments: OfficeCommitment[];
  education: OfficeEducation;
  citizenQuestions: CitizenQuestionsData;
  rightToKnow: RightToKnowItem[];
}
