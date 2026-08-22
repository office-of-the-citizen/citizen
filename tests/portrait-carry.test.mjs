/**
 * Portraits must survive the contract boundary.
 *
 * The pinned SDK contract does not declare `portrait_url`, and a zod object
 * schema strips undeclared keys — so a *valid* parse silently deletes every
 * relationship portrait. This test pins the repair, and is the reason a
 * green build once shipped a page with no faces on it.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

import { PublicRecordSchema } from "@office-of-the-citizen/caos-sdk";
import { withPortraits } from "../lib/portrait-carry.ts";

const RAW = {
  context: [
    { provider: "FEDERAL_EXECUTIVE_HEAD", layout_slot: "RELATIONSHIPS", portrait_url: "https://example.test/a.jpg" },
    { provider: "OWNER_EXECUTIVE_HEAD", layout_slot: "RELATIONSHIPS", portrait_url: null },
    { provider: "STATE_ASSEMBLY", layout_slot: "RELATIONSHIPS" },
  ],
};

test("a locator the OS published survives a parse that does not declare it", () => {
  const parsed = { context: [{}, {}, {}] };
  const carried = withPortraits(parsed, RAW);
  assert.equal(carried.context[0].portrait_url, "https://example.test/a.jpg");
});

test("absent and null locators stay absent — nothing is invented", () => {
  const parsed = { context: [{}, {}, {}] };
  const carried = withPortraits(parsed, RAW);
  assert.equal(carried.context[1].portrait_url, undefined);
  assert.equal(carried.context[2].portrait_url, undefined);
});

test("a contract that already carries the field is left alone", () => {
  const parsed = { context: [{ portrait_url: null }] };
  const carried = withPortraits(parsed, {
    context: [{ portrait_url: "https://example.test/override.jpg" }],
  });
  assert.equal(carried.context[0].portrait_url, null);
});

test("a malformed payload never throws", () => {
  assert.doesNotThrow(() => withPortraits({ context: [] }, null));
  assert.doesNotThrow(() => withPortraits({ context: [] }, { context: "nonsense" }));
});

test("the pinned schema really does strip the field (the bug this guards)", (t) => {
  // A real emitted projection, so the fixture cannot drift from the contract.
  const file = new URL(
    "../../CAOS/runtime/state/projections/prj_public_record/lga/lg-ab-aba-north.json",
    import.meta.url,
  );
  if (!existsSync(file)) return t.skip("CAOS projections not present on this machine");

  const raw = JSON.parse(readFileSync(file, "utf8"));
  const parsed = PublicRecordSchema.safeParse(raw);
  assert.ok(parsed.success, "the emitted record should satisfy the pinned contract");

  const rawRel = raw.context.find(
    (e) => e.layout_slot === "RELATIONSHIPS" && typeof e.portrait_url === "string",
  );
  if (!rawRel) return t.skip("no portrait in this record to carry");

  const index = raw.context.indexOf(rawRel);
  // If this ever fails, the pin advanced — delete lib/portrait-carry and this test.
  assert.equal(parsed.data.context[index].portrait_url, undefined);

  const carried = withPortraits(parsed.data, raw);
  assert.equal(carried.context[index].portrait_url, rawRel.portrait_url);
});
