/**
 * Copy Module — the single approved source for all citizen-facing prose.
 *
 * GENERATED FILE — do not edit by hand.
 * Generated from: CAOS registries/10_projection/copy_doctrine.json
 * Regenerate: npx tsx scripts/sync-copy-glossary.ts (from CAOS root)
 *
 * Every piece of text shown to citizens in this application MUST originate
 * from this module. Hardcoded strings in components are prohibited.
 *
 * Architecture: Layer 3 enforcement — the Citizen Application.
 *   - Citizen components RENDER copy. They do not AUTHOR copy.
 *   - The build fails when new public prose is introduced outside this module.
 *   - Vocabulary tokens from CAOS projections are rendered here.
 *
 * Authority: constitution/doctrine/Office of the Citizen Public Copy Doctrine.md
 */

export const COPY_DOCTRINE_VERSION = '1.0.0';

/** Missingness state explanations — citizen-facing language for designed absences. */
export const MISSINGNESS: Record<string, { explanation: string; reason: string }> = {
  NOT_YET_ASSESSED: {
    explanation: 'This information has not yet been assessed through the governed pipeline.',
    reason: 'The responsible institution has not yet submitted this information for constitutional review.',
  },
  NO_EVIDENCE_FOUND: {
    explanation: 'No publicly available record confirms this information.',
    reason: 'We searched for official evidence but have not yet found a source that addresses this question.',
  },
  WITHHELD: {
    explanation: 'This answer is lawfully withheld from public display.',
    reason: 'The information exists but is restricted under the applicable disclosure rules.',
  },
  TEMPORAL_GAP: {
    explanation: 'No answer exists for this specific time period.',
    reason: 'The record covers other periods, but no evidence addresses this particular moment.',
  },
};

/** Verification outcome explanations — citizen-facing language for verification postures. */
export const VERIFICATION: Record<string, { explanation: string; reason: string }> = {
  VERIFIED: {
    explanation: 'This answer is supported by sovereign or official public records under a registered deterministic verification method.',
    reason: 'We independently compared multiple official records. All currently identify the same office holder. No unresolved contradictions were found.',
  },
  PROVISIONAL: {
    explanation: 'This answer is supported by verified secondary sources; sovereign or official confirmation has not yet been recorded.',
    reason: 'The evidence comes from reliable secondary sources. We are still seeking official confirmation.',
  },
  INSUFFICIENT: {
    explanation: 'The governed evidence recorded so far is not sufficient to verify this answer.',
    reason: 'Some evidence exists but it does not yet meet the constitutional threshold for verification.',
  },
  CONTESTED: {
    explanation: 'Governed evidence items contradict each other. The competing evidence is preserved and shown.',
    reason: 'Two or more admitted sources disagree. The record preserves all positions rather than choosing one.',
  },
  INVALIDATED: {
    explanation: 'The evidence supporting this answer has been invalidated.',
    reason: 'A source that previously supported this answer has been found unreliable or superseded.',
  },
  WITHHELD_VERIFICATION: {
    explanation: 'This answer is lawfully withheld from public display.',
    reason: 'The verification result exists but is restricted under the applicable disclosure rules.',
  },
};

/** Authority class labels — citizen-facing names for constitutional authority sources. */
export const AUTHORITY_LABELS: Record<string, string> = {
  CONSTITUTION: 'the Constitution',
  COURT: 'a court ruling',
  ACT: 'an Act of the National Assembly',
  LAW: 'subsidiary legislation',
  GAZETTE: 'an official gazette notification',
  REGULATION: 'a published regulation',
  EXECUTIVE_ORDER: 'an executive order',
  TREATY: 'an international treaty',
  NONE: 'no registered authority class',
};

/** Civic participation CTAs — the approved language for citizen actions. */
export const CIVIC_CTAS: Record<string, string> = {
  help_improve: 'Help improve the public record',
  contribute_evidence: 'Contribute official evidence',
  help_investigate: 'Help us investigate',
  bring_to_office: 'Bring this matter to the Office of the Citizen',
  learn_more: 'Learn more about this process',
  see_evidence: 'See the evidence behind this answer',
  report_issue: 'Report an issue with this record',
};

/** System explanations — how the system teaches citizens about itself. */
export const SYSTEM_EXPLANATIONS: Record<string, string> = {
  unknown_is_governed: 'UNKNOWN is a governed state, not an error. The system never fills a gap with a guess — if no admitted evidence answers the question, the record says so.',
  absence_is_evidence: 'Missing information is itself public information. If a record is silent, that silence is itself an answer.',
  new_evidence: 'New evidence never replaces existing evidence. It is assessed alongside it.',
  every_submission_reviewed: 'Every document submitted to the Office is independently reviewed before it affects the public record.',
  continuous_review: 'The public record is continuously reviewed as new evidence becomes available.',
};

/** UI copy — governed component-level language. */
export const UI_COPY: Record<string, string> = {
  education_heading: 'Did you know?',
  education_about_office: 'About this office',
  education_your_rights: 'Your rights',
  right_to_know_heading: 'Right to Know',
  right_to_know_intro: 'The following information is not currently available in the public record. You have the right to request it.',
  right_to_know_foi_explanation: 'Under the Freedom of Information Act 2011, you have the right to request information from public institutions. The FOI Act entitles every citizen to access public records and information.',
  right_to_know_cta: 'Learn about your FOI rights',
  officeholder_not_in_record: 'Officeholder not yet in the record',
  date_not_in_record: 'Date not yet in the record',
  not_yet_determined: 'Not yet determined',
  assumed_office: 'Assumed Office',
  term_ends: 'Term Ends',
  how_we_know: 'How We Know',
  evidence: 'Evidence',
  constitutional_authority: 'Constitutional Authority',
  truth_published_as: 'This answer is published as "{label}".',
  truth_no_evidence_fallback: 'No evidence has been admitted for this answer yet. The record will update when evidence becomes available.',
  truth_no_authority_fallback: 'The record does not yet name a governing legal authority for this answer. When authority is admitted as evidence, the nearest constitutional source will appear here.',
  truth_view_full_record: 'View the full constitutional record',
  officeholder_missing_explanation: 'The current occupant will appear here when the constitutional record is compiled.',
};

/** Participation prompt configs — civic actions shown at points of silence. */
export const PARTICIPATION_PROMPTS: Record<
  string,
  { message: string; cta: string; icon: 'question' | 'flag' | 'hand-raise' }
> = {
  NEVER_ASSESSED: {
    message: 'This information has not been assessed. You can request it through the Office.',
    cta: 'Request information',
    icon: 'hand-raise',
  },
  NON_RESPONSE: {
    message: 'This institution has not responded to our request. You can join the demand.',
    cta: 'Join the demand',
    icon: 'question',
  },
  DEFAULT: {
    message: 'This information is not publicly available. You can request it.',
    cta: 'Request it',
    icon: 'question',
  },
};

// ---------------------------------------------------------------------------
// Resolution API — the single public interface
// ---------------------------------------------------------------------------

export interface CopyResolution {
  text: string;
  doctrine_version: string;
  source_key: string;
}

/**
 * A constitutional vocabulary token received from a CAOS projection.
 * The citizen layer renders tokens — it does not interpret them.
 */
export interface CopyToken {
  token: string;
  params: Record<string, string>;
  doctrine_version: string;
  source_key: string;
}

/**
 * Render a vocabulary token from a CAOS projection into citizen-facing text.
 * This is the preferred path: projection carries tokens, citizen renders them.
 */
export function renderToken(copyToken: CopyToken): CopyResolution {
  const [, state] = copyToken.source_key.split('.');
  if (!state) {
    return {
      text: 'The public record is honestly silent here.',
      doctrine_version: copyToken.doctrine_version,
      source_key: copyToken.source_key,
    };
  }
  const resolved = resolve(state, copyToken.params as { subjectName?: string; sectionCode?: string });
  return { ...resolved, doctrine_version: copyToken.doctrine_version };
}

/**
 * Resolve a missingness state into citizen-facing copy.
 */
export function resolveMissingness(state: string | null | undefined): CopyResolution {
  if (!state) {
    return {
      text: 'This information is not currently available in the public record.',
      doctrine_version: COPY_DOCTRINE_VERSION,
      source_key: 'missingness_states.default',
    };
  }
  const entry = MISSINGNESS[state];
  if (!entry) {
    return {
      text: 'This information is not currently available in the public record.',
      doctrine_version: COPY_DOCTRINE_VERSION,
      source_key: `missingness_states.${state}`,
    };
  }
  return {
    text: entry.explanation,
    doctrine_version: COPY_DOCTRINE_VERSION,
    source_key: `missingness_states.${state}`,
  };
}

/**
 * Resolve a verification outcome into citizen-facing copy.
 */
export function resolveVerification(outcome: string | null | undefined): CopyResolution {
  if (!outcome) {
    return {
      text: 'The verification status of this answer is not currently determinable.',
      doctrine_version: COPY_DOCTRINE_VERSION,
      source_key: 'verification_outcomes.default',
    };
  }
  const entry = VERIFICATION[outcome];
  if (!entry) {
    return {
      text: 'The verification status of this answer is not currently determinable.',
      doctrine_version: COPY_DOCTRINE_VERSION,
      source_key: `verification_outcomes.${outcome}`,
    };
  }
  return {
    text: entry.explanation,
    doctrine_version: COPY_DOCTRINE_VERSION,
    source_key: `verification_outcomes.${outcome}`,
  };
}

/**
 * Resolve an authority class into a citizen-facing label.
 */
export function resolveAuthorityLabel(
  authorityClass: string | null | undefined,
): CopyResolution {
  if (!authorityClass) {
    return {
      text: 'no registered authority class',
      doctrine_version: COPY_DOCTRINE_VERSION,
      source_key: 'authority_classes.default',
    };
  }
  const label = AUTHORITY_LABELS[authorityClass];
  return {
    text: label ?? authorityClass.toLowerCase().replace(/_/g, ' '),
    doctrine_version: COPY_DOCTRINE_VERSION,
    source_key: `authority_classes.${authorityClass}`,
  };
}

/**
 * Resolve a civic participation action into citizen-facing CTA text.
 */
export function resolveCivicCTA(action: string | null | undefined): CopyResolution {
  if (!action) {
    return {
      text: action ?? '',
      doctrine_version: COPY_DOCTRINE_VERSION,
      source_key: 'civic_participation.default',
    };
  }
  const text = CIVIC_CTAS[action];
  return {
    text: text ?? action,
    doctrine_version: COPY_DOCTRINE_VERSION,
    source_key: `civic_participation.${action}`,
  };
}

/**
 * Resolve a system explanation into citizen-facing text.
 */
export function resolveSystemExplanation(key: string | null | undefined): CopyResolution {
  if (!key) {
    return {
      text: '',
      doctrine_version: COPY_DOCTRINE_VERSION,
      source_key: 'system_explanations.default',
    };
  }
  const text = SYSTEM_EXPLANATIONS[key];
  return {
    text: text ?? `No governed system explanation for: ${key}`,
    doctrine_version: COPY_DOCTRINE_VERSION,
    source_key: `system_explanations.${key}`,
  };
}

/**
 * Full copy resolution — the primary entry point.
 * Given a semantic state and optional context, return governed prose.
 */
export function resolve(
  semanticState: string,
  context?: { subjectName?: string; sectionCode?: string },
): CopyResolution {
  const missingness = MISSINGNESS[semanticState];
  if (missingness) {
    return {
      text: missingness.explanation,
      doctrine_version: COPY_DOCTRINE_VERSION,
      source_key: `missingness_states.${semanticState}`,
    };
  }

  const verification = VERIFICATION[semanticState];
  if (verification) {
    return {
      text: verification.explanation,
      doctrine_version: COPY_DOCTRINE_VERSION,
      source_key: `verification_outcomes.${semanticState}`,
    };
  }

  const system = SYSTEM_EXPLANATIONS[semanticState];
  if (system) {
    return {
      text: system,
      doctrine_version: COPY_DOCTRINE_VERSION,
      source_key: `system_explanations.${semanticState}`,
    };
  }

  return {
    text: `The public record is honestly silent here. No governed copy exists for: ${semanticState}.`,
    doctrine_version: COPY_DOCTRINE_VERSION,
    source_key: `unknown.${semanticState}`,
  };
}
