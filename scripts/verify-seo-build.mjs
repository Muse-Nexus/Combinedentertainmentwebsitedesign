import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  INDEXED_ROUTES,
  NOINDEX_ROUTES,
  SITE,
  absoluteUrl,
  getRouteMetadata,
} from '../src/app/seo/routeMetadata.js';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(projectRoot, 'dist');
const indexableBuild = process.env.VERCEL_ENV !== 'preview';
const googleSiteVerification = process.env.VITE_GOOGLE_SITE_VERIFICATION?.trim();
const googleAnalyticsId = process.env.VITE_GOOGLE_ANALYTICS_ID?.trim();

function outputPathForRoute(route) {
  return route === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, `${route.slice(1)}.html`);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

if (googleAnalyticsId) {
  assert(/^G-[A-Z0-9]+$/i.test(googleAnalyticsId), 'VITE_GOOGLE_ANALYTICS_ID must be a GA4 G- measurement ID');
}

const sitemap = await readFile(path.join(distDir, 'sitemap.xml'), 'utf8');
const robots = await readFile(path.join(distDir, 'robots.txt'), 'utf8');
const config = JSON.parse(await readFile(path.join(projectRoot, 'vercel.json'), 'utf8'));
const sitemapRoutes = new Set(
  [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
    new URL(match[1]).pathname.replace(/\/$/, '') || '/',
  ),
);

if (indexableBuild) {
  assert(
    robots.includes(`Sitemap: ${SITE.origin}/sitemap.xml`),
    'robots.txt does not advertise the canonical sitemap',
  );
} else {
  assert(!robots.includes('Disallow: /'), 'Preview robots.txt must allow crawlers to read noindex');
}
assert(config.cleanUrls === true, 'vercel.json must enable cleanUrls for generated route HTML');
assert(!config.rewrites?.length, 'vercel.json must not contain a catch-all SPA rewrite');
assert(
  sitemapRoutes.size === INDEXED_ROUTES.length &&
    INDEXED_ROUTES.every((route) => sitemapRoutes.has(route)),
  'Sitemap must contain exactly the indexed canonical routes with no stale extras',
);

for (const route of INDEXED_ROUTES) {
  const metadata = getRouteMetadata(route);
  const outputPath = outputPathForRoute(route);
  await access(outputPath);
  const html = await readFile(outputPath, 'utf8');
  const canonical = absoluteUrl(route);

  assert(html.includes(`<title data-raining-head="true">${metadata.title.replaceAll('&', '&amp;')}</title>`), `Wrong title for ${route}`);
  assert(html.includes(`rel="canonical" href="${canonical}"`), `Missing canonical for ${route}`);
  assert(html.includes('name="description"'), `Missing description for ${route}`);
  assert(
    html.includes(
      indexableBuild
        ? 'name="robots" content="index, follow, max-image-preview:large"'
        : 'name="robots" content="noindex, nofollow"',
    ),
    `Wrong robots directive for ${route}`,
  );
  assert(html.includes('property="og:title"'), `Missing Open Graph tags for ${route}`);
  assert(html.includes('id="raining-structured-data"'), `Missing structured data for ${route}`);
  assert(!html.includes('Combined Entertainment Website Design'), `Generic title leaked into ${route}`);
  assert(sitemap.includes(`<loc>${canonical}</loc>`), `Sitemap is missing ${route}`);
  if (indexableBuild && googleSiteVerification) {
    assert(
      html.includes(`name="google-site-verification" content="${googleSiteVerification}"`),
      `Missing Google site verification for ${route}`,
    );
  } else if (!indexableBuild) {
    assert(!html.includes('name="google-site-verification"'), `Verification token leaked into preview route ${route}`);
  }
}

for (const route of NOINDEX_ROUTES) {
  const metadata = getRouteMetadata(route);
  const outputPath = outputPathForRoute(route);
  await access(outputPath);
  const html = await readFile(outputPath, 'utf8');
  const expectedRobots = indexableBuild ? metadata.robots : 'noindex, nofollow';

  assert(
    html.includes(`name="robots" content="${expectedRobots}"`),
    `Wrong noindex robots directive for ${route}`,
  );
  assert(html.includes(`rel="canonical" href="${absoluteUrl(route)}"`), `Missing canonical for ${route}`);
  assert(!html.includes('id="raining-structured-data"'), `Noindex route ${route} must not emit structured data`);
  assert(!sitemap.includes(`<loc>${absoluteUrl(route)}</loc>`), `Noindex route ${route} leaked into sitemap`);
  if (!indexableBuild) {
    assert(!html.includes('name="google-site-verification"'), `Verification token leaked into preview route ${route}`);
  }
}

for (const redirect of config.redirects || []) {
  const shadowPath = outputPathForRoute(redirect.source);
  let shadowExists = true;
  try {
    await access(shadowPath);
  } catch {
    shadowExists = false;
  }
  assert(!shadowExists, `Redirect ${redirect.source} is shadowed by generated HTML`);
}

const notFound = await readFile(path.join(distDir, '404.html'), 'utf8');
assert(notFound.includes('name="robots" content="noindex, nofollow"'), '404.html must be noindex');
assert(!notFound.includes('rel="canonical"'), '404.html must not claim a canonical URL');
assert(notFound.includes('This page isn’t here'), '404.html is missing branded fallback content');

console.log(
  `SEO build verified: ${INDEXED_ROUTES.length} canonical HTML documents, valid discovery files, and branded 404 output.`,
);
