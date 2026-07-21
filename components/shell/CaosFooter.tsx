import { CaosClient, CAOS_SDK_VERSION } from '@office-of-the-citizen/caos-sdk';

function resolveGatewayUrl(): string | null {
  return (
    process.env.CAOS_GATEWAY_URL ||
    process.env.NEXT_PUBLIC_CAOS_GATEWAY_URL ||
    null
  );
}

async function getIdentity() {
  const gw = resolveGatewayUrl();
  if (!gw) return null;

  try {
    const client = new CaosClient(gw);
    return await client.getRuntimeIdentity();
  } catch {
    return null;
  }
}

export default async function CaosFooter() {
  const identity = await getIdentity();
  if (!identity) return null;

  return (
    <footer
      style={{
        padding: '12px 20px',
        fontSize: 11,
        color: 'var(--color-muted, #94a3b8)',
        textAlign: 'center',
        opacity: 0.6,
        lineHeight: 1.4,
      }}
    >
      caOs {identity.gatewayVersion ?? '—'} | sdk: {CAOS_SDK_VERSION}
    </footer>
  );
}
