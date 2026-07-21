import type { Metadata } from "next";

import { DiscoveryFlow } from "@/components/discovery/DiscoveryFlow";
import { navigationFromPermanentSnapshot } from "@/lib/permanent-navigation";

export const metadata: Metadata = { title: "Explore Nigeria" };

export default async function ExplorePage() {
  const navigation = navigationFromPermanentSnapshot();
  return <DiscoveryFlow navigation={navigation} />;
}
