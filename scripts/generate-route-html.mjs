import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  INDEXED_ROUTES,
  NOINDEX_ROUTES,
  NOT_FOUND_METADATA,
  SITE,
  absoluteUrl,
  createStructuredData,
  getRouteMetadata,
} from '../src/app/seo/routeMetadata.js';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(projectRoot, 'dist');
const indexPath = path.join(distDir, 'index.html');
const markerPattern = /<!-- SEO_HEAD_START -->[\s\S]*?<!-- SEO_HEAD_END -->/;
const indexableBuild = process.env.VERCEL_ENV !== 'preview';
const googleSiteVerification = process.env.VITE_GOOGLE_SITE_VERIFICATION?.trim();

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderManagedHead(metadata, { indexable = indexableBuild } = {}) {
  const canonical = metadata.path ? absoluteUrl(metadata.path) : null;
  const image = absoluteUrl(metadata.image);
  const structuredData = metadata.robots?.includes('noindex')
    ? null
    : createStructuredData(metadata);
  const robots = !indexableBuild
    ? 'noindex, nofollow'
    : indexable
      ? 'index, follow, max-image-preview:large'
      : metadata.robots || 'noindex, nofollow';

  const lines = [
    '<!-- SEO_HEAD_START -->',
    `      <title data-raining-head="true">${escapeHtml(metadata.title)}</title>`,
    `      <meta data-raining-head="true" name="description" content="${escapeHtml(metadata.description)}" />`,
    `      <meta data-raining-head="true" name="robots" content="${escapeHtml(robots)}" />`,
    '      <meta data-raining-head="true" name="theme-color" content="#020617" />',
  ];

  if (googleSiteVerification) {
    lines.push(
      `      <meta name="google-site-verification" content="${escapeHtml(googleSiteVerification)}" />`,
    );
  }

  if (canonical) {
    lines.push(
      `      <link data-raining-head="true" rel="canonical" href="${escapeHtml(canonical)}" />`,
    );
  }

  lines.push(
    `      <meta data-raining-head="true" property="og:site_name" content="${escapeHtml(SITE.name)}" />`,
    `      <meta data-raining-head="true" property="og:locale" content="${escapeHtml(SITE.locale)}" />`,
    '      <meta data-raining-head="true" property="og:type" content="website" />',
    `      <meta data-raining-head="true" property="og:title" content="${escapeHtml(metadata.title)}" />`,
    `      <meta data-raining-head="true" property="og:description" content="${escapeHtml(metadata.description)}" />`,
    `      <meta data-raining-head="true" property="og:url" content="${escapeHtml(canonical || `${SITE.origin}/404`)}" />`,
    `      <meta data-raining-head="true" property="og:image" content="${escapeHtml(image)}" />`,
    `      <meta data-raining-head="true" property="og:image:alt" content="${escapeHtml(metadata.imageAlt)}" />`,
    '      <meta data-raining-head="true" name="twitter:card" content="summary_large_image" />',
    `      <meta data-raining-head="true" name="twitter:title" content="${escapeHtml(metadata.title)}" />`,
    `      <meta data-raining-head="true" name="twitter:description" content="${escapeHtml(metadata.description)}" />`,
    `      <meta data-raining-head="true" name="twitter:image" content="${escapeHtml(image)}" />`,
    `      <meta data-raining-head="true" name="twitter:image:alt" content="${escapeHtml(metadata.imageAlt)}" />`,
  );

  if (structuredData) {
    const json = JSON.stringify(structuredData).replaceAll('<', '\\u003c');
    lines.push(
      `      <script data-raining-head="true" id="raining-structured-data" type="application/ld+json">${json}</script>`,
    );
  }

  lines.push('      <!-- SEO_HEAD_END -->');
  return lines.join('\n');
}

function replaceHead(html, metadata, options) {
  const managedHead = renderManagedHead(metadata, options);
  if (markerPattern.test(html)) return html.replace(markerPattern, managedHead);
  return html.replace('</head>', `${managedHead}\n    </head>`);
}

function outputPathForRoute(route) {
  if (route === '/') return indexPath;
  return path.join(distDir, `${route.slice(1)}.html`);
}

const baseHtml = await readFile(indexPath, 'utf8');

for (const route of INDEXED_ROUTES) {
  const metadata = getRouteMetadata(route);
  if (!metadata) throw new Error(`Missing metadata for ${route}`);

  const outputPath = outputPathForRoute(route);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, replaceHead(baseHtml, metadata, { indexable: indexableBuild }), 'utf8');
}

for (const route of NOINDEX_ROUTES) {
  const metadata = getRouteMetadata(route);
  if (!metadata) throw new Error(`Missing metadata for ${route}`);

  const outputPath = outputPathForRoute(route);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, replaceHead(baseHtml, metadata, { indexable: false }), 'utf8');
}

const static404 = replaceHead(baseHtml, NOT_FOUND_METADATA, { indexable: false }).replace(
  '<div id="root"></div>',
  `<div id="root"><main style="min-height:100vh;display:grid;place-items:center;padding:2rem;background:#020617;color:white;text-align:center;font-family:system-ui,sans-serif"><div><p style="color:#9B7EBD;font-weight:800;letter-spacing:.2em;text-transform:uppercase">404 — Raining Entertainment</p><h1 style="font-size:clamp(2.5rem,8vw,5rem);margin:.75rem 0">This page isn’t here</h1><p style="max-width:40rem;color:#cbd5e1;font-size:1.1rem;line-height:1.7">The link may be old, but Maui magic, circus performers, game shows and event entertainment are still waiting under the umbrella.</p><p><a href="/" style="display:inline-block;margin-top:1.5rem;padding:.9rem 1.4rem;border-radius:999px;background:#FF6B4A;color:white;font-weight:800;text-decoration:none">Return home</a></p></div></main></div>`,
);
await writeFile(path.join(distDir, '404.html'), static404, 'utf8');

if (!indexableBuild) {
  await writeFile(
    path.join(distDir, 'robots.txt'),
    'User-agent: *\nDisallow:\n',
    'utf8',
  );
}

console.log(
  `Generated route-specific HTML for ${INDEXED_ROUTES.length} canonical routes, ${NOINDEX_ROUTES.length} noindex routes, plus 404.html.`,
);
