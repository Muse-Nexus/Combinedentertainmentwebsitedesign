import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { INDEXED_ROUTES, NOINDEX_ROUTES } from '../src/app/seo/routeMetadata.js';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.join(projectRoot, 'src', 'app');
const publicRoot = path.join(projectRoot, 'public');
const config = JSON.parse(await readFile(path.join(projectRoot, 'vercel.json'), 'utf8'));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    else files.push(fullPath);
  }
  return files;
}

const sourceFiles = (await walk(sourceRoot)).filter((file) => /\.(?:ts|tsx|js|jsx)$/.test(file));
const sources = await Promise.all(
  sourceFiles.map(async (file) => ({ file, content: await readFile(file, 'utf8') })),
);
const combinedSource = sources.map(({ content }) => content).join('\n');

const forbiddenClaims = [
  ['Costumed Stilt Walking', /Costumed Stilt Walking/i],
  ["Children's Magic", /Children(?:'|’|\u2019)s Magic/i],
  ['live bunny', /live bunny/i],
  ['Fire Dancing', /Fire Dancing/i],
  ['unverified clown training claim', /trained as ["“]clowns/i],
];
for (const [label, pattern] of forbiddenClaims) {
  assert(!pattern.test(combinedSource), `Superseded client claim remains in active source: ${label}`);
}

for (const relativePath of ['pages/StrollingEntertainment.tsx', 'pages/CirqueJolie.tsx']) {
  const content = await readFile(path.join(sourceRoot, relativePath), 'utf8');
  assert(!/\bfire\b/i.test(content), `${relativePath} must not offer or attribute fire performance to Jolie`);
}

const validRoutes = new Set([
  ...INDEXED_ROUTES,
  ...NOINDEX_ROUTES,
  ...(config.redirects || []).map((redirect) => redirect.source),
]);
for (const { file, content } of sources) {
  for (const match of content.matchAll(/(?:to|href)=["'](\/[^"'#?]*)["']/g)) {
    const route = match[1].replace(/\/$/, '') || '/';
    if (route.startsWith('/media/') || route.startsWith('/api/')) continue;
    assert(validRoutes.has(route), `Broken internal route ${route} in ${path.relative(projectRoot, file)}`);
  }
}

const mediaReferences = new Set();
for (const { content } of sources) {
  for (const match of content.matchAll(/["'`](\/media\/[^"'`?#)]+)["'`]/g)) {
    mediaReferences.add(match[1]);
  }
}
for (const mediaPath of mediaReferences) {
  await access(path.join(publicRoot, decodeURIComponent(mediaPath.slice(1))));
}

const clientAssetRoot = path.join(publicRoot, 'media', 'client-selected');
const clientAssets = (await walk(clientAssetRoot)).filter((file) => file.endsWith('.webp'));
const expectedCounts = new Map([
  ['about', 1],
  ['balloon-decor', 28],
  ['balloon-twisting', 5],
  ['casino', 6],
  ['corporate', 1],
  ['face-painting', 6],
  ['led-performers', 6],
  ['stilt-walkers', 15],
]);
for (const [folder, expected] of expectedCounts) {
  const actual = clientAssets.filter((file) => path.basename(path.dirname(file)) === folder).length;
  assert(actual === expected, `Expected ${expected} approved ${folder} images, found ${actual}`);
}
assert(clientAssets.length === 68, `Expected 68 optimized client-selected images, found ${clientAssets.length}`);

console.log(
  `Content verified: ${validRoutes.size} routable paths, ${mediaReferences.size} referenced media files, and ${clientAssets.length} client-selected derivatives.`,
);
