/**
 * Icon registry — the application's single icon authority.
 *
 * Components request icons by ALIAS (semantic name), never by importing SVG
 * files. Swapping an icon pack means editing this registry only. Every glyph
 * is a 24×24 stroke drawing inheriting currentColor.
 */
import type { ReactNode } from "react";

export type IconAlias =
  | "home"
  | "explore"
  | "search"
  | "alerts"
  | "profile"
  | "chevron-right"
  | "chevron-down"
  | "chevron-left"
  | "calendar"
  | "people"
  | "landmark"
  | "seal-check"
  | "check"
  | "budget"
  | "project"
  | "judgement"
  | "document"
  | "pin"
  | "map"
  | "close"
  | "info"
  | "clock"
  | "archive"
  | "hash"
  | "arrow-up-right"
  | "shield"
  /** Stats bar — match ratified LGA profile reference. */
  | "stat-population"
  | "stat-area"
  | "stat-wards"
  | "stat-polling-units"
  | "question"
  | "hand-raise"
  | "flag"
  | "eye"
  | "send"
  /* Office pages — institutional and legislative icons */
  | "building"
  | "gavel"
  | "scale"
  | "star"
  | "chart-bar"
  | "mail"
  | "promise";

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Path bodies keyed by alias. One place to swap the entire pack. */
const GLYPHS: Record<IconAlias, ReactNode> = {
  home: (
    <g {...strokeProps}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h5v-6h4v6h5V9.5" />
    </g>
  ),
  explore: (
    <g {...strokeProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </g>
  ),
  search: (
    <g {...strokeProps}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </g>
  ),
  alerts: (
    <g {...strokeProps}>
      <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </g>
  ),
  profile: (
    <g {...strokeProps}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" />
    </g>
  ),
  "chevron-right": (
    <g {...strokeProps}>
      <path d="m9 5 7 7-7 7" />
    </g>
  ),
  "chevron-down": (
    <g {...strokeProps}>
      <path d="m5 9 7 7 7-7" />
    </g>
  ),
  "chevron-left": (
    <g {...strokeProps}>
      <path d="m15 5-7 7 7 7" />
    </g>
  ),
  calendar: (
    <g {...strokeProps}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </g>
  ),
  people: (
    <g {...strokeProps}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5" />
      <path d="M16 5a3.5 3.5 0 0 1 0 6.8M21.5 20c0-2.8-1.9-4.6-4.5-5.3" />
    </g>
  ),
  landmark: (
    <g {...strokeProps}>
      <path d="m12 3 9 5H3z" />
      <path d="M5 8v9M9.5 8v9M14.5 8v9M19 8v9M3 21h18M3 17h18" />
    </g>
  ),
  "seal-check": (
    <g {...strokeProps}>
      <path d="M12 2.5 14.5 4.6l3.2-.3 1 3.1 2.8 1.6-1.3 3 1.3 3-2.8 1.6-1 3.1-3.2-.3L12 21.5 9.5 19.4l-3.2.3-1-3.1L2.5 15l1.3-3-1.3-3 2.8-1.6 1-3.1 3.2.3z" />
      <path d="m8.8 12 2.2 2.2 4.2-4.4" />
    </g>
  ),
  check: (
    <g {...strokeProps}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </g>
  ),
  budget: (
    <g {...strokeProps}>
      <rect x="2.5" y="6" width="19" height="14" rx="2.5" />
      <path d="M2.5 10h19M7 15.5h4" />
    </g>
  ),
  project: (
    <g {...strokeProps}>
      <path d="m14.5 6.5-8 8L3 18l3.5-3.5" />
      <path d="M12 4.5 19.5 12l1.6-1.6a2 2 0 0 0 0-2.8L16.4 2.9a2 2 0 0 0-2.8 0z" />
      <path d="m13 13 5.5 5.5" />
    </g>
  ),
  judgement: (
    <g {...strokeProps}>
      <path d="m8 7 5-5 6 6-5 5z" />
      <path d="m10.5 9.5-7.5 7.5a1.8 1.8 0 0 0 2.5 2.5L13 12" />
      <path d="M13 21h8" />
    </g>
  ),
  document: (
    <g {...strokeProps}>
      <path d="M6 2.5h8l4 4V21.5H6z" />
      <path d="M14 2.5v4h4M9 12h6M9 16h6" />
    </g>
  ),
  pin: (
    <g {...strokeProps}>
      <path d="M12 21.5s-7-6.4-7-11.5a7 7 0 0 1 14 0c0 5.1-7 11.5-7 11.5z" />
      <circle cx="12" cy="10" r="2.5" />
    </g>
  ),
  map: (
    <g {...strokeProps}>
      <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z" />
      <path d="M9 4v14M15 6v14" />
    </g>
  ),
  close: (
    <g {...strokeProps}>
      <path d="m6 6 12 12M18 6 6 18" />
    </g>
  ),
  info: (
    <g {...strokeProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.5v.5" />
    </g>
  ),
  clock: (
    <g {...strokeProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </g>
  ),
  archive: (
    <g {...strokeProps}>
      <rect x="3" y="4" width="18" height="5" rx="1.5" />
      <path d="M5 9v9.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V9" />
      <path d="M10 13h4" />
    </g>
  ),
  hash: (
    <g {...strokeProps}>
      <path d="M9.5 3.5 7.5 20.5M16.5 3.5l-2 17M4.5 8.5h16M3.5 15.5h16" />
    </g>
  ),
  "arrow-up-right": (
    <g {...strokeProps}>
      <path d="M7 17 17 7M9 7h8v8" />
    </g>
  ),
  shield: (
    <g {...strokeProps}>
      <path d="M12 2.5 20 5.5v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10v-6z" />
      <path d="m8.8 12 2.2 2.2 4.2-4.4" />
    </g>
  ),
  // Two-person outline (reference: population)
  "stat-population": (
    <g {...strokeProps} strokeWidth={1.75}>
      <circle cx="9" cy="7.5" r="3.25" />
      <path d="M3.25 19.5c0-3.2 2.6-5.25 5.75-5.25s5.75 2.05 5.75 5.25" />
      <circle cx="16.25" cy="8.25" r="2.6" />
      <path d="M14.5 14.35c1.55-.55 3.35-.35 4.75.7.95.7 1.5 1.7 1.5 2.85" />
    </g>
  ),
  // Stacked layers (reference: area)
  "stat-area": (
    <g {...strokeProps} strokeWidth={1.75}>
      <path d="M12 3.5 20 7.25 12 11 4 7.25z" />
      <path d="m4 12 8 3.75L20 12" />
      <path d="m4 16.5 8 3.75 8-3.75" />
    </g>
  ),
  // Classical building (reference: wards)
  "stat-wards": (
    <g {...strokeProps} strokeWidth={1.75}>
      <path d="M4 20.5h16" />
      <path d="M6 20.5V10.5h12v10" />
      <path d="m4.5 10.5 7.5-6 7.5 6" />
      <path d="M9 20.5v-5.5h6v5.5" />
      <path d="M9.5 13h.01M14.5 13h.01" />
    </g>
  ),
  // Ballot box (reference: polling units)
  "stat-polling-units": (
    <g {...strokeProps} strokeWidth={1.75}>
      <path d="M5 10.5h14v10H5z" />
      <path d="M5 14.5h14" />
      <path d="M9.5 6.5 12 4l2.5 2.5" />
      <path d="M12 4v8" />
      <path d="M8.5 17.5h7" />
    </g>
  ),
  question: (
    <g {...strokeProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5" />
      <circle cx="12" cy="16.5" r="0.5" fill="currentColor" />
    </g>
  ),
  "hand-raise": (
    <g {...strokeProps}>
      <path d="M7 11V5.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M10 11V4.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M13 11V5.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M16 11V7.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-2a7 7 0 0 1-7-7v-1" />
    </g>
  ),
  flag: (
    <g {...strokeProps}>
      <path d="M4 21V4" />
      <path d="M4 4h13l-2 4 2 4H4" />
    </g>
  ),
  eye: (
    <g {...strokeProps}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </g>
  ),
  send: (
    <g {...strokeProps}>
      <path d="m3 11 18-8-8 18-2-8z" />
      <path d="M11 19 3 11" />
    </g>
  ),
  building: (
    <g {...strokeProps}>
      <rect x="4" y="10" width="16" height="11" rx="1" />
      <path d="M12 3v7M8 7l4-4 4 4" />
      <path d="M9 14h2v3H9zM13 14h2v3h-2z" />
    </g>
  ),
  gavel: (
    <g {...strokeProps}>
      <path d="m14.5 3.5 6 6-3 3-6-6z" />
      <path d="m11.5 6.5-7 7 3 3 7-7" />
      <path d="M4 21h8" />
      <path d="M8 17l-4 4" />
    </g>
  ),
  scale: (
    <g {...strokeProps}>
      <path d="M12 3v18" />
      <path d="M5 7h14" />
      <path d="M5 7l-2 6a3.5 3.5 0 0 0 7 0L8 7" />
      <path d="M19 7l-2 6a3.5 3.5 0 0 0 7 0l-2-6z" transform="translate(-5 0)" />
    </g>
  ),
  star: (
    <g {...strokeProps}>
      <path d="m12 2.5 2.9 5.9 6.6.9-4.7 4.6 1.1 6.5L12 17.3l-5.9 3.1 1.1-6.5L2.5 9.3l6.6-.9z" />
    </g>
  ),
  "chart-bar": (
    <g {...strokeProps}>
      <rect x="3" y="14" width="4" height="7" rx="1" />
      <rect x="10" y="8" width="4" height="13" rx="1" />
      <rect x="17" y="3" width="4" height="18" rx="1" />
    </g>
  ),
  mail: (
    <g {...strokeProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </g>
  ),
  promise: (
    <g {...strokeProps}>
      <path d="M4 21V4" />
      <path d="M4 4h13l-2 4 2 4H4" />
      <path d="m16 15 2 2 4-4" />
    </g>
  ),
};

export function iconGlyph(alias: IconAlias): ReactNode {
  return GLYPHS[alias];
}
