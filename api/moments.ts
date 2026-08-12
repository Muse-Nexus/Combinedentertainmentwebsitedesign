import type { LatestMoment } from '../shared/site-content.js';
import {
  AirtableConfigurationError,
  AirtableRequestError,
  listAirtableRecords,
  optionalEnvironmentValue,
  type AirtableFields,
} from '../server/airtable.js';
import {
  cleanText,
  isRecord,
  methodNotAllowed,
  safeHttpUrl,
  type ApiRequest,
  type ApiResponse,
} from '../server/http.js';

const CACHE_HEADER = 'public, s-maxage=300, stale-while-revalidate=86400';

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'GET') return methodNotAllowed(response, ['GET']);

  const parameters = new URLSearchParams({
    maxRecords: '12',
    filterByFormula: '{Published}=TRUE()',
    'sort[0][field]': 'Sort Order',
    'sort[0][direction]': 'asc',
  });
  const view = optionalEnvironmentValue('AIRTABLE_MOMENTS_VIEW');
  if (view) parameters.set('view', view);

  try {
    const tableName = optionalEnvironmentValue('AIRTABLE_MOMENTS_TABLE');
    if (!tableName) {
      throw new AirtableConfigurationError('The Moments table is not configured');
    }
    const records = await listAirtableRecords('AIRTABLE_MOMENTS_TABLE', tableName, parameters);
    const moments = records
      .map((record) => mapMoment(record.id, record.fields))
      .filter((moment): moment is LatestMoment => moment !== null);

    response.setHeader('Cache-Control', CACHE_HEADER);
    return response.status(200).json({ ok: true, moments });
  } catch (error) {
    const reason =
      error instanceof AirtableConfigurationError ? 'not_configured' : 'temporarily_unavailable';
    if (error instanceof AirtableRequestError) {
      console.error('Airtable moments request failed', { status: error.status });
    }
    response.setHeader('Cache-Control', 'no-store');
    return response.status(503).json({
      ok: false,
      code: 'content_unavailable',
      reason,
      message: 'Latest-moment updates are temporarily unavailable. Use the checked-in gallery.',
    });
  }
}

function mapMoment(id: string, fields: AirtableFields): LatestMoment | null {
  const image = imageField(fields, 'Image') || safeHttpUrl(fields['Image URL']);
  const caption = cleanText(fields.Caption, 600);
  if (!image || !caption) return null;

  return {
    id,
    image,
    alt: cleanText(fields['Alt Text'], 300) || caption,
    caption,
    href: safeHttpUrl(fields['Post URL']),
    account: cleanText(fields.Account, 80) || undefined,
    service: cleanText(fields.Service, 80) || undefined,
  };
}

function imageField(fields: AirtableFields, name: string): string | undefined {
  const attachments = fields[name];
  if (!Array.isArray(attachments)) return undefined;
  const first = attachments[0];
  return isRecord(first) ? safeHttpUrl(first.url) : undefined;
}
