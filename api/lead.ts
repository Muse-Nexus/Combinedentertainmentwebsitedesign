import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, date, type, guests, venue, message } = req.body;

  const pat = process.env.AIRTABLE_PAT;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || 'Bookings';

  if (!pat || !baseId) {
    console.error('Missing Airtable env vars');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${pat}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            Name: name || '',
            Email: email || '',
            Phone: phone || '',
            'Event Date': date || '',
            'Event Type': type || '',
            Guests: guests || '',
            Venue: venue || '',
            Message: message || '',
            'Submitted At': new Date().toISOString(),
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error('Airtable error:', err);
      return res.status(500).json({ error: 'Failed to save to Airtable' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Unexpected server error' });
  }
}
