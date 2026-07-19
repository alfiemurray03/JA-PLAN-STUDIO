import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const app = await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8');
const runtime = await readFile(new URL('../src/components/AccessibilityRuntime.tsx', import.meta.url), 'utf8');
const css = await readFile(new URL('../src/styles/accessibility-global.css', import.meta.url), 'utf8');
const root = await readFile(new URL('../src/layouts/RootLayout.tsx', import.meta.url), 'utf8');

test('accessibility runtime is active across customer, Admin and installed app', () => {
  assert.match(app, /<AccessibilityRuntime \/>/);
  assert.match(app, /accessibility-global\.css/);
  assert.match(runtime, /document\.documentElement\.lang/);
  assert.match(runtime, /document\.documentElement\.dir/);
  assert.match(runtime, /RTL_LANGUAGES/);
  assert.match(runtime, /prefers-reduced-motion: reduce/);
});

test('route changes retain keyboard and screen-reader focus', () => {
  assert.match(root, /href="#main-content"/);
  assert.match(root, /<main id="main-content">/);
  assert.match(runtime, /#main-content, main, \[role="main"\]/);
  assert.match(runtime, /target\.focus/);
});

test('global controls meet mobile and high-contrast safeguards', () => {
  assert.match(css, /focus-visible/);
  assert.match(css, /min-block-size: 44px/);
  assert.match(css, /font-size: max\(16px, 1rem\)/);
  assert.match(css, /forced-colors: active/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /safe-area-inset/);
  assert.match(css, /\[role='dialog'\]/);
});
