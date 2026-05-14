import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, date, type, guests, location, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const pat = process.env.AIRTABLE_PAT;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_TABLE_ID;

  if (!pat || !baseId || !tableId) {
    console.error('Missing Airtable env vars');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const fields: Record<string, string> = {
    'Client / Contact Name': name,
    'Email': email,
    'Lead Status': 'New',
    'Source': 'Website',
  };

  if (phone) fields['Phone'] = phone;
  if (date) fields['Event Date'] = date;
  if (type) fields['Type of Event'] = type;
  if (guests) fields['Estimated Guest Count / PAX'] = guests;
  if (location) fields['Event Location'] = location;
  if (message) fields['Message / Inquiry Notes'] = message;

  try {
    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${baseId}/${tableId}`,
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
      return res.status(500).json({ error: 'Failed to save lead' });
    }

    const record = await airtableRes.json();
    return res.status(200).json({ success: true, id: record.id });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Unexpected server error' });
  }
}
