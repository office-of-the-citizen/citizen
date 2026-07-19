import type { Metadata } from "next";

import { projectionSource } from "@/sdk/source";
import { SearchClient } from "@/components/search/SearchClient";
import { ProjectionUnavailable } from "@/components/shared/ProjectionUnavailable";

export const metadata: Metadata = { title: "Search" };
export const dynamic = "force-dynamic";

export default async function SearchPage() {
  const navigation = await projectionSource().getNavigation("lga");
  if (!navigation) return <ProjectionUnavailable />;
  return <SearchClient navigation={navigation} />;
}
