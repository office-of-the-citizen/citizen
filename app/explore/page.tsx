import type { Metadata } from "next";

import { projectionSource } from "@/sdk/source";
import { DiscoveryFlow } from "@/components/discovery/DiscoveryFlow";
import { ProjectionUnavailable } from "@/components/shared/ProjectionUnavailable";

export const metadata: Metadata = { title: "Explore Nigeria" };
export const dynamic = "force-dynamic";

export default async function ExplorePage() {
  const navigation = await projectionSource().getNavigation("lga");
  if (!navigation) return <ProjectionUnavailable />;
  return <DiscoveryFlow navigation={navigation} />;
}
