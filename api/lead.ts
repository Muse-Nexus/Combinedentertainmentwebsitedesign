import type { VercelRequest, VercelResponse } from '@vercel/node';

const AIRTABLE_PAT = process.env.AIRTABLE_PAT!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME ?? 'Leads';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, date, type, guests, venue, message } = req.body ?? {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_PAT}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            Name: name,
            Email: email,
            Phone: phone ?? '',
            'Event Date': date ?? '',
            'Event Type': type ?? '',
            Guests: guests ?? '',
            Venue: venue ?? '',
            Message: message ?? '',
            'Submitted At': new Date().toISOString(),
          },
        }),
      }
    );

    if (!airtableRes.ok) {
      const err = await airtableRes.json();
      console.error('Airtable error:', err);
      return res.status(500).json({ error: 'Failed to save lead' });
    }

    const record = await airtableRes.json();
    return res.status(200).json({ success: true, id: record.id });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
