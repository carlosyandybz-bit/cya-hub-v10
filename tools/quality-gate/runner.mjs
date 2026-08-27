import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const CONTRACT_PATH = join(ROOT, 'tools/quality-gate/contract.json');
const KNOWN_HANDLERS = new Set([
  'quality-contract',
  'required-check-resolution',
  'text-normalization',
  'aggregate-result',
]);
const TEXT_EXTENSIONS = new Set([
  '.cjs', '.css', '.csv', '.html', '.js', '.json', '.jsx', '.md', '.mjs', '.scss', '.sh', '.svg', '.ts', '.tsx', '.txt', '.xml', '.yaml', '.yml',
]);
const TEXT_FILENAMES = new Set(['.editorconfig', '.gitattributes', '.gitignore']);
const FORBIDDEN_BYPASS_KEYS = new Set(['allowFailure', 'continueOnError', 'ignoreFailure']);

function nowMs() {
  return Number(process.hrtime.bigint() / 1_000_000n);
}

function parseArgs(argv) {
  const args = { selfTest: false, output: null };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--self-test') {
      args.selfTest = true;
      continue;
    }
    if (arg === '--output') {
      if (!argv[i + 1]) throw new Error('--output requires a path');
      args.output = argv[++i];
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }
  return args;
}

function loadContract(path = CONTRACT_PATH) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function validateContract(contract) {
  const errors = [];
  if (!contract || typeof contract !== 'object' || Array.isArray(contract)) errors.push('contract must be an object');
  if (contract?.version !== 1) errors.push('contract.version must equal 1');
  if (!Array.isArray(contract?.checks) || contract.checks.length === 0) errors.push('contract.checks must be a non-empty array');

  const ids = new Set();
  for (const [index, check] of (contract?.checks ?? []).entries()) {
    if (!check || typeof check !== 'object' || Array.isArray(check)) {
      errors.push(`checks[${index}] must be an object`);
      continue;
    }
    if (typeof check.id !== 'string' || check.id.length === 0) errors.push(`checks[${index}].id must be a non-empty string`);
    if (ids.has(check.id)) errors.push(`duplicate check id: ${check.id}`);
    ids.add(check.id);
    if (typeof check.required !== 'boolean') errors.push(`${check.id ?? `checks[${index}]`}.required must be boolean`);
    if (typeof check.applicable !== 'boolean') errors.push(`${check.id ?? `checks[${index}]`}.applicable must be boolean`);
    if (typeof check.handler !== 'string' || check.handler.length === 0) errors.push(`${check.id ?? `checks[${index}]`}.handler must be a non-empty string`);
    for (const key of FORBIDDEN_BYPASS_KEYS) {
      if (Object.hasOwn(check, key)) errors.push(`${check.id ?? `checks[${index}]`} contains forbidden bypass key ${key}`);
    }
  }

  for (const requiredId of ['quality-contract', 'required-check-resolution', 'text-normalization', 'aggregate-result']) {
    if (!ids.has(requiredId)) errors.push(`missing baseline check: ${requiredId}`);
  }
  return errors;
}

function trackedTextFiles(root = ROOT) {
  const output = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' });
  return output.split('\0').filter(Boolean).filter((path) => {
    const name = path.split('/').at(-1);
    return TEXT_FILENAMES.has(name) || TEXT_EXTENSIONS.has(extname(name).toLowerCase());
  }).map((path) => join(root, path));
}

function inspectTextFile(path) {
  const bytes = readFileSync(path);
  let text;
  try {
    text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    return ['invalid UTF-8'];
  }
  const errors = [];
  if (text.includes('\r')) errors.push('contains CR/CRLF line endings');
  if (text.length > 0 && !text.endsWith('\n')) errors.push('missing final newline');
  const lines = text.split('\n');
  lines.forEach((line, index) => {
    if (/[ \t]+$/.test(line)) errors.push(`trailing whitespace at line ${index + 1}`);
  });
  return errors;
}

function result(id, status, details = []) {
  return { id, status, details };
}

function runTextNormalization(paths) {
  const failures = [];
  for (const path of paths) {
    for (const issue of inspectTextFile(path)) failures.push(`${path}: ${issue}`);
  }
  return failures.length ? result('text-normalization', 'FAIL', failures) : result('text-normalization', 'PASS', [`checked ${paths.length} text files`]);
}

function evaluate(contract, options = {}) {
  const startedAt = nowMs();
  const checks = [];
  const contractErrors = validateContract(contract);

  for (const check of contract.checks ?? []) {
    const checkStart = nowMs();
    let checkResult;
    try {
      if (!check.applicable) {
        checkResult = result(check.id, 'NOT_APPLICABLE', ['check is not applicable in the current approved stack state']);
      } else if (check.handler === 'quality-contract') {
        checkResult = contractErrors.length ? result(check.id, 'FAIL', contractErrors) : result(check.id, 'PASS');
      } else if (check.handler === 'required-check-resolution') {
        const unresolved = (contract.checks ?? [])
          .filter((candidate) => candidate.required && candidate.applicable && !KNOWN_HANDLERS.has(candidate.handler))
          .map((candidate) => `${candidate.id}:${candidate.handler}`);
        checkResult = unresolved.length ? result(check.id, 'FAIL', unresolved.map((entry) => `unresolved required check ${entry}`)) : result(check.id, 'PASS');
      } else if (check.handler === 'text-normalization') {
        checkResult = runTextNormalization(options.paths ?? trackedTextFiles(options.root ?? ROOT));
      } else if (check.handler === 'aggregate-result') {
        const requiredFailures = checks.filter((prior) => {
          const definition = (contract.checks ?? []).find((candidate) => candidate.id === prior.id);
          return definition?.required && definition?.applicable && prior.status === 'FAIL';
        });
        checkResult = requiredFailures.length
          ? result(check.id, 'FAIL', requiredFailures.map((prior) => `required check failed: ${prior.id}`))
          : result(check.id, 'PASS');
      } else {
        checkResult = result(check.id, 'FAIL', [`applicable check has no executable handler: ${check.handler}`]);
      }
    } catch (error) {
      checkResult = result(check.id, 'FAIL', [`handler exception: ${error instanceof Error ? error.message : String(error)}`]);
    }
    checkResult.durationMs = nowMs() - checkStart;
    checks.push(checkResult);
  }

  const requiredFailure = checks.some((checkResult) => {
    const definition = (contract.checks ?? []).find((candidate) => candidate.id === checkResult.id);
    return definition?.required && definition?.applicable && checkResult.status === 'FAIL';
  });

  const validatedCheckoutSha = process.env.GITHUB_SHA || safeGitSha(options.root ?? ROOT);
  const sourceSha = process.env.CYA_SOURCE_SHA || validatedCheckoutSha;

  return {
    schemaVersion: 1,
    result: requiredFailure ? 'FAIL' : 'PASS',
    sourceSha,
    validatedCheckoutSha,
    durationMs: nowMs() - startedAt,
    checks,
  };
}

function safeGitSha(root) {
  try {
    return execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function runSelfTest() {
  const base = loadContract();
  const temp = mkdtempSync(join(tmpdir(), 'cya-quality-gate-'));
  try {
    const good = join(temp, 'good.txt');
    const bad = join(temp, 'bad.txt');
    writeFileSync(good, 'ok\n', 'utf8');
    writeFileSync(bad, 'bad trailing space \n', 'utf8');

    const scenarios = [];
    const record = (name, expected, actual) => scenarios.push({ name, expected, actual, pass: expected === actual });

    record('controlled-pass', 'PASS', evaluate(clone(base), { paths: [good], root: temp }).result);
    record('controlled-failure', 'FAIL', evaluate(clone(base), { paths: [bad], root: temp }).result);

    const unresolved = clone(base);
    unresolved.checks.splice(-1, 0, { id: 'self-test-unresolved-required', required: true, applicable: true, handler: 'missing-handler' });
    record('required-check-fail-closed', 'FAIL', evaluate(unresolved, { paths: [good], root: temp }).result);

    const bypass = clone(base);
    const target = bypass.checks.find((check) => check.id === 'text-normalization');
    target.continueOnError = true;
    record('bypass-attempt-remains-fail', 'FAIL', evaluate(bypass, { paths: [bad], root: temp }).result);

    return {
      schemaVersion: 1,
      result: scenarios.every((scenario) => scenario.pass) ? 'PASS' : 'FAIL',
      scenarios,
    };
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
}

function markdownSummary(title, payload) {
  const lines = [`## ${title}`, '', `**Result:** ${payload.result}`, ''];
  if (payload.scenarios) {
    lines.push('| Scenario | Expected | Actual |', '| --- | --- | --- |');
    for (const scenario of payload.scenarios) lines.push(`| ${scenario.name} | ${scenario.expected} | ${scenario.actual} |`);
  } else {
    lines.push('| Check | Status |', '| --- | --- |');
    for (const check of payload.checks ?? []) lines.push(`| ${check.id} | ${check.status} |`);
    lines.push('', `**Source SHA:** ${payload.sourceSha ?? 'unknown'}`, `**Validated checkout SHA:** ${payload.validatedCheckoutSha ?? 'unknown'}`, `**Duration:** ${payload.durationMs} ms`);
  }
  return `${lines.join('\n')}\n`;
}

function emit(payload, output, title) {
  const json = `${JSON.stringify(payload, null, 2)}\n`;
  if (output) writeFileSync(resolve(output), json, 'utf8');
  process.stdout.write(json);
  if (process.env.GITHUB_STEP_SUMMARY) {
    writeFileSync(process.env.GITHUB_STEP_SUMMARY, markdownSummary(title, payload), { encoding: 'utf8', flag: 'a' });
  }
}

const args = parseArgs(process.argv.slice(2));
const payload = args.selfTest ? runSelfTest() : evaluate(loadContract());
emit(payload, args.output, args.selfTest ? 'T02 CYA Quality Gate — self-test' : 'T02 CYA Quality Gate');
if (payload.result !== 'PASS') process.exitCode = 1;
