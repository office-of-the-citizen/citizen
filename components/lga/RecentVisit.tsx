"use client";

/**
 * Records that this device opened a place. Renders nothing.
 * Client-only navigation memory — see `lib/recent-storage`.
 */
import { useEffect } from "react";

import { rememberPlace } from "@/lib/recent-storage";

export function RecentVisit({
  slug,
  name,
  owner,
}: {
  slug: string;
  name: string;
  owner?: string | null;
}) {
  useEffect(() => {
    rememberPlace({ slug, name, owner: owner ?? null });
  }, [slug, name, owner]);

  return null;
}
