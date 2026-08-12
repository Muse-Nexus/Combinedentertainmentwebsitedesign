# Opus 5 — Requirements & Architecture Review

**Date:** 2026-08-12
**Branch:** `codex/raining-client-audio-closeout`
**Baseline commit:** `e1531d1` (checkpoint: preserve pre-audio client site state)
**Role:** requirements audit and dependency-safe integration plan. **No application code was edited.**

Authority for this document is `docs/client-closeout-acceptance.md`. Where this
review and `docs/claude/haiku-mechanical-audit.md` disagree, §0 records the
disagreement and the evidence.

## Verification basis

Every claim below is grounded in the working tree at `e1531d1` plus untracked
docs. Specifically verified in this session:

- Full read of `App.tsx`, `routeMetadata.js`, `RouteHead.tsx`, `Navbar.tsx`,
  `Footer.tsx`, `UmbrellaNav.tsx`, `PhotoUmbrellaNav.tsx`, `LandingPage.tsx`,
  `HomeContent.tsx`, `Layout.tsx`, `About.tsx`, `BalloonTwisting.tsx`,
  `BalloonDecor.tsx`, `CirqueJolie.tsx`, `AdditionalServices.tsx`,
  `StrollingEntertainment.tsx`, `api/inquiries.ts`, `server/airtable.ts`,
  `vercel.json`, `public/sitemap.xml`, `public/robots.txt`,
  `public/gallery-view.html`, `index.html`, both build scripts.
- `npm run build` executed clean at baseline: **15 canonical HTML documents, 1
  noindex route, 404.html generated, SEO verifier passed.** Any post-change
  build failure is therefore a regression introduced by this work, not
  pre-existing.
- MD5 comparison of suspected duplicate public assets.
- Direct image inspection of `public/media/hero-reigning-entertainment.webp` and
  `client-assets/email-selected/about-jolie/03-AE2B4FF0-…_1_105_c.jpg`.
- File-count audit of all seven `client-assets/email-selected/` categories.

Not verified (no harness exists in this repo — see §7): runtime console output,
viewport overflow, Airtable staging round-trip, analytics collection.

---

## §0 Corrections to inherited audits

Two load-bearing claims in `haiku-mechanical-audit.md` are wrong and will
misdirect implementation if carried forward.

**0.1 — Balloon Decor asset count is 28, not 24.**
Haiku §1.1 reports 24 balloon-decor files and a 94-file total. Direct count:

| Category | Actual | Haiku |
|---|---|---|
| balloon-decor | **28** | 24 |
| stilt-walkers | 18 | 18 |
| balloon-twisting | 9 | 9 |
| face-painting | 14 | 14 |
| led-performers | 6 | 6 |
| brenton-july-photos | 20 | 20 |
| about-jolie | 3 | 3 |
| **Total** | **98** | 94 |

28 matches the acceptance matrix ("Jolie's 28 selected images"). Sonnet must
curate from 28. If a gallery is built to 24, four client-selected images are
silently dropped — exactly the failure mode the acceptance doc's image-weight
rule exists to prevent.

**0.2 — `/media/strolling/fire-dancing.jpg` exists, and there are two copies.**
Haiku §3.4/§3.5 twice defers with "verify this file exists." It does, and it is
duplicated:

```
MD5 7e837a60ff921b1804c5261701797be7  public/media/strolling/fire-dancing.jpg
MD5 7e837a60ff921b1804c5261701797be7  public/media/firedancing-cirque-jolie.jpg
```

Byte-identical. Both are Jolie fire assets and both must be removed from
`public/media/`. Removing only the referenced path leaves the second copy
publicly fetchable at a self-describing URL.

**0.3 — "No exact duplicates" is true of `client-assets/`, not of `public/media/`.**
`balloon-decor/tropical-arch-resort.jpg` and `tropical-arch-resort-2.jpg` are
byte-identical (`6f52a829af531ec546c8cfeb46b7223c`); `-2` is unreferenced.

**0.4 — Haiku §2.1 recommends redirecting Additional Services "to home."**
This contradicts `docs/legacy-redirect-map.md`, which states outright that
"broad wildcard rules to the new home page are intentionally excluded" because
Google treats them as soft 404s. See §5 for the corrected strategy.

**0.5 — Haiku's shared-file list is incomplete.** It omits the highest-risk
coupling in the entire change set: `UMBRELLA_SECTIONS` in `UmbrellaNav.tsx`
drives the landing-page `SERVICE_DECK` and a hard-coded `grid-cols-7`. See §3
Wave 2 and §6.

**0.6 — Confirmed correct in Haiku, and adopted here.** The About shaka image
is `client-assets/email-selected/about-jolie/03-AE2B4FF0-B846-…_1_105_c.jpg`
(visually confirmed: Jolie throwing a shaka in a bed of uninflated balloons).
Brenton's fire references in `Magic.tsx` are legitimate and preserved.

---

## §1 Requirement reconciliation

Status key: **MET** (satisfied at baseline, protect it) · **PARTIAL** ·
**MISSING** · **VIOLATED** (code actively contradicts the requirement) ·
**UNVERIFIABLE** (no harness exists to prove it).

### 1.1 Hero and umbrella experience

| # | Requirement | Status | Evidence |
|---|---|---|---|
| H1 | Preserve rain, logo, umbrella opening, rainbow/menu, atmosphere, cinematic animation | **MET** | `LandingPage.tsx` — `RainEffect`, `Rainbow`, `Sun`, `LightningFlash`, `Clouds`, `umbrellaTop` spring, `DiscoveryScene`. Treat as a **regression surface**, not a work item. |
| H2 | Replace uncanny AI Brenton/Jolie figures with authentic client photography | **MISSING** | `hero-reigning-entertainment.webp` + `hero-reigning-mobile.webp` are AI composites. Inspected directly. |
| H3 | No invented likeness / no costume Jolie does not own | **VIOLATED by the existing asset** | The hero puts "Jolie" in an iridescent butterfly-wing LED gown. Neither figure is a real likeness. This is the asset to be replaced, not a constraint that is currently being honoured. |
| H4 | Remove red/Spider-Man-like artifact at far left | **MISSING** | Confirmed present: red-suited figure at the far-left edge of the crowd, ~3–5% from the left border. Lives in the asset; not fixable in code. |
| H5 | Larger, gentler, title-case service-menu typography, responsive wrap/stack | **MISSING** | `UmbrellaNav.tsx:69` — `text-[0.66rem] … font-bold uppercase tracking-[0.08em]`, `sm:text-xs`. Small, heavy, and ALL CAPS: the exact opposite on all three axes. |
| H6 | Corporate Entertainment as prominent planner shortcut, visually separate | **MISSING** | `UmbrellaNav.tsx:48-52` — Corporate is the 7th peer chip in `UMBRELLA_SECTIONS`, styled identically to the acts. |

`PhotoUmbrellaNav.tsx` also hard-codes ALL-CAPS labels (`'CORPORATE'`,
`'STROLLING'`, …) — but it is **dead code** (never imported). See §3 Wave 0.

### 1.2 Service taxonomy and global truth

| # | Requirement | Status | Evidence |
|---|---|---|---|
| T1 | `Costumed Stilt Walking` → `Stilt Walkers` | **MISSING** | 13 source sites + 1 CSV template. Full register in §4.1. |
| T2 | Add exactly one canonical service `LED Performers` at `/led-performers` | **MISSING** | No route, no page, no metadata, no sitemap entry, no nav entry. |
| T3 | Remove Jolie's fire offering from nav, copy, cards, CTAs, metadata, schema, image descriptions, search surfaces | **MISSING** | 16 removal sites in §2.2. |
| T4 | **Do not remove fire inside Brenton's magic act** | **MET — PROTECT** | 5 legitimate sites + 3 false-positive tokens. Full register in §2.1. This is the single most likely accidental regression in the release. |
| T5 | Remove Additional Services from nav, discovery, footer, sitemap; intentional redirect after checking role | **MISSING** | Route, nav, footer, sitemap, 2 in-body links, 1 metadata block. Role analysis and redirect design in §5. |
| T6 | Keep Casino NITE and Game Show NITE/LITE distinct | **MET** | `/casino` and `/game-show` are separate routes with separate schema; `CasinoGameshow.tsx:45` states the separation explicitly; `AdditionalServices.tsx:56` reinforces it. **Protect this when deleting the Additional Services page** — that sentence is one of the few places the distinction is stated in prose. |

### 1.3 Balloon Twisting & Face Painting

| # | Requirement | Status | Evidence (`BalloonTwisting.tsx`) |
|---|---|---|---|
| B1 | Lead with `Balloon Twisting & Face Painting`, not `Maui Kids Party Entertainment` | **MISSING** | `:43` h1 leads `Maui Kids Party Entertainment`; the real service is demoted to a `font-light` sub-line at `:44`. |
| B2 | Remove children's magic | **MISSING** | `:44`, `:47`; plus `routeMetadata.js:34,40`. |
| B3 | Remove live bunny / package-magic claims | **MISSING** | `:84` "Live Bunny Show" badge, `:101` card, `:144` What's-Included row; `About.tsx:88`. |
| B4 | Remove `Three Shows in One` | **MISSING** | `:97`. |
| B5 | Remove the octopus feature | **MISSING** | `:122-132` whole featured-sculpture section, plus `:30` hero video poster and `:175` gallery entry — **three** references, not one. |
| B6 | Remove magic from `What's Included` | **MISSING** | `:144`. |
| B7 | Preserve kids-party search relevance naturally; also serve family, adult, resort, corporate | **PARTIAL** | `:198` "Perfect For" already spans school/daycare/resort/community. Adult and corporate framing absent. Removing B1–B6 without adding this will *lose* kids relevance rather than rebalance it. |
| B8 | Photo-forward balanced gallery from Jolie's selected assets | **MISSING** | 6 legacy images at `:171-177`; none from `client-assets`. |
| B9 | **No balloon-decor imagery on this page** | **VIOLATED** | `:172` `480712819_…n.jpg`, alt "custom purple cat balloon **arch**". A decor install on the twisting page. |
| B10 | Keep a tasteful cross-sell to Brenton's magic | **MET — PROTECT** | `:214` links to `/magic` with the book-both discount. A blanket "remove magic from this page" sweep will delete a stated business goal. |

### 1.4 Other pages

| # | Requirement | Status | Evidence |
|---|---|---|---|
| P1 | Balloon Decor: prominent curated gallery/lightbox from 28 images | **MISSING** | `BalloonDecor.tsx` has 8 images in two static grids, **no lightbox**. |
| P2 | Balloon Decor: stronger Instagram path | **MISSING** | Zero Instagram links on the page. Only the global footer. |
| P3 | Stilt Walkers: remove all Jolie fire material | **MISSING** | `StrollingEntertainment.tsx:49,50,59,719,762,857`. |
| P4 | Stilt Walkers: prioritize Jolie's 18 preferred Drive images | **MISSING** | `joliePhotos` has 4 entries; render is `.slice(0, 6)` at `:784`, so even 18 supplied images would render only 6. Both the array and the slice must change. |
| P5 | LED Performers: 6 selected images, focused page with event-fit + inquiry info | **MISSING** | Page does not exist. |
| P6 | About: remove `classically trained circus performer` and `fire dancer` | **MISSING** | `About.tsx:85` (both phrases in one sentence), `:92` badge, `:127` brand blurb. |
| P7 | About: use the shaka image from `Pics of Jolie` | **MISSING** | `About.tsx:74` uses `jolie-strickland-portrait.webp`. Target confirmed (§0.6). **Crop risk:** source is landscape ~1086×724; the slot is `aspect-[4/5]` portrait. A center crop discards ~45% of width. Change the slot aspect or crop deliberately — do not let `object-cover` decide. |
| P8 | Casino NITE: preserve the praised design | **MET — PROTECT** | Do not restructure `Casino.tsx`; swap imagery only. |
| P9 | Casino NITE: use Brenton's July Christmas poker-table photo; replace irrelevant poker/table imagery | **MISSING** | `Casino.tsx:89` labels a *group photo* (`casino-group-photo.jpg`) as "Poker table at casino party" — alt text does not describe the image. This is the specific mismatch to fix. |
| P10 | Game Show: retain LITE smaller-budget / tighter-space / travel / scalable positioning | **PARTIAL** | `GameShow.tsx:116` covers budget, space, and scale ("intimate group to a crowd of 1,000"). **Travel/mobility is absent** from the page prose; it survives only in the dead `ServicePage.tsx:140`. |
| P11 | Game Show: remove wrong singing/casino imagery | **PARTIAL** | No casino-branded asset renders on `/game-show`; two assets are merely *stored* under `public/media/casino-gameshow/` with `gameshow-` filenames. No singing imagery found. **Needs a client-facing confirmation of which frame was meant** — see §9. |
| P12 | Game Show: retain Instagram | **MET — PROTECT** | `GameShow.tsx:217,258` → `@gameshowfanatics`. |

### 1.5 Quality gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| Q1 | No console errors or React/Motion warnings | **UNVERIFIABLE** | No test runner, no browser harness. See §7. |
| Q2 | No horizontal overflow at 360/390/768/1280/1440 | **UNVERIFIABLE** | Same. Two concrete overflow risks identified in §8.2. |
| Q3 | Corporate card/CTA not clipped at 1280 | **UNVERIFIABLE, and actively at risk** | `LandingPage.tsx:369` hard-codes `grid-cols-7` for `SERVICE_DECK`. Any change to `UMBRELLA_SECTIONS` length changes column count vs. card count. |
| Q4 | `prefers-reduced-motion` produces a complete, usable experience | **MET, fragile** | `App.tsx:51` `<MotionConfig reducedMotion="user">` plus a dedicated `ReducedMotionLanding`. Fragile because `ReducedMotionLanding` (`LandingPage.tsx:401-402`) stacks a full `UmbrellaNav` and a `compact` one at `-mt-12`; changing the chip count changes wrap height and can collide. |
| Q5 | Galleries keyboard operable, lazy loaded, useful alt text | **PARTIAL / FAILING** | Only `StrollingEntertainment.tsx` has a keyboard-operable lightbox. `BalloonTwisting.tsx:108,127,181` ship **without `loading="lazy"`** — a straight gate failure today. |
| Q6 | Public images are metadata-stripped WebP/AVIF/JPEG sized to display | **PARTIAL** | 131 MB of media in `dist/`. ~11 MB of unreferenced large originals + ~30 MB reachable only via a dev tool. Detail in §8.1. |
| Q7 | Build, SEO verifier, internal-link scan, forbidden-claim audit pass | **HALF THE TOOLING DOES NOT EXIST** | `npm run build` and `verify:seo` pass. There is **no internal-link scan and no forbidden-claim audit anywhere in the repo** (`scripts/` holds exactly three files). This gate cannot be met until they are written. See §7. |
| Q8 | Staging inquiry produces a semantic Airtable/notification receipt | **UNVERIFIED** | `api/inquiries.ts` is well-built (origin check, honeypot, rate limit, CSV-formula escaping). No evidence of a staging round-trip. Coupling risk in §4.4. |
| Q9 | Analytics production collection verified for service CTA, form success, phone, email, Instagram | **NOT INSTRUMENTED AT ALL** | Repo-wide search for `gtag`, `dataLayer`, `@vercel/analytics`, `plausible`, `track(` returns **zero** product hits. The gate says "analytics presence is not sufficient" — there is not even presence. Hard blocker; see §9. |

---

## §2 Fire disambiguation register

The acceptance matrix contains two adjacent and opposed instructions:

> Remove Jolie's fire-dancing/fire-performer offering from navigation, copy,
> cards, CTAs, metadata, schema, image descriptions, and search surfaces.
>
> Do not remove legitimate references to fire inside Brenton's magic act.

A regex sweep on `/fire/i` hits **31 lines** and would destroy Brenton's act,
break unrelated identifiers, and still miss the fire references that don't use
the word. The two registers below are exhaustive and are the authority for this
change. **No edit may touch a PROTECTED line.**

### 2.1 PROTECTED — Brenton's magic act, and false positives

| File:line | Content | Why protected |
|---|---|---|
| `src/app/pages/Magic.tsx:133` | "You'll see live goldfish. You'll see fire. You'll see your friends… on stage!" | Brenton's stage act. |
| `src/app/pages/Magic.tsx:194` | alt: "Brenton Keith performing Bag O Tricks magic with fire at Maui resort luau event" | Brenton's act; image description. |
| `src/app/pages/UpcomingShows.tsx:82` | "high-energy comedy magic with fire, live goldfish, and your friends onstage" | Brenton's act. |
| `src/app/pages/StrollingEntertainment.tsx:54` | `lawn-magic.jpg`, alt "Brenton producing fire at outdoor gala" | Brenton's act. Sits in `brentonPhotos` — see 2.3. |
| `src/app/pages/StrollingEntertainment.tsx:55` | `/media/brenton/brent-fire-portrait.png`, alt "Brenton Keith fire portrait" | Brenton's act. Asset must be kept (convert to WebP; see §8.1). |
| `client-assets/email-selected/brenton-july-photos/*` | Brenton fire frames in the July set | Client-supplied Brenton assets; eligible for use. |

**False positives — must not be swept:**

| File:line | Token | Note |
|---|---|---|
| `LandingPage.tsx:300,310,311,323,325` | `confettiFired` | Identifier. Renaming it is a needless diff on a protected animation file. |
| `ServicePage.tsx:140` | "the prop itself is an energetic fireball" | Metaphor describing the Game Show LITE podium. Also dead code (§3 Wave 0). |

### 2.2 REMOVE — Jolie's fire offering

| File:line | Content | Action |
|---|---|---|
| `About.tsx:85` | "…Maui's premier stilt walker, **fire dancer**, and children's entertainer" | Rewrite sentence (also drops "classically trained circus performer" per P6). |
| `About.tsx:92` | `Fire Dancing` badge | Delete the badge. |
| `About.tsx:127` | "Stilt walking, **fire dancing**, kids entertainment, …" | Rewrite brand blurb. |
| `BalloonTwisting.tsx:77` | "Her skills now include stilt walking **and fire dancing**" | Drop the clause. |
| `CirqueJolie.tsx:36` | "**fire** and LED performers" | Drop fire; LED moves to its own page/card. |
| `CirqueJolie.tsx:1,40` | `Flame` icon imported and used for the stilt card | Swap the icon. A flame glyph is a fire claim in visual form. |
| `HomeContent.tsx:20` | "stilt performers, balloon art, face painting, **fire**, LED, …" | Drop fire. |
| `ServiceCards.tsx:41` | "Maui stilt walkers, **fire dancers**, and roaming performers" | Dead code — see §3 Wave 0. |
| `Corporate.tsx:209` | `{ src: '/media/strolling/fire-dancing.jpg', label: 'Fire Dancing' }` | Delete the gallery tile. |
| `Pricing.tsx:62` | `{ name: "Fire Dancing", price: "Call for pricing" }` | Dead code — see §3 Wave 0. |
| `StrollingEntertainment.tsx:49` | `headlineJolie: 'Cirque Jolie — Stilt Walking & Fire Dancing'` | Rewrite. |
| `StrollingEntertainment.tsx:50` | `subheadJolie: 'Rainbow stilts, fire fans, …'` | Rewrite. |
| `StrollingEntertainment.tsx:59` | `{ id: 'j2', src: '…/fire-dancing.jpg', alt: 'Fire dancer performing at luau' }` | Delete the entry. |
| `StrollingEntertainment.tsx:719` | "Stilts · Characters · **Fire** · Ambient performance" | Drop the token. |
| `StrollingEntertainment.tsx:762` | "Maui · Stilts · Ambient · Walk-Around · **Fire**" | Drop the token. |
| `StrollingEntertainment.tsx:857` | "Looking for **fire** & LED, characters, or other extras?" → `/additional-services` | Rewrite and repoint to `/led-performers` (§5). |
| `AdditionalServices.tsx:19-22` | `Flame` icon + "Fire & LED Performance" card | Page is being retired; the LED half is the seed for `/led-performers` copy. |
| `routeMetadata.js:62` | `/strolling` description: "stilt walkers, **fire** and LED performers" | Rewrite. |
| `routeMetadata.js:68` | `/strolling` `serviceType`: "…**fire performers**, LED dancers…" | Rewrite — this is JSON-LD `Service.serviceType`, a search surface. |
| `routeMetadata.js:207` | `/cirque-jolie` description: "…children's magic, **fire performers**…" | Rewrite (also drops children's magic per B2). |
| `scripts/setup-airtable.mjs:76` | `['Fire Dancing', 'redBright']` in `serviceChoices` | Remove from the provisioning script (§4.4). |
| `public/gallery-view.html:10` | `'fire-dancing.jpg'` in `strollingFiles` | Publicly reachable dev tool — see §8.3. |

**Assets to delete from `public/media/`:**
`strolling/fire-dancing.jpg` and `firedancing-cirque-jolie.jpg` (byte-identical
copies of the same Jolie fire image, §0.2).
**Do not delete** `brenton/brent-fire-portrait.png`.

### 2.3 Provenance defect discovered during the sweep

`StrollingEntertainment.tsx:53` places `/media/brenton/patriotic-stilt.jpg` —
alt text *"**Jolie** on stilts in patriotic stars & stripes costume"* — inside
the `brentonPhotos` array. A Jolie asset is filed under Brenton, in a directory
named `brenton/`. This is not a fire issue, but it is an asset-provenance
error in the exact file being reworked, and it will corrupt any provenance
check that trusts directory names. Fix during Wave 4.

---

## §3 Dependency-safe implementation sequence

Ordering rule: **every wave must leave `npm run build` green.** The build runs
`generate-route-html.mjs` then `verify-seo-build.mjs`, so a route added to
`routeMetadata.js` without a sitemap entry fails the build immediately — that
is a feature, and the sequence below exploits it.

### Wave 0 — Decide the fate of dead code (blocking, ~30 min, Codex)

Five modules are unreachable from `App.tsx` and yet contain forbidden strings.
Confirmed by import-graph trace:

| Module | Reachable? | Forbidden content |
|---|---|---|
| `src/app/pages/Home.tsx` | No route | pulls in `Hero`, `ServiceCards`, `Testimonials`, `CursorMagicLens`, `DualProfileReveal`, `CloudReveal`, `UpcomingShowBanner` |
| `src/app/pages/KidsCircus.tsx` | No route | pulls in `ServicePageTemplate`; "stilt walkers", kids-show claims |
| `src/app/pages/Pricing.tsx` | No route | `Fire Dancing` price row (`:62`) |
| `src/app/components/ServicePage.tsx` | Never imported | `Fire Dancing & All-Age` (`:273-275`), `Costumed Stilt Walking` (`:255`), fire-dancing bio (`:180`) |
| `src/app/components/PhotoUmbrellaNav.tsx` | Never imported | ALL-CAPS umbrella labels, hard-coded 7 wedges |

**This must be decided before Wave 1**, because the forbidden-claim audit (§7.1)
needs a defined scope. Two coherent options:

- **Recommended — delete them.** They are pre-rewrite artifacts. Deleting
  removes ~2,000 lines of contradictory truth and lets the audit run over all
  of `src/` with no exceptions. Recoverable from git.
- **Alternative — quarantine.** Move to `src/_attic/` and exclude that path in
  the audit. Preserves `ServicePage.tsx:140`, the only surviving statement of
  Game Show LITE's travel positioning (P10) — extract that sentence either way.

Do **not** leave them in place and un-audited: `Pricing.tsx` alone will make a
`grep -ri "fire dancing" src/` gate fail forever, training everyone to ignore it.

### Wave 1 — Shared primitives, no behaviour change (Codex)

Land the pieces five pages will otherwise each reinvent.

1. **Extract the lightbox.** `StrollingEntertainment.tsx:125-153` already has a
   good one: portal, `role="dialog"`, `aria-modal`, Escape, focus-on-open,
   focus-restore-on-close, body scroll lock, `<button>` triggers with
   `aria-label`, `loading="lazy"`, `onError` fallback. Move it to
   `src/app/components/Lightbox.tsx` **unchanged in behaviour** and add the one
   thing it lacks: a **focus trap** (Tab currently escapes to the page behind
   the modal — a WCAG 2.4.3 failure that will be inherited by four more
   galleries if copied as-is).
2. **Add `src/app/components/GalleryGrid.tsx`** — the non-sortable half of
   `SortablePhoto` (`:213-253`), with no `@dnd-kit` dependency. Consumers:
   Balloon Decor (28), Stilt Walkers (18), LED Performers (6), Balloon
   Twisting, Face Painting.
3. Verify `npm run build` still green. No route/metadata changes yet.

**Why first:** it is the only wave with no dependency on client-asset
selection, and it removes the incentive for page owners to hand-roll five
inaccessible galleries in parallel.

### Wave 2 — Umbrella data model (Codex, highest structural risk)

`UMBRELLA_SECTIONS` is not a menu. It is a shared data source with three
consumers, and two of them break silently.

```
UmbrellaNav.tsx  UMBRELLA_SECTIONS (7 entries)
  ├─ ServiceButtons        → isLastOddItem uses length % 2  (UmbrellaNav.tsx:62)
  └─ LandingPage.tsx:63    SERVICE_DECK = UMBRELLA_SECTIONS.map(...{...SERVICE_VISUALS[route]})
       ├─ :369  <div className="grid ... grid-cols-7">   ← HARD-CODED 7
       └─ :279  <motion.img src={data.image} alt={data.alt} />
```

Two concrete failure modes:

- **Missing visual.** `SERVICE_VISUALS` (`LandingPage.tsx:25-61`) is keyed by
  route. Adding `/led-performers` to `UMBRELLA_SECTIONS` without a matching
  `SERVICE_VISUALS` entry spreads `undefined` → `data.image` and `data.alt`
  become `undefined` → a broken `<img>` **with no alt attribute**. That is
  simultaneously a visual bug, an accessibility failure, and invisible to the
  SEO verifier.
- **Grid/card mismatch.** `grid-cols-7` is literal. Requirement H6 pulls
  Corporate out of the act list and T2 adds LED Performers — net 7 acts again
  by coincidence, but *any* later count change silently misaligns the deck and
  is a live candidate for the Q3 "Corporate card clipped at 1280" gate.

Wave 2, in order:

1. Split the data: `UMBRELLA_SECTIONS` (acts only) and a separate
   `PLANNER_SHORTCUT` for Corporate (H6). Corporate leaves the chip row and
   gets its own visually distinct treatment.
2. Add `/led-performers` to `UMBRELLA_SECTIONS` **and** `SERVICE_VISUALS` in
   the same commit. Never one without the other.
3. Replace `grid-cols-7` with a count-derived class or
   `style={{ gridTemplateColumns: \`repeat(${SERVICE_DECK.length}, minmax(0,1fr))\` }}`.
4. Apply H5 typography to `ServiceButtons` (`UmbrellaNav.tsx:69`): drop
   `uppercase`, raise from `text-[0.66rem]`, soften `font-bold` and
   `tracking-[0.08em]`. Labels become title case at the data layer, so
   `SERVICE_DECK` card headings inherit — but `LandingPage.tsx:282` also
   applies `uppercase` to `<h3>`; remove it there too or the title-case
   requirement is defeated by CSS.
5. Re-check `ReducedMotionLanding` (`:401-402`) — full + `compact` nav stacked
   at `-mt-12`. Verify at 360 and 1280.

**Do not touch** the scroll timeline, `RainEffect`, `Rainbow`, `Sun`,
`Clouds`, or `LightningFlash` (H1).

### Wave 3 — Routing, metadata, redirects, sitemap (Codex only)

Single atomic commit — these four files fail the build if they disagree.

1. `routeMetadata.js`: add the `/led-performers` block; rewrite `/strolling`
   (T1 + T3); rewrite `/cirque-jolie` description (T3 + B2); rewrite
   `/balloon-twisting` (B1/B2); **remove** the `/additional-services` block.
2. `public/sitemap.xml`: add `/led-performers`; **remove**
   `/additional-services`. (Hand-maintained — see §7.2 for the drift gap.)
3. `App.tsx`: add the `/led-performers` route; convert `/additional-services`
   to a `<Navigate>` alias (§5).
4. `vercel.json`: add the server-side 301 for `/additional-services` (§5).
5. Build. Expect 16 canonical documents (was 15). If the count is wrong, stop.

### Wave 4 — Page content (Sonnet, parallel-safe)

Each page below touches only its own file plus already-landed shared
primitives. Safe to parallelize once Waves 1–3 are merged.

| Page owner | File | Requirements |
|---|---|---|
| Stilt Walkers | `StrollingEntertainment.tsx` | T1, T3, P3, P4 (18 images; **also raise the `.slice(0, 6)` at `:784`**), fix provenance defect §2.3 |
| LED Performers | **new** `src/app/pages/LEDPerformers.tsx` | P5; seed copy from the LED half of `AdditionalServices.tsx:20-21` |
| Balloon Twisting | `BalloonTwisting.tsx` | B1–B9; **preserve `:214` cross-sell (B10)**; add `loading="lazy"` at `:108,127,181` |
| Balloon Decor | `BalloonDecor.tsx` | P1 (28 images + `GalleryGrid`/`Lightbox`), P2 (Instagram) |
| About | `About.tsx` | P6, P7 (shaka + crop decision), B3 (`:88`) |
| Casino | `Casino.tsx` | P9 only — **do not restructure (P8)** |
| Game Show | `GameShow.tsx` | P10 (restore travel/mobility), P11 pending §9 decision; **preserve Instagram (P12)** |
| Corporate | `Corporate.tsx` | T1 (`:44`), remove fire tile (`:209`), repoint `:40` off `/additional-services` |
| Cirque Jolie hub | `CirqueJolie.tsx` | T1, T3, `Flame` icon swap, B2, add LED Performers card |

### Wave 5 — Delete Additional Services page + asset hygiene (Codex)

Only after Wave 4, because `Corporate.tsx:40` and
`StrollingEntertainment.tsx:858` link into it. Delete
`src/app/pages/AdditionalServices.tsx` and its `App.tsx` lazy import.
**Before deleting, relocate the Casino/Game Show distinction sentence
(`:56`) — it supports T6.** Then remove the fire assets (§2.2) and the
unreferenced originals (§8.1).

### Wave 6 — Verification (Codex)

Run the gates from §7 and record results. Nothing here ships without §7.1 and
§7.2 existing and passing.

---

## §4 Global truth and SEO sweep

### 4.1 `Costumed Stilt Walking` → `Stilt Walkers` — complete register

**Customer-facing (must change):**

| File:line | Context |
|---|---|
| `Navbar.tsx:16` | desktop dropdown + mobile drawer |
| `Footer.tsx:37` | services column |
| `UmbrellaNav.tsx:30` | umbrella chip + landing deck card (via `SERVICE_DECK`) |
| `HomeContent.tsx:52` | home services grid |
| `CirqueJolie.tsx:34` | hub service card |
| `Corporate.tsx:44` | corporate service card |
| `Contact.tsx:316` | `<option>` label — change the **label only** (see 4.4) |
| `StrollingEntertainment.tsx:770,843` | two CTA buttons |
| `routeMetadata.js:60` | `<title>` |
| `routeMetadata.js:67` | JSON-LD `Service.name` |

**Non-rendering (change for consistency; zero user impact):**

`StrollingEntertainment.tsx:757` — `<Layout title="Costumed Stilt Walking">`.
**`Layout` accepts `title` and never renders it** (`Layout.tsx:10-21`). Every
`Layout title=` in the codebase is inert. Flagging so nobody treats this as a
customer-facing fix, and so the audit's findings here are correctly triaged as
cosmetic.

**Data-layer (see 4.4 before changing):**
`api/inquiries.ts:25`, `shared/site-content.ts:123`,
`scripts/setup-airtable.mjs:56,72,591`, `docs/airtable-templates/moments.csv:7`.

### 4.2 SEO surfaces affected

| Surface | Change | Risk if missed |
|---|---|---|
| `<title>` / `<meta description>` | `/strolling`, `/balloon-twisting`, `/cirque-jolie`, new `/led-performers` | Both SSG (`generate-route-html.mjs`) and SPA (`RouteHead.tsx`) read the same source — no drift risk here. Good. |
| JSON-LD `Service.name` / `serviceType` | `routeMetadata.js:67,68,40,363-366` | `serviceType` is a search surface. Leaving "fire performers" keeps the removed offering in structured data. |
| JSON-LD `Service` fallback | `routeMetadata.js:365-366` | Default `serviceType` string still says "children's magic". Applies to any `cirque`-kind route without an explicit value. **Easy to miss.** |
| `og:image` / `twitter:image` | 4 metadata entries + `SITE.defaultImage` all point at `hero-reigning-entertainment.webp` | Replacing the hero (H2) silently rewrites the social card for `/`, `/casino-gameshow`, `/contact`, and the 404. Deliberate, but must be stated. |
| `sitemap.xml` | +`/led-performers`, −`/additional-services` | Hand-maintained. Verifier does not catch stale entries — §7.2. |
| `robots.txt` | No change needed | Already disallows `/api/` and `/gallery-view`. |

### 4.3 Pre-existing SEO drift found (not caused by this work)

`index.html` carries a **stale** managed head block. Its embedded JSON-LD still
says `"alternateName": ["Magic Brent", …]` while `routeMetadata.js:270` says
`["Brenton Keith & His Bag O' Tricks", …]`; its description says "casino nights"
vs. "casino night parties".

Production is unaffected — `generate-route-html.mjs` overwrites the block
between the `SEO_HEAD_START/END` markers for every built route. But `npm run
dev` serves the stale head, so anyone spot-checking metadata locally sees a
retired brand name. Recommend reducing the committed block to a marker-only
stub so the generator is the unambiguous single source of truth.

### 4.4 Cross-boundary coupling: taxonomy → lead capture

The taxonomy rename reaches the inquiry pipeline, and the failure is silent.

```
Contact.tsx:316   <option value="strolling">Costumed Stilt Walking</option>
                             │ value, not label
                             ▼
api/inquiries.ts:20-32  SERVICE_LABELS = { strolling: 'Costumed Stilt Walking', … }
api/inquiries.ts:191    canonicalService = SERVICE_LABELS[value] || ''   ← unknown ⇒ ''
                             ▼
server/airtable.ts:59   POST { records:[{fields}], typecast: true }
```

Three consequences:

1. **Change the `<option>` label, never the `value`.** `value="strolling"` is
   the wire contract. Changing it without updating `SERVICE_LABELS` makes
   `canonicalService` return `''`, and `api/inquiries.ts:147` then skips
   `Type of Event` and `Service Requested` entirely. The submission returns
   **201 OK** with the service field blank — a lead that looks fine to the
   sender and is unusable to Brenton. No error, no log.
2. **Adding an LED Performers option requires a paired edit.** A new
   `<option value="led-performers">` with no `SERVICE_LABELS` entry hits the
   same silent-drop path.
3. **`typecast: true` prevents a crash but fragments the data.** Airtable will
   auto-create a new "Stilt Walkers" select option beside the existing
   "Costumed Stilt Walking" rather than rejecting the write. No 422, no 503 —
   but historical leads stay under the old option and reporting splits in two.
   Renaming the option **in Airtable** is a client-side operation and is out of
   scope for this repo (no external mutation). Flag it for Brenton;
   `scripts/setup-airtable.mjs` only affects fresh provisioning.

Also update `scripts/setup-airtable.mjs:56,72,591` (`Costumed Stilt Walking`),
`:76` (drop `Fire Dancing`), and add `LED Performers` to `inquiryServiceChoices`
so a future provision matches the site.

### 4.5 Factual inconsistencies found while sweeping

Not in the acceptance matrix, but they are customer-facing truth defects on
pages already being edited. Recommend fixing in-flight; flag to the client
rather than guessing.

| Claim | Location A | Location B |
|---|---|---|
| Relationship | `About.tsx:29` / `HomeContent.tsx:95` "Husband & Wife team" | `BalloonTwisting.tsx:80` "her **partner** Brenton Keith" |
| Cirque Jolie start year | `About.tsx:177` "Entertaining Since **2003**" | `BalloonTwisting.tsx:83` "Entertaining Since **2000**"; bio says trained 2000, Una left 2004 |
| Jolie tenure | `About.tsx:77` "20+ Years as Cirque Jolie" | `BalloonTwisting.tsx:66` "20+ Years Performing" — with a 2000 start that is 26 years as of 2026 |
| Brenton experience | `About.tsx:43` "25+ Years Performing" | `HomeContent.tsx:11` "more than 30 years" |

---

## §5 Redirect strategy for `/additional-services`

### Role analysis (the acceptance doc requires this before redirecting)

The page is the **sole** home for four offerings:

| Offering | Any other home? |
|---|---|
| Fire & LED Performance | Fire is being removed (T3); **LED becomes `/led-performers` (T2)** |
| Guitardo (roving guitar) | **No** |
| Singing Telegrams | **No** |
| Fairy & Winged Characters | Partially — "themed characters" on `/strolling` |

Inbound internal links: `Navbar.tsx:21`, `Footer.tsx:42`,
`Corporate.tsx:40` (DJ & MC card), `StrollingEntertainment.tsx:858`.
Indexed at priority 0.7 in both `routeMetadata.js:154` and `sitemap.xml:49`.

**Conclusion:** LED is the only offering with a designated successor, and it is
the offering the client asked to promote. `/led-performers` is therefore the
closest-intent destination — but it is a **partial** successor. Guitardo and
Singing Telegrams have no destination at all.

### Recommendation

**301 `/additional-services` → `/led-performers`, and carry the orphans forward.**

1. **`vercel.json`** — add alongside the existing exact aliases:
   ```json
   { "source": "/additional-services", "destination": "/led-performers", "permanent": true }
   ```
   Server-side 301 preserves the 0.7 equity in one hop. This matches the
   established pattern in that file and satisfies "intentional redirect."
2. **`App.tsx`** — mirror it as a client-side alias so in-app navigation and
   direct SPA loads agree:
   ```jsx
   <Route path="/additional-services" element={<Navigate to="/led-performers" replace />} />
   ```
   Place it in the existing "Known internal aliases only" block (`:78-89`).
   Without this, a client-side link to the old path renders `NotFound` even
   though the server would have redirected it.
3. **`routeMetadata.js`** — delete the block. It drops out of `INDEXED_ROUTES`
   automatically, so the build emits 16 documents and no
   `additional-services.html`. **Critical:** a stale generated
   `dist/additional-services.html` would shadow the Vercel redirect, because
   `cleanUrls: true` serves the static file first. The generator only writes
   files for routes present in `routeMetadata.js`, so deleting the block is
   what makes the redirect reachable. Do not leave it in as a noindex route.
4. **`sitemap.xml`** — remove the entry. Advertising a URL that 301s is a
   crawl-budget waste and a Search Console warning.
5. **Rewrite the two in-body links** (`Corporate.tsx:40`,
   `StrollingEntertainment.tsx:858`) to point at real destinations rather than
   ride the redirect. `StrollingEntertainment.tsx:857-860` must also drop
   "fire &" (§2.2). `Corporate.tsx:40` is a **DJ & MC** card pointing at a page
   that is disappearing — `/led-performers` is the wrong target for it;
   repoint to `/contact` or `/corporate#services`.
6. **Do not redirect to `/`.** Corrects Haiku §2.1/§5. `docs/legacy-redirect-map.md`
   already rules this out: a home-page redirect for a content page reads as a
   soft 404 and forfeits the equity the redirect exists to preserve.

### Orphaned offerings — decision required (§9)

Guitardo, Singing Telegrams, and Fairy & Winged Characters lose their only
page. Options, cheapest first:

- **(a)** Absorb into an "Add-ons" block on `/contact` (no new route, no
  sitemap change, keeps them bookable).
- **(b)** Fold characters into `/strolling`; drop Guitardo and Singing
  Telegrams as no-longer-offered.
- **(c)** Keep them on `/corporate`, where DJ/MC already lives.

Silently deleting all three is a scope change the acceptance matrix does not
authorize — it says remove the page from *navigation and discovery*, not
retire the services. Confirm with the client.

---

## §6 Shared-file ownership

Per the acceptance matrix, one integration owner (Codex) controls `App.tsx`,
global nav/footer, redirect config, sitemap, and route metadata. Extending that
list with the couplings found in this audit:

### Codex-only (integration owner)

| File | Why | Wave |
|---|---|---|
| `src/app/App.tsx` | routes + redirect aliases | 3, 5 |
| `src/app/seo/routeMetadata.js` | titles, descriptions, JSON-LD, drives `INDEXED_ROUTES` → sitemap verification | 3 |
| `public/sitemap.xml` | hand-maintained; must match `INDEXED_ROUTES` | 3 |
| `vercel.json` | 301s, headers | 3 |
| `src/app/components/Navbar.tsx` | global nav | 3 |
| `src/app/components/Footer.tsx` | global footer | 3 |
| **`src/app/components/UmbrellaNav.tsx`** | **not just a menu** — `UMBRELLA_SECTIONS` feeds `LandingPage.SERVICE_DECK` | 2 |
| **`src/app/components/LandingPage.tsx`** | `SERVICE_VISUALS`, `grid-cols-7`, protected animation timeline (H1) | 2 |
| **`src/app/components/Lightbox.tsx`** *(new)* | consumed by 5 pages | 1 |
| **`src/app/components/GalleryGrid.tsx`** *(new)* | consumed by 5 pages | 1 |
| **`api/inquiries.ts`** | `SERVICE_LABELS` is the wire contract with `Contact.tsx` (§4.4) | 3 |
| **`shared/site-content.ts`** | fallback content rendered by `LatestMoments` when Airtable is down; `:123` carries the old taxonomy | 3 |
| `scripts/setup-airtable.mjs` | provisioning taxonomy | 3 |
| `public/gallery-view.html` | publicly reachable; references a fire asset (§8.3) | 5 |

### Page-owner scope (Sonnet)

One file each, per the Wave 4 table. Two hard rules:

- **`Contact.tsx`** — a page file, but `<option value>` attributes are a shared
  contract. Change labels only; any value change requires a paired
  `api/inquiries.ts` edit and must be routed through Codex.
- **No page owner may edit `UmbrellaNav.tsx` or `LandingPage.tsx`.** A page
  owner adding an LED chip without the paired `SERVICE_VISUALS` entry produces
  an `<img>` with `src=undefined` and **no alt attribute** — see §3 Wave 2.

---

## §7 Test additions

**The repo has no test infrastructure.** `package.json` declares three scripts
(`build`, `dev`, `verify:seo`) and no runner — no vitest, jest, playwright, or
axe. Two of the four gates named in the acceptance matrix ("internal-link scan"
and "forbidden-claim audit") **refer to tooling that does not exist**. They
cannot pass until written. Ranked by value:

### 7.1 `scripts/audit-forbidden-claims.mjs` — highest value (P0)

Static source audit. Must be **allowlist-aware**, or it will fail on Brenton's
protected fire references and be disabled within a day.

```js
// Fails the build if any pattern matches outside its allowlist.
const RULES = [
  { id: 'taxonomy-stilt',  pattern: /Costumed Stilt Walking/i, allow: [] },
  { id: 'jolie-fire',      pattern: /fire\s*danc|fire\s*performer|fire\s*fans/i,
                           allow: [] },
  { id: 'bare-fire',       pattern: /\bfire\b/i,
    // Brenton's act — §2.1 of docs/claude/opus-integration-review.md
    allow: [
      'src/app/pages/Magic.tsx',
      'src/app/pages/UpcomingShows.tsx',
      'src/app/pages/StrollingEntertainment.tsx:54',
      'src/app/pages/StrollingEntertainment.tsx:55',
    ],
    ignoreTokens: [/confettiFired/, /fireball/] },
  { id: 'kids-magic',      pattern: /children['’]s magic|kids? magic show/i,
    // B10: the /magic cross-sell on the balloon page is required, not forbidden
    allow: ['src/app/pages/BalloonTwisting.tsx:214'] },
  { id: 'bunny',           pattern: /live bunny|bunny rabbit/i, allow: [] },
  { id: 'three-shows',     pattern: /three shows in one/i,      allow: [] },
  { id: 'classically',     pattern: /classically trained circus/i, allow: [] },
];
```

Two properties that make it survive contact with reality: the `bare-fire` rule
is **file-and-line allowlisted** rather than pattern-excepted, so any *new*
fire reference in a protected file still fails; and `ignoreTokens` keeps
`confettiFired` from forcing a needless rename in a protected animation file.

Run over `src/`, `shared/`, `api/`, `public/*.html`, and `scripts/`. Scope
depends on the Wave 0 decision.

### 7.2 `scripts/verify-seo-build.mjs` — close the two gaps (P0)

The existing verifier has a directional hole:

```js
assert(sitemap.includes(`<loc>${canonical}</loc>`), `Sitemap is missing ${route}`);
```

It proves every indexed route is **in** the sitemap. It never proves the
sitemap contains **only** indexed routes. Removing `/additional-services` from
`routeMetadata.js` and forgetting `sitemap.xml` **passes the build today** while
publishing a URL that 301s. Add:

```js
// 1. No stale sitemap entries.
const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map(m => new URL(m[1]).pathname.replace(/\/$/, '') || '/');
for (const p of sitemapPaths) {
  assert(INDEXED_ROUTES.includes(p), `Sitemap advertises non-indexed route ${p}`);
}
assert(sitemapPaths.length === INDEXED_ROUTES.length, 'Sitemap/route count drift');

// 2. No orphaned generated HTML shadowing a redirect (see §5.3).
const redirectSources = config.redirects.map(r => r.source.slice(1));
for (const src of redirectSources) {
  await assertNoFile(path.join(distDir, `${src}.html`),
    `${src}.html shadows its vercel.json redirect under cleanUrls`);
}
```

Check 2 is the one that catches the specific way the Additional Services
redirect can be quietly defeated.

### 7.3 `scripts/scan-internal-links.mjs` (P0 — named gate, does not exist)

Extract every `<Link to="…">` / `<Navigate to="…">` literal from `src/` and
assert each resolves to a route in `App.tsx`, an entry in `vercel.json`
`redirects`, or an explicit allowlist. Catches `Corporate.tsx:40` and
`StrollingEntertainment.tsx:858` the moment `/additional-services` is deleted.

### 7.4 Taxonomy contract unit tests (P1)

First real unit tests. Minimal runner (`vitest`) — three assertions worth more
than the setup cost:

- Every `<option value>` in `Contact.tsx` has a `SERVICE_LABELS` key in
  `api/inquiries.ts`. **Directly prevents the silent blank-service lead of §4.4.**
- Every route in `UMBRELLA_SECTIONS` has a `SERVICE_VISUALS` entry, and every
  resulting `SERVICE_DECK` item has non-empty `image` and `alt`.
  **Prevents the missing-alt `<img>` of Wave 2.**
- Every `UMBRELLA_SECTIONS.route` and every `Navbar`/`Footer` `to` exists in
  `ROUTE_METADATA` or the redirect list.

### 7.5 Accessibility and responsive checks (P1)

- Axe on the 16 built routes, failing on serious/critical.
- Overflow assertion at 360 / 390 / 768 / 1280 / 1440 —
  `document.documentElement.scrollWidth <= clientWidth` (Q2), plus an explicit
  Corporate-card visibility assertion at 1280 (Q3).
- Lightbox keyboard test: open via keyboard, Escape closes, focus returns to
  the trigger, **Tab does not escape the dialog** (the trap added in Wave 1).

### 7.6 Asset-provenance check (P2)

Assert no `public/media/**` path referenced from `src/` matches
`/fire-?danc/i` unless it is under `brenton/`. Catches reintroduction of
`fire-dancing.jpg` and would have caught the duplicate at
`firedancing-cirque-jolie.jpg`.

### 7.7 Not automatable here

Q8 (staging Airtable receipt) and Q9 (production analytics) require a deployed
environment and external mutation, both out of scope for this session. They
must be executed and recorded by the human owner before anyone claims the form
or measurement is live.

---

## §8 Performance and accessibility risks

### 8.1 Shipped weight — `dist/` is 132 MB, of which 131 MB is media

Measured after a clean build.

**Unreferenced originals still copied to `dist/` (~11 MB):**

| File | Size | Note |
|---|---|---|
| `media/umbrella-photo.png` | 2.6 MB | `.webp` (732 KB) is the one used |
| `media/logos/UmbrellaNavigation.png` | 2.1 MB | unused |
| `media/hero-fairy-luau.jpg` | 2.1 MB | `.webp` (146 KB) exists |
| `media/clouds-wipe.png` | 1.8 MB | `.webp` (684 KB) is the one used |
| `media/logos/UmbrellaNav-{sunset-hawaiiana,speakeasy-velvet,coastal-pastel-adult}.png` | 3.4 MB | design explorations |
| `media/Casino-Night-{92,48}-1030x579.jpg` | 1.4 MB | unused |

`public/` is copied wholesale by Vite, so "unreferenced" does not mean
"undeployed." Removing these is pure win and directly serves Q6.

**~30 MB reachable only through a dev tool:** `public/media/brenton/`
`crowd-1/2/3.jpg`, `magic-1/2.jpg`, `gameshow-1/2.jpg` (3.3–4.9 MB each) are
referenced **nowhere in `src/`** — their only referent is
`public/gallery-view.html:9`. See §8.3.

**Protected asset needing conversion:** `brenton/brent-fire-portrait.png` is
577 KB PNG. Keep the content (§2.1), ship it as WebP.

**Inbound pressure:** Haiku §1.2 reports stilt-walker originals up to
5712×4284 / 7.9 MB. Eighteen of these on `/strolling` and 28 on
`/balloon-decor` — if any land un-derived, Q6 fails and LCP collapses. Derive
at ~1600px long edge, WebP/AVIF, metadata stripped, `loading="lazy"` +
`decoding="async"` on everything below the fold.

### 8.2 Bundle and layout

- **`@dnd-kit` ships to production on a public page.** The
  `StrollingEntertainment` chunk is **72.64 KB (23.36 KB gzip)** — the largest
  page chunk by 2×. `EDIT_ENABLED = import.meta.env.DEV` (`:68`) correctly
  gates *behaviour*, but `{editMode && <TwoColumnEditor …>}` gates on **runtime
  state**, so Rollup cannot drop `TwoColumnEditor` and its three `@dnd-kit`
  packages. Confirmed: `DndContext` is present in the built chunk. Guard the
  editor behind `EDIT_ENABLED &&` (a build-time constant) or move it to a
  lazy import, and the tree-shake becomes possible. This matters now because
  Stilt Walkers is about to grow from 4 to 18 images.
- **`grid-cols-7`** (`LandingPage.tsx:369`) — see §3 Wave 2. Prime suspect for
  the Q3 "Corporate card clipped at 1280" gate.
- **`isLastOddItem`** (`UmbrellaNav.tsx:62`) — `col-span-2` + `w-[calc(50%-0.25rem)]`
  for an odd final chip. Verify at 360 after the count changes.
- **`ReducedMotionLanding`** (`:401-402`) — full and compact nav overlapped at
  `-mt-12`. Longer title-case labels (H5) wrap taller; verify at 360 and 768.

### 8.3 `public/gallery-view.html` — three problems in 20 lines

1. It is the **sole reason ~30 MB of unused originals ship** (§8.1).
2. It references `fire-dancing.jpg` (`:10`) — after the fire removal it would
   be the last publicly reachable surface displaying Jolie's fire imagery. It
   is `noindex` via `robots.txt` and `vercel.json`, but noindex is not private.
3. **It is already broken.** Four of its six strolling filenames do not exist:
   `rainbow-clown-stilts.jpg`, `portrait.jpg`, `superhero-stilts.jpg`,
   `moth-costume.jpg` — the real names are `clown-stilt-rainbow.jpg`,
   `jolie-portrait.jpg`, `superhero-stilt.jpg`, `moth-stilt-costume.jpg`.

**Recommendation:** delete the file in Wave 5 and delete the orphaned
originals with it. If it is still wanted internally, move it out of `public/`.

### 8.4 Accessibility

| Issue | Location | Severity |
|---|---|---|
| Gallery images without `loading="lazy"` | `BalloonTwisting.tsx:108,127,181` | **Q5 gate failure today** |
| Lightbox has no focus trap | `StrollingEntertainment.tsx:125-153` | WCAG 2.4.3 — fix in Wave 1 **before** four more pages inherit it |
| `SERVICE_DECK` card may render `alt={undefined}` | `LandingPage.tsx:279` | Latent; triggered by Wave 2 if done wrong |
| Decorative `<img>` with `alt=""` but no `aria-hidden` | `LandingPage.tsx:222,229,230` | Minor |
| `ALL CAPS` menu labels | `UmbrellaNav.tsx:69`, `LandingPage.tsx:282` | Screen readers may spell out short tokens; H5 fixes both |
| Wedge hotspots are `<path onClick>` — not focusable, no role | `PhotoUmbrellaNav.tsx:100-111` | **Dead code**; matters only if revived. Do not revive without keyboard support. |
| `title` prop accepted and never rendered | `Layout.tsx:10-21` | No `<h1>` guarantee per page; verify each page provides its own |

---

## §9 Blockers and decisions required

Ordered by how much work they gate.

1. **Analytics is not instrumented at all (Q9).** Not "unverified" — absent.
   No `gtag`, `dataLayer`, `@vercel/analytics`, or equivalent anywhere. The
   gate requires verified *production collection* for five event types. This is
   net-new work that no one has been assigned in
   `docs/claude-model-assignments.md`. **Decision:** assign it, or explicitly
   descope the gate. It cannot be closed by review.

2. **The two named audit scripts do not exist (Q7).** Internal-link scan and
   forbidden-claim audit are cited as passing gates; `scripts/` contains three
   files and neither is among them. §7.1 and §7.3 specify them. **Decision:**
   assign ownership — these gate the release, not the implementation.

3. **Wave 0 — dead code.** Delete or quarantine? Blocks the audit scope. **Recommend delete.**

4. **Orphaned add-ons (§5).** Guitardo, Singing Telegrams, and Fairy & Winged
   Characters lose their only page. Retire or relocate? **Client decision** —
   removing a page from navigation is not authority to stop offering a service.

5. **Hero (H2/H3/H4).** Everything here depends on whether the supplied
   photography can support a credible composite. The acceptance matrix already
   supplies the fallback: *"retain a clearly marked temporary hero and produce
   a bounded photo-shoot brief."* This is Fable's call in
   `docs/claude/fable-visual-direction.md`, not Sonnet's. **Sonnet must not
   attempt a hero composite before that verdict lands.** Note the blast radius:
   the hero backs `SITE.defaultImage` and four metadata `og:image` entries.

6. **Game Show "wrong singing/casino imagery" (P11).** I could not identify a
   singing image or a casino-branded asset rendering on `/game-show`. Either
   the audio refers to an asset already replaced at `e1531d1`, or to a frame
   inside `/media/video/game-show-only.mp4`, which I cannot inspect statically.
   **Needs the client to point at the specific frame** before anyone claims
   P11 is done.

7. **Airtable option rename (§4.4).** Renaming `Costumed Stilt Walking` →
   `Stilt Walkers` in the base is an external mutation and out of scope here.
   With `typecast: true` the site will not break, but reporting will split
   across two options. Hand to Brenton with the exact option names.

8. **`client-assets/` is not in `.vercelignore`.** The acceptance matrix says
   these are "ignored by Git and deployment." Git: yes, as of the uncommitted
   `.gitignore` change. Deployment: the directory is absent from
   `.vercelignore`, so a CLI `vercel deploy` would upload ~116 MB of raw client
   originals to the build machine. They would not be *served* (Vite only copies
   `public/`), so this is hygiene rather than exposure — but the stated
   invariant is not actually enforced. One line fixes it.

---

## Appendix — quick reference

**Never touch (regression surfaces):** `LandingPage.tsx` scroll timeline,
`RainEffect`, `Rainbow`, `Sun`, `Clouds`, `LightningFlash` · `Magic.tsx:133,194`
· `UpcomingShows.tsx:82` · `StrollingEntertainment.tsx:54,55` ·
`BalloonTwisting.tsx:214` · `GameShow.tsx:217,258` · `Casino.tsx` structure ·
`AdditionalServices.tsx:56` (relocate before deleting).

**Paired edits that must never be split:**

| If you change… | You must also change… |
|---|---|
| `UMBRELLA_SECTIONS` | `SERVICE_VISUALS` **and** the `grid-cols-7` literal |
| `routeMetadata.js` route set | `public/sitemap.xml` |
| A route removed from `routeMetadata.js` | `vercel.json` redirect + `App.tsx` `<Navigate>` alias |
| `Contact.tsx` `<option value>` | `api/inquiries.ts` `SERVICE_LABELS` |
| Customer-facing service taxonomy | `shared/site-content.ts` + `scripts/setup-airtable.mjs` |
| The hero asset | 4 `og:image` entries + `SITE.defaultImage` |

**Baseline to preserve:** `npm run build` → 15 canonical documents, 1 noindex
route, 404.html, SEO verifier green. After Wave 3 the expected count is **16**.
