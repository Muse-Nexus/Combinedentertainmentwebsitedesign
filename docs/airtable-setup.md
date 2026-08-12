# Raining Entertainment Booking Hub

The Airtable base is the private, spreadsheet-style operating hub for Brenton and Jolie. It keeps website inquiries, clients, bookings, individual performances, payments and expenses, public show announcements, Casino NITE packages, and curated website photos in one place.

The setup is additive and idempotent:

- it creates missing tables and fields;
- it never deletes tables, fields, or records;
- it never overwrites an existing Casino NITE package or public-show record;
- it preserves all existing rows in the base; and
- it warns instead of changing an existing field whose Airtable type is incompatible.

## Tables managed by the setup

Private operating tables:

- `Leads / Inquiries` — exact fields used by the website contact form, plus Brenton ownership and follow-up.
- `Clients` — reusable contacts, organizations, phone/email, mailing address, and secondary contact.
- `Events / Bookings` — the event-level job sheet modeled on the photographed paper booking form.
- `Performances` — one linked row for every act or performance time in a booking.
- `Transactions` — deposits, final payments, refunds, and event expenses.

Public-content and update tables:

- `Public Events` — the only table used to publish live-show announcements.
- `Casino Packages` — the published Casino NITE names, prices, badges, and inclusions shown on `/casino`.
- `Moments` — the curated photo/social cards shown in the homepage Latest Moments section.
- `Website Updates` — a plain-language work queue for other announcements, prices, copy, links, photos, videos, and SEO requests. This table is **not** automatically published today.

## Public/private boundary

Private `Leads / Inquiries`, `Clients`, `Events / Bookings`, `Performances`, and `Transactions` records are never read by the public-content APIs.

To advertise a show, create or review a separate `Public Events` record and check `Published`. Its optional `Source Booking` link may point back to a private booking, but the website API never returns that link or any client details. A `Private` public-event row is additionally masked by the API, but private client details should still never be copied into public fields.

`Website Updates` is deliberately a work queue rather than a public feed. Checking or changing its workflow status cannot accidentally publish private notes.

## Preview the migration without credentials

The offline dry run simulates an empty base and makes no network calls:

```sh
npm run airtable:setup -- --dry-run
```

Use it to syntax-check the script and review every table plus seed that a fresh setup would create. It does not inspect or modify the live base.

## Apply the migration

Create a temporary personal access token limited to the `Raining Entertainment Booking Hub` base with these scopes:

- `data.records:read`
- `data.records:write`
- `schema.bases:read`
- `schema.bases:write`

Then run:

```sh
AIRTABLE_ACCESS_TOKEN="..." AIRTABLE_BASE_ID="..." npm run airtable:setup
```

Schema-write access is needed only while the setup script adds tables and fields. The deployed website needs record read/write access but never needs schema-write access.

Re-running the setup is safe. If a required field already exists under the same name, it is retained. If its type differs, the script prints a warning and leaves it unchanged so a human can review it without risking existing data.

## Legacy booking-sheet mapping

| Paper booking sheet | Airtable destination |
| --- | --- |
| Show date or multi-day engagement | `Events / Bookings` → `Show Date`, `End Date`, and `Additional Event Dates / Schedule` |
| Show location and venue | `Show Location` and `Venue` |
| Type of event and theme | `Type of Event` and `Theme` |
| Each performance and its time | one linked row in `Performances` |
| Overall time of party | `Party Time` |
| Name of contact | linked `Clients` row → `Client / Contact Name` |
| Partner or secondary contact | `Clients` → `Partner / Secondary Contact` |
| Phone and email | `Clients` → `Phone` and `Email` |
| Mailing address | `Clients` → `Mailing Address` |
| Organization/company | `Clients` → `Organization / Company` |
| PAX and ages | `Estimated PAX` and `Guest Ages / Audience Mix` |
| Access, advertising, sound, and lighting | `Access / Load-In Notes`, `Advertising / Promotion`, and `Sound & Lighting` |
| Meal, green room, and other negotiations | `Hospitality / Meal / Green Room` and `Negotiation Notes` |
| Fee, tax, travel, total, and deposit | booking money fields in `Events / Bookings` |
| Found through | `Lead Source` or `Source / Found Us Through` |
| Today’s date | `Date Prepared` |
| Follow-up | `Follow-Up Date` and `Follow-Up Notes` |
| Payments, refunds, performer costs, travel, equipment, supplies | linked rows in `Transactions` |

The setup also guarantees every exact field name currently written by `/api/inquiries`: `Date Received`, `Client / Contact Name`, `Email`, `Phone`, `Event Date`, `Type of Event`, `Service Requested`, `Estimated Guest Count / PAX`, `Message / Inquiry Notes`, `Source / Found Us Through`, and `Lead Status`.

## Manual formulas

Add these two formula fields manually in `Events / Bookings` after setup:

| Field | Airtable type | Formula |
| --- | --- | --- |
| `Balance Due` | Formula | `MAX(0, {Total Event Fee} - {Deposit Amount})` |
| `Net Event Income` | Formula | `{Total Event Fee} - {Expenses Total}` |

These are convenience calculations. `Deposit Amount` and `Expenses Total` remain explicit booking fields; this setup does not build transaction rollups or replace accounting/tax software.

## Brenton's working flow

1. A website form creates a `New` row in `Leads / Inquiries`.
2. Set `Booking Owner` to `Brenton Keith`, choose a `Follow-Up Date`, and keep the next action in `Follow-Up Notes`.
3. When a lead books, create or link its `Converted Client` and `Converted Booking` records.
4. Add one `Performances` row for each separate show line and performance time.
5. Record deposits, final payments, refunds, and expenses as linked `Transactions`.
6. To announce a public show, create a separate `Public Events` row, review only its public fields, and check `Published`.

The setup script does not create field defaults or account-specific automations, so existing and newly submitted leads may initially have a blank `Booking Owner`. Recommended Airtable automation:

1. Trigger: when a record is created in `Leads / Inquiries`.
2. Update that record: set `Booking Owner` to `Brenton Keith`.
3. Notify Brenton that a new inquiry needs review.

A simple `Needs Follow-Up` view should filter out `Booked`, `Not Booked`, and `Archived`, then sort by `Follow-Up Date` ascending.

## What Brenton can update on the live website today

| Airtable table | Live website behavior |
| --- | --- |
| `Public Events` | Live-wired to `/api/events` and the `/upcoming-shows` page. Only `Published` rows are read. |
| `Casino Packages` | Live-wired to `/api/packages` and the package cards on `/casino`. Only `Published` rows are read. |
| `Moments` | Live-wired to `/api/moments` and the homepage Latest Moments section. Only `Published` rows are read. |
| `Leads / Inquiries` | Live-wired as a private input: the contact form writes new leads, but no lead data is displayed publicly. |
| `Website Updates` | Not live-wired. It records approved requests for other service prices, page copy, announcements, media, links, and SEO. A code update and deployment are still required. |
| All other private tables | Never read by the public website. |

The `Website Wiring` field tells Brenton where a change belongs:

- use `Public Events` for a live-show announcement;
- use `Casino Packages` for a Casino NITE package or price;
- use `Moments` for a homepage gallery item; or
- use `Not live-wired` for other service pricing, page copy, hero/gallery media, video, links, or SEO work.

Changing a `Website Updates` row to `Approved` does not publish it. Change its status to `Applied to Website` only after the corresponding live table or website code has actually been updated.

## Seeded records

On the first run only, the script adds these records when no matching slug, key, or title already exists:

- Classic Casino NITE
- Deluxe Casino NITE
- Full Casino Experience
- The Mulligan's Magic Show as a published recurring Thursday listing

Existing records are never patched or reset. Edit the seeded public records normally after setup; later script runs preserve those edits.

Keep Casino package `Slug` values and the Mulligan record's `Public Key` stable because they prevent duplicate seeds.

## Recommended Airtable Interface

The script creates tables and fields, not an Airtable Interface. For a nontechnical daily workspace, create an Interface with these plainly named pages:

- `New Inquiries`
- `Needs Follow-Up`
- `New Booking Sheet`
- `Bookings Calendar`
- `Clients`
- `Money In & Out`
- `Publish a Live Show`
- `Casino NITE Prices`
- `Homepage Photos`
- `Other Website Updates`

This is why the underlying tables may exist while the intended day-to-day controls are not immediately obvious in Airtable.

## Publishing shows, packages, and moments

For a one-time public show, fill `Start` and optionally `End`. For a weekly listing, leave `Start` blank and use `Recurrence Label`, such as `Every Thursday`. `Date Label` and `Time Label` allow exact visitor-facing wording.

For Casino NITE, edit the package name, numeric pre-tax price, short tax label, badge, accent, and one-per-line inclusions. `Sort Order` controls card order. Keep `Slug` stable and check `Published` only when ready.

For `Moments`, upload an image or provide a permanent image URL, write a short caption and alt text, add the original social post URL if desired, choose the service, and check `Published`. These approved records are now the first fallback behind the Meta-powered live Instagram feed; they remain useful whenever credentials expire or a post should be held back from the automatic feed.

Public API responses are cached briefly, so live-table changes normally appear on the website within about five minutes.

## Vercel configuration

Set these server-only values in both Production and Preview:

```text
AIRTABLE_ACCESS_TOKEN=pat...
AIRTABLE_BASE_ID=app...
AIRTABLE_EVENTS_TABLE=Public Events
AIRTABLE_MOMENTS_TABLE=Moments
AIRTABLE_PACKAGES_TABLE=Casino Packages
AIRTABLE_INQUIRIES_TABLE=Leads / Inquiries
```

The earlier `AIRTABLE_PAT` and `AIRTABLE_TABLE_ID` names remain supported for backward compatibility. Never create a `VITE_AIRTABLE_*` variable; Vite variables are bundled into public browser code. Redeploy after changing Vercel environment variables.

Optional `AIRTABLE_EVENTS_VIEW`, `AIRTABLE_MOMENTS_VIEW`, and `AIRTABLE_PACKAGES_VIEW` values can restrict public reads to named views, but the APIs still require the `Published` checkbox.

## Failure behavior and exports

- `/api/events`, `/api/moments`, and `/api/packages` return `503` when Airtable is unavailable; the site continues to show its checked-in schedule, gallery, and Casino NITE packages.
- `/api/inquiries` validates and trims fields, rejects cross-origin posts, uses a honeypot and a lightweight per-instance rate limit, and protects later CSV/Excel exports from formula-like text.
- Vite's regular `npm run dev` server does not emulate Vercel Functions. Use `vercel dev` for local `/api/*` testing with credentials in an ignored `.env.local` file.

For an Excel/Numbers handoff, export a view or table as CSV. Keep Airtable record links and IDs in the source base so leads, clients, bookings, performances, and transactions stay connected.

The CSV files in `docs/airtable-templates` are retained only as manual bootstrap or disaster-recovery references. The live base should be evolved with `npm run airtable:setup`.
