/**
 * Constitutional developments — nationally relevant educational context.
 *
 * These are NOT live news items or projected truth. They are stable,
 * educational references to constitutional developments that affect all
 * 774 local governments in Nigeria. They appear BELOW local and budget
 * updates in the Latest Updates timeline so citizens always have context
 * for the national picture, regardless of whether their own local
 * government has recorded activity.
 *
 * The OS may also project NATIONAL-scoped activity entries that overlap
 * with these. When both exist, the projected entries take precedence
 * (they are admitted, dated and sourced by the operating system); these
 * static entries serve as a permanent educational floor.
 *
 * Scope is always NATIONAL — these developments affect every local
 * government, not just one. Category uses the same vocabulary as the
 * activity stream (BUDGET, JUDGEMENT, etc.) so the timeline can render
 * them with consistent visual treatment.
 */

export type ConstitutionalCategory =
  | "GOVERNANCE_REFORM"
  | "BUDGET_REFORM"
  | "ELECTORAL_REFORM"
  | "JUDICIAL_REFORM";

export interface ConstitutionalDevelopment {
  id: string;
  title: string;
  summary: string;
  authority: string;
  date: string;
  scope: "NATIONAL";
  category: ConstitutionalCategory;
  impact: string;
  /** OS-compatible presentation codes for visual consistency with the timeline. */
  presentation: {
    icon: string;
    colour_role: string;
    colour_hex: string;
  };
}

export const constitutionalDevelopments: ConstitutionalDevelopment[] = [
  {
    id: "lg-autonomy-2024",
    title: "Local Government Financial Autonomy",
    summary:
      "The Supreme Court granted all 774 Local Government Councils direct access to their share of the Federation Account, ending decades of state intermediation through joint accounts.",
    authority: "Supreme Court of Nigeria",
    date: "2024-07-11",
    scope: "NATIONAL",
    category: "GOVERNANCE_REFORM",
    impact: "Allocations now transfer directly from the Federation Account to each local government",
    presentation: {
      icon: "COURT",
      colour_role: "HISTORICAL",
      colour_hex: "#92765b",
    },
  },
  {
    id: "democratically-elected-councils-2024",
    title: "Elected Councils Required for Allocations",
    summary:
      "The Supreme Court ruled that only local governments led by democratically elected chairmen and councillors may receive Federation Account allocations, prohibiting caretaker committees.",
    authority: "Supreme Court of Nigeria",
    date: "2024-07-11",
    scope: "NATIONAL",
    category: "GOVERNANCE_REFORM",
    impact: "Local governments without elected councils cannot draw federal allocations",
    presentation: {
      icon: "COURT",
      colour_role: "HISTORICAL",
      colour_hex: "#92765b",
    },
  },
  {
    id: "rmafc-formula-review",
    title: "Revenue Allocation Formula Review",
    summary:
      "The Revenue Mobilisation Allocation and Fiscal Commission initiated the first comprehensive review of the national revenue-sharing formula in over thirty years, examining the split between federal, state, and local tiers.",
    authority: "RMAFC",
    date: "2025-01-15",
    scope: "NATIONAL",
    category: "BUDGET_REFORM",
    impact: "Potential change to the 52.68% / 26.72% / 20.60% allocation ratio between tiers",
    presentation: {
      icon: "BUDGET",
      colour_role: "PENDING",
      colour_hex: "#476991",
    },
  },
  {
    id: "direct-allocation-disbursement-2025",
    title: "Direct Allocation Disbursement Begins",
    summary:
      "The Federal Government began disbursing local government shares of the Federation Account directly to individual council accounts, bypassing state-level joint local government accounts.",
    authority: "Federal Government of Nigeria",
    date: "2025-02-01",
    scope: "NATIONAL",
    category: "BUDGET_REFORM",
    impact: "Local governments now receive their FAAC allocations without state intermediation",
    presentation: {
      icon: "BUDGET",
      colour_role: "HISTORICAL",
      colour_hex: "#92765b",
    },
  },
  {
    id: "electoral-act-2026",
    title: "Electoral Act 2026",
    summary:
      "New electoral legislation introducing digital systems and strengthening the independence of state electoral commissions for local government elections across all states.",
    authority: "National Assembly",
    date: "2026-03-01",
    scope: "NATIONAL",
    category: "ELECTORAL_REFORM",
    impact: "Enhanced transparency in how local government chairmen and councillors are elected",
    presentation: {
      icon: "GAZETTE",
      colour_role: "GOVERNED_OBJECT",
      colour_hex: "#2563eb",
    },
  },
  {
    id: "constitutional-amendment-lg-autonomy",
    title: "Constitutional Amendment for LG Autonomy",
    summary:
      "Ongoing legislative effort to entrench local government autonomy in the Constitution, including provisions for independent local government electoral systems and financial administration.",
    authority: "National Assembly",
    date: "2026-04-20",
    scope: "NATIONAL",
    category: "GOVERNANCE_REFORM",
    impact: "Would constitutionally guarantee the financial and administrative independence of local governments",
    presentation: {
      icon: "INSTITUTION",
      colour_role: "PENDING",
      colour_hex: "#476991",
    },
  },
];
