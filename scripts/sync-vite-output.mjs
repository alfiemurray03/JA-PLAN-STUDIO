import { cp, mkdir, mkdtemp, rm, stat } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const source = path.join(root, 'dist');
const destination = path.resolve(root, process.env.PUBLISH_DIR || 'public');
const staticAssets = path.join(root, 'static');

const sourceStats = await stat(source).catch(() => null);
if (!sourceStats?.isDirectory()) {
  throw new Error('Vite output directory "dist" was not found. Run the Vite build first.');
}

// Some routes are intentionally standalone source-owned documents rather than
// Vite entries. Preserve only those explicit assets while replacing generated
// output, otherwise a successful build can silently remove Coming Soon mode.
const preservedRoot = await mkdtemp(path.join(os.tmpdir(), 'ja-plan-studio-static-'));
const preservedAssets = [
  ['coming-soon', 'coming-soon'],
  [path.join('assets', 'js', 'coming-soon.js'), path.join('assets', 'js', 'coming-soon.js')],
];

try {
  for (const [sourceRelative, targetRelative] of preservedAssets) {
    const existing = path.join(destination, sourceRelative);
    const existingStats = await stat(existing).catch(() => null);
    if (!existingStats) continue;
    const preserved = path.join(preservedRoot, targetRelative);
    await mkdir(path.dirname(preserved), { recursive: true });
    await cp(existing, preserved, { recursive: true });
  }

  await rm(destination, { recursive: true, force: true });
  await mkdir(destination, { recursive: true });
  await cp(source, destination, { recursive: true });

  // Cloudflare serves /public directly. Copy source-owned compatibility assets
  // after the generated Vite bundle so legacy browser sessions can be upgraded.
  const staticStats = await stat(staticAssets).catch(() => null);
  if (staticStats?.isDirectory()) {
    await cp(staticAssets, destination, { recursive: true });
  }

  for (const [, targetRelative] of preservedAssets) {
    const preserved = path.join(preservedRoot, targetRelative);
    const preservedStats = await stat(preserved).catch(() => null);
    if (!preservedStats) continue;
    const target = path.join(destination, targetRelative);
    await mkdir(path.dirname(target), { recursive: true });
    await cp(preserved, target, { recursive: true });
  }
} finally {
  await rm(preservedRoot, { recursive: true, force: true });
}

console.log(`Published Vite output to ${path.relative(root, destination) || destination}`);
