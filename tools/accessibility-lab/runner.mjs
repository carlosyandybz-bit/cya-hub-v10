import { chromium } from 'playwright';
import axe from 'axe-core';
import { mkdir, writeFile, appendFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const selfTest = args.includes('--self-test');
const outputFlag = args.indexOf('--output-dir');
const outputDir = outputFlag >= 0 ? args[outputFlag + 1] : 'accessibility-lab-output';

if (!selfTest) {
  console.error('T08 Phase-0 base supports --self-test only.');
  process.exit(2);
}

const sourceSha = process.env.CYA_SOURCE_SHA || 'local';
const here = path.dirname(fileURLToPath(import.meta.url));
const fixtureUrl = pathToFileURL(path.join(here, 'self-test-fixture.html')).href;
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

function normalizeViolations(violations) {
  return violations.map((violation) => ({
    rule: violation.id,
    description: violation.description,
    help: violation.help,
    nativeSeverity: violation.impact ?? null,
    locations: violation.nodes.map((node) => ({
      target: node.target,
      html: node.html,
      failureSummary: node.failureSummary ?? null,
    })),
  }));
}

async function evaluateVariant(variant) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  try {
    await page.goto(`${fixtureUrl}?variant=${variant}`);
    await page.addScriptTag({ content: axe.source });
    const raw = await page.evaluate(async () => globalThis.axe.run(document, {
      runOnly: { type: 'rule', values: ['image-alt'] },
    }));
    const findings = normalizeViolations(raw.violations);
    return {
      variant,
      findings,
      violationCount: findings.length,
      caseStatus: findings.length === 0 ? 'PASS' : 'FAIL',
    };
  } finally {
    await page.close();
  }
}

let goodCase;
let violationCase;
try {
  goodCase = await evaluateVariant('good');
  violationCase = await evaluateVariant('violation');
} finally {
  await browser.close();
}

const targetViolationDetected = violationCase.findings.some((finding) => finding.rule === 'image-alt');
const mandatoryViolationCausesFailure = violationCase.caseStatus === 'FAIL';
const pass = goodCase.caseStatus === 'PASS' && targetViolationDetected && mandatoryViolationCausesFailure;

const report = {
  tool: 'T08 CYA Accessibility Lab',
  phase: '0.12',
  mode: 'deterministic-self-test',
  sourceSha,
  axeCoreVersion: '4.13.0',
  cyaGateClassification: 'NOT_INFERRED_FROM_AXE_SEVERITY_IN_PHASE_0_BASE',
  goodCase,
  violationCase,
  assertions: {
    goodFixtureHasNoTargetViolation: goodCase.caseStatus === 'PASS',
    deliberateImageAltViolationDetected: targetViolationDetected,
    mandatoryViolationCausesCaseFailure: mandatoryViolationCausesFailure,
  },
  pass,
};

await writeFile(path.join(outputDir, 'result.json'), `${JSON.stringify(report, null, 2)}\n`);

const summary = [
  '## T08 CYA Accessibility Lab — Phase 0 self-test',
  '',
  `Source SHA: \`${sourceSha}\``,
  'axe-core: `4.13.0`',
  '',
  '| Fixture | Target findings | Case result |',
  '|---|---:|---:|',
  `| good | ${goodCase.violationCount} | ${goodCase.caseStatus} |`,
  `| deliberate violation | ${violationCase.violationCount} | ${violationCase.caseStatus} (expected) |`,
  '',
  `Mandatory violation produces failing case: **${mandatoryViolationCausesFailure ? 'yes' : 'no'}**`,
  `Overall self-test contract: **${pass ? 'PASS' : 'FAIL'}**`,
  '',
].join('\n');

if (process.env.GITHUB_STEP_SUMMARY) {
  await appendFile(process.env.GITHUB_STEP_SUMMARY, summary);
}
console.log(summary);
process.exit(pass ? 0 : 1);
