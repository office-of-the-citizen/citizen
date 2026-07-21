/**
 * Citizen-owned extraction of live facts from a CAOS truth projection
 * (PublicRecord). Applications compose; the SDK does not.
 */

import type { PublicRecord } from "@/sdk/contracts";

/** Population from truth identity.facts when projected; null if unavailable. */
export function populationFromTruth(truth: PublicRecord | null): {
  value: number | string | null;
  unit: string | null;
  as_of: string | null;
} {
  if (!truth?.identity?.facts?.length) {
    return { value: null, unit: null, as_of: null };
  }
  const fact = truth.identity.facts.find((f) => {
    const code = f.fact_code.toUpperCase();
    return (
      code === "POPULATION" ||
      code === "STATISTICS.POPULATION" ||
      code.includes("POPULATION")
    );
  });
  if (!fact || fact.value == null) {
    return { value: null, unit: null, as_of: null };
  }
  return {
    value: fact.value,
    unit: fact.unit ?? null,
    as_of: fact.as_of ?? null,
  };
}
