import type { EventType, ShowEvent } from '../shared/site-content.js';
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
const VALID_EVENT_TYPES = new Set<EventType>(['Public', 'Ticketed', 'Private']);

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'GET') return methodNotAllowed(response, ['GET']);

  const parameters = new URLSearchParams({
    maxRecords: '50',
    filterByFormula: '{Published}=TRUE()',
    'sort[0][field]': 'Start',
    'sort[0][direction]': 'asc',
  });
  const view = optionalEnvironmentValue('AIRTABLE_EVENTS_VIEW');
  if (view) parameters.set('view', view);

  try {
    const tableName = optionalEnvironmentValue('AIRTABLE_EVENTS_TABLE');
    if (!tableName) {
      throw new AirtableConfigurationError('The Events table is not configured');
    }
    const records = await listAirtableRecords('AIRTABLE_EVENTS_TABLE', tableName, parameters);
    const events = records
      .map((record) => mapEvent(record.id, record.fields))
      .filter((event): event is ShowEvent => event !== null);

    response.setHeader('Cache-Control', CACHE_HEADER);
    return response.status(200).json({ ok: true, events });
  } catch (error) {
    const reason =
      error instanceof AirtableConfigurationError ? 'not_configured' : 'temporarily_unavailable';
    if (error instanceof AirtableRequestError) {
      console.error('Airtable events request failed', { status: error.status });
    }
    response.setHeader('Cache-Control', 'no-store');
    return response.status(503).json({
      ok: false,
      code: 'content_unavailable',
      reason,
      message: 'Upcoming-show updates are temporarily unavailable. Use the checked-in schedule.',
    });
  }
}

function mapEvent(id: string, fields: AirtableFields): ShowEvent | null {
  const title = textField(fields, 'Title');
  const startAt = textField(fields, 'Start');
  const endAt = textField(fields, 'End');
  const recurrenceLabel = textField(fields, 'Recurrence Label');
  const relevantDate = parseDate(endAt || startAt);

  if (!title || (!recurrenceLabel && (!relevantDate || relevantDate.getTime() < Date.now() - 21_600_000))) {
    return null;
  }

  const rawType = textField(fields, 'Type') as EventType;
  const type = VALID_EVENT_TYPES.has(rawType) ? rawType : 'Public';
  const dateLabel =
    textField(fields, 'Date Label') || recurrenceLabel || formatHawaiiDate(relevantDate as Date);
  const timeLabel = textField(fields, 'Time Label') || formatHawaiiTime(parseDate(startAt));

  if (type === 'Private') {
    return {
      id,
      title: 'Private Event',
      performer: textField(fields, 'Performer') || 'Raining Entertainment',
      date: dateLabel,
      time: 'Private booking',
      location: 'Maui, Hawaiʻi',
      type,
      description: 'Raining Entertainment is booked for a private celebration.',
      image: '/media/hero-reigning-entertainment.webp',
      tag: 'Booked',
    };
  }

  return {
    id,
    title,
    performer: textField(fields, 'Performer') || 'Raining Entertainment',
    date: dateLabel,
    startAt: startAt || undefined,
    time: timeLabel || 'Time to be announced',
    doors: textField(fields, 'Doors') || undefined,
    location: textField(fields, 'Venue') || 'Maui, Hawaiʻi',
    locationLink: safeHttpUrl(fields['Venue URL']),
    type,
    price: textField(fields, 'Price') || undefined,
    description: textField(fields, 'Description') || 'More details are coming soon.',
    bookingLink: safeHttpUrl(fields['Booking URL']),
    image: imageField(fields, 'Image') || safeHttpUrl(fields['Image URL']) || '/media/hero-fairy-luau.webp',
    tag: textField(fields, 'Tag') || undefined,
  };
}

function textField(fields: AirtableFields, name: string): string {
  return cleanText(fields[name], 5_000);
}

function imageField(fields: AirtableFields, name: string): string | undefined {
  const attachments = fields[name];
  if (!Array.isArray(attachments)) return undefined;
  const first = attachments[0];
  return isRecord(first) ? safeHttpUrl(first.url) : undefined;
}

function parseDate(value: string): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatHawaiiDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'Pacific/Honolulu',
  }).format(date);
}

function formatHawaiiTime(date: Date | null): string {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Pacific/Honolulu',
  }).format(date);
}
