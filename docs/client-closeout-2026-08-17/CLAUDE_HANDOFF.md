# Raining Entertainment — final client closeout handoff

Date: 2026-08-17 (Pacific/Honolulu)

## Objective

Implement the clients' final review notes against the current repository, verify the complete production story, and publish the corrected site to the existing Raining Entertainment Vercel production project. This is a closeout pass, not a redesign.

## Authority and conflict rules

1. Newest explicit Jolie instruction controls Jolie, Cirque Jolie, balloons, face painting, stilt, LED, and her imagery when it conflicts with Brenton.
2. Newest explicit Brenton instruction controls Brenton, magic, Casino NITE, Game Show NITE/Fanatics, Mulligan's, and his imagery when it does not conflict with rule 1.
3. The Aug. 12 spoken walkthrough remains authoritative over older emails where these final replies are silent.
4. Client-email originals and previously client-selected repository assets outrank scraped, legacy-site, generic, or AI imagery.
5. Never create or alter a person's face with generative AI. Use an authentic approved source, crop, focal positioning, or a better approved photo.
6. Avoid reusing the same photo across pages unless there is a strong reason.

## Newest client replies

### Jolie — 2026-08-14

- “Yeah that’s all fine with me!” This approves the reviewed site and the Brenton note set quoted below.
- She likes the changed homepage photo.
- One caveat: “Except Brenton looks a little crazy.” Fix Brenton's appearance in the homepage image using authentic approved photography/crop/positioning; do not disturb the Jolie treatment she approved.
- She wants to be able to add more gallery photos later. Preserve the Airtable/gallery architecture and avoid hard-coding a dead end.

### Brenton — 2026-08-13 and final confirmation 2026-08-15

- Final condition: make the listed photo swaps and add `@gameshowfanatics` Instagram gallery/linkage wherever Game Show Fanatics appears; then he is happy to close.
- `@gameshowfanatics` must link to `https://www.instagram.com/gameshowfanatics/`, never `@magicbrent`, in Game Show Fanatics contexts.
- Replace the blurry image identified by `Screenshot 2026-08-13 at 6.45.34 AM.png` with `7E67D76B-F53A-405D-A3AC-2732761D7C1E_1_105_c.jpeg`.
- On that same page, replace the Jolie image identified by `Screenshot 2026-08-13 at 6.48.26 AM.png` with the client-approved photo of Jolie doing a shaka in balloons. Search the approved repository/email-derived assets for the real source; do not improvise or generate it.
- The images identified by `Screenshot 2026-08-13 at 6.50.52 AM.png` do not read as Corporate because they are kids. Remove or replace those exact corporate placements with approved adult corporate crowd/venue imagery.
- On Casino, use the Brenton image identified in `Screenshot 2026-08-13 at 6.54.25 AM.png` for the Craps image/placement shown by `Screenshot 2026-08-13 at 6.54.39 AM.png`. Locate the best source/derivative already in approved media; do not use the screenshot itself as a production asset unless no source exists and visual quality is acceptable.
- Change the Mulligan's claim identified by `Screenshot 2026-08-13 at 6.58.04 AM.png` to the accurate scope: **South Maui's longest-running magic show**. Do not claim longest-running on all Maui, active or otherwise.
- The schedule identified by `Screenshot 2026-08-13 at 7.02.27 AM.png` should not promise every Thursday. Prefer **Normally every Thursday** plus a concise “confirm current dates with the venue” treatment. Brenton is away Aug. 27–Sep. 17, 2026, with a buyout on return; avoid listing an occurrence that will not happen.
- Replace the photo identified by `Screenshot 2026-08-13 at 7.23.09 AM.png` with `7DC14798-199F-4137-839F-43ABC19FEE01_1_105_c.jpeg`.

All referenced email assets are in `docs/client-closeout-2026-08-17/email-assets/`.

## Instagram implementation rule

- The current site has a signed SocialFanout-backed feed with resilient Airtable/fallback behavior. Preserve its privacy, HMAC, allowlisting, and failure behavior.
- Add `@gameshowfanatics` to the correct Game Show contexts and to any multi-account social gallery only if the existing SocialFanout/Meta authorization supplies renderable media.
- If that account is not yet authorized, do not fake a live feed or claim it is live. Ship an inviting, correctly linked curated Game Show Fanatics gallery/fallback using approved Game Show assets, and leave a precise activation note in the receipt.
- Do not replace `@magicbrent` globally; Magic/Casino/Brenton contexts can remain `@magicbrent`. This request is context-specific.

## Production invariants — protect these

- Canonical production: `https://www.rainingentertainment.com/`.
- GA4, consent gating, Search Console verification/sitemap, GA↔Search Console link, Airtable reads/writes, inquiry protection, SEO route generation, and SocialFanout signing must remain intact.
- `magicbrent.com` and `cirquejolie.com` must **not** be redirected yet. Brenton's approval is conditional on this closeout, so do not touch DNS, registrar settings, Vercel aliases, or legacy redirects.
- Do not email either client. Mark will review the implementation receipt first.
- Do not expose or rotate credentials. Do not put secrets in logs, commits, or the handoff.
- Preserve exact branding: Raining Entertainment, Brenton Keith & His Bag O' Tricks, Casino NITE, Game Show NITE/Fanatics, Cirque Jolie.
- Preserve the umbrella/rain/rainbow/cloud interaction; this pass should fix client notes, not reinvent the concept.

## Required workflow

1. Inspect current git status and production before editing. Preserve unrelated user work and use no destructive git commands.
2. Open every supplied screenshot and both JPEG originals; map each note to exact current components/media.
3. Search approved local media for the shaka-in-balloons and casino source photos before creating new derivatives.
4. Implement the smallest coherent set of code/media changes.
5. Verify desktop and mobile, including homepage hero faces/crop, Game Show social links/gallery, Corporate gallery, Casino Craps placement, Mulligan's copy/schedule, image quality, alt text, and no duplicate-image regression.
6. Run `npm test && npm run build && git diff --check` plus any relevant media/link tests.
7. Verify production endpoints and protect analytics/search/Airtable behavior.
8. Commit only intended files with a clear message. Deploy to the existing Vercel production project only after checks pass. Do not push or change legacy domains unless the repository's established release flow absolutely requires a push; report exactly what happened.
9. Write `docs/client-closeout-2026-08-17/CLAUDE_RECEIPT.md` with:
   - each client request and exact implementation location;
   - source image chosen for every swap;
   - model/subagent contributions;
   - tests/build/browser receipts;
   - production deployment URL and canonical checks;
   - anything genuinely remaining, especially provider authorization.

## Multi-model execution

The Fable foreman owns integration and final truth. Use:

- Opus 5 for requirements reconciliation, image/source judgment, and final adversarial review.
- Sonnet 5 for the main implementation and targeted fixes.
- Haiku for mechanical audits: links, labels, duplicate media, exact copy, tests, and receipt completeness.

Do not let a subagent's claim substitute for a verified file, browser, build, or production receipt.
