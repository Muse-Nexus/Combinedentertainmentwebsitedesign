# Raining Entertainment closeout implementation and release plan

Date: 2026-08-12

## Outcome

The August 5 client voice memo has been implemented as the authority over older email notes. The site now uses the client-selected email imagery throughout the relevant service pages, preserves the rain/umbrella experience, and replaces the synthetic home hero with an authentic Brenton-and-Jolie photograph from the older site library. The source hero photo is not reused in an inner-page gallery.

No deployment, external form submission, analytics-provider change, client email, or production configuration change was made during this pass.

## Implemented

- Preserved the rain, logo, umbrella opening, rainbow, service-discovery, replay, reduced-motion, and final-home experiences.
- Replaced the synthetic hero and red edge artifact with real Brenton-and-Jolie desktop/mobile hero derivatives.
- Reworked the umbrella menu with larger title-case labels and a separate `Planning a corporate event? Start here` path.
- Renamed the customer-facing service to `Stilt Walkers` everywhere that feeds production.
- Added exactly one canonical service page: `/led-performers`.
- Removed the Additional Services page from production, navigation, footer, metadata, generated HTML, and sitemap; `/additional-services` now redirects to `/contact`.
- Removed Jolie fire offerings and obsolete children-magic/live-bunny/training claims while preserving Brenton's legitimate magic-with-fire copy.
- Rebuilt Balloon Twisting & Face Painting around the two requested services, balanced client-selected galleries, broad event fit, and the Brenton magic cross-sell.
- Added all 28 Balloon Decor selections to an accessible lightbox gallery.
- Rebuilt Stilt Walkers around the preferred client photos and separated LED into its own focused page.
- Updated About with Jolie's selected shaka photo and removed unsupported performer claims.
- Added Brenton's selected Christmas poker-table image to Casino NITE.
- Kept Casino NITE and Game Show NITE/LITE distinct.
- Added service-aware booking links so the inquiry form opens with the correct service selected; invalid query values fail safely.
- Removed unreachable legacy page/editor code and the unused drag-and-drop runtime.
- Updated route metadata, structured data, sitemap, redirects, Airtable setup choices, inquiry normalization, and fallback content together.
- Added automated reciprocal sitemap checks, redirect-shadow checks, internal-route checks, media-reference checks, approved-asset counts, and forbidden-claim checks.
- Updated compatible dependencies until the production dependency audit reported zero known vulnerabilities.

## Verified locally

- Production build passes with 15 canonical pages, one intentional noindex page, and branded 404 output.
- Content verifier passes for 25 routable paths, 117 referenced media files, and all 63 optimized client-selected derivatives.
- Browser QA passes at desktop and mobile sizes with no console warnings/errors, no error overlay, no broken images, and no horizontal overflow.
- The complete seven-card discovery sequence fits at 1440px; the previously clipped final card is fully visible.
- Gallery lightboxes open from the keyboard, trap focus, close with Escape, restore focus, and restore body scrolling.
- `/contact?service=led-performers` preselects LED Performers; an unknown service leaves the form unselected.
- `/additional-services` resolves to the current contact page in the application, and the build verifier confirms the hosting redirect is not shadowed by generated HTML.
- `npm audit --omit=dev` reports zero known vulnerabilities.

## Release sequence requiring external authority or receipts

1. Create a private preview deployment and visually approve the authentic seasonal hero crop with Brenton and Jolie. If they prefer an evergreen hero, request one landscape and one portrait photo of both owners rather than fabricating a composite.
2. Submit one clearly labeled staging inquiry and confirm the resulting Airtable record and any notification receipt. Do not claim the form is operational from source code alone.
3. Decide which analytics provider and consent behavior the client wants. Instrument service CTA, successful form submission, phone, email, and Instagram actions; then verify real production collection before claiming measurement is live.
4. Run a final client content review on the private preview, especially the About biography, seasonal hero, service names, and the separation of Stilt Walkers from LED Performers.
5. After approval, deploy the reviewed commit, smoke-test the canonical routes and redirect on the real domain, submit the updated sitemap, and retain the deployment URL and production receipts in the closeout record.

## Optional send-off polish after approval

- Schedule a short evergreen Brenton-and-Jolie hero photo session using the existing desktop/mobile composition brief.
- Add a small, provider-backed event dashboard only after production analytics collection is verified.
- Refresh social preview crops after the hero is explicitly approved; do not invent a separate AI likeness.
- Revisit gallery sequencing from real engagement data rather than adding more images or animation by taste alone.

## Claude model trail

- Haiku: mechanical asset inventory and duplicate audit, corrected to 98 source files and zero exact duplicates.
- Fable: visual hierarchy, hero candidates, client-selected image placement, and duplication cautions.
- Opus: route/nav/form/SEO coupling review, redirect-shadow risk, stale code paths, and production bundle risk.
- Sonnet: bounded implementation of the core service pages, optimized derivatives, galleries, and editor removal.
- Codex foreman: source reconciliation, all shared-system integration, challenge/correction of model claims, authentic hero decision, security updates, browser QA, release gates, and final accountability.
