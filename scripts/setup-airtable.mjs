const ACCESS_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN || process.env.AIRTABLE_PAT;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const DRY_RUN = process.argv.includes('--dry-run');

if (!DRY_RUN && (!ACCESS_TOKEN || !BASE_ID)) {
  throw new Error('AIRTABLE_ACCESS_TOKEN (or AIRTABLE_PAT) and AIRTABLE_BASE_ID are required.');
}

const ACTIVE_BASE_ID = BASE_ID || 'dry-run-base';
const API_ROOT = `https://api.airtable.com/v0/meta/bases/${encodeURIComponent(ACTIVE_BASE_ID)}`;
const DATA_API_ROOT = `https://api.airtable.com/v0/${encodeURIComponent(ACTIVE_BASE_ID)}`;

const money = () => ({ type: 'currency', options: { precision: 2, symbol: '$' } });
const wholeNumber = () => ({ type: 'number', options: { precision: 0 } });
const checkbox = () => ({
  type: 'checkbox',
  options: { color: 'greenBright', icon: 'check' },
});
const date = () => ({
  type: 'date',
  options: { dateFormat: { name: 'us', format: 'M/D/YYYY' } },
});
const dateTime = () => ({
  type: 'dateTime',
  options: {
    timeZone: 'Pacific/Honolulu',
    dateFormat: { name: 'us', format: 'M/D/YYYY' },
    timeFormat: { name: '12hour', format: 'h:mma' },
  },
});
const select = (choices) => ({
  type: 'singleSelect',
  options: { choices: choices.map(([name, color]) => ({ name, color })) },
});
const multiSelect = (choices) => ({
  type: 'multipleSelects',
  options: { choices: choices.map(([name, color]) => ({ name, color })) },
});
const text = (description) => ({ type: 'singleLineText', description });
const notes = (description) => ({ type: 'multilineText', description });

const performerChoices = [
  ['Brenton Keith', 'blueLight2'],
  ['Jolie Strickland', 'purpleLight2'],
  ['Raining Entertainment Team', 'orangeLight2'],
  ['Guest Contractor', 'grayLight2'],
];

const ownerChoices = [['Brenton Keith', 'blueLight2']];

const inquiryServiceChoices = [
  ['Kids Birthday Party', 'greenLight2'],
  ['Magic Show', 'blueLight2'],
  ['Game Show NITE', 'orangeLight2'],
  ['Casino NITE', 'redLight2'],
  ['Stilt Walkers', 'purpleLight2'],
  ['LED Performers', 'cyanBright'],
  ['Balloon Decor', 'pinkLight2'],
  ['Balloon Twisting & Face Painting', 'greenBright'],
  ['Face Painting', 'yellowLight2'],
  ['Corporate Event', 'cyanLight2'],
  ['Wedding', 'pinkBright'],
  ['Custom Package', 'grayLight2'],
];

const serviceChoices = [
  ['Magic', 'blueLight2'],
  ['Up-Close Magic', 'blueLight2'],
  ['Live Magic Show', 'cyanLight2'],
  ['Game Show NITE', 'orangeLight2'],
  ['Casino NITE', 'redLight2'],
  ['Game Shows & Casino', 'orangeBright'],
  ['Stilt Walkers', 'purpleLight2'],
  ['LED Performers', 'cyanBright'],
  ['Balloon Twisting & Face Painting', 'greenLight2'],
  ['Balloon Decor', 'pinkLight2'],
  ['Face Painting', 'yellowLight2'],
  ['DJ & MC', 'tealLight2'],
  ['Cirque', 'purpleBright'],
  ['Other', 'grayLight2'],
];

const leadSourceChoices = [
  ['Website', 'blueLight2'],
  ['Google', 'cyanLight2'],
  ['Referral', 'greenLight2'],
  ['Venue', 'purpleLight2'],
  ['Instagram', 'pinkLight2'],
  ['Facebook', 'blueBright'],
  ['Phone', 'yellowLight2'],
  ['Returning Client', 'tealLight2'],
  ['Other', 'grayLight2'],
];

const casinoPackageSeeds = [
  {
    'Package Name': 'Classic Casino NITE',
    Slug: 'classic-casino-nite',
    Price: 2750,
    'Tax Label': '+ tax',
    Accent: 'classic',
    Inclusions: [
      '3 hours of high-energy casino gaming',
      'Blackjack, Craps, and Roulette',
      'Up to 25 guests playing simultaneously',
      '3 professional, entertaining dealers',
      '3 tables total (Blackjack, Craps, Roulette)',
      'Hosted, guided gameplay — perfect for beginners',
      'Chips and full casino setup included',
    ].join('\n'),
    'Sort Order': 1,
    Published: true,
  },
  {
    'Package Name': 'Deluxe Casino NITE',
    Slug: 'deluxe-casino-nite',
    Price: 3750,
    'Tax Label': '+ tax',
    Badge: 'Most Popular',
    Accent: 'deluxe',
    Inclusions: [
      '3 hours of elevated casino entertainment',
      '2 Blackjack Tables, Craps & Roulette',
      'Up to 30–35 guests playing simultaneously',
      '4 of Maui’s most entertaining dealers',
      '4 tables total',
      'Professional sound support (mic + music) for smooth, high-energy gameplay',
      'Ambient lighting included',
    ].join('\n'),
    'Sort Order': 2,
    Published: true,
  },
  {
    'Package Name': 'Full Casino Experience',
    Slug: 'full-casino-experience',
    Price: 4500,
    'Tax Label': '+ tax',
    Accent: 'full',
    Inclusions: [
      'A fully immersive casino-style event experience',
      '2 Blackjack Tables, Craps, Roulette & Poker',
      'Up to 40 guests playing simultaneously',
      '5 of Maui’s most entertaining dealers',
      '5 tables total',
      'Custom Balloon Decor by Cirque Jolie',
      'Enhanced sound + DJ-style energy',
      'Upgraded lighting & atmosphere',
      'Red carpet entrance experience',
      'Prizes for top chip leaders',
    ].join('\n'),
    'Sort Order': 3,
    Published: true,
  },
];

const mulligansSeed = {
  'Public Key': 'mulligans-recurring',
  Title: "The Mulligan's Magic Show",
  Performer: "Brenton Keith & His Bag O' Tricks",
  'Recurrence Label': 'Every Thursday',
  'Time Label': '6:30 PM',
  Doors: 'Close-up tableside magic begins before the stage show.',
  Venue: 'Mulligans on the Blue, Maui',
  'Venue URL': 'https://www.mulligansontheblue.com',
  Type: 'Ticketed',
  Description:
    "Brenton Keith's high-energy comedy magic show brings audience participation, surprises, and family-friendly laughs to Wailea each week. Check with the venue for current seating and admission details.",
  'Booking URL': 'https://www.mulligansontheblue.com',
  'Image URL': 'https://rainingentertainment.com/media/magic/magic-brent-live-show-maui.webp',
  Tag: 'Recurring Show',
  Published: true,
};

async function api(path, { method = 'GET', body } = {}) {
  const response = await fetch(`${API_ROOT}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = payload?.error?.message || payload?.error || response.statusText;
    throw new Error(`Airtable ${method} ${path} failed (${response.status}): ${detail}`);
  }
  return payload;
}

async function recordsApi(path, { method = 'GET', body } = {}) {
  const response = await fetch(`${DATA_API_ROOT}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = payload?.error?.message || payload?.error || response.statusText;
    throw new Error(`Airtable records ${method} ${path} failed (${response.status}): ${detail}`);
  }
  return payload;
}

async function loadSchema() {
  if (DRY_RUN) {
    console.log('[dry-run] offline empty-base simulation; no Airtable credentials or network calls are used.');
    return [];
  }
  const payload = await api('/tables');
  return payload.tables || [];
}

function describeField(field) {
  const { name, description, type, options } = field;
  return {
    name,
    type,
    ...(description ? { description } : {}),
    ...(options ? { options } : {}),
  };
}

async function createTable(definition) {
  if (DRY_RUN) {
    console.log(`[dry-run] create table: ${definition.name}`);
    return { id: `dry-${definition.name}`, name: definition.name, fields: definition.fields };
  }
  const created = await api('/tables', {
    method: 'POST',
    body: {
      name: definition.name,
      description: definition.description,
      fields: definition.fields.map(describeField),
    },
  });
  console.log(`Created table: ${definition.name}`);
  return created;
}

async function createField(table, field) {
  if (DRY_RUN) {
    console.log(`[dry-run] add ${table.name}.${field.name}`);
    return;
  }
  await api(`/tables/${encodeURIComponent(table.id)}/fields`, {
    method: 'POST',
    body: describeField(field),
  });
  console.log(`Added field: ${table.name}.${field.name}`);
}

async function ensureFields(table, fields) {
  const existing = new Map((table.fields || []).map(field => [field.name.toLowerCase(), field]));
  for (const field of fields) {
    const current = existing.get(field.name.toLowerCase());
    if (current) {
      if (current.type !== field.type) {
        console.warn(
          `Skipped ${table.name}.${field.name}: existing type is ${current.type}, expected ${field.type}. Review this field manually.`,
        );
      }
      continue;
    }
    await createField(table, field);
  }
}

async function ensureTable(definition, tables) {
  const existing = tables.find(table => table.name.toLowerCase() === definition.name.toLowerCase());
  if (existing) {
    // Ensure every named field. If an older base uses a different primary field,
    // the website's required primary-name field is added as a normal field.
    await ensureFields(existing, definition.fields);
    return existing;
  }
  const created = await createTable(definition);
  tables.push(created);
  return created;
}

async function listAllRecords(table, fieldNames) {
  const records = [];
  let offset;
  do {
    const query = new URLSearchParams({ pageSize: '100' });
    for (const fieldName of fieldNames) query.append('fields[]', fieldName);
    if (offset) query.set('offset', offset);
    const page = await recordsApi(`/${encodeURIComponent(table.id)}?${query.toString()}`);
    records.push(...(page.records || []));
    offset = page.offset;
  } while (offset);
  return records;
}

async function createRecords(table, records) {
  if (records.length === 0) return;
  await recordsApi(`/${encodeURIComponent(table.id)}`, {
    method: 'POST',
    body: { records: records.map(fields => ({ fields })), typecast: true },
  });
}

async function seedCasinoPackages(table) {
  if (DRY_RUN) {
    for (const fields of casinoPackageSeeds) {
      console.log(`[dry-run] seed only if missing: Casino Packages.${fields['Package Name']}`);
    }
    return;
  }

  const existingRecords = await listAllRecords(table, ['Slug', 'Package Name']);
  const existingSlugs = new Set(
    existingRecords
      .map(record => record?.fields?.Slug)
      .filter(slug => typeof slug === 'string')
      .map(slug => slug.toLowerCase()),
  );
  const existingNames = new Set(
    existingRecords
      .map(record => record?.fields?.['Package Name'])
      .filter(name => typeof name === 'string')
      .map(name => name.toLowerCase()),
  );

  const missing = casinoPackageSeeds.filter(
    fields =>
      !existingSlugs.has(fields.Slug.toLowerCase()) &&
      !existingNames.has(fields['Package Name'].toLowerCase()),
  );
  await createRecords(table, missing);
  if (missing.length > 0) {
    console.log(`Seeded ${missing.length} missing Casino Packages record${missing.length === 1 ? '' : 's'}.`);
  }
}

async function seedMulligansShow(table) {
  if (DRY_RUN) {
    console.log(`[dry-run] seed only if missing: Public Events.${mulligansSeed.Title}`);
    return;
  }

  const existingRecords = await listAllRecords(table, ['Public Key', 'Title']);
  const exists = existingRecords.some(record => {
    const key = record?.fields?.['Public Key'];
    const title = record?.fields?.Title;
    return (
      (typeof key === 'string' && key.toLowerCase() === mulligansSeed['Public Key']) ||
      (typeof title === 'string' && title.toLowerCase() === mulligansSeed.Title.toLowerCase())
    );
  });
  if (exists) return;

  await createRecords(table, [mulligansSeed]);
  console.log(`Seeded missing recurring public show: ${mulligansSeed.Title}.`);
}

const tables = await loadSchema();

const clients = await ensureTable({
  name: 'Clients',
  description: 'Reusable private client and organization records. This table is never read by the public website.',
  fields: [
    { name: 'Client / Contact Name', ...text('Primary contact name from the paper booking sheet.') },
    { name: 'Organization / Company', ...text('Organization or company represented by the contact.') },
    { name: 'Phone', type: 'phoneNumber', description: 'Private client phone number.' },
    { name: 'Email', type: 'email', description: 'Private client email address.' },
    { name: 'Mailing Address', ...notes('Mailing address from the paper booking sheet.') },
    { name: 'Partner / Secondary Contact', ...text('Partner, assistant, planner, or secondary contact.') },
    {
      name: 'Preferred Contact Method',
      ...select([
        ['Phone', 'blueLight2'],
        ['Text', 'greenLight2'],
        ['Email', 'purpleLight2'],
      ]),
      description: 'How this client prefers to be contacted.',
    },
    { name: 'Client Notes', ...notes('Private relationship and contact notes.') },
  ],
}, tables);

const bookings = await ensureTable({
  name: 'Events / Bookings',
  description: 'Private event-level job sheet based on Brenton’s legacy paper booking sheet. Never exposed directly to the website.',
  fields: [
    { name: 'Booking / Event Name', ...text('Short internal name for the booking.') },
    {
      name: 'Client',
      type: 'multipleRecordLinks',
      options: { linkedTableId: clients.id },
      description: 'Private client or organization for this booking.',
    },
    { name: 'Show Date', ...date(), description: 'Main show or event date.' },
    { name: 'End Date', ...date(), description: 'Optional final date for a multi-day engagement.' },
    { name: 'Additional Event Dates / Schedule', ...notes('Extra dates, meal periods, rehearsals, or an irregular multi-day schedule from the legacy booking sheet.') },
    { name: 'Show Location', ...text('Location written on the paper booking sheet.') },
    { name: 'Venue', ...text('Venue or property name.') },
    { name: 'Type of Event', ...select(inquiryServiceChoices), description: 'Event or requested entertainment type.' },
    { name: 'Theme', ...text('Theme from the paper booking sheet.') },
    { name: 'Party Time', ...text('Overall party time when different from a performance time.') },
    { name: 'Estimated PAX', ...wholeNumber(), description: 'Expected total guest count.' },
    { name: 'Guest Ages / Audience Mix', ...text('Ages or audience mix.') },
    { name: 'Access / Load-In Notes', ...notes('Parking, access, and load-in details.') },
    { name: 'Advertising / Promotion', ...notes('Advertising, signage, promotion, or public-credit details.') },
    { name: 'Sound & Lighting', ...notes('Sound, lighting, power, and production requirements.') },
    { name: 'Hospitality / Meal / Green Room', ...notes('Meals, green room, and hospitality requirements.') },
    { name: 'Negotiation Notes', ...notes('Other negotiated terms and handwritten booking-sheet notes.') },
    { name: 'Lead Source', ...select(leadSourceChoices), description: 'How the client found Raining Entertainment.' },
    { name: 'Booking Owner', ...select(ownerChoices), description: 'All bookings are coordinated through Brenton Keith.' },
    {
      name: 'Booking Status',
      ...select([
        ['Inquiry', 'grayLight2'],
        ['Tentative', 'yellowLight2'],
        ['Confirmed', 'greenLight2'],
        ['Completed', 'blueLight2'],
        ['Cancelled', 'redLight2'],
      ]),
      description: 'Current booking status.',
    },
    { name: 'Date Prepared', ...date(), description: 'Today’s Date from the paper booking sheet.' },
    { name: 'Follow-Up Date', ...date(), description: 'Next follow-up date.' },
    { name: 'Follow-Up Notes', ...notes('Next action and follow-up history.') },
    { name: 'Quoted Subtotal', ...money(), description: 'Fee before tax and adjustments.' },
    { name: 'Tax', ...money(), description: 'Editable tax amount; do not hard-code a rate.' },
    { name: 'Travel / Adjustments', ...money(), description: 'Travel or negotiated adjustments.' },
    { name: 'Total Event Fee', ...money(), description: 'Final contracted event total.' },
    { name: 'Deposit Amount', ...money(), description: 'Deposit received or expected.' },
    { name: 'Expenses Total', ...money(), description: 'Simple manual total from related expenses.' },
    { name: 'Contract / Booking Sheet', type: 'multipleAttachments', description: 'Signed agreement, scan, or supporting paperwork.' },
    { name: 'Completion Notes', ...notes('Post-event completion and client notes.') },
  ],
}, tables);

const leads = await ensureTable({
  name: 'Leads / Inquiries',
  description: 'Private website, phone, and referral inquiries. Exact field names match the website inquiry writer.',
  fields: [
    { name: 'Client / Contact Name', ...text('Name submitted through the website or captured by phone.') },
    { name: 'Date Received', ...date(), description: 'Date the inquiry arrived.' },
    { name: 'Email', type: 'email', description: 'Private inquiry email address.' },
    { name: 'Phone', type: 'phoneNumber', description: 'Private inquiry phone number.' },
    { name: 'Event Date', ...date(), description: 'Requested event date.' },
    { name: 'Type of Event', ...select(inquiryServiceChoices), description: 'Canonical event/service label written by the website form.' },
    { name: 'Service Requested', ...multiSelect(inquiryServiceChoices), description: 'One or more requested services.' },
    { name: 'Estimated Guest Count / PAX', ...wholeNumber(), description: 'Expected guest count submitted through the website.' },
    { name: 'Message / Inquiry Notes', ...notes('Website message, children expected, and intake notes.') },
    { name: 'Source / Found Us Through', ...select(leadSourceChoices), description: 'Website, phone, referral, or marketing source.' },
    {
      name: 'Lead Status',
      ...select([
        ['New', 'blueLight2'],
        ['Contacted', 'cyanLight2'],
        ['Quote Sent', 'yellowLight2'],
        ['Follow-Up', 'orangeLight2'],
        ['Booked', 'greenLight2'],
        ['Not Booked', 'redLight2'],
        ['Archived', 'grayLight2'],
      ]),
      description: 'Current sales and follow-up state.',
    },
    { name: 'Booking Owner', ...select(ownerChoices), description: 'All booking inquiries are coordinated through Brenton Keith.' },
    { name: 'Follow-Up Date', ...date(), description: 'Next date Brenton should contact this lead.' },
    { name: 'Follow-Up Notes', ...notes('Next action and follow-up history.') },
    { name: 'Organization / Company', ...text('Organization or company from the legacy intake workflow.') },
    { name: 'Mailing Address', ...notes('Optional mailing address from a paper or phone intake.') },
    { name: 'Partner / Secondary Contact', ...text('Partner, assistant, planner, or secondary contact.') },
    {
      name: 'Converted Client',
      type: 'multipleRecordLinks',
      options: { linkedTableId: clients.id },
      description: 'Client record created when the inquiry books.',
    },
    {
      name: 'Converted Booking',
      type: 'multipleRecordLinks',
      options: { linkedTableId: bookings.id },
      description: 'Booking record created when the inquiry books.',
    },
  ],
}, tables);

await ensureFields(bookings, [
  {
    name: 'Source Lead',
    type: 'multipleRecordLinks',
    options: { linkedTableId: leads.id },
    description: 'Original inquiry that became this booking.',
  },
]);

const publicEvents = await ensureTable({
  name: 'Public Events',
  description: 'Safe public show announcements. Only records explicitly checked Published are allowed onto rainingentertainment.com.',
  fields: [
    { name: 'Title', ...text('Public-facing show title.') },
    { name: 'Public Key', ...text('Stable key used to avoid duplicate seeded shows, such as mulligans-recurring.') },
    { name: 'Performer', ...text('Public performer or act name.') },
    { name: 'Start', ...dateTime(), description: 'Public start date and time in Hawaiʻi time.' },
    { name: 'End', ...dateTime(), description: 'Optional public end date and time.' },
    { name: 'Recurrence Label', ...text('Examples: Every Thursday, One night only.') },
    { name: 'Date Label', ...text('Human-readable date label used on the website.') },
    { name: 'Time Label', ...text('Human-readable time label used on the website.') },
    { name: 'Doors', ...text('Doors or pre-show arrival information.') },
    { name: 'Venue', ...text('Public venue name only.') },
    { name: 'Venue URL', type: 'url', description: 'Official venue website.' },
    {
      name: 'Type',
      ...select([
        ['Public', 'blueLight2'],
        ['Ticketed', 'orangeLight2'],
        ['Private', 'grayLight2'],
      ]),
      description: 'Private records are masked by the website API.',
    },
    { name: 'Price', ...text('Human-readable ticket or admission price.') },
    { name: 'Description', ...notes('Public event description. Never place private client details here.') },
    { name: 'Booking URL', type: 'url', description: 'Reservation or ticket link.' },
    { name: 'Image', type: 'multipleAttachments', description: 'Public show photo uploaded directly to Airtable.' },
    { name: 'Image URL', type: 'url', description: 'Permanent rainingentertainment.com media URL.' },
    { name: 'Tag', ...text('Short badge such as Weekly Maui Show.') },
    { name: 'Published', ...checkbox(), description: 'The website reads only checked records.' },
    {
      name: 'Source Booking',
      type: 'multipleRecordLinks',
      options: { linkedTableId: bookings.id },
      description: 'Optional private booking source; never exposed publicly.',
    },
  ],
}, tables);

const casinoPackages = await ensureTable({
  name: 'Casino Packages',
  description: 'Public Casino NITE package details. Only records explicitly checked Published appear on the website.',
  fields: [
    { name: 'Package Name', ...text('Public package name.') },
    { name: 'Slug', ...text('Stable lowercase URL-style key, such as classic-casino-nite.') },
    { name: 'Price', ...money(), description: 'Public package price before tax.' },
    { name: 'Tax Label', ...text('Short suffix shown beside the price, such as + tax.') },
    { name: 'Badge', ...text('Optional badge, such as Most Popular.') },
    {
      name: 'Accent',
      ...select([
        ['classic', 'greenLight2'],
        ['deluxe', 'blueLight2'],
        ['full', 'redLight2'],
      ]),
      description: 'Visual card style on the website.',
    },
    { name: 'Inclusions', ...notes('One public inclusion per line.') },
    { name: 'Sort Order', ...wholeNumber(), description: 'Lower numbers appear first.' },
    { name: 'Published', ...checkbox(), description: 'The website reads only checked records.' },
  ],
}, tables);

const moments = await ensureTable({
  name: 'Moments',
  description: 'Curated social/gallery items approved for the public website.',
  fields: [
    { name: 'Caption', ...text('Short public caption.') },
    { name: 'Image', type: 'multipleAttachments', description: 'Public photo uploaded directly to Airtable.' },
    { name: 'Image URL', type: 'url', description: 'Permanent public image URL.' },
    { name: 'Post URL', type: 'url', description: 'Original Instagram or social post.' },
    { name: 'Account', ...text('Account handle, such as @magicbrent or @cirquejolie.') },
    { name: 'Alt Text', ...notes('Accessible description of the image.') },
    { name: 'Service', ...select(serviceChoices), description: 'Service represented in this moment.' },
    { name: 'Sort Order', ...wholeNumber(), description: 'Lower numbers appear first.' },
    { name: 'Published', ...checkbox(), description: 'The website reads only checked records.' },
  ],
}, tables);

const websiteUpdates = await ensureTable({
  name: 'Website Updates',
  description: 'Plain-language queue for prices, announcements, copy, links, and media updates. This table is not read automatically by the public website yet.',
  fields: [
    { name: 'Update', ...text('Short name for the requested website change.') },
    {
      name: 'Website Area',
      ...select([
        ['Site-wide', 'grayLight2'],
        ['Home', 'blueLight2'],
        ['Upcoming Shows', 'orangeLight2'],
        ['Magic', 'cyanLight2'],
        ['Game Show NITE', 'orangeBright'],
        ['Casino NITE', 'redLight2'],
        ['Stilt Walkers', 'purpleLight2'],
        ['LED Performers', 'cyanBright'],
        ['Balloon Twisting & Face Painting', 'greenLight2'],
        ['Balloon Decor', 'pinkLight2'],
        ['Face Painting', 'yellowLight2'],
        ['Corporate', 'blueBright'],
        ['About', 'purpleBright'],
        ['Contact', 'tealLight2'],
      ]),
      description: 'Page or site area affected.',
    },
    {
      name: 'Update Type',
      ...select([
        ['Announcement', 'orangeLight2'],
        ['Price', 'greenLight2'],
        ['Package', 'blueLight2'],
        ['Copy', 'grayLight2'],
        ['Photo', 'pinkLight2'],
        ['Video', 'purpleLight2'],
        ['Link', 'cyanLight2'],
        ['SEO', 'yellowLight2'],
        ['Other', 'grayBright'],
      ]),
      description: 'Kind of website change requested.',
    },
    { name: 'Public Value / Price', ...text('Visitor-facing value, price, or short label.') },
    { name: 'Headline', ...text('Proposed visitor-facing headline.') },
    { name: 'Draft Copy / Update Notes', ...notes('Proposed copy and plain-language instructions.') },
    { name: 'Asset', type: 'multipleAttachments', description: 'Photo, video, PDF, or reference asset for the update.' },
    { name: 'Asset URL', type: 'url', description: 'Permanent public asset or source URL.' },
    { name: 'Target Page', ...text('Target page path or URL, such as /magic.') },
    { name: 'Requested Publish Date', ...date(), description: 'Preferred date for the website change.' },
    {
      name: 'Status',
      ...select([
        ['Draft', 'grayLight2'],
        ['Approved', 'greenLight2'],
        ['Applied to Website', 'blueLight2'],
        ['Archived', 'grayBright'],
      ]),
      description: 'Workflow state. Approved does not publish automatically.',
    },
    {
      name: 'Website Wiring',
      ...select([
        ['Not live-wired', 'grayLight2'],
        ['Use Public Events', 'orangeLight2'],
        ['Use Casino Packages', 'redLight2'],
        ['Use Moments', 'purpleLight2'],
      ]),
      description: 'Where to make the live change. Website Updates itself is not a public feed.',
    },
    { name: 'Owner', ...select(ownerChoices), description: 'Brenton is the website-update owner and final approver.' },
    { name: 'Last Reviewed', ...date(), description: 'Date this update was last reviewed.' },
  ],
}, tables);

const performances = await ensureTable({
  name: 'Performances',
  description: 'One row per performance line from the legacy paper booking sheet.',
  fields: [
    { name: 'Performance', ...text('Example: Game Show NITE — 7:00 PM.') },
    {
      name: 'Booking',
      type: 'multipleRecordLinks',
      options: { linkedTableId: bookings.id },
      description: 'The event or booking this performance belongs to.',
    },
    { name: 'Sequence', ...wholeNumber(), description: 'Performance order within the event.' },
    { name: 'Service', ...select(serviceChoices), description: 'Booked entertainment service.' },
    { name: 'Performer', ...multiSelect(performerChoices), description: 'Assigned performers.' },
    { name: 'Start Time', ...dateTime(), description: 'Performance start in Hawaiʻi time.' },
    { name: 'Duration (Minutes)', ...wholeNumber(), description: 'Planned performance length.' },
    { name: 'Fee', ...money(), description: 'Fee allocated to this performance.' },
    { name: 'Notes', ...notes('Performance-specific production notes.') },
  ],
}, tables);

const transactions = await ensureTable({
  name: 'Transactions',
  description: 'Simple booking-level payments and expenses; not a replacement for tax accounting software.',
  fields: [
    { name: 'Transaction', ...text('Example: Smith wedding deposit.') },
    {
      name: 'Booking',
      type: 'multipleRecordLinks',
      options: { linkedTableId: bookings.id },
      description: 'Related event or booking.',
    },
    { name: 'Date', ...date(), description: 'Transaction date.' },
    {
      name: 'Type',
      ...select([
        ['Payment', 'greenLight2'],
        ['Expense', 'redLight2'],
        ['Refund', 'orangeLight2'],
      ]),
      description: 'Money in, money out, or refund.',
    },
    {
      name: 'Category',
      ...select([
        ['Deposit', 'greenLight2'],
        ['Final Payment', 'tealLight2'],
        ['Performer', 'purpleLight2'],
        ['Equipment', 'blueLight2'],
        ['Travel', 'orangeLight2'],
        ['Supplies', 'yellowLight2'],
        ['Tax', 'redLight2'],
        ['Other', 'grayLight2'],
      ]),
      description: 'Simple reporting category.',
    },
    { name: 'Amount', ...money(), description: 'Enter a positive amount; Type controls meaning.' },
    {
      name: 'Method',
      ...select([
        ['Cash', 'greenLight2'],
        ['Check', 'grayLight2'],
        ['Credit Card', 'blueLight2'],
        ['Venmo', 'cyanLight2'],
        ['Bank Transfer', 'tealLight2'],
        ['Other', 'orangeLight2'],
      ]),
      description: 'Payment method.',
    },
    { name: 'Reference', ...text('Invoice, receipt, check, or transfer reference.') },
    { name: 'Notes', ...notes('Internal transaction notes.') },
    { name: 'Receipt', type: 'multipleAttachments', description: 'Receipt or payment proof.' },
    { name: 'Tax Deductible', ...checkbox(), description: 'Flag for later accountant review.' },
  ],
}, tables);

await seedCasinoPackages(casinoPackages);
await seedMulligansShow(publicEvents);

console.log(`Airtable setup ${DRY_RUN ? 'planned' : 'complete'} for base ${ACTIVE_BASE_ID}.`);
console.log(
  `Website tables: ${publicEvents.name}, ${moments.name}, ${casinoPackages.name}, ${websiteUpdates.name}. ` +
    `Operations tables: ${bookings.name}, ${performances.name}, ${transactions.name}, ${clients.name}, ${leads.name}.`,
);
console.log('Website Updates is a work queue, not a public API. Public publishing remains limited to Public Events, Moments, and Casino Packages.');
console.log('Manual Airtable step: add the two formula fields and the optional Brenton notification automation documented in docs/airtable-setup.md.');
