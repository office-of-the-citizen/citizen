import { CaosClient, CAOS_SDK_VERSION } from "@office-of-the-citizen/caos-sdk";

function resolveGatewayUrl(): string | null {
  return (
    process.env.CAOS_GATEWAY_URL ||
    process.env.NEXT_PUBLIC_CAOS_GATEWAY_URL ||
    null
  );
}

/**
 * Gateway version is live (optional). SDK version is always available from the
 * installed package — never gate the footer on gateway reachability.
 */
async function getGatewayVersion(): Promise<string | null> {
  const gw = resolveGatewayUrl();
  if (!gw) return null;

  try {
    const identity = await new CaosClient(gw).getRuntimeIdentity();
    return identity.gatewayVersion;
  } catch {
    return null;
  }
}

export default async function CaosFooter() {
  const gatewayVersion = await getGatewayVersion();

  return (
    <footer className="px-5 py-3 text-center text-[11px] leading-relaxed text-ink-hint/70">
      caOs {gatewayVersion ?? "—"} | sdk: {CAOS_SDK_VERSION}
    </footer>
  );
}
