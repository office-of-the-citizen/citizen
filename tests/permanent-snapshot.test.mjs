/**
 * Permanent snapshot distribution contract — Citizen side.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  getBySlug,
  getPermanentSnapshot,
  getPermanentSnapshotMeta,
  lgaNavigationTree,
  listByClassification,
  breadcrumb,
} from "@office-of-the-citizen/caos-sdk";

import { navigationFromPermanentSnapshot } from "../lib/permanent-navigation.ts";
import { buildStatisticsCells } from "../lib/statistics-cells.ts";

test("SDK permanent snapshot carries epoch metadata", () => {
  const meta = getPermanentSnapshotMeta();
  assert.ok(meta.snapshot_epoch);
  assert.ok(meta.generated_at);
  assert.match(meta.content_hash, /^sha256:[a-f0-9]{64}$/);
  assert.equal(meta.counts.LOCAL_GOVERNMENT_AREA, 774);
  assert.equal(meta.counts.STATE, 37);
});

test("permanent snapshot never contains population", () => {
  const raw = JSON.stringify(getPermanentSnapshot());
  assert.equal(/"population"/i.test(raw), false);
});

test("LGA resolves by slug with hierarchy and counts", () => {
  const tree = lgaNavigationTree();
  assert.equal(tree.length, 37);
  const sample = tree[0].lgas[0];
  assert.ok(sample);
  const found = getBySlug(sample.slug);
  assert.ok(found);
  assert.equal(found.classification, "LOCAL_GOVERNMENT_AREA");
  assert.ok((found.ward_count ?? 0) > 0);
  assert.ok((found.polling_unit_count ?? 0) > 0);
  const chain = breadcrumb(found.canonical_id);
  assert.ok(chain.some((b) => b.classification === "STATE"));
  assert.ok(chain.some((b) => b.classification === "FEDERATION"));
});

test("Citizen navigation composition covers all LGAs and map group codes", () => {
  const nav = navigationFromPermanentSnapshot();
  const total = nav.groups.reduce((n, g) => n + g.records.length, 0);
  assert.equal(total, 774);
  assert.equal(nav.groups.length, 37);
  for (const g of nav.groups) {
    assert.ok(g.group_code, g.group_name);
  }
});

test("StatisticsBar keeps four cells when population unavailable", () => {
  const cells = buildStatisticsCells({
    population: null,
    areaKm2: null,
    wardCount: 11,
    pollingUnitCount: 164,
  });
  assert.equal(cells.length, 4);
  assert.equal(cells[0].key, "population");
  assert.equal(cells[0].unavailable, true);
  assert.equal(cells[0].display, "—");
  assert.equal(cells[2].display, "11");
  assert.equal(cells[3].display, "164");
});

test("states expose group_code for map join", () => {
  const states = listByClassification("STATE");
  assert.equal(states.length, 37);
  for (const s of states) {
    assert.ok(s.group_code, s.primary_name);
  }
});
