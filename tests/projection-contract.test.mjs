/**
 * Contract tests — run with `npm test` (node --test).
 *
 * 1. Geometry join QA: every presentation-map geometry joins to a navigation
 *    group via the OS-emitted group_code and every group has geometry
 *    (orphan rate must be 0). The application owns no id crosswalk.
 * 2. The emitted projection artifacts satisfy the SDK contracts the
 *    application renders from, including the v2 presentation metadata.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

import nigeriaMap from "@svg-maps/nigeria";

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

// Geometry-library quirks only — must mirror NigeriaMap.tsx.
const SVG_ID_QUIRKS = { fct: "federal-capital-territory", nassarawa: "nasarawa" };
const svgIdToGroupCode = (id) => SVG_ID_QUIRKS[id] ?? id;

test("geometry joins navigation via OS-emitted group_code (no orphans)", () => {
  const nav = readJson(path.join(projectionDir, "prj_navigation", "lga.json"));
  const codes = new Set(nav.groups.map((g) => g.group_code));
  assert.equal(codes.size, nav.groups.length, "group_code must be unique per group");

  const geometryCodes = nigeriaMap.locations.map((l) => svgIdToGroupCode(l.id)).sort();
  assert.deepEqual(geometryCodes, [...codes].sort(), "geometry ↔ navigation must join 1:1");
});

test("navigation projection satisfies the SDK contract", () => {
  const nav = readJson(path.join(projectionDir, "prj_navigation", "lga.json"));
  const parsed = NavigationIndexSchema.safeParse(nav);
  assert.ok(parsed.success, JSON.stringify(parsed.error?.issues?.slice(0, 3)));
  const total = parsed.data.groups.reduce((n, g) => n + g.records.length, 0);
  assert.ok(total >= 700, `expected ~774 LGA records, found ${total}`);
  for (const g of parsed.data.groups) {
    assert.ok(g.group_code, `group ${g.group_name} missing group_code`);
    assert.ok(g.group_short_name, `group ${g.group_name} missing group_short_name`);
  }
});

test("public records satisfy the SDK contract with v2 presentation metadata", () => {
  const dir = path.join(projectionDir, "prj_public_record", "lga");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  assert.ok(files.length >= 700, `expected ~774 records, found ${files.length}`);

  const sample = ["lg-oy-ibadan-north.json", ...files.slice(0, 25)];
  for (const file of sample) {
    const parsed = PublicRecordSchema.safeParse(readJson(path.join(dir, file)));
    assert.ok(parsed.success, `${file}: ${JSON.stringify(parsed.error?.issues?.slice(0, 2))}`);
    const record = parsed.data;
    // The application renders these verbatim — they must arrive on the wire.
    assert.ok(record.context.length >= 5, `${file}: expected 5 relationship slots`);
    for (const entry of record.context) {
      assert.ok(entry.presentation?.accent_role, `${file}: context entry missing presentation`);
    }
    assert.ok(record.sections.chairman.display_label, `${file}: chairman missing display_label`);
    assert.ok(record.placeholders.MISSING_BUDGET?.title, `${file}: missing placeholders`);
    assert.ok(record.vocabulary.TERM_END, `${file}: missing vocabulary`);
  }
});
