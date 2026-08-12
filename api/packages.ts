import type { CasinoPackage, CasinoPackageAccent } from '../shared/site-content.js';
import {
  AirtableConfigurationError,
  AirtableRequestError,
  listAirtableRecords,
  optionalEnvironmentValue,
  type AirtableFields,
} from '../server/airtable.js';
import {
  cleanText,
  methodNotAllowed,
  type ApiRequest,
  type ApiResponse,
} from '../server/http.js';

const CACHE_HEADER = 'public, s-maxage=300, stale-while-revalidate=3600';
const VALID_ACCENTS = new Set<CasinoPackageAccent>(['classic', 'deluxe', 'full']);
const VALID_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'GET') return methodNotAllowed(response, ['GET']);

  const parameters = new URLSearchParams({
    maxRecords: '12',
    filterByFormula: '{Published}=TRUE()',
    'sort[0][field]': 'Sort Order',
    'sort[0][direction]': 'asc',
  });
  const view = optionalEnvironmentValue('AIRTABLE_PACKAGES_VIEW');
  if (view) parameters.set('view', view);

  try {
    const tableName = optionalEnvironmentValue('AIRTABLE_PACKAGES_TABLE');
    if (!tableName) {
      throw new AirtableConfigurationError('The Casino Packages table is not configured');
    }

    const records = await listAirtableRecords('AIRTABLE_PACKAGES_TABLE', tableName, parameters);
    const packages = records
      .map((record) => mapPackage(record.id, record.fields))
      .filter((casinoPackage): casinoPackage is CasinoPackage => casinoPackage !== null);

    response.setHeader('Cache-Control', CACHE_HEADER);
    return response.status(200).json({ ok: true, packages });
  } catch (error) {
    const reason =
      error instanceof AirtableConfigurationError ? 'not_configured' : 'temporarily_unavailable';
    if (error instanceof AirtableRequestError) {
      console.error('Airtable casino packages request failed', { status: error.status });
    }
    response.setHeader('Cache-Control', 'no-store');
    return response.status(503).json({
      ok: false,
      code: 'content_unavailable',
      reason,
      message: 'Casino NITE package updates are temporarily unavailable. Use the checked-in packages.',
    });
  }
}

function mapPackage(id: string, fields: AirtableFields): CasinoPackage | null {
  const name = cleanText(fields['Package Name'], 100);
  const slug = cleanText(fields.Slug, 100).toLowerCase();
  const price = finiteNumberField(fields.Price, 100, 100_000);
  const inclusions = multilineItems(fields.Inclusions);
  const accentValue = cleanText(fields.Accent, 20).toLowerCase() as CasinoPackageAccent;

  if (!name || !VALID_SLUG.test(slug) || price === null || inclusions.length === 0) return null;

  return {
    id,
    slug,
    name,
    price,
    taxLabel: cleanText(fields['Tax Label'], 40) || '+ tax',
    badge: cleanText(fields.Badge, 40) || undefined,
    accent: VALID_ACCENTS.has(accentValue) ? accentValue : 'classic',
    inclusions,
    sortOrder: finiteNumberField(fields['Sort Order'], 0, 1_000) ?? 0,
  };
}

function finiteNumberField(value: unknown, minimum: number, maximum: number): number | null {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  if (value < minimum || value > maximum) return null;
  return value;
}

function multilineItems(value: unknown): string[] {
  if (typeof value !== 'string') return [];
  return value
    .split(/\r?\n/)
    .map((item) => item.replace(/^\s*[-*•]\s*/, '').trim().slice(0, 240))
    .filter(Boolean)
    .slice(0, 16);
}
