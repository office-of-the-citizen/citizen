"use client";

/**
 * Entry gate: returning citizens land on their Home LGA profile; first-time
 * citizens begin with the discovery of Nigeria. Home is a client-only
 * preference — deep links always work without it.
 */
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { NavigationIndex } from "@/sdk/contracts";
import { getHomeLga } from "@/lib/home-storage";
import { DiscoveryFlow } from "@/components/discovery/DiscoveryFlow";

export function HomeGate({ navigation }: { navigation: NavigationIndex }) {
  const router = useRouter();
  const [decided, setDecided] = useState(false);

  useEffect(() => {
    const home = getHomeLga();
    if (home) {
      router.replace(`/lga/${home.slug}`);
    } else {
      setDecided(true);
    }
  }, [router]);

  if (!decided) {
    return <div className="min-h-screen bg-surface-sunken" aria-hidden="true" />;
  }
  return <DiscoveryFlow navigation={navigation} />;
}
