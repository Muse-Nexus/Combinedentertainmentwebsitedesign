# Google platform readiness and legacy-domain migration

Date: 2026-08-12
Status: code wired and live consoles audited; new-brand provider setup, collection, indexing, profile update, and redirects not yet activated

## What is now wired in source

- Crawlable route-specific HTML for 15 sitemap pages, plus two intentional noindex routes, with unique titles, descriptions, canonicals, Open Graph tags, and JSON-LD where appropriate.
- Canonical `robots.txt`, `sitemap.xml`, branded 404 output, and build verification that prevents route/redirect shadowing.
- Preview builds render `noindex, nofollow`; production builds remain indexable.
- Optional Search Console HTML-tag verification via `VITE_GOOGLE_SITE_VERIFICATION`.
- Consent-gated GA4 via `VITE_GOOGLE_ANALYTICS_ID`. No Google network script loads before consent.
- Manual SPA `page_view` plus `service_cta_click`, `generate_lead`, `contact_click`, and `social_click` events.
- Landing-page attribution preserves a bounded allowlist of UTM and Google click parameters while discarding all other query fields; generic Contact navigation is excluded from the service-CTA event.
- Inquiry analytics contain only the selected service and lead source—never name, email, phone, message, event date, or other form content.
- `generate_lead` fires only on the API's HTTP 201 Airtable-write success; the bot-honeypot HTTP 202 acknowledgement is deliberately excluded.
- Google Consent Mode v2 defaults all four storage/user-data choices to denied. Accepting optional analytics grants only `analytics_storage`; advertising storage, advertising user data, personalization, and Google signals remain denied.
- Organization/service schema includes the confirmed public telephone, email, social profiles, Maui/Hawaii base, and United States travel availability. It deliberately does not invent a street address or claim `LocalBusiness` rich-result eligibility.
- A plain-language `/privacy` notice explains booking data, optional analytics, cookies, providers, and how to reopen privacy choices.

## Read-only live-console findings on 2026-08-12

These are current-account receipts from `mark@sadmuse.com`, not assumptions from source code:

- **Search Console:** the account has only an `http://cirquejolie.com/` URL-prefix property for the two legacy domains named in this phase. It showed 0 clicks and 0 impressions for May 10–August 9, 2026. The live site resolves over HTTPS, so this property does not cover the current canonical protocol. No `magicbrent.com` or `rainingentertainment.com` property was present.
- **GA4:** the account has `Magic Brent` (property 304043008) and `cirquejolie.com - GA4` (property 368203672), but no Raining Entertainment property. For the last seven days at audit time, Magic Brent showed 0 active users, 0 events, and 0 key events; Cirque Jolie showed 10 active users, 50 events, and 0 key events. These counts are a dated snapshot, not a launch baseline.
- **Google Business Profile:** the verified service-area profile `Brenton Keith & His Bag O' Tricks` is managed in the account, reports a complete profile, uses the category `Entertainer`, shows a 5.0 rating across 389 reviews, and currently links to `http://www.magicbrent.com/`. Its public phone is `(808) 870-2102` and its service area is Maui County. No separate Cirque Jolie or Raining Entertainment profile was visible.

No property, stream, profile, DNS record, or redirect was created or changed during this audit.

## What “fully wired” still does not prove

A source ID is configuration evidence, not proof that a provider is client-owned, consent is functioning, the browser delivered requests, Google accepted events, Search Console verified ownership, pages indexed, or leads were attributed. Each lane needs its own receipt.

## GA4 and Google tag activation

1. In a Google account owned by Brenton/Jolie or their business, create one GA4 property for Raining Entertainment and one production web stream for `https://www.rainingentertainment.com`. Preserve the two legacy properties and their history; do not repurpose or delete them.
2. Grant durable administrator access to the client and bounded working access to the implementer. Do not leave the property solely in a contractor account.
3. Add the `G-...` measurement ID as the Vercel **Production-only** value of `VITE_GOOGLE_ANALYTICS_ID`. A preview may use a separate test stream, never the production stream by accident.
4. In the GA4 web stream, turn off automatic page changes based on browser-history events because the application sends manual SPA page views. Leaving both enabled can double count.
5. Mark `generate_lead` as a key event. Register useful event-scoped custom dimensions only where reporting needs them: `service`, `contact_method`, and `social_network`.
6. Verify before launch:
   - before consent: no request for `gtag/js` or GA collection;
   - after consent: one script load and exactly one `page_view` per route;
   - service booking CTA: `service_cta_click` with the expected service;
   - successful staging inquiry: `generate_lead` only after the API's HTTP 201 Airtable-write response and a matching Airtable/notification receipt; the honeypot's HTTP 202 must remain silent;
   - phone and email: `contact_click` with method only;
   - Instagram: `social_click` with network and outbound path;
   - revoke analytics: consent updates to denied and first-party GA cookies are removed.
7. Retain Tag Assistant, browser network, DebugView, Realtime, and provider screenshots/exports as separate receipts. Standard GA4 reporting may take longer than Realtime.

## Search Console and indexing

1. Create and verify the DNS Domain properties for:
   - `rainingentertainment.com`;
   - `magicbrent.com`;
   - `cirquejolie.com`.
2. Keep the HTML-tag env support as a fallback for the canonical URL-prefix property, but prefer DNS Domain verification so apex, `www`, HTTP, and HTTPS variants are covered.
3. On the reviewed production release, confirm with URL Inspection that `/`, `/magic`, `/cirque-jolie`, `/balloon-twisting`, `/strolling`, `/led-performers`, `/casino`, and `/game-show` return their own server-delivered metadata and render successfully.
4. Submit `https://www.rainingentertainment.com/sitemap.xml`; record the submitted/accepted counts and monitor indexed/non-indexed reasons.
5. Export query/page/device/country data from the old Search Console properties before redirect activation. This is the evidence needed to preserve valuable queries and to decide whether overlapping pages such as `/face-painting` should remain separate.
6. Do not promise rankings or instant signal transfer. Monitor coverage, canonical selection, clicks, impressions, and crawl errors after the move.

## Google Business Profile and local search

1. Use the existing verified `Brenton Keith & His Bag O' Tricks` service-area profile as the starting point. Record its durable owners and profile URL; do not create a duplicate merely to rename the umbrella brand.
2. Confirm whether the real-world public name should remain the Brenton brand or can legitimately transition to Raining Entertainment, then confirm secondary categories, hours, service areas, and services. Treat a business-name change as a client decision, not launch cleanup. Do not publish a residential address merely to satisfy schema.
3. Make the profile website URL the canonical site with a bounded campaign tag, for example `https://www.rainingentertainment.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp`, after the new site is production-ready.
4. Keep the approved public name, phone `(808) 870-2102`, Maui service area, and website consistent across the site, Business Profile, social profiles, and important citations.
5. Add the verified Business Profile/Maps URL to structured data only after the exact profile is confirmed. Validate production markup with Google's Rich Results Test and Schema Markup Validator.
6. Refresh the profile's photos and services—the console says its last photo addition was 1,822 days ago—then confirm booking link, social profiles, Q&A, and review-response ownership. Do not fabricate reviews or self-serving aggregate-rating markup.

## Legacy-domain migration: `magicbrent.com` and `cirquejolie.com`

Current live evidence on 2026-08-12:

- `magicbrent.com` is still a Wix site and exposes one home URL plus 186 event URLs in its sitemaps.
- `cirquejolie.com` is still a WordPress/Flywheel site and exposes 12 sitemap URLs.
- Neither domain currently redirects to Raining Entertainment.
- `rainingentertainment.com` is already on Vercel, but the audio-closeout build is not yet the canonical production deployment.

Migration sequence:

1. Export each old site, media library, database/content, current sitemaps, analytics history, Search Console data, DNS zone, and domain-hosting ownership details.
2. Freeze a source-URL inventory and assign a one-to-one final destination or intentional `410 Gone`. Never blanket-redirect unrelated/expired URLs to the new home page.
3. Use two small independent redirect-only projects—one per legacy brand/domain. This keeps host ownership, rollback artifacts, logs, and future decoupling cleaner than burying host rules inside the primary app.
4. Cover HTTP/HTTPS and apex/`www` variants in one server-side hop to the final canonical URL. Preserve harmless campaign query parameters and strip obsolete form tokens where appropriate.
5. Test every sitemap URL plus representative non-sitemap URLs before DNS cutover. Required receipts: source, status, Location, final status, final canonical, redirect-hop count, and loop/chain detection.
6. Activate only after the new production pages are approved, crawlable, verified in Search Console, and the exact mappings in `docs/legacy-redirect-map.md` are signed off.
7. Submit Change of Address for every applicable verified old variant. Keep old properties and redirect logs available for monitoring.
8. Keep 301 redirects for as long as possible and at least one year. Retain private rollback copies; do not leave duplicate public sites indexable.

## Release gates and receipts

### Private preview gate

- Noindex HTML verified on every route.
- Cloud wipe, hero, menu, galleries, contact form states, and responsive layout approved.
- No analytics production ID, production DNS change, Search Console submission, GBP mutation, or legacy redirect.

### Canonical production gate

- Approved commit and deployment URL recorded.
- Canonical routes, metadata, robots, sitemap, 404, and structured data rechecked on the actual host.
- GA consent/network/DebugView/Realtime receipts captured.
- One labeled staging inquiry matched across UI, API, Airtable, and notification delivery.
- Search Console ownership and sitemap submission confirmed.
- Business Profile ownership and canonical contact facts confirmed.

### Legacy migration gate

- Archives and URL inventories complete.
- Exact mappings approved and tested in the redirect-only previews.
- DNS owners and rollback steps known.
- Change of Address access confirmed.
- Post-cutover monitoring owner and cadence assigned.

Until these receipts exist, the accurate status is **implementation-ready, not Google-live and not migrated**.
