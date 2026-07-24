/**
 * Federal government office placeholder data.
 *
 * Every value here is presentation-layer configuration — not constitutional
 * truth. When CAOS Engine begins projecting office records, this file is
 * replaced by ProjectionSource.getRecord("office", slug).
 *
 * Placeholder values are realistic but clearly marked as such. No fabricated
 * historical facts — only structural office data and constitutional text.
 */
import type { OfficeConfig } from "../types";

export const PRESIDENT: OfficeConfig = {
  slug: "president",
  level: "federal",
  title: "President of the Federal Republic of Nigeria",
  shortTitle: "President",
  institution: "The Presidency",
  icon: "star",
  constitutionalBasis: "Section 130, Constitution of the Federal Republic of Nigeria 1999 (as amended)",
  currentTerm: "2023–2027",
  officeStatus: "Active",
  verificationLabel: "Governed Object",
  verificationCode: "GOVERNED_OBJECT",

  holder: {
    name: "Bola Ahmed Tinubu",
    portrait: null,
    party: "All Progressives Congress (APC)",
    assumedDate: "2023-05-29",
    termEnd: "2027-05-29",
  },

  responsibilities: [
    {
      category: "constitutional",
      label: "Constitutional Responsibilities",
      items: [
        { title: "Chief Executive of the Federation", description: "The executive powers of the Federation are vested in the President and may be exercised directly or through Vice-President, Ministers, or officers under the President.", citation: "Section 130(1), CFRN 1999" },
        { title: "Commander-in-Chief of the Armed Forces", description: "The supreme command of the Armed Forces of the Federation is vested in the President.", citation: "Section 130(2), CFRN 1999" },
        { title: "Assent to Bills", description: "A bill passed by the National Assembly must be presented to the President for assent before it becomes law.", citation: "Section 58, CFRN 1999" },
        { title: "Appointment of Ministers", description: "The President appoints Ministers subject to confirmation by the Senate.", citation: "Section 147, CFRN 1999" },
        { title: "Protection of the Constitution", description: "It is the President's duty to preserve and defend the Constitution and ensure the welfare and security of the people.", citation: "Section 14, CFRN 1999" },
      ],
    },
    {
      category: "statutory",
      label: "Statutory Responsibilities",
      items: [
        { title: "National Security Council", description: "The President chairs the National Security Council, advising on matters of national security.", citation: "National Security Agencies Act" },
        { title: "Police Service Commission appointments", description: "The President appoints members of the Police Service Commission subject to Senate confirmation.", citation: "Police Act 2020" },
        { title: "Fiscal responsibility reporting", description: "The President presents the annual budget and fiscal strategy paper to the National Assembly.", citation: "Fiscal Responsibility Act 2007" },
      ],
    },
    {
      category: "conventional",
      label: "Public Expectations",
      items: [
        { title: "National address", description: "The President is expected to address the nation on major issues of state, security, and policy direction." },
        { title: "Diplomatic representation", description: "The President represents Nigeria at international summits, bilateral meetings, and multilateral forums." },
        { title: "Crisis response", description: "The public expects the President to personally intervene during national emergencies, natural disasters, and security crises." },
        { title: "Party leadership", description: "In practice, the President is the de facto leader of their political party and is expected to support party candidates." },
      ],
    },
  ],

  metricGroups: [
    {
      title: "Legislative Activity",
      icon: "gavel",
      metrics: [
        { key: "bills_assented", label: "Bills Assented", icon: "check", status: "pending", value: null, unavailableReason: "National Assembly does not routinely publish assent records in machine-readable form." },
        { key: "bills_vetoed", label: "Bills Vetoed", icon: "close", status: "unavailable", value: null, unavailableReason: "Veto records are not centrally published. Citizens have the right to request this information." },
        { key: "executive_bills", label: "Executive Bills Sponsored", icon: "document", status: "pending", value: null, unavailableReason: "Executive-sponsored bills are tracked by the National Assembly but not aggregated publicly." },
      ],
    },
    {
      title: "Oversight & Accountability",
      icon: "eye",
      metrics: [
        { key: "budget_proposed", label: "Budget Proposed", icon: "budget", status: "available", value: "₦28.78 Trillion", breakdown: [{ label: "2025 Fiscal Year", value: "₦28.78T" }] },
        { key: "audit_responses", label: "Audit Query Responses", icon: "document", status: "unavailable", value: null, unavailableReason: "Presidential responses to Auditor-General queries are not routinely published." },
      ],
    },
    {
      title: "Citizen Engagement",
      icon: "people",
      metrics: [
        { key: "citizen_questions", label: "Citizen Questions", icon: "question", status: "available", value: 0, breakdown: [{ label: "Answered", value: 0 }, { label: "Pending", value: 0 }] },
        { key: "foi_requests", label: "FOI Requests", icon: "mail", status: "unavailable", value: null, unavailableReason: "The Presidency does not routinely publish FOI request statistics." },
        { key: "public_statements", label: "Public Statements", icon: "flag", status: "unavailable", value: null, unavailableReason: "No systematic record of official public statements is maintained in the public domain." },
      ],
    },
    {
      title: "Public Commitments",
      icon: "promise",
      metrics: [
        { key: "commitments_total", label: "Tracked Commitments", icon: "flag", status: "pending", value: null, unavailableReason: "Commitment tracking is being developed. Pledges will be verified against evidence as they are admitted." },
      ],
    },
  ],

  timeline: [
    { code: "inauguration-2023", category: "INAUGURATION", title: "Inauguration", summary: "Sworn in as President of the Federal Republic of Nigeria", occurredAt: "2023-05-29", icon: "seal-check", colourRole: "verified" },
    { code: "budget-2024", category: "BUDGET", title: "2024 Budget Presentation", summary: "Presented the 2024 Appropriation Bill to the National Assembly", occurredAt: "2023-12-19", icon: "budget", colourRole: "reference" },
    { code: "tax-reform-2024", category: "LEGISLATIVE", title: "Tax Reform Bills", summary: "Submitted four tax reform bills to the National Assembly", occurredAt: "2024-01-29", icon: "document", colourRole: "reference" },
    { code: "student-loan-2023", category: "LEGISLATIVE", title: "Student Loans Act", summary: "Assented to the Student Loans Act establishing the Nigerian Education Loan Fund", occurredAt: "2023-08-21", icon: "gavel", colourRole: "verified" },
  ],

  commitments: [
    { promise: "Unify the exchange rate", status: "fulfilled", evidenceSummary: "The CBN moved to a unified exchange rate regime in June 2023.", dateMade: "2023-06-01" },
    { promise: "Remove fuel subsidy", status: "fulfilled", evidenceSummary: "Fuel subsidy was removed at the inauguration address, effective immediately.", dateMade: "2023-05-29" },
    { promise: "Reduce cost of governance", status: "ongoing", dateMade: "2023-05-29" },
    { promise: "Build new refineries", status: "unverified", dateMade: "2023-07-15" },
  ],

  education: {
    hook: "The President of Nigeria holds the highest executive office in the land, established by Section 130 of the 1999 Constitution.",
    facts: [
      "The President is elected for a four-year term and may serve a maximum of two terms.",
      "A presidential candidate must secure at least 25% of the vote in two-thirds of all states and the FCT.",
      "The President may be removed through impeachment by the National Assembly under Section 143 of the Constitution.",
      "The official residence is Aso Villa, Abuja.",
    ],
    rights: [
      "You have the right to petition the President under Section 39 of the Constitution.",
      "You have the right to request information from the Presidency under the Freedom of Information Act 2011.",
      "You have the right to attend public hearings of Senate committees that oversee the Presidency.",
      "You have the right to peaceful assembly to express your views about this office.",
    ],
  },

  citizenQuestions: { total: 0, answered: 0, pending: 0 },

  rightToKnow: [
    { title: "Bills Assented or Vetoed", reason: "The National Assembly does not routinely publish assent records in machine-readable form. Citizens have the right to request greater transparency.", metricKey: "bills_assented" },
    { title: "FOI Request Statistics", reason: "The Presidency does not routinely publish FOI request statistics. Citizens have the right to request this information under the FOI Act 2011.", metricKey: "foi_requests" },
    { title: "Audit Query Responses", reason: "Presidential responses to Auditor-General queries are not routinely published. Citizens have the right to demand accountability.", metricKey: "audit_responses" },
  ],
};

export const VICE_PRESIDENT: OfficeConfig = {
  slug: "vice-president",
  level: "federal",
  title: "Vice President of the Federal Republic of Nigeria",
  shortTitle: "Vice President",
  institution: "The Presidency",
  icon: "star",
  constitutionalBasis: "Section 142, Constitution of the Federal Republic of Nigeria 1999 (as amended)",
  currentTerm: "2023–2027",
  officeStatus: "Active",
  verificationLabel: "Governed Object",
  verificationCode: "GOVERNED_OBJECT",

  holder: {
    name: "Kashim Shettima",
    portrait: null,
    party: "All Progressives Congress (APC)",
    assumedDate: "2023-05-29",
    termEnd: "2027-05-29",
  },

  responsibilities: [
    {
      category: "constitutional",
      label: "Constitutional Responsibilities",
      items: [
        { title: "Assist the President", description: "The Vice President is the principal assistant to the President in the execution of presidential duties.", citation: "Section 142(1), CFRN 1999" },
        { title: "Presidential succession", description: "The Vice President assumes the office of President if the President is unable to perform their functions due to death, incapacity, or impeachment.", citation: "Section 146, CFRN 1999" },
        { title: "Assignments from the President", description: "The Vice President may be assigned specific responsibilities by the President.", citation: "Section 147(4), CFRN 1999" },
      ],
    },
    {
      category: "statutory",
      label: "Statutory Responsibilities",
      items: [
        { title: "National Economic Council", description: "The Vice President chairs the National Economic Council, which advises on economic policy.", citation: "Section 163, CFRN 1999" },
        { title: "NASS Liaison", description: "The Vice President serves as the executive's liaison with the National Assembly on government business.", citation: "Standing Orders of the Senate" },
      ],
    },
    {
      category: "conventional",
      label: "Public Expectations",
      items: [
        { title: "Special assignments", description: "The Vice President is often given special diplomatic or policy assignments by the President." },
        { title: "Regional representation", description: "The Vice President is expected to represent the interests of their geopolitical zone within the administration." },
      ],
    },
  ],

  metricGroups: [
    {
      title: "Office Activity",
      icon: "building",
      metrics: [
        { key: "nec_meetings", label: "NEC Meetings Chaired", icon: "calendar", status: "pending", value: null, unavailableReason: "NEC meeting records are not published in a machine-readable format." },
        { key: "nass_liaison", label: "NASS Liaison Activities", icon: "document", status: "unavailable", value: null, unavailableReason: "Executive-Legislative liaison records are not routinely published." },
        { key: "citizen_questions", label: "Citizen Questions", icon: "question", status: "available", value: 0, breakdown: [{ label: "Answered", value: 0 }, { label: "Pending", value: 0 }] },
      ],
    },
  ],

  timeline: [
    { code: "vp-inauguration-2023", category: "INAUGURATION", title: "Inauguration as Vice President", summary: "Sworn in as Vice President of the Federal Republic of Nigeria", occurredAt: "2023-05-29", icon: "seal-check", colourRole: "verified" },
  ],

  commitments: [],

  education: {
    hook: "The Vice President is elected on the same ticket as the President and is the first in the line of presidential succession.",
    facts: [
      "The Vice President must meet the same constitutional qualifications as the President (Section 131, CFRN 1999).",
      "The Vice President may be removed independently through impeachment under Section 143.",
      "The office was created by the 1979 Constitution and has been retained in every subsequent constitution.",
    ],
    rights: [
      "You have the right to request information from the Vice President's office under the FOI Act 2011.",
      "You have the right to attend public hearings of Senate committees overseeing the Vice President's assignments.",
    ],
  },

  citizenQuestions: { total: 0, answered: 0, pending: 0 },

  rightToKnow: [
    { title: "NEC Meeting Records", reason: "National Economic Council meeting records are not published in machine-readable form.", metricKey: "nec_meetings" },
  ],
};

export const SENATE: OfficeConfig = {
  slug: "senate",
  level: "federal",
  title: "Senate of the Federal Republic of Nigeria",
  shortTitle: "Senate",
  institution: "National Assembly",
  icon: "landmark",
  constitutionalBasis: "Section 48, Constitution of the Federal Republic of Nigeria 1999 (as amended)",
  currentTerm: "2023–2027",
  officeStatus: "Active — 109 Senators",
  verificationLabel: "Governed Object",
  verificationCode: "GOVERNED_OBJECT",

  holder: {
    name: "Godswill Akpabio",
    portrait: null,
    party: "All Progressives Congress (APC)",
    assumedDate: "2023-06-13",
    termEnd: "2027-06-13",
    missingLabel: "Senate President unavailable",
    missingExplanation: "The current presiding officer is not yet in the record.",
  },

  responsibilities: [
    {
      category: "constitutional",
      label: "Constitutional Responsibilities",
      items: [
        { title: "Law-making", description: "The Senate, together with the House of Representatives, makes laws for the peace, order, and good government of the Federation.", citation: "Section 4(1), CFRN 1999" },
        { title: "Representation", description: "Each Senator represents their Senatorial District and brings the interests of their constituents to the federal legislature.", citation: "Section 48, CFRN 1999" },
        { title: "Executive oversight", description: "The Senate exercises oversight of the executive through committee investigations, budget defence, and policy review.", citation: "Section 88, CFRN 1999" },
        { title: "Confirmation of appointments", description: "The Senate confirms presidential appointments of Ministers, ambassadors, heads of agencies, and certain judicial officers.", citation: "Section 147(2), CFRN 1999" },
        { title: "Impeachment power", description: "The Senate has the power to impeach the President, Vice President, and other office holders under Section 143.", citation: "Section 143, CFRN 1999" },
      ],
    },
    {
      category: "statutory",
      label: "Statutory Responsibilities",
      items: [
        { title: "Budget approval", description: "The Senate must approve the annual Appropriation Act before it can be signed into law.", citation: "Section 80, CFRN 1999" },
        { title: "Treaty ratification", description: "International treaties and agreements require Senate ratification to take effect.", citation: "Section 12, CFRN 1999" },
      ],
    },
    {
      category: "conventional",
      label: "Public Expectations",
      items: [
        { title: "Constituency projects", description: "Nigerian political practice expects Senators to facilitate constituency projects and interventions for their districts. This is a political expectation, not a constitutional duty." },
        { title: "Public engagement", description: "Senators are expected to hold town halls and engage constituents on federal legislation affecting their districts." },
      ],
    },
  ],

  metricGroups: [
    {
      title: "Legislative Activity",
      icon: "gavel",
      metrics: [
        { key: "bills_sponsored", label: "Bills Sponsored", icon: "document", status: "pending", value: null, unavailableReason: "Individual Senator bill sponsorship records are not centrally published in machine-readable form." },
        { key: "bills_passed", label: "Bills Passed", icon: "check", status: "pending", value: null, unavailableReason: "Senate voting records are published in Hansard but not in a structured dataset." },
        { key: "motions", label: "Motions", icon: "flag", status: "pending", value: null, unavailableReason: "Motion records are available in Hansard but not yet aggregated." },
        { key: "questions_raised", label: "Questions Raised", icon: "question", status: "unavailable", value: null, unavailableReason: "Parliamentary questions are not routinely published in machine-readable form." },
      ],
    },
    {
      title: "Oversight",
      icon: "eye",
      metrics: [
        { key: "committee_memberships", label: "Committee Memberships", icon: "people", status: "pending", value: null, unavailableReason: "Committee composition changes during the session and is not maintained as a live dataset." },
        { key: "oversight_hearings", label: "Oversight Hearings", icon: "eye", status: "unavailable", value: null, unavailableReason: "Committee hearing records are not systematically published." },
      ],
    },
    {
      title: "Citizen Engagement",
      icon: "people",
      metrics: [
        { key: "citizen_questions", label: "Citizen Questions", icon: "question", status: "available", value: 0, breakdown: [{ label: "Answered", value: 0 }, { label: "Pending", value: 0 }] },
        { key: "attendance", label: "Plenary Attendance", icon: "calendar", status: "unavailable", value: null, unavailableReason: "Senate attendance records are not routinely published. Citizens have the right to request greater transparency." },
      ],
    },
  ],

  timeline: [
    { code: "senate-opening-2023", category: "INAUGURATION", title: "9th Senate inaugurated", summary: "The 10th National Assembly was inaugurated", occurredAt: "2023-06-13", icon: "seal-check", colourRole: "verified" },
  ],

  commitments: [],

  education: {
    hook: "The Nigerian Senate has 109 members — three from each of the 36 states and one from the Federal Capital Territory.",
    facts: [
      "Senators serve four-year terms and may be re-elected for one additional term.",
      "The Senate President is elected by a majority vote of all Senators.",
      "The Senate has sole power to confirm presidential appointments and ratify treaties.",
      "Each state is divided into three Senatorial Districts, each returning one Senator.",
    ],
    rights: [
      "You have the right to write to your Senator about any matter of federal concern.",
      "You have the right to attend public hearings of Senate committees.",
      "You have the right to petition the Senate under the Constitution.",
      "You have the right to request information from the National Assembly under the FOI Act 2011.",
    ],
  },

  citizenQuestions: { total: 0, answered: 0, pending: 0 },

  rightToKnow: [
    { title: "Plenary Attendance", reason: "Senate attendance records are not routinely published. Citizens have the right to request greater transparency.", metricKey: "attendance" },
    { title: "Bills Sponsored", reason: "Individual Senator bill sponsorship records are not centrally published in machine-readable form.", metricKey: "bills_sponsored" },
    { title: "Committee Hearings", reason: "Committee hearing records are not systematically published.", metricKey: "oversight_hearings" },
  ],
};

export const HOUSE_OF_REPRESENTATIVES: OfficeConfig = {
  slug: "house",
  level: "federal",
  title: "House of Representatives of the Federal Republic of Nigeria",
  shortTitle: "House of Representatives",
  institution: "National Assembly",
  icon: "landmark",
  constitutionalBasis: "Section 49, Constitution of the Federal Republic of Nigeria 1999 (as amended)",
  currentTerm: "2023–2027",
  officeStatus: "Active — 360 Members",
  verificationLabel: "Governed Object",
  verificationCode: "GOVERNED_OBJECT",

  holder: {
    name: "Tajudeen Abbas",
    portrait: null,
    party: "All Progressives Congress (APC)",
    assumedDate: "2023-06-13",
    termEnd: "2027-06-13",
  },

  responsibilities: [
    {
      category: "constitutional",
      label: "Constitutional Responsibilities",
      items: [
        { title: "Law-making", description: "The House, together with the Senate, makes laws for the peace, order, and good government of the Federation.", citation: "Section 4(1), CFRN 1999" },
        { title: "Representation of Federal Constituencies", description: "Each Member represents a Federal Constituency and brings local interests to the legislative process.", citation: "Section 49, CFRN 1999" },
        { title: "Financial initiation", description: "Money bills (appropriation, finance) must originate in the House of Representatives.", citation: "Section 59, CFRN 1999" },
        { title: "Executive oversight", description: "The House exercises oversight of the executive through committee investigations and budget defence.", citation: "Section 88, CFRN 1999" },
      ],
    },
    {
      category: "statutory",
      label: "Statutory Responsibilities",
      items: [
        { title: "Budget initiation", description: "The Appropriation Bill is first presented to the House of Representatives.", citation: "Section 80(1), CFRN 1999" },
        { title: "Impeachment of certain officers", description: "The House has the power to initiate impeachment proceedings.", citation: "Section 143(2), CFRN 1999" },
      ],
    },
    {
      category: "conventional",
      label: "Public Expectations",
      items: [
        { title: "Constituency engagement", description: "Members are expected to be accessible to their constituents and responsive to local needs." },
        { title: "Community projects", description: "Political practice expects Members to facilitate projects and interventions in their constituencies. This is not a constitutional duty." },
      ],
    },
  ],

  metricGroups: [
    {
      title: "Legislative Activity",
      icon: "gavel",
      metrics: [
        { key: "bills_sponsored", label: "Bills Sponsored", icon: "document", status: "pending", value: null, unavailableReason: "Member bill sponsorship records are not centrally published in machine-readable form." },
        { key: "bills_passed", label: "Bills Passed", icon: "check", status: "pending", value: null, unavailableReason: "House voting records are published in Hansard but not as structured data." },
        { key: "citizen_questions", label: "Citizen Questions", icon: "question", status: "available", value: 0, breakdown: [{ label: "Answered", value: 0 }, { label: "Pending", value: 0 }] },
      ],
    },
    {
      title: "Oversight",
      icon: "eye",
      metrics: [
        { key: "attendance", label: "Plenary Attendance", icon: "calendar", status: "unavailable", value: null, unavailableReason: "House attendance records are not routinely published." },
        { key: "committee_hearings", label: "Committee Hearings", icon: "eye", status: "unavailable", value: null, unavailableReason: "Committee hearing records are not systematically published." },
      ],
    },
  ],

  timeline: [
    { code: "house-opening-2023", category: "INAUGURATION", title: "10th House inaugurated", summary: "The 10th House of Representatives was inaugurated", occurredAt: "2023-06-13", icon: "seal-check", colourRole: "verified" },
  ],

  commitments: [],

  education: {
    hook: "The House of Representatives has 360 members, each elected from a Federal Constituency.",
    facts: [
      "Members serve four-year terms and may be re-elected.",
      "The Speaker of the House is elected by a majority vote of all Members.",
      "Money bills must originate in the House — this is a constitutional requirement.",
      "The House has the power to initiate impeachment proceedings against the President and other officers.",
    ],
    rights: [
      "You have the right to write to your Representative about federal matters affecting your constituency.",
      "You have the right to attend public hearings of House committees.",
      "You have the right to petition the House under the Constitution.",
    ],
  },

  citizenQuestions: { total: 0, answered: 0, pending: 0 },

  rightToKnow: [
    { title: "Plenary Attendance", reason: "House attendance records are not routinely published. Citizens have the right to request greater transparency.", metricKey: "attendance" },
  ],
};

/** All federal offices keyed by slug for registry lookup. */
export const FEDERAL_OFFICES: Record<string, OfficeConfig> = {
  president: PRESIDENT,
  "vice-president": VICE_PRESIDENT,
  senate: SENATE,
  house: HOUSE_OF_REPRESENTATIVES,
};
