/**
 * Placeholder registry — governed copy for every designed absence.
 *
 * Screens look up placeholder copy by code; changing language (or later,
 * commissioned artwork) never touches a screen component.
 */
export type PlaceholderCode =
  | "MISSING_PORTRAIT"
  | "MISSING_HEADER"
  | "MISSING_LOGO"
  | "MISSING_BUDGET"
  | "MISSING_TIMELINE"
  | "MISSING_RELATIONSHIP"
  | "MISSING_FACT"
  | "MISSING_TERM";

export const PLACEHOLDERS: Record<PlaceholderCode, { title: string; body: string }> = {
  MISSING_PORTRAIT: {
    title: "Official photograph unavailable",
    body: "This public record is awaiting an official photograph.",
  },
  MISSING_HEADER: {
    title: "Awaiting official imagery",
    body: "This community's public record is awaiting official imagery.",
  },
  MISSING_LOGO: {
    title: "Official emblem unavailable",
    body: "No official government emblem has been admitted yet.",
  },
  MISSING_BUDGET: {
    title: "No budget admitted yet",
    body: "When a budget for this Local Government is admitted into the public record, it will appear here with its fiscal year and breakdown.",
  },
  MISSING_TIMELINE: {
    title: "No public activity recorded yet",
    body: "Budgets, projects, judgements and documents appear here the moment they enter the public record.",
  },
  MISSING_RELATIONSHIP: {
    title: "Not yet on record",
    body: "This office is awaiting a governed public record.",
  },
  MISSING_FACT: {
    title: "Not yet on record",
    body: "This fact is awaiting a governed public record.",
  },
  MISSING_TERM: {
    title: "Not on record",
    body: "This date is awaiting a governed public record.",
  },
};

export function placeholderCopy(code: PlaceholderCode): { title: string; body: string } {
  return PLACEHOLDERS[code];
}
