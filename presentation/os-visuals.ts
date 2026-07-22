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

/** OS colour role → this application's status-token classes. Unknown roles render neutral. */
const OS_ROLES: Record<string, RoleClasses> = {
  VERIFIED: {
    bubble: "bg-status-verified text-white",
    text: "text-status-verified",
    blue: false,
  },
  GOVERNED_OBJECT: {
    bubble: "bg-status-reference text-white",
    text: "text-status-reference",
    blue: true,
  },
  ATTENTION: {
    bubble: "bg-status-contested text-white",
    text: "text-status-contested",
    blue: false,
  },
  UNKNOWN: {
    bubble: "bg-status-unknown-soft text-status-unknown",
    text: "text-status-unknown",
    blue: false,
  },
  CONFLICT: {
    bubble: "bg-status-contested text-white",
    text: "text-status-contested",
    blue: false,
  },
  PENDING: {
    bubble: "bg-status-pending text-white",
    text: "text-status-pending",
    blue: false,
  },
  HISTORICAL: {
    bubble: "bg-status-historical text-white",
    text: "text-status-historical",
    blue: false,
  },
  SUPERSEDED: {
    bubble: "bg-status-historical text-white",
    text: "text-status-historical",
    blue: false,
  },
};

const NEUTRAL: RoleClasses = {
  bubble: "bg-surface-sunken text-ink-faint",
  text: "text-ink-soft",
  blue: false,
};

export function osRole(role: string | null | undefined): RoleClasses {
  return (role && OS_ROLES[role]) || NEUTRAL;
}
