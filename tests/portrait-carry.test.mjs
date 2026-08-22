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

test("a portrait survives whatever contract happens to be installed", (t) => {
  // A real emitted projection, so the fixture cannot drift from the contract.
  const file = new URL(
    "../../CAOS/runtime/state/projections/prj_public_record/lga/lg-ab-aba-north.json",
    import.meta.url,
  );
  if (!existsSync(file)) return t.skip("CAOS projections not present on this machine");

  const raw = JSON.parse(readFileSync(file, "utf8"));
  const parsed = PublicRecordSchema.safeParse(raw);
  assert.ok(parsed.success, "the emitted record should satisfy the installed contract");

  const rawRel = raw.context.find(
    (e) => e.layout_slot === "RELATIONSHIPS" && typeof e.portrait_url === "string",
  );
  if (!rawRel) return t.skip("no portrait in this record to carry");
  const index = raw.context.indexOf(rawRel);

  // The point of the repair: whether or not the installed contract declares
  // `portrait_url`, a locator the OS published is present after the carry.
  // Asserting only this keeps the test true under the pinned SDK *and* under
  // a newer local build — the drift between those two is what caused the bug.
  const carried = withPortraits(parsed.data, raw);
  assert.equal(carried.context[index].portrait_url, rawRel.portrait_url);
});

test("the repair is still needed — or can be deleted", () => {
  const declares = "portrait_url" in PublicRecordSchema.shape.context.element.shape;
  // Informational, never a failure: when the pin advances so that every
  // environment declares the field, lib/portrait-carry can be removed.
  console.log(
    declares
      ? "[note] installed contract declares portrait_url — lib/portrait-carry is removable once the PIN (not just node_modules) advances"
      : "[note] installed contract strips portrait_url — lib/portrait-carry is load-bearing",
  );
  assert.ok(typeof declares === "boolean");
});
