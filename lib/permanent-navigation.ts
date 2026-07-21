/**
 * Citizen-owned composition: permanent snapshot → NavigationIndex shape
 * used by DiscoveryFlow / NigeriaMap.
 *
 * The SDK distributes the snapshot; this app decides how to shape it for UI.
 */

import { lgaNavigationTree } from "@office-of-the-citizen/caos-sdk";
import type { NavigationIndex } from "@/sdk/contracts";

/** Build a NavigationIndex from the SDK permanent snapshot (no network). */
export function navigationFromPermanentSnapshot(): NavigationIndex {
  const tree = lgaNavigationTree();
  return {
    record_type: "lga",
    built_at: new Date(0).toISOString(),
    groups: tree.map(({ state, lgas }) => ({
      group_object_id: state.canonical_id,
      group_name: state.primary_name,
      group_code: state.group_code ?? undefined,
      group_short_name: state.primary_name.replace(/ State$/, ""),
      records: lgas.map((lga) => ({
        slug: lga.slug,
        subject_object_id: lga.canonical_id,
        name: lga.primary_name,
      })),
    })),
  };
}
