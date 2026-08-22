/**
 * Navigation memory contract — client-only, capped, de-duplicated.
 *
 * Recent places hold no constitutional truth; this test only pins the
 * behaviour citizens feel: the last place opened leads, a place never
 * appears twice, and the list never grows without bound.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

// The module is "use client" and reads window.localStorage — provide both.
const store = new Map();
globalThis.window = {
  localStorage: {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
  },
};

const { getRecentPlaces, rememberPlace, clearRecentPlaces } = await import(
  "../lib/recent-storage.ts"
);

test("recent places are most-recent-first and de-duplicated by slug", () => {
  clearRecentPlaces();
  rememberPlace({ slug: "lg-ab-aba-north", name: "Abia North" });
  rememberPlace({ slug: "lg-oy-ibadan-north", name: "Ibadan North" });
  rememberPlace({ slug: "lg-ab-aba-north", name: "Abia North" });

  const places = getRecentPlaces();
  assert.deepEqual(
    places.map((p) => p.slug),
    ["lg-ab-aba-north", "lg-oy-ibadan-north"],
  );
});

test("recent places never exceed six entries", () => {
  clearRecentPlaces();
  for (let i = 0; i < 12; i += 1) {
    rememberPlace({ slug: `lg-xx-${i}`, name: `Place ${i}` });
  }
  const places = getRecentPlaces();
  assert.equal(places.length, 6);
  assert.equal(places[0].slug, "lg-xx-11");
});

test("corrupt storage never throws — it reads as empty", () => {
  clearRecentPlaces();
  store.set("caos.citizen.recent_lgas", "{not json");
  assert.deepEqual(getRecentPlaces(), []);
});
