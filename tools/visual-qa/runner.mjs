import { chromium } from 'playwright';
import { createHash } from 'node:crypto';
import { mkdir, writeFile, appendFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const selfTest = args.includes('--self-test');
const outputFlag = args.indexOf('--output-dir');
const outputDir = outputFlag >= 0 ? args[outputFlag + 1] : 'visual-qa-output';

if (!selfTest) {
  console.error('T06 Phase-0 base supports --self-test only.');
  process.exit(2);
}

const sourceSha = process.env.CYA_SOURCE_SHA || 'local';
const here = path.dirname(fileURLToPath(import.meta.url));
const fixtureUrl = pathToFileURL(path.join(here, 'self-test-fixture.html')).href;
const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1440, height: 900 },
];

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
    await page.goto(`${fixtureUrl}?variant=baseline`);
    const baselineA = await page.screenshot({ animations: 'disabled' });
    const baselineB = await page.screenshot({ animations: 'disabled' });
    const baselineHashA = sha256(baselineA);
    const baselineHashB = sha256(baselineB);
    const stableBaseline = baselineHashA === baselineHashB;

    await writeFile(path.join(outputDir, `${viewport.name}-baseline.png`), baselineA);

    await page.goto(`${fixtureUrl}?variant=anomaly`);
    const anomaly = await page.screenshot({ animations: 'disabled' });
    const anomalyHash = sha256(anomaly);
    const anomalyDetected = anomalyHash !== baselineHashA;
    await writeFile(path.join(outputDir, `${viewport.name}-anomaly.png`), anomaly);

    results.push({
      viewport,
      stableBaseline,
      anomalyDetected,
      baselineSha256: baselineHashA,
      repeatedBaselineSha256: baselineHashB,
      anomalySha256: anomalyHash,
      screenshots: {
        baseline: `${viewport.name}-baseline.png`,
        anomaly: `${viewport.name}-anomaly.png`,
      },
      pass: stableBaseline && anomalyDetected,
    });

    await page.close();
  }
} finally {
  await browser.close();
}

const pass = results.every((item) => item.pass);
const report = {
  tool: 'T06 CYA Visual QA',
  phase: '0.12',
  mode: 'deterministic-self-test',
  sourceSha,
  video: 'disabled',
  trace: 'not-collected',
  viewports: results,
  pass,
};

await writeFile(path.join(outputDir, 'result.json'), `${JSON.stringify(report, null, 2)}\n`);

const summary = [
  '## T06 CYA Visual QA — Phase 0 self-test',
  '',
  `Source SHA: \`${sourceSha}\``,
  '',
  '| Viewport | Baseline stable | Deliberate anomaly detected | Result |',
  '|---|---:|---:|---:|',
  ...results.map((item) => `| ${item.viewport.name} ${item.viewport.width}x${item.viewport.height} | ${item.stableBaseline ? 'yes' : 'no'} | ${item.anomalyDetected ? 'yes' : 'no'} | ${item.pass ? 'PASS' : 'FAIL'} |`),
  '',
  `Overall self-test: **${pass ? 'PASS' : 'FAIL'}**`,
  '',
].join('\n');

if (process.env.GITHUB_STEP_SUMMARY) {
  await appendFile(process.env.GITHUB_STEP_SUMMARY, summary);
}
console.log(summary);
process.exit(pass ? 0 : 1);
