import assert from "node:assert/strict";
import test from "node:test";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const oldDomain = "experiences.jagroupservices.co.uk";
const newOrigin = "https://japlanstudio.jagroupservices.co.uk";

async function filesBelow(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesBelow(absolute));
    else files.push(absolute);
  }
  return files;
}

test("public and runtime sources contain no former production domain", async () => {
  const files = [
    ...await filesBelow(path.join(root, "public")),
    ...await filesBelow(path.join(root, "functions")),
    ...await filesBelow(path.join(root, "scripts"))
  ];
  for (const file of files) {
    const content = await readFile(file, "utf8").catch(() => "");
    assert.doesNotMatch(content, new RegExp(oldDomain.replaceAll(".", "\\."), "i"), path.relative(root, file));
  }
});

test("generated sitemap, robots and page metadata use the JA Plan Studio domain", async () => {
  const sitemap = await readFile(path.join(root, "public/sitemap.xml"), "utf8");
  const robots = await readFile(path.join(root, "public/robots.txt"), "utf8");
  const homepage = await readFile(path.join(root, "public/index.html"), "utf8");
  assert.equal([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].length, 284);
  assert.doesNotMatch(sitemap, new RegExp(oldDomain.replaceAll(".", "\\."), "i"));
  for (const match of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)) assert.ok(match[1].startsWith(`${newOrigin}/`));
  assert.match(robots, new RegExp(`Sitemap: ${newOrigin.replaceAll(".", "\\.")}\/sitemap\\.xml`));
  assert.match(homepage, new RegExp(`<link rel="canonical" href="${newOrigin.replaceAll(".", "\\.")}\/">`));
  assert.match(homepage, new RegExp(`${newOrigin.replaceAll(".", "\\.")}\/#website`));
  assert.match(homepage, new RegExp(`${newOrigin.replaceAll(".", "\\.")}\/#organization`));
});

test("runtime-generated customer, administrator and checkout links use the new origin", async () => {
  const enquiries = await readFile(path.join(root, "functions/_shared/enquiries.js"), "utf8");
  const checkout = await readFile(path.join(root, "functions/create-checkout-session.js"), "utf8");
  const settings = await readFile(path.join(root, "functions/admin/api.js"), "utf8");
  assert.match(enquiries, new RegExp(`${newOrigin.replaceAll(".", "\\.")}\/account\/enquiries\/`));
  assert.match(enquiries, new RegExp(`${newOrigin.replaceAll(".", "\\.")}\/admin\/`));
  assert.match(checkout, new RegExp(newOrigin.replaceAll(".", "\\.")));
  assert.match(settings, new RegExp(newOrigin.replaceAll(".", "\\.")));
  assert.doesNotMatch(enquiries + checkout + settings, new RegExp(oldDomain.replaceAll(".", "\\."), "i"));
});
