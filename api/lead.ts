import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, date, type, guests, venue, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const pat = process.env.AIRTABLE_PAT;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || 'Bookings';

  if (!pat || !baseId) {
    console.error('Missing Airtable env vars');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const fields: Record<string, string> = {
    Name: name,
    Email: email,
  };
  if (phone) fields['Phone'] = phone;
  if (date) fields['Event Date'] = date;
  if (type) fields['Event Type'] = type;
  if (guests) fields['Expected Guests'] = guests;
  if (venue) fields['Venue / Location'] = venue;
  if (message) fields['Message'] = message;

  const airtableRes = await fetch(
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${pat}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    }
  );

  if (!airtableRes.ok) {
    const err = await airtableRes.text();
    console.error('Airtable error:', err);
    return res.status(502).json({ error: 'Failed to save to Airtable' });
  }

  return res.status(200).json({ ok: true });
}
