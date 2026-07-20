import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('Experience Builders uses a readable master-detail workspace', async () => {
  const page = await read('src/pages/admin/builders.tsx');

  assert.match(page, /Builder catalogue/);
  assert.match(page, /Showing \{visible\.length\} of \{builders\.length\} builders/);
  assert.match(page, /xl:grid-cols-\[minmax\(300px,0\.78fr\)_minmax\(0,1\.55fr\)\]/);
  assert.match(page, /Customer-facing description/);
  assert.match(page, /Included subscription plan IDs/);
  assert.match(page, /Refresh catalogue/);
  assert.match(page, /whitespace-nowrap/);
  assert.match(page, /grid-cols-\[44px_minmax\(0,1fr\)\]/);
  assert.doesNotMatch(page, /grid xl:grid-cols-2 gap-5/);
  assert.doesNotMatch(page, /text-lg text-slate-950 font-bold border-0/);
});

test('Experience Builders retains filtering, editing and save integration', async () => {
  const page = await read('src/pages/admin/builders.tsx');

  assert.match(page, /\/admin\/api\?section=builders/);
  assert.match(page, /method: 'POST'/);
  assert.match(page, /setSelectedId/);
  assert.match(page, /Search by builder name, ID, category or description/);
  assert.match(page, /Save builder/);
  assert.match(page, /Active builders/);
});
