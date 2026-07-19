import { projectionSource } from "@/sdk/source";
import { HomeGate } from "@/components/shell/HomeGate";
import { ProjectionUnavailable } from "@/components/shared/ProjectionUnavailable";

export const dynamic = "force-dynamic";

export default async function EntryPage() {
  const navigation = await projectionSource().getNavigation("lga");
  if (!navigation) return <ProjectionUnavailable />;
  return <HomeGate navigation={navigation} />;
}
