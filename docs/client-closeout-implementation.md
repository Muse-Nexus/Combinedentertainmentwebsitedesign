# Raining Entertainment closeout implementation and release plan

Date: 2026-08-12

## Outcome

The August 5 client voice memo has been implemented as the authority over older email notes. The site now uses the client-selected email imagery throughout the relevant service pages, preserves the rain/umbrella experience, and replaces the synthetic home hero with an authentic Brenton-and-Jolie photograph from the older site library. The source hero photo is not reused in an inner-page gallery.

No production deployment, external form submission, analytics-provider activation, client email, DNS change, legacy-domain redirect, or production configuration change was made during this pass. A noindex Vercel preview is the only authorized publication target.

## Implemented

- Preserved the rain, logo, umbrella opening, rainbow, service-discovery, replay, reduced-motion, and final-home experiences.
- Replaced the malformed cloud screenshot asset with one purpose-built cloud bank, a single-image sweep, a broad radial mask, and soft blur so the wipe has no hard or geometric edges.
- Made the standard home logo replay the scroll intro when it is clicked from the final home state.
- Replaced the synthetic hero and red edge artifact with real Brenton-and-Jolie desktop/mobile hero derivatives.
- Reworked the umbrella menu with larger title-case labels and a separate `Planning a corporate event? Start here` path.
- Renamed the customer-facing service to `Stilt Walkers` everywhere that feeds production.
- Added exactly one canonical service page: `/led-performers`.
- Removed the Additional Services page from production, navigation, footer, metadata, generated HTML, and sitemap; `/additional-services` now redirects to `/contact`.
- Removed Jolie fire offerings and obsolete children-magic/live-bunny/training claims while preserving Brenton's legitimate magic-with-fire copy.
- Rebuilt Balloon Twisting & Face Painting around the two requested services, balanced client-selected galleries, broad event fit, and the Brenton magic cross-sell.
- Removed the entire `What's Included` block, matching the audio rather than the earlier softened acceptance wording.
- Added all 28 Balloon Decor selections to an accessible lightbox gallery.
- Rebuilt Stilt Walkers around the preferred client photos and separated LED into its own focused page.
- Updated About with Jolie's selected shaka photo and removed unsupported performer claims.
- Added Brenton's selected Christmas poker-table image plus five additional distinct July-email photos to an accessible Casino NITE gallery.
- Kept Casino NITE and Game Show NITE/LITE distinct.
- Added service-aware booking links so the inquiry form opens with the correct service selected; invalid query values fail safely.
- Removed unreachable legacy page/editor code and the unused drag-and-drop runtime.
- Updated route metadata, structured data, sitemap, redirects, Airtable setup choices, inquiry normalization, and fallback content together.
- Added automated reciprocal sitemap checks, redirect-shadow checks, internal-route checks, media-reference checks, approved-asset counts, and forbidden-claim checks.
- Updated compatible dependencies until the production dependency audit reported zero known vulnerabilities.
- Added consent-gated GA4 wiring for manual SPA page views, service CTA clicks, successful inquiries, phone, email, and social clicks without sending inquiry PII.
- Added a persistent privacy-choice control, with all advertising storage and personalization remaining denied.
- Added a factual privacy-and-analytics notice and excluded bot-honeypot acknowledgements from `generate_lead` reporting.
- Added build-time Search Console HTML-tag verification support, consistent public phone/contact schema, and environment-aware preview `noindex` behavior.
- Audited the live Search Console, GA4, and Google Business Profile account state without changing it; the exact gaps and dated receipts are in `docs/google-platform-readiness.md`.

## Verified locally

- Production build passes with 15 canonical sitemap pages, two intentional noindex pages, and branded 404 output.
- Content verifier passes for 26 routable paths, 122 referenced media files, and all 68 optimized client-selected derivatives.
- Browser QA passes at desktop and mobile sizes with no console warnings/errors, no error overlay, no broken images, and no horizontal overflow.
- Responsive checks pass at 360, 390, 768, 1024, 1280, and 1440 CSS pixels. Tablets use the focused one-card discovery sequence; the complete seven-card sequence is legible from 1024px upward.
- The cloud wipe was inspected at multiple scroll positions after moving the feather mask onto the traveling image; no viewport-sized crop edge remains.
- With a dummy local GA4 stream ID, the browser recorded no Google script before consent, one consent update after opt-in, and exactly one manual `page_view` for each tested SPA route.
- Gallery lightboxes open from the keyboard, trap focus, close with Escape, restore focus, and restore body scrolling.
- `/contact?service=led-performers` preselects LED Performers; an unknown service leaves the form unselected.
- `/additional-services` resolves to the current contact page in the application, and the build verifier confirms the hosting redirect is not shadowed by generated HTML.
- `npm audit --omit=dev` reports zero known vulnerabilities.

## Release sequence requiring external authority or receipts

1. Create a private preview deployment and visually approve the authentic seasonal hero crop with Brenton and Jolie. If they prefer an evergreen hero, request one landscape and one portrait photo of both owners rather than fabricating a composite.
2. Submit one clearly labeled staging inquiry and confirm the resulting Airtable record and any notification receipt. Do not claim the form is operational from source code alone.
3. Create or confirm the client-owned GA4 property and production web stream, set `VITE_GOOGLE_ANALYTICS_ID` only in production, disable GA4 history-change page views to prevent double counting, and verify each implemented event in Tag Assistant, DebugView, Realtime, and network receipts.
4. Run a final client content review on the private preview, especially the About biography, seasonal hero, service names, and the separation of Stilt Walkers from LED Performers.
5. After approval, deploy the reviewed commit, smoke-test the canonical routes and redirect on the real domain, submit the updated sitemap, and retain the deployment URL and production receipts in the closeout record.
6. Complete the Search Console, Business Profile, and legacy-domain migration gates in `docs/google-platform-readiness.md`; do not confuse code readiness with provider ownership or collection proof.

## Optional send-off polish after approval

- Schedule a short evergreen Brenton-and-Jolie hero photo session using the existing desktop/mobile composition brief.
- Add a small, provider-backed event dashboard only after production analytics collection is verified.
- Refresh social preview crops after the hero is explicitly approved; do not invent a separate AI likeness.
- Revisit gallery sequencing from real engagement data rather than adding more images or animation by taste alone.
- After Search Console has enough query data, decide whether `/face-painting` should remain a distinct intent page or consolidate into `/balloon-twisting`; do not remove or redirect it from keyword intuition alone.

## Claude model trail

- Haiku: mechanical asset inventory and duplicate audit, corrected to 98 source files and zero exact duplicates.
- Fable: visual hierarchy, hero candidates, client-selected image placement, and duplication cautions.
- Opus: route/nav/form/SEO coupling review, redirect-shadow risk, stale code paths, and production bundle risk.
- Sonnet: bounded implementation of the core service pages, optimized derivatives, galleries, and editor removal.
- Codex foreman: source reconciliation, all shared-system integration, challenge/correction of model claims, authentic hero decision, security updates, browser QA, release gates, and final accountability.
