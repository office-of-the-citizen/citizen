/**
 * Activity category presentation registry — icon + accent per governed
 * activity category. Unknown categories fall back to the document treatment
 * (never an error).
 */
import type { IconAlias } from "./icons/registry";

export interface CategoryPresentation {
  icon: IconAlias;
  /** Tailwind classes for the icon bubble. */
  bubble: string;
  /** Tailwind class for the category label text. */
  label: string;
}

const CATEGORIES: Record<string, CategoryPresentation> = {
  BUDGET: { icon: "budget", bubble: "bg-primary text-white", label: "text-primary" },
  PROJECT: { icon: "project", bubble: "bg-accent-blue text-white", label: "text-accent-blue" },
  JUDGEMENT: {
    icon: "judgement",
    bubble: "bg-accent-purple text-white",
    label: "text-accent-purple",
  },
  DOCUMENT: { icon: "document", bubble: "bg-accent-amber text-white", label: "text-accent-amber" },
  MANDATE: { icon: "people", bubble: "bg-primary text-white", label: "text-primary" },
  ELECTION: { icon: "landmark", bubble: "bg-accent-blue text-white", label: "text-accent-blue" },
};

export function categoryPresentation(category: string): CategoryPresentation {
  return CATEGORIES[category] ?? CATEGORIES.DOCUMENT;
}
