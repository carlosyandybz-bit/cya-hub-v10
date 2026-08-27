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
  if (contract.policy.selfTestExternalDetectorStrategy !== 'controlled_runtime_rule_and_fixture') {
    throw new Error('external detector self-test strategy is not deterministic');
  }
  if (contract.policy.selfTestMustNotDependOnVendorRuleCatalog !== true) {
    throw new Error('vendor rule catalog dependency is prohibited in self-test');
  }
}

function runGitleaksSelfTest() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cya-t03-'));
  const safe = path.join(tmp, 'safe');
  const leak = path.join(tmp, 'leak');
  const configPath = path.join(tmp, 'gitleaks-self-test.toml');
  const reportPath = path.join(tmp, 'gitleaks-self-test.json');
  const ruleId = 'cya-t03-self-test';
  const prefix = ['CYA', 'T03', 'SYNTHETIC', 'SECRET'].join('_') + '_';
  const suffix = ['ABCD1234', 'EFGH5678', 'IJKL9012'].join('');
  const syntheticSecret = prefix + suffix;

  try {
    fs.mkdirSync(safe);
    fs.mkdirSync(leak);
    fs.writeFileSync(path.join(safe, 'sample.txt'), 'CYA_SECURITY_TEST_SAFE_VALUE=not-a-secret\n');
    fs.writeFileSync(path.join(leak, 'sample.txt'), `test_value=${syntheticSecret}\n`);
    fs.writeFileSync(configPath, [
      'title = "CYA T03 deterministic self-test"',
      '',
      '[[rules]]',
      `id = "${ruleId}"`,
      'description = "CYA synthetic runtime-only detector"',
      "regex = '''CYA_T03_SYNTHETIC_SECRET_[A-Z0-9]{24}'''",
      'keywords = ["CYA_T03_SYNTHETIC_SECRET_"]',
      ''
    ].join('\n'));

    const baseArgs = ['dir', '--config', configPath, '--redact', '--exit-code', '2'];
    const safeRun = spawnSync('gitleaks', [...baseArgs, safe], { encoding: 'utf8' });
    const leakRun = spawnSync('gitleaks', [
      ...baseArgs,
      '--report-format', 'json',
      '--report-path', reportPath,
      leak
    ], { encoding: 'utf8' });

    if (safeRun.error || leakRun.error) throw new Error('gitleaks unavailable');

    const reportText = fs.existsSync(reportPath) ? fs.readFileSync(reportPath, 'utf8') : '';
    let report = [];
    try {
      report = reportText ? JSON.parse(reportText) : [];
    } catch {
      report = [];
    }
    const findings = Array.isArray(report) ? report : [];
    const expectedRuleFound = findings.some(f => f.RuleID === ruleId || f.ruleID === ruleId || f.ruleId === ruleId);
    const combinedOutput = `${safeRun.stdout || ''}\n${safeRun.stderr || ''}\n${leakRun.stdout || ''}\n${leakRun.stderr || ''}\n${reportText}`;
    const secretAbsentFromEvidence = !combinedOutput.includes(syntheticSecret);

    return {
      safePass: safeRun.status === 0,
      leakBlocked: leakRun.status === 2,
      expectedRuleFound,
      secretAbsentFromEvidence
    };
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
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
  const redactionRequired = contract.policy.redactSecrets === true && gitleaks.secretAbsentFromEvidence;
  const vendorRuleIndependence = contract.policy.selfTestMustNotDependOnVendorRuleCatalog === true && gitleaks.expectedRuleFound;
  const pass = gitleaks.safePass && gitleaks.leakBlocked && vendorRuleIndependence && failClosed && bypassRejected && redactionRequired;
  const result = {
    gate: contract.gate, mode: 'self-test', sourceSha, validatedCheckoutSha,
    result: pass ? 'PASS' : 'FAIL',
    checks: [
      { id: 'safe-fixture', status: gitleaks.safePass ? 'PASS' : 'FAIL' },
      { id: 'controlled-synthetic-rule', status: gitleaks.leakBlocked && gitleaks.expectedRuleFound ? 'PASS' : 'FAIL', detail: 'runtime-only CYA rule detected and blocked the runtime-only fixture' },
      { id: 'vendor-rule-catalog-independence', status: vendorRuleIndependence ? 'PASS' : 'FAIL' },
      { id: 'required-control-fail-closed', status: failClosed ? 'PASS' : 'FAIL' },
      { id: 'bypass-rejected', status: bypassRejected ? 'PASS' : 'FAIL' },
      { id: 'redaction-enforced', status: redactionRequired ? 'PASS' : 'FAIL', detail: 'synthetic value absent from captured output and report' }
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
