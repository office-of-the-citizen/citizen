/**
 * Presentation-map crosswalk — @svg-maps/nigeria location ids ↔ CAOS state
 * object ids from the navigation projection. Geometry is presentation only
 * (never constitutional boundary truth). Source: @svg-maps/nigeria v2
 * (CC-BY-4.0). Data lives in state-crosswalk.json so the contract test and
 * the application consume one artifact.
 */
import crosswalk from "./state-crosswalk.json";

export const SVG_TO_CAOS: Record<string, string> = crosswalk;

export const CAOS_TO_SVG: Record<string, string> = Object.fromEntries(
  Object.entries(SVG_TO_CAOS).map(([svg, caos]) => [caos, svg]),
);
