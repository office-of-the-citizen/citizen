/**
 * Citizen-owned statistics cell model builders (no React).
 * Presentation chrome lives in components/lga/StatisticsBar.tsx.
 */

export type StatCellKey = "population" | "area" | "wards" | "polling_units";

export type StatCell = {
  key: StatCellKey;
  label: string;
  icon: "stat-population" | "stat-area" | "stat-wards" | "stat-polling-units";
  display: string;
  unavailable?: boolean;
};

function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-NG").format(n);
}

export function buildStatisticsCells(input: {
  population: number | string | null;
  areaKm2: number | null;
  wardCount: number | null;
  pollingUnitCount: number | null;
}): StatCell[] {
  const pop =
    input.population == null
      ? null
      : typeof input.population === "number"
        ? formatNumber(input.population)
        : String(input.population);

  return [
    {
      key: "population",
      label: "Population",
      icon: "stat-population",
      display: pop ?? "—",
      unavailable: pop == null,
    },
    {
      key: "area",
      label: "Area",
      icon: "stat-area",
      display:
        input.areaKm2 != null ? `${formatNumber(input.areaKm2)} km²` : "—",
      unavailable: input.areaKm2 == null,
    },
    {
      key: "wards",
      label: "Wards",
      icon: "stat-wards",
      display: input.wardCount != null ? formatNumber(input.wardCount) : "—",
      unavailable: input.wardCount == null,
    },
    {
      key: "polling_units",
      label: "Polling Units",
      icon: "stat-polling-units",
      display:
        input.pollingUnitCount != null
          ? formatNumber(input.pollingUnitCount)
          : "—",
      unavailable: input.pollingUnitCount == null,
    },
  ];
}
