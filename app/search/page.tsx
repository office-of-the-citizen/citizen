import type { Metadata } from "next";

import { SearchClient } from "@/components/search/SearchClient";
import { navigationFromPermanentSnapshot } from "@/lib/permanent-navigation";

export const metadata: Metadata = { title: "Search" };

/**
 * The search index is permanent geography — it never depends on the gateway,
 * so the search doorway is never a dead end. Actual querying still belongs to
 * Engine 11 behind `/api/search`; this application never ranks or filters
 * public records itself.
 */
export default function SearchPage() {
  return <SearchClient navigation={navigationFromPermanentSnapshot()} />;
}
