/**
 * Projection sources — how the Citizen Application receives what the OS emits.
 *
 * Two lawful transports, selected by environment:
 *
 *   CAOS_PROJECTION_API_URL  → HTTP gateway client (true external consumer;
 *                              e.g. https://os.example/api/v1/public)
 *   CAOS_PROJECTION_DIR      → read-only consumption of emitted projection
 *                              artifacts on disk (co-located deployment)
 *
 * Default: ../../runtime/state/projections relative to this application,
 * matching the repository layout during development. The application NEVER
 * writes to either transport and never imports operating-system code.
 */
import "server-only";
import * as fs from "fs";
import * as path from "path";

import {
  NavigationIndexSchema,
  PublicRecordSchema,
  type NavigationIndex,
  type PublicRecord,
} from "./contracts";

export interface ProjectionSource {
  getRecord(recordType: string, slug: string): Promise<PublicRecord | null>;
  getNavigation(recordType: string): Promise<NavigationIndex | null>;
}

class FileProjectionSource implements ProjectionSource {
  constructor(private readonly rootDir: string) {}

  private readJson(file: string): unknown | null {
    try {
      return JSON.parse(fs.readFileSync(file, "utf-8"));
    } catch {
      return null;
    }
  }

  async getRecord(recordType: string, slug: string): Promise<PublicRecord | null> {
    if (!/^[a-z0-9-]+$/.test(slug) || !/^[a-z0-9_-]+$/.test(recordType)) return null;
    const raw = this.readJson(
      path.join(this.rootDir, "prj_public_record", recordType, `${slug}.json`),
    );
    if (raw === null) return null;
    const parsed = PublicRecordSchema.safeParse(raw);
    return parsed.success ? parsed.data : null;
  }

  async getNavigation(recordType: string): Promise<NavigationIndex | null> {
    if (!/^[a-z0-9_-]+$/.test(recordType)) return null;
    const raw = this.readJson(path.join(this.rootDir, "prj_navigation", `${recordType}.json`));
    if (raw === null) return null;
    const parsed = NavigationIndexSchema.safeParse(raw);
    return parsed.success ? parsed.data : null;
  }
}

class HttpProjectionSource implements ProjectionSource {
  constructor(private readonly baseUrl: string) {}

  private async fetchData(url: string): Promise<unknown | null> {
    try {
      const res = await fetch(url, { next: { revalidate: 60 } });
      if (!res.ok) return null;
      const envelope = (await res.json()) as { data?: unknown };
      return envelope.data ?? null;
    } catch {
      return null;
    }
  }

  async getRecord(recordType: string, slug: string): Promise<PublicRecord | null> {
    const raw = await this.fetchData(
      `${this.baseUrl}/records/${encodeURIComponent(recordType)}/${encodeURIComponent(slug)}`,
    );
    if (raw === null) return null;
    const parsed = PublicRecordSchema.safeParse(raw);
    return parsed.success ? parsed.data : null;
  }

  async getNavigation(recordType: string): Promise<NavigationIndex | null> {
    const raw = await this.fetchData(
      `${this.baseUrl}/navigation/${encodeURIComponent(recordType)}`,
    );
    if (raw === null) return null;
    const parsed = NavigationIndexSchema.safeParse(raw);
    return parsed.success ? parsed.data : null;
  }
}

let cached: ProjectionSource | null = null;

export function projectionSource(): ProjectionSource {
  if (cached) return cached;
  const apiUrl = process.env.CAOS_PROJECTION_API_URL;
  if (apiUrl) {
    cached = new HttpProjectionSource(apiUrl.replace(/\/$/, ""));
    return cached;
  }
  const dir =
    process.env.CAOS_PROJECTION_DIR ??
    // Sibling layout: citizen/ next to CAOS/
    path.resolve(process.cwd(), "..", "CAOS", "runtime", "state", "projections");
  cached = new FileProjectionSource(dir);
  return cached;
}
