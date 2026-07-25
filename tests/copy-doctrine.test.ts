/**
 * Public Copy Doctrine — Citizen App regression tests.
 *
 * Proves that all citizen-facing copy originates from the copy module.
 * The build check catches any prose introduced outside the approved source.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import * as path from 'path';

// ---------------------------------------------------------------------------
// Copy Module Integrity
// ---------------------------------------------------------------------------

describe('Copy Module — glossary integrity', () => {
  const copyModulePath = path.join(
    process.cwd(),
    'presentation/copy/index.ts',
  );

  it('copy module exists', () => {
    assert.ok(fs.existsSync(copyModulePath), 'presentation/copy/index.ts not found');
  });

  it('exports COPY_DOCTRINE_VERSION', () => {
    const content = fs.readFileSync(copyModulePath, 'utf-8');
    assert.ok(content.includes('COPY_DOCTRINE_VERSION'), 'COPY_DOCTRINE_VERSION not exported');
  });

  it('exports resolve function', () => {
    const content = fs.readFileSync(copyModulePath, 'utf-8');
    assert.ok(content.includes('export function resolve'), 'resolve function not exported');
  });

  it('exports resolveMissingness function', () => {
    const content = fs.readFileSync(copyModulePath, 'utf-8');
    assert.ok(
      content.includes('export function resolveMissingness'),
      'resolveMissingness function not exported',
    );
  });

  it('exports resolveVerification function', () => {
    const content = fs.readFileSync(copyModulePath, 'utf-8');
    assert.ok(
      content.includes('export function resolveVerification'),
      'resolveVerification function not exported',
    );
  });

  it('contains all missingness states from CAOS doctrine', () => {
    const content = fs.readFileSync(copyModulePath, 'utf-8');
    const requiredStates = [
      'NOT_YET_ASSESSED',
      'NO_EVIDENCE_FOUND',
      'WITHHELD',
      'TEMPORAL_GAP',
    ];
    for (const state of requiredStates) {
      assert.ok(
        content.includes(state),
        `Missingness state ${state} not found in copy module`,
      );
    }
  });

  it('contains all verification outcomes from CAOS doctrine', () => {
    const content = fs.readFileSync(copyModulePath, 'utf-8');
    const requiredOutcomes = [
      'VERIFIED',
      'PROVISIONAL',
      'INSUFFICIENT',
      'CONTESTED',
      'INVALIDATED',
      'WITHHELD_VERIFICATION',
    ];
    for (const outcome of requiredOutcomes) {
      assert.ok(
        content.includes(outcome),
        `Verification outcome ${outcome} not found in copy module`,
      );
    }
  });

  it('no forbidden terminology in the copy module itself', () => {
    const content = fs.readFileSync(copyModulePath, 'utf-8').toLowerCase();
    const forbidden = [
      'classification complete',
      'verification failed',
      'source missing',
      'report error',
      'submit document',
      'leverage',
      'synergy',
      'streamline',
    ];
    for (const term of forbidden) {
      assert.ok(
        !content.includes(term),
        `Forbidden term "${term}" found in the copy module itself`,
      );
    }
  });
});

// ---------------------------------------------------------------------------
// Build Check: No unauthorised prose in citizen-facing code
// ---------------------------------------------------------------------------

describe('Build Check — no unauthorised prose in citizen-facing code', () => {
  /** Directories that contain citizen-facing code. */
  const SCAN_DIRS = ['components', 'app'];

  /** Forbidden patterns that must never appear as hardcoded strings. */
  const FORBIDDEN_IN_COMPONENTS = [
    { pattern: /Classification Complete/gi, rule: 'system_jargon' },
    { pattern: /Verification Failed/gi, rule: 'system_jargon' },
    { pattern: /Source Missing/gi, rule: 'system_jargon' },
    { pattern: /Report Error/gi, rule: 'transactional_cta' },
    { pattern: /Submit Document/gi, rule: 'transactional_cta' },
    { pattern: /Contact Us/gi, rule: 'transactional_cta' },
    { pattern: /leverage|synergy|streamline|game.changer/gi, rule: 'buzzword' },
    { pattern: /(?<!Act\s{1,10})empower(?:s|ed|ment)\b/gi, rule: 'buzzword' },
    { pattern: /please note|it is important to note/gi, rule: 'hedging' },
    { pattern: /this is correct|this is definitive|undeniably|unquestionably/gi, rule: 'certainty' },
    { pattern: /will soon|coming soon|will be available|launching|about to/gi, rule: 'future_promise' },
  ];

  /**
   * Hardcoded prose detection: JSX text content that looks like citizen-facing
   * sentences (starts with capital, 3+ words, not a code identifier).
   * Excludes: aria-labels, className, imports, comments, single-word labels.
   */
  const PROSE_PATTERN = />\s*([A-Z][a-z]+(?:\s+[a-z]+){2,}[^<]{0,80})\s*</g;

  /** Files exempt from prose scanning (layout shells, metadata). */
  const EXEMPT_FILES = [
    'layout.tsx',
    'loading.tsx',
    'error.tsx',
    'not-found.tsx',
  ];

  /**
   * Baseline allowlist — existing prose debt that predates Layer 3 enforcement.
   * This list can only SHRINK. New files must never be added here.
   * Each entry represents a component that must be migrated to the copy API.
   */
  const PROSE_BASELINE_ALLOWLIST = [
    'components/discovery/DiscoveryFlow.tsx',
    'components/lga/ActivityTimeline.tsx',
    'components/lga/AllocationSplitCard.tsx',
    'components/lga/ParticipateCard.tsx',
    'components/offices/CitizenQuestionsCard.tsx',
    'components/offices/CommitmentsTimeline.tsx',
    'components/offices/OfficeTimeline.tsx',
    'components/participation/CaseTracker.tsx',
    'components/profile/ProfileClient.tsx',
    'components/search/SearchClient.tsx',
    'components/shell/DeviceShell.tsx',
    'app/offices/page.tsx',
    'app/participate/foi/page.tsx',
    'app/participate/page.tsx',
    'app/participate/question/page.tsx',
    'app/specimen/page.tsx',
  ];

  function walkDir(dir: string): string[] {
    if (!fs.existsSync(dir)) return [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files: string[] = [];
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === '.next') continue;
        files.push(...walkDir(fullPath));
      } else if (/\.(tsx?|jsx?)$/.test(entry.name)) {
        files.push(fullPath);
      }
    }
    return files;
  }

  // Collect all citizen-facing source files
  const allFiles: string[] = [];
  for (const dir of SCAN_DIRS) {
    allFiles.push(...walkDir(path.join(process.cwd(), dir)));
  }

  // Check 1: Forbidden terminology
  for (const file of allFiles) {
    const relPath = path.relative(process.cwd(), file);
    const content = fs.readFileSync(file, 'utf-8');

    for (const { pattern, rule } of FORBIDDEN_IN_COMPONENTS) {
      const regex = new RegExp(pattern.source, pattern.flags);
      const match = regex.exec(content);
      if (match) {
        it(`${relPath} must not contain ${rule} ("${match[0]}")`, () => {
          assert.fail(
            `Found forbidden ${rule} "${match[0]}" in ${relPath}. ` +
            `All citizen-facing copy must come from presentation/copy/index.ts.`,
          );
        });
      }
    }
  }

  // Check 2: Hardcoded prose in JSX (structural enforcement)
  for (const file of allFiles) {
    const relPath = path.relative(process.cwd(), file);
    const basename = path.basename(file);
    if (EXEMPT_FILES.includes(basename)) continue;

    const content = fs.readFileSync(file, 'utf-8');
    // Strip comments and imports to reduce false positives
    const stripped = content
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '')
      .replace(/^import\s.*$/gm, '');

    const proseMatches: string[] = [];
    let m: RegExpExecArray | null;
    const re = new RegExp(PROSE_PATTERN.source, PROSE_PATTERN.flags);
    while ((m = re.exec(stripped)) !== null) {
      const text = m[1].trim();
      // Skip if it looks like a component name or code identifier
      if (/^[A-Z][a-zA-Z]+$/.test(text)) continue;
      // Skip if it's inside a copy module import usage
      if (text.includes('{') || text.includes('}')) continue;
      proseMatches.push(text);
    }

    if (proseMatches.length > 0) {
      // Ratchet: existing debt is tracked, new violations fail immediately
      const isBaseline = PROSE_BASELINE_ALLOWLIST.includes(relPath);
      if (!isBaseline) {
        it(`${relPath} should not author citizen-facing prose directly`, () => {
          assert.fail(
            `Found ${proseMatches.length} hardcoded prose string(s) in ${relPath}: ` +
            `"${proseMatches[0]}". ` +
            `Citizen components render copy — they do not author it. ` +
            `Use presentation/copy/index.ts.`,
          );
        });
      }
    }
  }
});
