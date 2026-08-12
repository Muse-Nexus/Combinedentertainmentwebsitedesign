import {
  AirtableConfigurationError,
  AirtableRequestError,
  createAirtableRecord,
  optionalEnvironmentValue,
} from '../server/airtable.js';
import {
  checkRateLimit,
  cleanText,
  getClientIp,
  hasSameOrigin,
  methodNotAllowed,
  parseBody,
  type ApiRequest,
  type ApiResponse,
} from '../server/http.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const SERVICE_LABELS: Record<string, string> = {
  'kids-party': 'Kids Birthday Party',
  magic: 'Magic Show',
  gameshow: 'Game Show NITE',
  casino: 'Casino NITE',
  strolling: 'Stilt Walkers',
  'led-performers': 'LED Performers',
  'balloon-decor': 'Balloon Decor',
  'balloon-animals': 'Balloon Twisting & Face Painting',
  'face-painting': 'Face Painting',
  corporate: 'Corporate Event',
  wedding: 'Wedding',
  combo: 'Custom Package',
};

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'POST') return methodNotAllowed(response, ['POST']);
  response.setHeader('Cache-Control', 'no-store');

  if (!hasSameOrigin(request)) {
    return response.status(403).json({ ok: false, code: 'origin_not_allowed' });
  }

  const contentLengthHeader = request.headers['content-length'];
  const contentLength = Number(Array.isArray(contentLengthHeader) ? contentLengthHeader[0] : contentLengthHeader);
  if (Number.isFinite(contentLength) && contentLength > 25_000) {
    return response.status(413).json({ ok: false, code: 'request_too_large' });
  }

  const body = parseBody(request.body);
  if (!body) {
    return response.status(400).json({ ok: false, code: 'invalid_request' });
  }

  // Honeypot fields are intentionally acknowledged without writing to Airtable.
  if (cleanText(body.website, 200)) {
    return response.status(202).json({ ok: true });
  }

  const limit = checkRateLimit(`inquiry:${getClientIp(request)}`);
  if (!limit.allowed) {
    response.setHeader('Retry-After', String(limit.retryAfterSeconds));
    return response.status(429).json({
      ok: false,
      code: 'rate_limited',
      message: 'Please wait a few minutes before sending another inquiry.',
    });
  }

  const inquiry = {
    name: spreadsheetSafeText(cleanText(body.name, 100)),
    email: cleanText(body.email, 254).toLowerCase(),
    phone: spreadsheetSafeText(cleanText(body.phone, 50)),
    eventDate: cleanText(body.date, 10),
    service: canonicalService(cleanText(body.type, 80)),
    guests: spreadsheetSafeText(cleanText(body.guests, 40)),
    kids: spreadsheetSafeText(cleanText(body.kids, 40)),
    message: spreadsheetSafeText(cleanText(body.message, 5_000)),
  };

  if (!inquiry.name || !EMAIL_PATTERN.test(inquiry.email) || isSpreadsheetFormula(inquiry.email)) {
    return response.status(400).json({
      ok: false,
      code: 'validation_failed',
      message: 'A name and valid email address are required.',
    });
  }
  if (inquiry.eventDate && !isValidIsoDate(inquiry.eventDate)) {
    return response.status(400).json({
      ok: false,
      code: 'validation_failed',
      message: 'The event date must use YYYY-MM-DD format.',
    });
  }

  try {
    const configuredInquiriesTable = optionalEnvironmentValue('AIRTABLE_INQUIRIES_TABLE');
    const legacyTableId = optionalEnvironmentValue('AIRTABLE_TABLE_ID');
    const usesExistingLeadTable = configuredInquiriesTable
      ? configuredInquiriesTable.toLowerCase() === 'leads / inquiries'
      : Boolean(legacyTableId);
    const tableName = configuredInquiriesTable || legacyTableId || 'Inquiries';

    const fields: Record<string, unknown> = usesExistingLeadTable
      ? buildExistingLeadFields(inquiry)
      : buildInquiriesFields(inquiry);

    await createAirtableRecord('AIRTABLE_INQUIRIES_TABLE', tableName, fields);

    return response.status(201).json({ ok: true });
  } catch (error) {
    const reason =
      error instanceof AirtableConfigurationError ? 'not_configured' : 'temporarily_unavailable';
    if (error instanceof AirtableRequestError) {
      console.error('Airtable inquiry write failed', { status: error.status });
    }
    return response.status(503).json({
      ok: false,
      code: 'inquiry_unavailable',
      reason,
      message: 'The inquiry service is temporarily unavailable. Please call or text Brenton directly.',
    });
  }
}

function buildExistingLeadFields(inquiry: {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  service: string;
  guests: string;
  kids: string;
  message: string;
}): Record<string, unknown> {
  const details = [
    inquiry.message,
    inquiry.kids ? `Children expected: ${inquiry.kids}` : '',
  ].filter(Boolean).join('\n\n');
  const fields: Record<string, unknown> = {
    'Date Received': new Date().toISOString().slice(0, 10),
    'Client / Contact Name': inquiry.name,
    Email: inquiry.email,
    'Lead Status': 'New',
    'Source / Found Us Through': 'Website',
  };
  if (inquiry.phone) fields.Phone = inquiry.phone;
  if (inquiry.eventDate) fields['Event Date'] = inquiry.eventDate;
  if (inquiry.service) {
    fields['Type of Event'] = inquiry.service;
    fields['Service Requested'] = [inquiry.service];
  }
  if (inquiry.guests) {
    const guestCount = Number.parseInt(inquiry.guests.replace(/[^0-9]/g, ''), 10);
    if (Number.isFinite(guestCount)) fields['Estimated Guest Count / PAX'] = guestCount;
  }
  if (details) fields['Message / Inquiry Notes'] = details;
  return fields;
}

function buildInquiriesFields(inquiry: {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  service: string;
  guests: string;
  kids: string;
  message: string;
}): Record<string, unknown> {
  const fields: Record<string, unknown> = {
    'Received At': new Date().toISOString(),
    Name: inquiry.name,
    Email: inquiry.email,
    Source: 'rainingentertainment.com contact form',
    Status: 'New',
  };
  if (inquiry.phone) fields.Phone = inquiry.phone;
  if (inquiry.eventDate) fields['Event Date'] = inquiry.eventDate;
  if (inquiry.service) fields.Service = inquiry.service;
  if (inquiry.guests) fields.Guests = inquiry.guests;
  if (inquiry.kids) fields.Kids = inquiry.kids;
  if (inquiry.message) fields.Message = inquiry.message;
  return fields;
}

function isValidIsoDate(value: string): boolean {
  if (!DATE_PATTERN.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function canonicalService(value: string): string {
  return SERVICE_LABELS[value] || '';
}

// Airtable is routinely exported to Excel/Numbers. Prefix formula-like user
// text so a CSV export cannot execute it as a spreadsheet formula.
function spreadsheetSafeText(value: string): string {
  return isSpreadsheetFormula(value) ? `'${value}` : value;
}

function isSpreadsheetFormula(value: string): boolean {
  return /^[\s]*[=+\-@]/.test(value);
}
