import { CaosClient } from "@office-of-the-citizen/caos-sdk";
/** Contract adapter. Interactive participation is unavailable until the gateway lifecycle is connected. */
export function participationSource() {
  const url = process.env.NEXT_PUBLIC_CAOS_GATEWAY_URL || "http://localhost:4000";
  return new CaosClient(url).participation;
}
