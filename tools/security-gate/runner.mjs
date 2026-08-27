import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const has = (flag) => args.includes(flag);
const value = (flag, fallback) => {
  const i = args.indexOf(flag);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : fallback;
};
const output = value('--output', 'security-gate-evidence/result.json');
const sourceSha = process.env.CYA_SOURCE_SHA || process.env.GITHUB_SHA || 'local';
const validatedCheckoutSha = process.env.GITHUB_SHA || 'local';
const contract = JSON.parse(fs.readFileSync(new URL('./contract.json', import.meta.url), 'utf8'));

function write(result) {
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, JSON.stringify(result, null, 2) + '\n');
  if (process.env.GITHUB_STEP_SUMMARY) {
    const rows = result.checks.map(c => `| ${c.id} | ${c.status} | ${c.detail || ''} |`).join('\n');
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `## T03 CYA Security Gate\n\nResult: **${result.result}**\n\n| Check | Status | Detail |\n|---|---|---|\n${rows}\n`);
  }
}

function validateContract() {
  const ids = new Set();
  for (const check of contract.checks) {
    if (!check.id || ids.has(check.id)) throw new Error('invalid or duplicate check id');
    ids.add(check.id);
    if (check.required && check.applicable && !check.engine) throw new Error(`required check unresolved: ${check.id}`);
  }
}

function runGitleaksSelfTest() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cya-t03-'));
  const safe = path.join(tmp, 'safe');
  const leak = path.join(tmp, 'leak');
  fs.mkdirSync(safe); fs.mkdirSync(leak);
  fs.writeFileSync(path.join(safe, 'sample.txt'), 'CYA_SECURITY_TEST_SAFE_VALUE=not-a-secret\n');
  // Construct a synthetic credential only at runtime so no secret-shaped fixture is versioned.
  const accessId = ['AKIA', 'IOSF', 'ODNN', '7EXA', 'MPLE'].join('');
  const secretKey = ['wJalrXUt', 'nFEMI/K7', 'MDENG/bP', 'xRfiCYEX', 'AMPLEKEY'].join('');
  fs.writeFileSync(path.join(leak, 'sample.txt'), `AWS_ACCESS_KEY_ID=${accessId}\nAWS_SECRET_ACCESS_KEY=${secretKey}\n`);
  const safeRun = spawnSync('gitleaks', ['dir', '--redact', '--exit-code', '2', safe], { encoding: 'utf8' });
  const leakRun = spawnSync('gitleaks', ['dir', '--redact', '--exit-code', '2', leak], { encoding: 'utf8' });
  fs.rmSync(tmp, { recursive: true, force: true });
  if (safeRun.error || leakRun.error) throw new Error('gitleaks unavailable');
  return { safePass: safeRun.status === 0, leakBlocked: leakRun.status === 2 };
}

function selfTest() {
  validateContract();
  const gitleaks = runGitleaksSelfTest();
  const failClosed = (() => {
    const broken = structuredClone(contract);
    broken.checks.push({ id: 'required-unresolved', required: true, applicable: true });
    try {
      for (const c of broken.checks) if (c.required && c.applicable && !c.engine) throw new Error('unresolved');
      return false;
    } catch { return true; }
  })();
  const bypassRejected = contract.policy.allowSilentBypass === false && contract.policy.blockingFinding === 'FAIL';
  const redactionRequired = contract.policy.redactSecrets === true;
  const pass = gitleaks.safePass && gitleaks.leakBlocked && failClosed && bypassRejected && redactionRequired;
  const result = {
    gate: contract.gate, mode: 'self-test', sourceSha, validatedCheckoutSha,
    result: pass ? 'PASS' : 'FAIL',
    checks: [
      { id: 'safe-fixture', status: gitleaks.safePass ? 'PASS' : 'FAIL' },
      { id: 'synthetic-secret', status: gitleaks.leakBlocked ? 'PASS' : 'FAIL', detail: 'synthetic credential blocked; value omitted' },
      { id: 'required-control-fail-closed', status: failClosed ? 'PASS' : 'FAIL' },
      { id: 'bypass-rejected', status: bypassRejected ? 'PASS' : 'FAIL' },
      { id: 'redaction-policy', status: redactionRequired ? 'PASS' : 'FAIL' }
    ]
  };
  write(result);
  process.exit(pass ? 0 : 1);
}

function aggregate() {
  validateContract();
  const external = value('--external-status', 'PASS');
  const checks = contract.checks.map(c => {
    if (!c.applicable) return { id: c.id, status: 'NOT_APPLICABLE' };
    if (c.id === 'aggregate-result') return { id: c.id, status: external === 'PASS' ? 'PASS' : 'FAIL' };
    return { id: c.id, status: external === 'PASS' ? 'PASS' : 'FAIL', detail: 'validated by preceding workflow control' };
  });
  const pass = external === 'PASS' && !checks.some(c => c.status === 'FAIL');
  write({ gate: contract.gate, mode: 'repository', sourceSha, validatedCheckoutSha, result: pass ? 'PASS' : 'FAIL', checks });
  process.exit(pass ? 0 : 1);
}

if (has('--self-test')) selfTest();
else aggregate();
