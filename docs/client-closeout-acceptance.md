# Raining Entertainment client closeout — authoritative acceptance matrix

Date: 2026-08-12

## Evidence precedence

1. The August 5, 2026 client voice memo is authoritative when sources conflict.
2. Jolie's August 5 email images are hand-selected client assets and therefore have the highest image weight.
3. Brenton's July notes and emailed photos remain active only where the audio does not supersede them.
4. Existing local/public images may be retained when they are uniquely useful, but do not duplicate a subject or scene without a clear composition, responsiveness, or storytelling reason.

Raw client-selected working assets are available locally under `client-assets/email-selected/`. They are intentionally ignored by Git and deployment. Only optimized, metadata-stripped derivatives selected for a specific slot belong in `public/media/`.

## Non-negotiable requirements

### Hero and umbrella experience

- Preserve the rain, logo, umbrella opening, rainbow/menu concept, background atmosphere, and surrounding cinematic animation.
- Replace the current uncanny AI-style Brenton/Jolie figures with authentic client-approved photography composited into the existing scene.
- Do not generate or retouch faces into a different likeness and do not invent a costume Jolie does not own.
- Remove the red/Spider-Man-like artifact at the far left.
- If the supplied photographs cannot support a credible composite, retain a clearly marked temporary hero and produce a bounded photo-shoot brief instead of inventing a final image.
- Use larger, gentler, title-case service-menu typography with responsive wrapping/stacking.
- Corporate Entertainment is a prominent planner shortcut, visually separate from the act/service choices.
- The cloud transition is a cinematic wipe made from one natural cloud mass. Its edges are heavily feathered; it must not show hard edges, repeated/rotated layers, screenshot chrome, or geometric seams.

### Service taxonomy and global truth

- Rename `Costumed Stilt Walking` to `Stilt Walkers` in customer-facing UI and metadata.
- Add exactly one new canonical service: `LED Performers` at `/led-performers`.
- Remove Jolie's fire-dancing/fire-performer offering from navigation, copy, cards, CTAs, metadata, schema, image descriptions, and search surfaces.
- Do not remove legitimate references to fire inside Brenton's magic act.
- Remove Additional Services from navigation, discovery, footer, and sitemap. Preserve old-link continuity with an intentional redirect after checking its role.
- Keep Casino NITE and Game Show NITE/Game Show LITE distinct.

### Balloon Twisting & Face Painting

- Lead with `Balloon Twisting & Face Painting`, not `Maui Kids Party Entertainment`.
- Remove children's magic, live bunny/package-magic claims, `Three Shows in One`, the octopus feature, and magic from `What's Included`.
- Remove the entire `What's Included` block and let the page move directly into the client-selected photo gallery.
- Preserve kids-party search relevance naturally in supporting copy and metadata while also serving family, adult, resort, and corporate events.
- Use a photo-forward, balanced gallery of Jolie's selected balloon-twisting and face-painting assets.
- Do not use balloon-decor imagery on this page.
- Keep a tasteful cross-sell to Brenton's magic because booking both is a business goal.

### Other page requirements

- Balloon Decor: prominent curated gallery/lightbox from Jolie's 28 selected images and a stronger Instagram path.
- Stilt Walkers: remove all Jolie fire material and prioritize Jolie's 18 preferred Drive images.
- LED Performers: use Jolie's six selected images and provide a focused page with event-fit and inquiry information.
- About: remove `classically trained circus performer` and `fire dancer`; use the shaka image from `Pics of Jolie`, which the audio identifies as the favorite.
- Casino NITE: preserve the praised design; use the Christmas poker-table photo from Brenton's July `photos` email, add at least five more distinct approved images from that email, and replace irrelevant poker/table imagery where appropriate.
- Game Show: retain LITE's smaller-budget/tighter-space/travel/scalable positioning, remove any wrong singing/casino imagery, and retain Instagram.

## Quality gates

- No console errors or React/Motion warnings.
- No unintended horizontal overflow at 360, 390, 768, 1280, or 1440 CSS pixels.
- Corporate card/CTA is not clipped at 1280px.
- `prefers-reduced-motion` produces a complete, usable experience.
- Galleries are keyboard operable, lazy loaded, and use useful alt text.
- Public images are metadata-stripped WebP/AVIF/JPEG derivatives sized to their real display use.
- The production build, SEO verifier, internal-link scan, and forbidden-claim audit pass.
- Staging inquiry submission produces a semantic Airtable/notification receipt before anyone claims the form is operational.
- Analytics presence is not sufficient: verify production collection for service CTA, form success, phone, email, and Instagram actions before claiming measurement is live.
- Preview builds are `noindex, nofollow`; only a reviewed production build may advertise indexable routes.

## Safety and ownership

- A reversible, noindex Vercel preview is authorized. Do not promote it to production, push, send client email, change production configuration/secrets, redirect legacy domains, or mutate Google properties without explicit approval.
- One integration owner controls `App.tsx`, global navigation/footer, redirect config, sitemap, and route metadata.
- Specialist models should edit only their assigned files and report exact changes and remaining uncertainty.
