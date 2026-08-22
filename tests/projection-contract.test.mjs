/**
 * Contract tests — run with `npm test` (node --test).
 *
 * Hermetic by design: no sibling-repo runtime reads. The permanent snapshot
 * ships inside the SDK (Founder Amendment 2026-07-21); live-truth wire shape
 * is pinned by a committed golden record captured from the published corpus.
 *
 * 1. Geometry join QA: every presentation-map geometry joins to the composed
 *    navigation index via the OS-emitted group_code (orphan rate must be 0).
 *    The application owns no id crosswalk.
 * 2. The composed NavigationIndex satisfies the SDK contract.
 * 3. A published public record satisfies the SDK PublicRecordSchema —
 *    the exact payload shape the application renders from.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

import nigeriaMap from "@svg-maps/nigeria";

import {
  NavigationIndexSchema,
  PublicRecordSchema,
} from "@office-of-the-citizen/caos-sdk";

import { navigationFromPermanentSnapshot } from "../lib/permanent-navigation.ts";

const appDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const fixturesDir = path.join(appDir, "tests", "fixtures");

// Geometry-library quirks only — must mirror NigeriaMap.tsx.
const SVG_ID_QUIRKS = { fct: "federal-capital-territory", nassarawa: "nasarawa" };
const svgIdToGroupCode = (id) => SVG_ID_QUIRKS[id] ?? id;

test("geometry joins navigation via OS-emitted group_code (no orphans)", () => {
  const nav = navigationFromPermanentSnapshot();
  const codes = new Set(
    nav.groups.map((g) => g.group_code).filter((c) => c !== undefined)
  );
  assert.equal(codes.size, nav.groups.length, "group_code must be unique per group");

  const geometryCodes = nigeriaMap.locations.map((l) => svgIdToGroupCode(l.id)).sort();
  assert.deepEqual(geometryCodes, [...codes].sort(), "geometry ↔ navigation must join 1:1");
});

test("composed navigation index satisfies the SDK contract", () => {
  const nav = navigationFromPermanentSnapshot();
  const parsed = NavigationIndexSchema.safeParse(nav);
  assert.ok(parsed.success, JSON.stringify(parsed.error?.issues?.slice(0, 3)));
  const total = parsed.data.groups.reduce((n, g) => n + g.records.length, 0);
  assert.ok(total >= 700, `expected ~774 LGA records, found ${total}`);
  for (const g of parsed.data.groups) {
    assert.ok(g.group_code, `group ${g.group_name} missing group_code`);
    assert.ok(g.group_short_name, `group ${g.group_name} missing group_short_name`);
  }
});

test("published public record satisfies the SDK render contract", () => {
  const dir = path.join(fixturesDir, "public-record");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  assert.ok(files.length >= 1, "golden fixture must exist");

  for (const file of files) {
    const raw = JSON.parse(fs.readFileSync(path.join(dir, file), "utf-8"));
    const parsed = PublicRecordSchema.safeParse(raw);
    assert.ok(parsed.success, `${file}: ${JSON.stringify(parsed.error?.issues?.slice(0, 3))}`);
    const record = parsed.data;
    // Structural guarantees the publisher makes today.
    assert.ok(record.context.length >= 5, `${file}: expected 5 relationship slots`);
    assert.equal(record.sections.chairman.display_label.length > 0, true);
    // Wire-shape guarantees: the registry-governed slots exist on the wire.
    // Population of presentation hints / placeholders / vocabulary is pending
    // projection regeneration against the current Engine 10 publisher.
    for (const entry of record.context) {
      assert.equal("presentation" in entry, true, `${file}: presentation slot absent`);
    }
    assert.equal("placeholders" in raw, true, `${file}: placeholders slot absent`);
    assert.equal("vocabulary" in raw, true, `${file}: vocabulary slot absent`);
  }
});
