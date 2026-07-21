/**
 * Projection sources — how the Citizen Application receives what the OS emits.
 *
 * Constitutional default: HTTP through the caos-sdk client against the
 * Engine 12 Gateway (Application → caos-sdk → Engine 12 → CAOS).
 *
 *   CAOS_GATEWAY_URL                → gateway root (required on Vercel/prod)
 *   NEXT_PUBLIC_CAOS_GATEWAY_URL    → accepted fallback if CAOS_GATEWAY_URL unset
 *   CAOS_PROJECTION_API_URL         → legacy alias (gateway root; /api/v1/public stripped)
 *   CAOS_PROJECTION_DIR              → EXPLICIT opt-in file transport (never default)
 *   Local default http://localhost:4000 only when not on Vercel/production.
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
  SearchResponseSchema,
  type NavigationIndex,
  type PublicRecord,
  type SearchResponse,
} from "./contracts";

export interface ProjectionSource {
  getRecord(recordType: string, slug: string): Promise<PublicRecord | null>;
  getNavigation(recordType: string): Promise<NavigationIndex | null>;
  /**
   * Engine 11 search over prepared public records. Null when the transport
   * cannot search (file mode) — the application renders a governed
   * unavailable state, never a reconstructed search of its own.
   */
  search(query: string, options?: { limit?: number }): Promise<SearchResponse | null>;
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

  async search(): Promise<SearchResponse | null> {
    return null; // Engine 11 lives behind the gateway; file mode cannot search.
  }
}

/**
 * SDK-backed source. The Gateway currently exposes the `lga` record family;
 * unknown record types resolve to null rather than inventing an answer.
 */
class SdkProjectionSource implements ProjectionSource {
  private readonly client: CaosClient;
  private readonly gatewayUrl: string;

  constructor(gatewayUrl: string) {
    this.gatewayUrl = gatewayUrl.replace(/\/$/, "");
    this.client = new CaosClient(this.gatewayUrl);
  }

  async getRecord(recordType: string, slug: string): Promise<PublicRecord | null> {
    if (recordType !== "lga") return null;
    if (!/^[a-z0-9-]+$/.test(slug)) return null;
    try {
      const raw = await this.client.getPublicRecord(slug);
      const parsed = PublicRecordSchema.safeParse(raw);
      if (!parsed.success) {
        console.error("[citizen] PublicRecord schema rejected", slug, parsed.error.issues[0]);
        return null;
      }
      return parsed.data;
    } catch (err) {
      console.error("[citizen] getRecord failed", slug, err instanceof Error ? err.message : err);
      return null;
    }
  }

  async getNavigation(recordType: string): Promise<NavigationIndex | null> {
    if (recordType !== "lga") return null;
    try {
      const raw = await this.client.getPublicNavigation();
      const parsed = NavigationIndexSchema.safeParse(raw);
      if (!parsed.success) {
        console.error("[citizen] NavigationIndex schema rejected", parsed.error.issues[0]);
        return null;
      }
      return parsed.data;
    } catch (err) {
      const anyErr = err as { message?: string; status?: number; data?: unknown; code?: string };
      console.error("[citizen] getNavigation failed", {
        message: anyErr.message ?? String(err),
        status: anyErr.status,
        code: anyErr.code,
        data: anyErr.data,
        gateway: this.gatewayUrl,
      });
      return null;
    }
  }

  async search(query: string, options?: { limit?: number }): Promise<SearchResponse | null> {
    try {
      const raw = await this.client.searchPublicRecords(query, { limit: options?.limit });
      const parsed = SearchResponseSchema.safeParse(raw);
      if (!parsed.success) {
        console.error("[citizen] SearchResponse schema rejected", parsed.error.issues[0]);
        return null;
      }
      return parsed.data;
    } catch (err) {
      console.error("[citizen] search failed", err instanceof Error ? err.message : err);
      return null;
    }
  }
}

let cached: ProjectionSource | null = null;

/**
 * Resolve the Engine 12 gateway root.
 * Server-side only. Prefer CAOS_GATEWAY_URL (server secret/config).
 * NEXT_PUBLIC_CAOS_GATEWAY_URL is accepted for misconfigured Vercel projects
 * that only set the public-prefixed name — it is not required by design.
 */
export function resolveGatewayUrl(env: NodeJS.ProcessEnv = process.env): string {
  const legacy = env.CAOS_PROJECTION_API_URL?.replace(/\/api\/v1\/public\/?$/, "");
  const raw =
    env.CAOS_GATEWAY_URL?.trim() ||
    env.NEXT_PUBLIC_CAOS_GATEWAY_URL?.trim() ||
    legacy?.trim() ||
    "";
  if (raw) return raw.replace(/\/$/, "");

  // Local default only. Never silently use localhost on Vercel/production hosts.
  if (env.VERCEL || env.NODE_ENV === "production") {
    throw new Error(
      "CAOS_GATEWAY_URL is not set. Set it to the Engine 12 origin " +
        "(e.g. https://api.officeofthecitizen.org). " +
        "NEXT_PUBLIC_CAOS_GATEWAY_URL alone is not the preferred name.",
    );
  }
  return "http://localhost:4000";
}

export function projectionSource(): ProjectionSource {
  if (cached) return cached;
  const dir = process.env.CAOS_PROJECTION_DIR;
  if (dir) {
    cached = new FileProjectionSource(dir);
    return cached;
  }
  const gatewayUrl = resolveGatewayUrl();
  cached = new SdkProjectionSource(gatewayUrl);
  return cached;
}
