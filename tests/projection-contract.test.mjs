/**
 * Contract tests — run with `npm test` (node --test).
 *
 * 1. Crosswalk QA: every presentation-map geometry maps to a CAOS state and
 *    every navigation state has geometry (orphan rate must be 0).
 * 2. The emitted projection artifacts satisfy the SDK contracts the
 *    application renders from.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

import nigeriaMap from "@svg-maps/nigeria";

import crosswalk from "../assets/map/state-crosswalk.json" with { type: "json" };
import { NavigationIndexSchema, PublicRecordSchema } from "../sdk/contracts.ts";

const appDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

let projectionDir = process.env.CAOS_PROJECTION_DIR;
if (!projectionDir) {
  const directSibling = path.resolve(appDir, "..", "CAOS", "runtime", "state", "projections");
  if (fs.existsSync(directSibling)) {
    projectionDir = directSibling;
  } else {
    projectionDir = path.resolve(appDir, "..", "..", "runtime", "state", "projections");
  }
}

const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf-8"));

test("crosswalk: every map geometry resolves to a CAOS state and back", () => {
  const svgIds = nigeriaMap.locations.map((l) => l.id).sort();
  const crosswalkIds = Object.keys(crosswalk).sort();
  assert.deepEqual(crosswalkIds, svgIds, "crosswalk keys must exactly match map geometry ids");

  const nav = readJson(path.join(projectionDir, "prj_navigation", "lga.json"));
  const navStateIds = nav.groups.map((g) => g.group_object_id).sort();
  const caosIds = Object.values(crosswalk).sort();
  assert.deepEqual(caosIds, navStateIds, "every navigation state must have exactly one geometry");
});

test("navigation projection satisfies the SDK contract", () => {
  const nav = readJson(path.join(projectionDir, "prj_navigation", "lga.json"));
  const parsed = NavigationIndexSchema.safeParse(nav);
  assert.ok(parsed.success, JSON.stringify(parsed.error?.issues?.slice(0, 3)));
  const total = parsed.data.groups.reduce((n, g) => n + g.records.length, 0);
  assert.ok(total >= 700, `expected ~774 LGA records, found ${total}`);
});

test("public records satisfy the SDK contract (sample)", () => {
  const dir = path.join(projectionDir, "prj_public_record", "lga");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  assert.ok(files.length >= 700, `expected ~774 records, found ${files.length}`);

  const sample = ["lg-oy-ibadan-north.json", ...files.slice(0, 25)];
  for (const file of sample) {
    const parsed = PublicRecordSchema.safeParse(readJson(path.join(dir, file)));
    assert.ok(parsed.success, `${file}: ${JSON.stringify(parsed.error?.issues?.slice(0, 2))}`);
  }
});
