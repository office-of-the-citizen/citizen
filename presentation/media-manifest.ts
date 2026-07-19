/**
 * Media manifest — production asset drop-in point.
 *
 * When real header photographs, logos or portraits become available, register
 * their URLs here (or point the manifest at a CDN index). Screens consult the
 * manifest through lookup helpers; adding real media never edits a component.
 *
 * Precedence for every slot follows the Founder media doctrine:
 *   header: LGA photo → landmark → state photo → state illustration → placeholder art
 *   logo:   LGA official logo → state official logo → seal placeholder
 *   portrait: official photograph (projection or manifest) → placeholder art
 */

export interface MediaOverrides {
  header?: string;
  logo?: string;
}

/** Keyed by LGA slug (e.g. "lg-oy-ibadan-north") or state object id (e.g. "caos:obj:oy"). */
const MANIFEST: Record<string, MediaOverrides> = {
  // Example (uncomment when a real asset lands in /public or a CDN):
  // "lg-oy-ibadan-north": { header: "/media/lga/lg-oy-ibadan-north/header.jpg" },
};

export function mediaFor(key: string): MediaOverrides {
  return MANIFEST[key] ?? {};
}
