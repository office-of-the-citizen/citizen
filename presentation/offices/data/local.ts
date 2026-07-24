/**
 * Local government office placeholder data.
 *
 * Generic templates that apply to every LGA. The existing LGA profile pages
 * (app/lga/[slug]) already render LGA-specific truth via the SDK. These
 * office pages complement them by focusing on the OFFICE rather than the
 * PLACE — the constitutional role, its responsibilities, and its metrics.
 */
import type { OfficeConfig } from "../types";

export const CHAIRMAN: OfficeConfig = {
  slug: "chairman",
  level: "local",
  title: "Executive Chairman",
  shortTitle: "Chairman",
  institution: "Local Government",
  icon: "people",
  constitutionalBasis: "Section 7(1), Constitution of the Federal Republic of Nigeria 1999 (as amended)",
  currentTerm: "Varies by State",
  officeStatus: "Active",
  verificationLabel: "Governed Object",
  verificationCode: "GOVERNED_OBJECT",

  holder: {
    name: null,
    portrait: null,
    assumedDate: null,
    termEnd: null,
    missingLabel: "Chairman not yet in the record",
    missingExplanation: "The current Chairman will appear here when the constitutional record is compiled. Visit your LGA profile page for existing data.",
  },

  responsibilities: [
    {
      category: "constitutional",
      label: "Constitutional Responsibilities",
      items: [
        { title: "Local government administration", description: "The Chairman is the chief executive of the Local Government, responsible for the day-to-day administration of local affairs.", citation: "Section 7(1), CFRN 1999" },
        { title: "Implementation of council decisions", description: "The Chairman implements the decisions and resolutions of the Local Government Council.", citation: "State Local Government Laws" },
        { title: "Local revenue collection", description: "The Chairman oversees the collection of local government revenues including rates, taxes, and levies.", citation: "Section 162(6), CFRN 1999" },
      ],
    },
    {
      category: "statutory",
      label: "Statutory Responsibilities",
      items: [
        { title: "Primary education", description: "The Chairman oversees the provision and maintenance of primary education within the Local Government.", citation: "Local Government Laws of the respective States" },
        { title: "Primary healthcare", description: "The Chairman is responsible for the provision and maintenance of primary healthcare facilities.", citation: "National Health Act 2014" },
        { title: "Agriculture and natural resources", description: "The Chairman oversees agricultural development and the management of local natural resources.", citation: "Local Government Laws" },
      ],
    },
    {
      category: "conventional",
      label: "Public Expectations",
      items: [
        { title: "Community development", description: "The public expects the Chairman to drive local infrastructure, water supply, and community development projects." },
        { title: "Dispute resolution", description: "Chairmen are expected to mediate local disputes and maintain harmony within the community." },
        { title: "Accessibility", description: "The Chairman is expected to be accessible to all residents of the Local Government area." },
      ],
    },
  ],

  metricGroups: [
    {
      title: "Office Activity",
      icon: "building",
      metrics: [
        { key: "projects_executed", label: "Projects Executed", icon: "project", status: "unavailable", value: null, unavailableReason: "Local government project records are not routinely published in machine-readable form." },
        { key: "local_revenue", label: "Local Revenue", icon: "budget", status: "unavailable", value: null, unavailableReason: "Local government revenue data is not centrally aggregated or published." },
        { key: "citizen_questions", label: "Citizen Questions", icon: "question", status: "available", value: 0, breakdown: [{ label: "Answered", value: 0 }, { label: "Pending", value: 0 }] },
      ],
    },
  ],

  timeline: [],
  commitments: [],

  education: {
    hook: "The Local Government Chairman is the chief executive of Nigeria's third tier of government, closest to the people.",
    facts: [
      "Local Government is constitutionally guaranteed under Section 7(1) of the 1999 Constitution.",
      "Each of Nigeria's 774 Local Government Areas has a Chairman.",
      "The Chairman is elected by the registered voters of the Local Government Area.",
      "Local Governments are responsible for primary education, primary healthcare, agriculture, and local infrastructure.",
    ],
    rights: [
      "You have the right to petition the Chairman on matters of local concern.",
      "You have the right to request information from the Local Government under the FOI Act 2011.",
      "You have the right to attend council meetings where applicable.",
      "You have the right to participate in local government elections.",
    ],
  },

  citizenQuestions: { total: 0, answered: 0, pending: 0 },

  rightToKnow: [
    { title: "Projects Executed", reason: "Local government project records are not routinely published in machine-readable form. Citizens have the right to request this information.", metricKey: "projects_executed" },
    { title: "Local Revenue", reason: "Local government revenue data is not centrally aggregated or published.", metricKey: "local_revenue" },
  ],
};

export const COUNCILLOR: OfficeConfig = {
  slug: "councillor",
  level: "local",
  title: "Councillor",
  shortTitle: "Councillor",
  institution: "Local Government Council",
  icon: "people",
  constitutionalBasis: "Section 7(1), Constitution of the Federal Republic of Nigeria 1999 (as amended)",
  currentTerm: "Varies by State",
  officeStatus: "Active",
  verificationLabel: "Governed Object",
  verificationCode: "GOVERNED_OBJECT",

  holder: {
    name: null,
    portrait: null,
    assumedDate: null,
    termEnd: null,
    missingLabel: "Councillor not yet in the record",
    missingExplanation: "The current Councillor for your ward will appear here when the constitutional record is compiled.",
  },

  responsibilities: [
    {
      category: "constitutional",
      label: "Constitutional Responsibilities",
      items: [
        { title: "Legislative representation", description: "Each Councillor represents a ward within the Local Government and participates in council deliberations.", citation: "Section 7(1), CFRN 1999" },
        { title: "Local law-making", description: "Councillors participate in making bye-laws and resolutions for the Local Government area.", citation: "State Local Government Laws" },
        { title: "Budget oversight", description: "Councillors review and approve the Local Government budget.", citation: "Local Government Laws" },
      ],
    },
    {
      category: "conventional",
      label: "Public Expectations",
      items: [
        { title: "Ward representation", description: "Councillors are expected to be the voice of their ward in the Local Government Council." },
        { title: "Community liaison", description: "Councillors are expected to relay community concerns to the Council and report back to constituents." },
        { title: "Local projects", description: "Political practice expects Councillors to facilitate projects within their wards." },
      ],
    },
  ],

  metricGroups: [
    {
      title: "Office Activity",
      icon: "building",
      metrics: [
        { key: "motions", label: "Motions", icon: "flag", status: "unavailable", value: null, unavailableReason: "Local council motion records are not routinely published." },
        { key: "citizen_questions", label: "Citizen Questions", icon: "question", status: "available", value: 0, breakdown: [{ label: "Answered", value: 0 }, { label: "Pending", value: 0 }] },
      ],
    },
  ],

  timeline: [],
  commitments: [],

  education: {
    hook: "Councillors are the closest elected representatives to the people, each representing a ward within the Local Government.",
    facts: [
      "Each ward in a Local Government Area elects one Councillor.",
      "Councillors participate in council meetings and committee work.",
      "Councillors serve as the bridge between the community and the Local Government administration.",
    ],
    rights: [
      "You have the right to write to your Councillor about ward-level concerns.",
      "You have the right to attend council meetings where applicable.",
      "You have the right to request information from the Local Government under the FOI Act 2011.",
    ],
  },

  citizenQuestions: { total: 0, answered: 0, pending: 0 },

  rightToKnow: [
    { title: "Council Motions", reason: "Local council motion records are not routinely published.", metricKey: "motions" },
  ],
};

/** All local offices keyed by slug. */
export const LOCAL_OFFICES: Record<string, OfficeConfig> = {
  chairman: CHAIRMAN,
  councillor: COUNCILLOR,
};
