/**
 * State government office placeholder data.
 *
 * These are generic templates — the same structure applies to every state.
 * When CAOS Engine begins projecting state-level office records, this file
 * will be replaced by ProjectionSource.getRecord("office", slug).
 */
import type { OfficeConfig } from "../types";

export const GOVERNOR: OfficeConfig = {
  slug: "governor",
  level: "state",
  title: "Executive Governor",
  shortTitle: "Governor",
  institution: "State Government",
  icon: "star",
  constitutionalBasis: "Section 176, Constitution of the Federal Republic of Nigeria 1999 (as amended)",
  currentTerm: "2023–2027",
  officeStatus: "Active",
  verificationLabel: "Governed Object",
  verificationCode: "GOVERNED_OBJECT",

  holder: {
    name: null,
    portrait: null,
    assumedDate: "2023-05-29",
    termEnd: "2027-05-29",
    missingLabel: "Governor not yet in the record",
    missingExplanation: "The current officeholder for your state will appear here when the constitutional record is compiled.",
  },

  responsibilities: [
    {
      category: "constitutional",
      label: "Constitutional Responsibilities",
      items: [
        { title: "Chief Executive of the State", description: "The executive powers of a State are vested in the Governor and may be exercised directly or through Deputy Governor, Commissioners, or officers under the Governor.", citation: "Section 176(1), CFRN 1999" },
        { title: "Assent to State Bills", description: "A bill passed by the State House of Assembly must be presented to the Governor for assent before it becomes law.", citation: "Section 100, CFRN 1999" },
        { title: "Appointment of Commissioners", description: "The Governor appoints Commissioners subject to confirmation by the State House of Assembly.", citation: "Section 192, CFRN 1999" },
        { title: "Protection of the Constitution", description: "The Governor has a duty to observe and preserve the Constitution in relation to the State.", citation: "Section 14, CFRN 1999" },
      ],
    },
    {
      category: "statutory",
      label: "Statutory Responsibilities",
      items: [
        { title: "State budget presentation", description: "The Governor presents the annual state budget to the State House of Assembly.", citation: "Section 120, CFRN 1999" },
        { title: "Local government oversight", description: "The Governor is responsible for ensuring that Local Government Councils manage their affairs in accordance with the law.", citation: "Section 7(1), CFRN 1999" },
        { title: "State security", description: "The Governor works with federal security agencies to maintain peace and order within the State.", citation: "Various security statutes" },
      ],
    },
    {
      category: "conventional",
      label: "Public Expectations",
      items: [
        { title: "State development", description: "The public expects the Governor to drive infrastructure, education, and healthcare development within the State." },
        { title: "Conflict resolution", description: "Governors are expected to mediate communal and political conflicts within their States." },
        { title: "Party leadership", description: "In practice, the Governor is the de facto leader of their party at the state level." },
      ],
    },
  ],

  metricGroups: [
    {
      title: "Executive Activity",
      icon: "building",
      metrics: [
        { key: "bills_assented", label: "Bills Assented", icon: "check", status: "unavailable", value: null, unavailableReason: "State-level assent records are not routinely published in machine-readable form." },
        { key: "executive_orders", label: "Executive Orders", icon: "document", status: "unavailable", value: null, unavailableReason: "Governor's executive orders are not centrally tracked." },
        { key: "state_budget", label: "State Budget", icon: "budget", status: "unavailable", value: null, unavailableReason: "State budgets are published in gazettes but not as structured data." },
      ],
    },
    {
      title: "Citizen Engagement",
      icon: "people",
      metrics: [
        { key: "citizen_questions", label: "Citizen Questions", icon: "question", status: "available", value: 0, breakdown: [{ label: "Answered", value: 0 }, { label: "Pending", value: 0 }] },
        { key: "foi_requests", label: "FOI Requests", icon: "mail", status: "unavailable", value: null, unavailableReason: "State governments do not routinely publish FOI statistics." },
      ],
    },
  ],

  timeline: [],
  commitments: [],

  education: {
    hook: "The Governor is the chief executive of a Nigerian state, elected for a four-year term with a maximum of two terms.",
    facts: [
      "A gubernatorial candidate must secure at least 25% of the vote in two-thirds of all LGAs in the State.",
      "The Governor may be removed through impeachment by the State House of Assembly under Section 188 of the Constitution.",
      "The Governor appoints Commissioners, Special Advisers, and heads of state agencies.",
      "Each of Nigeria's 36 states has its own Governor.",
    ],
    rights: [
      "You have the right to petition the Governor on matters of state concern.",
      "You have the right to request information from the State Government under the FOI Act 2011.",
      "You have the right to attend public hearings of the State House of Assembly.",
    ],
  },

  citizenQuestions: { total: 0, answered: 0, pending: 0 },

  rightToKnow: [
    { title: "Bills Assented", reason: "State-level assent records are not routinely published in machine-readable form.", metricKey: "bills_assented" },
    { title: "State Budget", reason: "State budgets are published in gazettes but not as structured data. Citizens have the right to request this information.", metricKey: "state_budget" },
  ],
};

export const DEPUTY_GOVERNOR: OfficeConfig = {
  slug: "deputy-governor",
  level: "state",
  title: "Deputy Governor",
  shortTitle: "Deputy Governor",
  institution: "State Government",
  icon: "star",
  constitutionalBasis: "Section 187, Constitution of the Federal Republic of Nigeria 1999 (as amended)",
  currentTerm: "2023–2027",
  officeStatus: "Active",
  verificationLabel: "Governed Object",
  verificationCode: "GOVERNED_OBJECT",

  holder: {
    name: null,
    portrait: null,
    assumedDate: "2023-05-29",
    termEnd: "2027-05-29",
    missingLabel: "Deputy Governor not yet in the record",
    missingExplanation: "The current officeholder will appear here when the constitutional record is compiled.",
  },

  responsibilities: [
    {
      category: "constitutional",
      label: "Constitutional Responsibilities",
      items: [
        { title: "Assist the Governor", description: "The Deputy Governor is the principal assistant to the Governor in the execution of state executive duties.", citation: "Section 187(1), CFRN 1999" },
        { title: "Gubernatorial succession", description: "The Deputy Governor assumes the office of Governor if the Governor is unable to perform their functions.", citation: "Section 191, CFRN 1999" },
      ],
    },
    {
      category: "conventional",
      label: "Public Expectations",
      items: [
        { title: "Special assignments", description: "The Deputy Governor is often assigned specific portfolios or projects by the Governor." },
      ],
    },
  ],

  metricGroups: [
    {
      title: "Office Activity",
      icon: "building",
      metrics: [
        { key: "citizen_questions", label: "Citizen Questions", icon: "question", status: "available", value: 0, breakdown: [{ label: "Answered", value: 0 }, { label: "Pending", value: 0 }] },
      ],
    },
  ],

  timeline: [],
  commitments: [],

  education: {
    hook: "The Deputy Governor is elected on the same ticket as the Governor and is first in the line of gubernatorial succession.",
    facts: [
      "The Deputy Governor must meet the same constitutional qualifications as the Governor.",
      "The office may be independently impeached by the State House of Assembly.",
    ],
    rights: [
      "You have the right to request information from the Deputy Governor's office under the FOI Act 2011.",
    ],
  },

  citizenQuestions: { total: 0, answered: 0, pending: 0 },
  rightToKnow: [],
};

export const STATE_ASSEMBLY: OfficeConfig = {
  slug: "assembly",
  level: "state",
  title: "State House of Assembly",
  shortTitle: "State House of Assembly",
  institution: "State Legislature",
  icon: "landmark",
  constitutionalBasis: "Section 90, Constitution of the Federal Republic of Nigeria 1999 (as amended)",
  currentTerm: "2023–2027",
  officeStatus: "Active",
  verificationLabel: "Governed Object",
  verificationCode: "GOVERNED_OBJECT",

  holder: {
    name: null,
    portrait: null,
    assumedDate: "2023-06-13",
    termEnd: "2027-06-13",
    missingLabel: "Speaker not yet in the record",
    missingExplanation: "The current Speaker will appear here when the constitutional record is compiled.",
  },

  responsibilities: [
    {
      category: "constitutional",
      label: "Constitutional Responsibilities",
      items: [
        { title: "State law-making", description: "The House of Assembly makes laws for the good governance of the State.", citation: "Section 4(5), CFRN 1999" },
        { title: "Representation of State Constituencies", description: "Each Member represents a State Constituency within the legislative process.", citation: "Section 90, CFRN 1999" },
        { title: "Executive oversight", description: "The Assembly exercises oversight of the State executive through committee investigations and budget review.", citation: "Section 88, CFRN 1999" },
        { title: "Confirmation of appointments", description: "The Assembly confirms the Governor's appointments of Commissioners and certain other officers.", citation: "Section 192(2), CFRN 1999" },
        { title: "Impeachment power", description: "The Assembly has the power to impeach the Governor, Deputy Governor, and other state officers.", citation: "Section 188, CFRN 1999" },
      ],
    },
    {
      category: "statutory",
      label: "Statutory Responsibilities",
      items: [
        { title: "State budget approval", description: "The Assembly must approve the State's annual budget before it takes effect.", citation: "Section 120, CFRN 1999" },
      ],
    },
    {
      category: "conventional",
      label: "Public Expectations",
      items: [
        { title: "Constituency engagement", description: "Members are expected to be accessible and responsive to their constituents' needs." },
        { title: "Community projects", description: "Political practice expects Members to facilitate constituency projects. This is not a constitutional duty." },
      ],
    },
  ],

  metricGroups: [
    {
      title: "Legislative Activity",
      icon: "gavel",
      metrics: [
        { key: "bills_sponsored", label: "Bills Sponsored", icon: "document", status: "unavailable", value: null, unavailableReason: "State Assembly bill records are not centrally published in machine-readable form." },
        { key: "bills_passed", label: "Bills Passed", icon: "check", status: "unavailable", value: null, unavailableReason: "State Assembly voting records are not published as structured data." },
        { key: "citizen_questions", label: "Citizen Questions", icon: "question", status: "available", value: 0, breakdown: [{ label: "Answered", value: 0 }, { label: "Pending", value: 0 }] },
      ],
    },
    {
      title: "Oversight",
      icon: "eye",
      metrics: [
        { key: "attendance", label: "Plenary Attendance", icon: "calendar", status: "unavailable", value: null, unavailableReason: "State Assembly attendance records are not routinely published." },
      ],
    },
  ],

  timeline: [],
  commitments: [],

  education: {
    hook: "Each State House of Assembly is made up of Members elected from State Constituencies within that State.",
    facts: [
      "Members serve four-year terms and may be re-elected.",
      "The Speaker is elected by a majority vote of all Members.",
      "The Assembly confirms the Governor's appointments of Commissioners.",
      "State Assemblies have the power to make laws on matters in the Concurrent Legislative List.",
    ],
    rights: [
      "You have the right to write to your State Representative about matters of state concern.",
      "You have the right to attend public hearings of Assembly committees.",
      "You have the right to petition the Assembly under the Constitution.",
    ],
  },

  citizenQuestions: { total: 0, answered: 0, pending: 0 },

  rightToKnow: [
    { title: "Plenary Attendance", reason: "State Assembly attendance records are not routinely published.", metricKey: "attendance" },
    { title: "Bills Passed", reason: "State Assembly voting records are not published as structured data.", metricKey: "bills_passed" },
  ],
};

/** All state offices keyed by slug. */
export const STATE_OFFICES: Record<string, OfficeConfig> = {
  governor: GOVERNOR,
  "deputy-governor": DEPUTY_GOVERNOR,
  assembly: STATE_ASSEMBLY,
};
