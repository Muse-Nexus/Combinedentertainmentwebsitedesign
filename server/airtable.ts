declare const process: { env: Record<string, string | undefined> };

export type AirtableFields = Record<string, unknown>;

export interface AirtableRecord {
  id: string;
  createdTime?: string;
  fields: AirtableFields;
}

interface AirtableListResponse {
  records?: AirtableRecord[];
  offset?: string;
}

export class AirtableConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AirtableConfigurationError';
  }
}

export class AirtableRequestError extends Error {
  status: number;

  constructor(status: number) {
    super(`Airtable request failed with status ${status}`);
    this.name = 'AirtableRequestError';
    this.status = status;
  }
}

export function optionalEnvironmentValue(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

export async function listAirtableRecords(
  tableEnvironmentName: string,
  defaultTableName: string,
  parameters: URLSearchParams,
): Promise<AirtableRecord[]> {
  const tableName = optionalEnvironmentValue(tableEnvironmentName) || defaultTableName;
  const result = await airtableRequest<AirtableListResponse>(
    `/${encodeURIComponent(tableName)}?${parameters.toString()}`,
  );
  return Array.isArray(result.records) ? result.records : [];
}

export async function createAirtableRecord(
  tableEnvironmentName: string,
  defaultTableName: string,
  fields: AirtableFields,
): Promise<AirtableRecord> {
  const tableName = optionalEnvironmentValue(tableEnvironmentName) || defaultTableName;
  const result = await airtableRequest<{ records?: AirtableRecord[] }>(
    `/${encodeURIComponent(tableName)}`,
    {
      method: 'POST',
      body: JSON.stringify({ records: [{ fields }], typecast: true }),
    },
  );
  const record = result.records?.[0];
  if (!record) throw new AirtableRequestError(502);
  return record;
}

async function airtableRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const accessToken =
    optionalEnvironmentValue('AIRTABLE_ACCESS_TOKEN') || optionalEnvironmentValue('AIRTABLE_PAT');
  const baseId = optionalEnvironmentValue('AIRTABLE_BASE_ID');

  if (!accessToken || !baseId) {
    throw new AirtableConfigurationError('Airtable server credentials are not configured');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const response = await fetch(`https://api.airtable.com/v0/${encodeURIComponent(baseId)}${path}`, {
      ...init,
      signal: init.signal || controller.signal,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        ...init.headers,
      },
    });

    if (!response.ok) throw new AirtableRequestError(response.status);
    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}
