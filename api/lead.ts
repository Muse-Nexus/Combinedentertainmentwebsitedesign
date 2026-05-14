import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, date, type, guests, venue, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const PAT = process.env.AIRTABLE_PAT;
  const BASE_ID = process.env.AIRTABLE_BASE_ID;
  const TABLE = process.env.AIRTABLE_TABLE_NAME || 'Bookings';

  if (!PAT || !BASE_ID) {
    console.error('Missing Airtable env vars');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${PAT}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            Name: name,
            Email: email,
            Phone: phone || '',
            'Event Date': date || '',
            'Event Type': type || '',
            'Expected Guests': guests ? Number(guests) : null,
            Venue: venue || '',
            Message: message,
            'Submitted At': new Date().toISOString(),
            Status: 'New Lead',
          },
        }),
      }
    );

    if (!airtableRes.ok) {
      const err = await airtableRes.text();
      console.error('Airtable error:', err);
      return res.status(502).json({ error: 'Failed to save to Airtable.' });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Unexpected error:', e);
    return res.status(500).json({ error: 'Unexpected server error.' });
  }
}
