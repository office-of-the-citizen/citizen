import { HomeGate } from "@/components/shell/HomeGate";
import { navigationFromPermanentSnapshot } from "@/lib/permanent-navigation";

/**
 * Entry uses the permanent snapshot for discovery navigation — no gateway
 * required to explore Nigeria → State → LGA.
 */
export default async function EntryPage() {
  const navigation = navigationFromPermanentSnapshot();
  return <HomeGate navigation={navigation} />;
}
