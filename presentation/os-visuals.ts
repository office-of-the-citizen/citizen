/**
 * Visual treatment of OS-declared presentation codes.
 *
 * The operating system is the author: icon codes, colour roles and accent
 * roles arrive ON the projection. This file only decides how those governed
 * codes LOOK in this application (Tailwind classes, drawn glyphs). It never
 * decides which code applies to which constitutional fact.
 */
import type { IconAlias } from "./icons/registry";

/** OS icon code → this application's drawn glyph. Unknown codes fall back to document. */
const OS_ICONS: Record<string, IconAlias> = {
  PERSON: "people",
  OFFICE: "landmark",
  JURISDICTION: "landmark",
  BRANCH: "landmark",
  INSTITUTION: "landmark",
  MANDATE: "people",
  COURT: "judgement",
  GAZETTE: "document",
  BUDGET: "budget",
  PROJECT: "project",
  PARTY: "people",
  ELECTION: "landmark",
  CONSTITUENCY: "people",
  TIMELINE: "calendar",
  RELATIONSHIP: "people",
};

export function osIcon(code: string | null | undefined): IconAlias {
  return (code && OS_ICONS[code]) || "document";
}

export interface RoleClasses {
  /** Solid bubble behind an icon. */
  bubble: string;
  /** Text in the role's colour. */
  text: string;
  /** True when the role reads as the blue accent family. */
  blue: boolean;
}

/** OS colour role → this application's palette classes. Unknown roles render neutral. */
const OS_ROLES: Record<string, RoleClasses> = {
  VERIFIED: { bubble: "bg-primary text-white", text: "text-primary", blue: false },
  GOVERNED_OBJECT: { bubble: "bg-accent-blue text-white", text: "text-accent-blue", blue: true },
  ATTENTION: { bubble: "bg-accent-amber text-white", text: "text-accent-amber", blue: false },
  UNKNOWN: { bubble: "bg-surface-sunken text-ink-faint", text: "text-unknown", blue: false },
  CONFLICT: { bubble: "bg-accent-amber text-white", text: "text-accent-amber", blue: false },
};

const NEUTRAL: RoleClasses = {
  bubble: "bg-surface-sunken text-ink-faint",
  text: "text-ink-soft",
  blue: false,
};

export function osRole(role: string | null | undefined): RoleClasses {
  return (role && OS_ROLES[role]) || NEUTRAL;
}
