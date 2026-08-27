import { readFile } from 'node:fs/promises';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

const AUTHORIZED_LOGIN = 'carlosyandybz-bit';
const AUTHORIZED_TITLE = '[CYA:T01] RUN';
const AUTHORIZED_COMMAND = 'browser_lab.run';

function ignore(reason) {
  console.log(`Issue command ignored: ${reason}`);
  process.exitCode = 0;
}

async function readEvent() {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (!eventPath) return null;
  try {
    return JSON.parse(await readFile(eventPath, 'utf8'));
  } catch {
    return null;
  }
}

const event = await readEvent();
const issue = event?.issue;
if (!issue || issue.user?.login !== AUTHORIZED_LOGIN) ignore('unauthorized author');
else if (issue.title !== AUTHORIZED_TITLE) ignore('title mismatch');
else {
  let command;
  try {
    command = JSON.parse(issue.body ?? '');
  } catch {
    ignore('invalid JSON body');
  }
  if (command) {
    const properties = Object.keys(command).sort();
    const expectedProperties = ['command', 'target_url'];
    const exactProperties = properties.length === expectedProperties.length && properties.every((property, index) => property === expectedProperties[index]);
    if (!exactProperties || command.command !== AUTHORIZED_COMMAND || typeof command.target_url !== 'string') {
      ignore('invalid command schema');
    } else {
      const result = spawnSync(process.execPath, ['runner.mjs', '--target-url', command.target_url, '--output-dir', 'browser-lab-output'], {
        stdio: 'inherit',
        shell: false,
      });
      process.exitCode = result.status ?? 1;
    }
  }
}
