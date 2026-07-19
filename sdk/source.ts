/**
 * Projection sources — how the Citizen Application receives what the OS emits.
 *
 * Constitutional default: HTTP through the caos-sdk client against the
 * Engine 12 Gateway (Application → caos-sdk → Engine 12 → CAOS).
 *
 *   CAOS_GATEWAY_URL          → gateway root (default http://localhost:4000)
 *   CAOS_PROJECTION_API_URL   → legacy alias for the gateway root (kept for
 *                               existing deployments; same transport)
 *   CAOS_PROJECTION_DIR       → EXPLICIT opt-in: read-only consumption of
 *                               emitted projection artifacts on disk for
 *                               co-located deployments. Never the default.
 *
 * The application NEVER writes to either transport and never imports
 * operating-system code.
 */
import "server-only";
import * as fs from "fs";
import * as path from "path";

import { CaosClient } from "@office-of-the-citizen/caos-sdk";

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

/**
 * SDK-backed source. The Gateway currently exposes the `lga` record family;
 * unknown record types resolve to null rather than inventing an answer.
 */
class SdkProjectionSource implements ProjectionSource {
  private readonly client: CaosClient;

  constructor(gatewayUrl: string) {
    this.client = new CaosClient(gatewayUrl.replace(/\/$/, ""));
  }

  async getRecord(recordType: string, slug: string): Promise<PublicRecord | null> {
    if (recordType !== "lga") return null;
    if (!/^[a-z0-9-]+$/.test(slug)) return null;
    try {
      const raw = await this.client.getPublicRecord(slug);
      const parsed = PublicRecordSchema.safeParse(raw);
      return parsed.success ? parsed.data : null;
    } catch {
      return null;
    }
  }

  async getNavigation(recordType: string): Promise<NavigationIndex | null> {
    if (recordType !== "lga") return null;
    try {
      const raw = await this.client.getPublicNavigation();
      const parsed = NavigationIndexSchema.safeParse(raw);
      return parsed.success ? parsed.data : null;
    } catch {
      return null;
    }
  }
}

let cached: ProjectionSource | null = null;

export function projectionSource(): ProjectionSource {
  if (cached) return cached;
  const dir = process.env.CAOS_PROJECTION_DIR;
  if (dir) {
    cached = new FileProjectionSource(dir);
    return cached;
  }
  // Legacy CAOS_PROJECTION_API_URL pointed at the /api/v1/public prefix;
  // CaosClient expects the gateway root, so strip the prefix if present.
  const legacy = process.env.CAOS_PROJECTION_API_URL?.replace(/\/api\/v1\/public\/?$/, "");
  const gatewayUrl =
    process.env.CAOS_GATEWAY_URL ?? legacy ?? "http://localhost:4000";
  cached = new SdkProjectionSource(gatewayUrl);
  return cached;
}
