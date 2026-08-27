import { createServer } from 'node:http';
import { promises as dns } from 'node:dns';
import net from 'node:net';
import { readFile } from 'node:fs/promises';
import process from 'node:process';
import { chromium } from 'playwright';

const PLAYWRIGHT_VERSION = '1.62.1';
const contexts = [
  { id: 'mobile', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
  { id: 'desktop', viewport: { width: 1440, height: 900 }, isMobile: false, hasTouch: false },
];
const args = new Map();
for (let index = 2; index < process.argv.length; index += 1) {
  const key = process.argv[index];
  const value = process.argv[index + 1];
  if (key.startsWith('--')) {
    if (value === undefined || value.startsWith('--')) args.set(key.slice(2), true);
    else {
      args.set(key.slice(2), value);
      index += 1;
    }
  }
}

const outputDir = String(args.get('output-dir') ?? 'browser-lab-output');
const selfTest = args.get('self-test') === true || args.get('self-test') === 'true';
let requestedUrl = selfTest ? null : String(args.get('target-url') ?? '');
const observations = [];
const failures = [];
const screenshots = [];
const startedAt = new Date().toISOString();
const selfTestExpectedKinds = new Set(['console', 'request', 'layout', 'control-heuristic']);
const selfTestDetections = new Set();
let selfTestOrigin = null;
let selfTestServerHandle = null;

function safeText(value, limit = 500) {
  return String(value ?? '').replace(/https?:\/\/[^\s]+/gi, '[URL]').replace(/[\w.+-]+@[\w.-]+/g, '[EMAIL]').slice(0, limit);
}

function safeUrl(value) {
  try {
    const url = new URL(value);
    url.username = '';
    url.password = '';
    url.search = '';
    url.hash = '';
    return url.toString();
  } catch {
    return '[invalid-url]';
  }
}

function isForbiddenAddress(address) {
  if (net.isIPv4(address)) {
    const octets = address.split('.').map(Number);
    return octets[0] === 0 || octets[0] === 10 || octets[0] === 127 ||
      (octets[0] === 100 && octets[1] >= 64 && octets[1] <= 127) ||
      (octets[0] === 169 && octets[1] === 254) ||
      (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) ||
      (octets[0] === 192 && octets[1] === 0 && octets[2] === 0) ||
      (octets[0] === 192 && octets[1] === 168) ||
      (octets[0] === 198 && (octets[1] === 18 || octets[1] === 19)) ||
      (octets[0] === 198 && octets[1] === 51 && octets[2] === 100) ||
      (octets[0] === 203 && octets[1] === 0 && octets[2] === 113) ||
      octets[0] >= 224;
  }
  if (net.isIPv6(address)) {
    const normalized = address.toLowerCase();
    return normalized === '::' || normalized === '::1' || normalized.startsWith('fc') ||
      normalized.startsWith('fd') || normalized.startsWith('fe8') || normalized.startsWith('fe9') ||
      normalized.startsWith('fea') || normalized.startsWith('feb') || normalized.startsWith('2001:db8:');
  }
  return true;
}

async function validateUrl(value, { allowSelfTest = false } = {}) {
  let url;
  try { url = new URL(value); } catch { throw new Error('target_url must be a valid URL'); }
  if (allowSelfTest && selfTestOrigin && value.startsWith(selfTestOrigin)) return url;
  if (url.protocol !== 'https:') throw new Error('target_url must use HTTPS');
  if (url.username || url.password) throw new Error('embedded credentials are not allowed');
  if (url.hostname === 'localhost' || net.isIP(url.hostname) && isForbiddenAddress(url.hostname)) {
    throw new Error('localhost, loopback, private, link-local, or reserved destinations are not allowed');
  }
  const records = await dns.lookup(url.hostname, { all: true, verbatim: true });
  if (!records.length || records.some(({ address }) => isForbiddenAddress(address))) {
    throw new Error('destination resolves to a private, link-local, loopback, or reserved address');
  }
  return url;
}

function addObservation(kind, severity, message, details = {}) {
  const controlled = selfTest && selfTestExpectedKinds.has(kind);
  const observation = { kind, severity, message: safeText(message), controlled, ...details };
  observations.push(observation);
  if (controlled) selfTestDetections.add(kind);
  if (severity === 'ERROR' && !controlled) failures.push(observation);
}

function inspectLayout(page, contextId) {
  return page.evaluate(() => {
    const viewport = { width: window.innerWidth, height: window.innerHeight };
    const horizontalOverflow = document.documentElement.scrollWidth > viewport.width + 1;
    const outOfBounds = [...document.querySelectorAll('body *')].filter((element) => {
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && (rect.right < -1 || rect.left > viewport.width + 1);
    }).length;
    const clipped = [...document.querySelectorAll('body *')].filter((element) => {
      const style = getComputedStyle(element);
      return style.overflow === 'hidden' && element.scrollHeight > element.clientHeight + 2;
    }).length;
    const controls = [...document.querySelectorAll('a, button, input, select, textarea, summary, [role="button"]')];
    const controlIssues = controls.flatMap((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      if (rect.width <= 0 || rect.height <= 0 || style.visibility === 'hidden' || style.display === 'none') return [];
      const point = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      const topElement = document.elementFromPoint(point.x, point.y);
      const covered = topElement && topElement !== element && !element.contains(topElement);
      const inaccessible = element.matches(':disabled, [aria-disabled="true"], [aria-hidden="true"]') || element.tabIndex < 0;
      if (!covered && !inaccessible) return [];
      return [{ issue: covered ? 'apparently-covered' : 'apparently-inaccessible', tag: element.tagName.toLowerCase() }];
    });
    return { horizontalOverflow, outOfBounds, clipped, controlIssues };
  }).then((layout) => {
    if (layout.horizontalOverflow) addObservation('layout', 'ERROR', 'Horizontal overflow detected', { context: contextId });
    if (layout.outOfBounds) addObservation('layout', 'POSSIBLE_IMPROVEMENT', 'Visible content appears outside the viewport', { context: contextId, count: layout.outOfBounds });
    if (layout.clipped) addObservation('layout', 'POSSIBLE_IMPROVEMENT', 'Content may be clipped by an overflowing container', { context: contextId, count: layout.clipped });
    for (const issue of layout.controlIssues) {
      addObservation('control-heuristic', 'POSSIBLE_IMPROVEMENT', `Interactive control is apparently ${issue.issue}`, {
        context: contextId,
        heuristic: true,
        issue: issue.issue,
        control: issue.tag,
      });
    }
  });
}

async function startSelfTestServer() {
  const fixture = await readFile(new URL('./self-test-fixture.html', import.meta.url));
  const server = createServer((request, response) => {
    if (request.url === '/cya-browser-lab-controlled-failure') {
      response.destroy();
      return;
    }
    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    response.end(fixture);
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  selfTestOrigin = `http://127.0.0.1:${port}`;
  return { server, url: `${selfTestOrigin}/` };
}

async function run() {
  if (selfTest) {
    const selfTestServer = await startSelfTestServer();
    requestedUrl = selfTestServer.url;
    selfTestServerHandle = selfTestServer.server;
  } else {
    await validateUrl(requestedUrl);
  }
  await import('node:fs/promises').then(({ mkdir }) => mkdir(outputDir, { recursive: true }));
  const browser = await chromium.launch({ headless: true });
  try {
    for (const profile of contexts) {
      const context = await browser.newContext(profile);
      const page = await context.newPage();
      await context.route('**/*', async (route) => {
        try {
          await validateUrl(route.request().url(), { allowSelfTest: selfTest });
          await route.continue();
        } catch (error) {
          addObservation('request-policy', 'ERROR', error.message, { context: profile.id, url: safeUrl(route.request().url()), resourceType: route.request().resourceType() });
          await route.abort('blockedbyclient');
        }
      });
      await context.tracing.start({ screenshots: true, snapshots: true });
      page.on('console', (message) => {
        if (message.type() === 'error') addObservation('console', 'ERROR', message.text(), { context: profile.id });
      });
      page.on('pageerror', (error) => addObservation('page-exception', 'ERROR', error.message, { context: profile.id }));
      page.on('requestfailed', (request) => {
        const mainFrameNavigation = request.isNavigationRequest() && request.frame() === page.mainFrame();
        addObservation('request', 'ERROR', request.failure()?.errorText ?? 'Request failed', {
          context: profile.id,
          url: safeUrl(request.url()),
          resourceType: request.resourceType(),
          requestKind: mainFrameNavigation ? 'main-navigation' : 'resource-or-subrequest',
          navigation: request.isNavigationRequest(),
        });
      });
      page.on('response', (response) => {
        if (response.status() >= 400) addObservation('response', response.status() >= 500 ? 'ERROR' : 'POSSIBLE_IMPROVEMENT', `HTTP ${response.status()} response`, { context: profile.id, url: safeUrl(response.url()), resourceType: response.request().resourceType(), navigation: response.request().isNavigationRequest() });
      });
      try {
        await page.goto(requestedUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await inspectLayout(page, profile.id);
        const screenshotPath = `${outputDir}/${profile.id}.png`;
        await page.screenshot({ path: screenshotPath, fullPage: false });
        screenshots.push(screenshotPath);
      } catch (error) {
        addObservation('navigation', 'ERROR', error.message, { context: profile.id, url: safeUrl(requestedUrl) });
      }
      if (failures.length) await context.tracing.stop({ path: `${outputDir}/${profile.id}.zip` });
      else await context.tracing.stop();
      await context.close();
    }
  } finally {
    await browser.close();
    if (selfTestServerHandle) await new Promise((resolve) => selfTestServerHandle.close(resolve));
  }
  const selfTestResult = selfTest ? {
    expectedDetections: [...selfTestExpectedKinds],
    detectedDetections: [...selfTestDetections],
    missingDetections: [...selfTestExpectedKinds].filter((kind) => !selfTestDetections.has(kind)),
  } : null;
  if (selfTest && selfTestResult.missingDetections.length) {
    failures.push({ kind: 'self-test', severity: 'ERROR', message: 'A required T01 detector did not produce its controlled observation', controlled: false, missingDetections: selfTestResult.missingDetections });
  }
  if (selfTest) selfTestResult.passed = failures.length === 0;
  const result = { tool: 'T01 CYA Browser Lab', playwright: PLAYWRIGHT_VERSION, target: safeUrl(requestedUrl), startedAt, finishedAt: new Date().toISOString(), contexts: contexts.map(({ id, viewport }) => ({ id, viewport })), observations, screenshots, selfTest: selfTestResult, result: failures.length ? 'ERROR' : selfTest ? 'SELF_TEST_PASSED' : 'READY_FOR_REVIEW' };
  await (await import('node:fs/promises')).writeFile(`${outputDir}/result.json`, `${JSON.stringify(result, null, 2)}\n`);
  if (process.env.GITHUB_STEP_SUMMARY) await (await import('node:fs/promises')).writeFile(process.env.GITHUB_STEP_SUMMARY, `## T01 CYA Browser Lab\n\n- Result: **${result.result}**\n- Target: \`${result.target}\`\n- Contexts: mobile 390×844, desktop 1440×900\n- Observations: ${observations.length}\n`);
  if (failures.length) process.exitCode = 1;
}

run().catch((error) => { console.error(safeText(error.message)); process.exitCode = 1; });
