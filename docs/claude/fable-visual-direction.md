# Fable 5 — Visual direction and authentic asset selection

Date: 2026-08-12
Scope: visual/asset review only. No application code was edited. All recommendations
name exact source files under `client-assets/email-selected/` (client-weighted, highest
image authority per the acceptance matrix) or existing `public/media/` files retained
only where uniquely useful. Implementation belongs to Sonnet/Codex per
`docs/claude-model-assignments.md`.

---

## 1. The two audio-confirmed identifications

### About page — the shaka image (CONFIRMED)

**`client-assets/email-selected/about-jolie/03-AE2B4FF0-F702-4507-BA94-70137BAB29BB_1_105_c.jpg`** (1086×724)

Jolie photographed from above in a ring of twisting balloons, rainbow flower crown,
striped rainbow-trim shirt with a rainbow-heart patch, right hand throwing an
unmistakable shaka beside her face. Of the three files in `about-jolie/`
(mapped from the "Pics of Jolie" email folder), this is the **only** frame with a shaka —
`01-BB966A39…` is a peek-through-balloons shot and `02-56115028…` is arms-outstretched
in the balloon pool. No ambiguity. This replaces
`public/media/about/jolie-strickland-portrait.webp` in the Jolie bio slot.

Crop note: the source is landscape 3:2 and the About bio slot is `aspect-[4/5]`
portrait (`src/app/pages/About.tsx:76`). A centered 4:5 crop **loses the shaka hand**.
Either (a) change this slot to `aspect-[4/3]`/landscape — visually fine since the
Brenton slot is in a separate section, or (b) crop 4:5 with the crop window centered
around x ≈ 42% so both the face (center-right) and shaka hand (center-left) survive.
Option (a) is safer; the composition is radial and crops poorly to a tall rectangle.

### Casino NITE — the Christmas poker-table photo (CONFIRMED)

**`client-assets/email-selected/brenton-july-photos/16-24280C86-9229-4A1E-840B-AE8AD476BBD7_1_105_c.jpg`** (832×946)

Octagonal green-felt poker table ringed by eight white resin folding chairs on a
stone lanai, decorated Christmas tree with silver garland directly behind it, warm
golden-hour light. This is the only true poker table + Christmas tree frame in
Brenton's July photos. A second holiday frame,
`15-6FDBB88D-C184-4C98-8CF4-10F87116AE0B_1_105_c.jpg` (Christmas-decorated casino
*room*: roulette, blackjack, holiday balloon backdrop), is a strong supporting wide
shot but is not "the poker-table photo." Use 16 in the Casino NITE gallery replacing
one of the generic/irrelevant table shots (see §4).

---

## 2. Hero — real-photo composition that keeps the animation

### What's wrong today

`src/app/components/Hero.tsx:35` renders `/media/hero-fairy-luau.webp` — an
AI-generated composite (uncanny crowd faces, an invented iridescent fairy costume
Jolie does not own, an AI-invented "Brenton"). The **red Spider-Man/Elmo-like
artifact** sits at the far-left edge of the frame, next to the lamppost, in both
`hero-fairy-luau.webp` and its sibling `hero-reigning-entertainment.webp`
(~x=60px at the horizon line). All three AI plates should be retired together:
`public/media/hero-fairy-luau.webp`, `hero-fairy-luau.jpg`,
`hero-reigning-entertainment.webp`, `hero-reigning-mobile.webp`.

### What to keep (untouched)

The entire animation shell is good and must survive the swap unchanged:
- `RainEffect` canvas (already honors `prefers-reduced-motion` and Save-Data — keep).
- The umbrella (`/media/umbrella-photo.webp` inside `UmbrellaNav`), its open/sway
  animation, the rainbow/menu concept, the logo, scroll-linked vignette and warm
  rim-light gradients.
- The scroll choreography in `Hero.tsx` (rain fades, umbrella scales, text rises).

### Recommended composition: photographic plate, not cut-out collage

Do **not** cut out figures and paste them under the umbrella — that reproduces the
uncanny problem with real faces. Instead swap the background *plate* for one real
photograph and let the existing overlays (rain, vignette, umbrella, rim light) do the
compositing. Nothing is invented; the scene is real end-to-end.

**Desktop plate:**
`client-assets/email-selected/stilt-walkers/13-IMG_6689.jpg` (1179×780, landscape)

This is the single best photograph in the entire client set for the brand: Jolie on
stilts in her real rainbow candy-stripe costume at golden hour, holding a **balloon
jellyfish canopy overhead that reads as an umbrella silhouette** — it rhymes with the
umbrella nav directly above it — surrounded by a real, laughing crowd, sun flaring
through the trees. Professional shot (visible "Bruce Forrester" watermark, bottom
right). Grade it darker toward the edges (the existing vignette already does most of
this) so the white hero type and umbrella stay dominant; set `objectPosition` around
`45% 35%` so Jolie and the jellyfish sit just off-center under the umbrella.

Two honest flags:
1. **Resolution.** 1179×780 is an email-compressed copy. It will read acceptably
   full-bleed at 1280 under the dark grade, but it is marginal at 1440+. Request the
   original export (the photographer's file or the Drive original) before shipping;
   if unavailable, ship it graded dark and note it in the closeout.
2. **Credit.** Do not crop or clone out the watermark. Keep it, or better, add a small
   "Photo: Bruce Forrester" credit in the hero footer area and confirm usage with the
   clients — they supplied it, but the closeout should record that.

**Mobile plate:**
`client-assets/email-selected/stilt-walkers/07-IMG_1596.jpg` (2372×4877, portrait)

Dusk beachfront: Jolie on stilts in her real hula/foliage costume, lei crown, arms
open, glowing moon-lamp behind her, palms and ocean sunset behind. Natively portrait
and high-resolution — a straight 9:16 crop (center x, bias y toward her face at
~28% from top) needs no compositing at all. This replaces `hero-reigning-mobile.webp`.

**Brenton at hero level.** The plate approach features Jolie; Brenton should not be
cloned into the frame. Give him equal first-screen weight immediately below the hero
instead — the existing `DualProfileReveal` component is the right vehicle:
- Brenton panel: `client-assets/email-selected/brenton-july-photos/01-7E67D76B-F53A-405D-A3AC-2732761D7C1E_1_105_c.jpg`
  (Brenton mid-gesture behind a craps table, laser-lit wall, LED speaker rigs —
  804×978, portrait, charismatic and unmistakably him).
- Jolie panel: the shaka image (§1) or `about-jolie/02-56115028…` if the shaka is
  reserved for About.

**Fallback.** If Codex judges the 1179px plate unshippable at desktop widths and no
original can be sourced, follow the acceptance matrix: keep a clearly-marked
temporary hero and write a bounded photo-shoot brief — one golden-hour setup,
Jolie on stilts + Brenton at a roulette table under the real rainbow umbrella,
landscape 3:1 safe-area, faces in the center 50%. Do not generate an interim AI image.

### Service-menu typography (under the umbrella)

Current buttons (`UmbrellaNav.tsx:69`) are `0.66rem`, bold, ALL-CAPS, tracked wide —
exactly the "small and shouty" pattern the audio asked to soften. Recommend:
- Title case labels ("Balloon Twisting & Face Painting", "Stilt Walkers" — note the
  rename from "Costumed Stilt Walking" at `UmbrellaNav.tsx:30`, plus the new
  "LED Performers" entry).
- Size up to `0.9375rem` mobile / `1.0625rem` desktop, weight 500–600 (Poppins
  Medium/SemiBold, already loaded), `tracking` no wider than `0.02em`, generous
  `leading-snug`, `min-h-12` tap targets kept.
- Let long labels wrap to two centered lines rather than shrinking type; the 2-col
  mobile grid → wrapping flex row already stacks correctly, keep it.
- **Corporate Entertainment** must read as a planner shortcut, not an eighth act:
  pull it out of the grid, render it full-width beneath the act buttons in the coral
  accent (`--color-coral`) with an arrow affordance, so the act menu is 7 peers + 1
  distinct pathway.

---

## 3. Cloud wipe (`CloudReveal.tsx`)

Keep the mechanic — the split-cloud parting is on-brand (clouds → reveal) and it is
scroll-driven, so it degrades acceptably under `prefers-reduced-motion` (no time-based
loop). Three fixes:

1. **Swap the reveal image.** It currently reveals legacy
   `/media/strolling/silver-white-stilt.jpg` with copy mentioning "aerial arts."
   Reveal `client-assets/email-selected/led-performers/05-418594A9-FAAB-408D-8BA9-2666BFD40BAC_1_102_a.jpg`
   (1778×1768 — six LED-wing performers glowing gold against dusk palms). It is the
   most cinematic frame in the client set, it advertises the *new* LED Performers
   page, and the dark-sky image reads far better behind parting clouds than the
   current daylight shot. Card copy should link to `/led-performers`.
2. **Tone the shell.** `bg-sky-300` flashes bright blue against the site's slate-950
   theme; use a deep slate/indigo dusk tone so the wipe feels like night sky, not a
   weather app.
3. **Restraint.** Drop the all-caps 6xl "REVEAL THE MAGIC" overlay to a smaller
   title-case line, or remove it — the parting clouds are the delight; captioning
   them undercuts it.

---

## 4. Slot-by-slot asset ranking (exact filenames)

All paths below are relative to `client-assets/email-selected/`. Ship only optimized,
metadata-stripped derivatives into `public/media/` (WebP/AVIF + JPEG fallback, sized
to display use). Files with the `_4_5005_c` suffix are low-resolution thumbnails —
flagged inline; never place them in a slot larger than ~320px.

### Home / hero
| Slot | File | Note |
|---|---|---|
| Desktop hero plate | `stilt-walkers/13-IMG_6689.jpg` | §2; request full-res original; keep Bruce Forrester credit |
| Mobile hero plate | `stilt-walkers/07-IMG_1596.jpg` | native portrait, 2372×4877 |
| Duo band – Brenton | `brenton-july-photos/01-7E67D76B-F53A-405D-A3AC-2732761D7C1E_1_105_c.jpg` | craps table, laser lights |
| Duo band – Jolie | `about-jolie/02-56115028-83B0-491A-97B5-447F8BA25CE9_1_105_c.jpg` | balloon-pool arms-open; keeps shaka exclusive to About |
| Retire | `public/media/hero-fairy-luau.webp/.jpg`, `hero-reigning-entertainment.webp`, `hero-reigning-mobile.webp` | AI composites incl. red far-left artifact |

### About
| Slot | File | Note |
|---|---|---|
| Jolie portrait | `about-jolie/03-AE2B4FF0-F702-4507-BA94-70137BAB29BB_1_105_c.jpg` | the shaka image (§1); landscape crop guidance above |
| Brenton portrait | keep `public/media/about/brent-umbrella-beach.jpg` | real photo, umbrella motif — uniquely useful |
| Together band | keep `public/media/472753445_…n.jpg` (4th of July duo) + `public/media/598419647_…n.jpg` (holiday crew) | both real; no client-selected frame shows the two of them more clearly |

### Casino NITE (`Casino.tsx` — design is praised; change images, not layout)
Ranked insertions from `brenton-july-photos/`:
1. `16-24280C86-…_1_105_c.jpg` — **the Christmas poker table** (§1). Replace
   `casino-gameshow/casino-craps-table.jpg` in the 4-up gallery.
2. `01-7E67D76B-…_1_105_c.jpg` — Brenton behind craps table, laser wall (if not used
   in the Home duo band; do not duplicate).
3. `08-569C5DC3-…_1_105_c.jpg` — dealer with seated players, real event energy.
4. `07-AA0D848E-…_1_105_c.jpg` — two performers flanking the CASINO NITE neon sign,
   red curtain — strong brand frame.
5. `15-6FDBB88D-…_1_105_c.jpg` — holiday casino room wide (alternate for
   `casino-nite/full-room-setup-maui.webp`).
6. `09-288C1EDA-…_1_105_c.jpg` — overhead of full tables in play (alternate for
   `tables-overhead-maui.webp`).
Keep `casino-nite/dealer-team-roulette-maui.webp` (hero/fallback) — it is real and
composed for wide crops. These email files are 800–1200px: gallery/card slots only,
not full-bleed heroes.

### Game Show NITE / LITE
- Add `brenton-july-photos/05-C6441D69-…_1_102_a.jpg` (hosts at the LED podium with
  gold balloon garland) to the NITE section.
- `brenton-july-photos/13-F024B9D8-…_1_105_c.jpg` (Gameshow Fanatics sign overhead,
  room-scale) supports LITE's tighter-space/scalable positioning.
- Remove any singing/karaoke or casino frames from this page (Haiku's inventory will
  enumerate); keep the Instagram link.

### Balloon Twisting & Face Painting (one page, photo-forward, balanced)
Alternate twisting and painting frames so neither dominates. **Do not use any
`balloon-decor/` image here** (acceptance rule), and remove
`public/media/balloons/octopus-balloon-sculpture.jpg` (octopus feature is cut).

Twisting picks from `balloon-twisting/` (ranked):
1. `09-IMG_0258.jpg` (2111×3170) — girl beaming with mermaid-doll balloon; best
   single frame, works as page lead.
2. `04-7F18248D-…_1_102_a.jpg` — parent + toddler with lion balloon (family reach).
3. `02-FB50CE54-…_1_102_o.jpg` — elderly guest with monkey + flower (proves the
   adult/resort/senior market claim in one image).
4. `07-3BDABD60-…_1_105_c.jpg` — boy with monkey-palm balloon at a big indoor event.
5. `08-83171377-…_1_102_o.jpg` — Jolie with Stitch balloon (artist visible).
6. `01-52FA3471-…_4_5005_c.jpg` — sculpture lineup display — **low-res (thumbnail
   only)**.

Face-painting picks from `face-painting/` (ranked):
1. `12-23FDDFF4-…_1_102_a.jpg` (1536×2048) — Jolie in flower crown beside a freshly
   painted child; the only frame showing artist + client together. Lead image.
2. `10-5456DB8F-…_1_105_c.jpg` — rainbow butterfly girl outdoors, soft light.
3. `08-27D92294-…_1_105_c.jpg` — adult Grinch face — proves adult/corporate range.
4. `14-BFBA6496-…_1_102_a.jpg` — matching tiger-face pair.
5. `05-E13F5628-…jpg` — painted koi arm art with "Cirque Jolie" shirt in frame
   (organic branding).
6. `03-E8F3EDED-…_1_105_c.jpg` — beachfront mermaid-scale face, resort context.
Low-res flags: `06-38003B37-…_4_5005_c.jpg` (480×360), `07-07C65DEC-…_4_5005_c.jpg`,
`09-89C4597B-…_4_5005_c.jpg` — thumbnails or skip.
Cross-sell card to Brenton's magic: reuse `public/media/magic/brent-jolie-stage.jpg`
(both on stage, real).

### Balloon Decor (curated gallery/lightbox from all 28 — count verified, 28 files)
Feature row (4 anchors):
1. `balloon-decor/01-D4D981A4-EEF0-45B2-952F-40CC48CC8816_1_102_a.jpg` (1536×2048) —
   full rainbow proscenium arch over a stage, Jolie arms raised beneath it. The
   umbrella/rainbow brand in balloon form: page lead.
2. `balloon-decor/02-89E88E66-E83B-48FE-AD21-849CBA436FAD_1_102_a.jpg` — gold/tropical
   flower arch sweeping across a resort lobby.
3. `balloon-decor/03-F67236FE-B9FD-404F-8422-0B517CC11463_1_102_o.jpg` — rainbow
   garland arch over an outdoor path (natural light, depth).
4. `balloon-decor/20-71F51069-B4CD-457C-BE76-6369E80E8D81_1_102_a.jpg` — glowing
   UV rainbow arch over stairs — the "wow, that's lit" closer.
Then the remaining 24 in a lightbox, grouped by theme so the range reads as intent:
seasonal (`17-D74E79A2` Halloween pumpkins, `18-BFF8EC5A` spider-web, `13-CB21A142`
Alice rabbit, `11-58E58845` NYE 2025, `10-26F2405F` casino red-curtain), patriotic
(`08-4AE8E61A`, `09-0B41B6C2`), elegant metallics (`04-BD3CBCA0`, `14-B079C6C1`,
`16-65876FC9`), tropical/resort (`02-1C516E9E`, `04-526D0EEF`, `07-927B4180`),
playful (`12-7349F6CD` candyland, `06-75E928A0` tiki head, `15-0826FD72` daisy lawn,
`19-B3ECEC3B`, `21-C594E08E`, `22-5C945691`, `23-6C6414D6`, `05-F9539182`,
`01-308A14FB`, `03-6C3D46F0`).
Low-res flag: `24-B487DF71-…_4_5005_c.jpg` is 524×328 — lightbox thumbnail only, or
omit. Strengthen the Instagram CTA at the gallery end ("See this week's installs").
Keep `public/media/balloon-decor/balloons-of-aloha.jpg` for the community-program
block only.

### Stilt Walkers (renamed page — Jolie's 18 Drive images, count verified, 18 files)
Remove from this page: `public/media/strolling/fire-dancing.jpg` (Jolie fire — banned
site-wide) and `public/media/brenton/brent-fire-portrait.png` (fire imagery lives only
inside Brenton's magic act context, not here).
Hero: `stilt-walkers/02-FEA3776D-7CD9-4F59-8B0D-5EDE65875E03.png` (1535×1024) — three
winged stilt walkers (orange/green/gold) under a monkeypod tree, daylight, wide.
Gallery ranking:
1. `04-IMG_0954.jpg` — crimson pleated wings above a real crowd (828px — card size).
2. `13-IMG_6689.jpg` — jellyfish sunset (only if NOT used as Home hero — never both).
3. `06-IMG_1520.jpg` — sea-goddess pair at resort pool.
4. `12-IMG_6318.jpg` — monarch butterfly wings at the Maui County Fair gate.
5. `10-IMG_4420.jpg` — blue pearl-jellyfish pair, ballroom.
6. `16-IMG_9282.jpg` / `17-IMG_9286.jpg` — glowing jellyfish headdress on dark
   stage (pick one; near-duplicates).
7. `07-IMG_1596.jpg` — hula dusk (only if not the mobile hero).
8. `01-83E27970-…png` — winged trio at tent (alternate to 02; don't run both).
9. `11-IMG_4525.jpg` — white wings + patriotic stilts with child.
10. `18-IMG_9773.jpg` — whale-mural duo (Maui sense of place).
Remainder (`03-IMG_0790`, `05-IMG_1349`, `08-IMG_2913`, `09-IMG_2972`,
`14-IMG_6818`, `15-IMG_7446`) into the lightbox.

### LED Performers (new page, `/led-performers` — six files, count verified)
1. Hero: `led-performers/05-418594A9-FAAB-408D-8BA9-2666BFD40BAC_1_102_a.jpg`
   (1778×1768) — six gold LED wing performers, dusk palms (if used in the cloud wipe,
   use `06-B84EBCA3-BA87-47A8-B74F-A8C9D10F6CFC_1_105_c.jpg` — same troupe, wider
   sky — as the page hero instead; don't duplicate).
2. `01-8A29A9D3-…_1_102_o.jpg` (1751×1796) — LED hoop aerial performance.
3. `02-481E0262-…_1_105_c.jpg` — LED poi spinner, Cirque Jolie watermark (890×880 —
   card size).
4. `03-6460CAB9-…_1_102_a.jpg` + `04-AD516644-…_1_105_c.jpg` — ballroom wing
   formations (event-fit proof for indoor corporate).
Page stays focused: hero, one 4-up gallery, event-fit copy (indoor/outdoor, dusk
timing), inquiry CTA. No lightbox needed for six images.

### Corporate
Replace `public/media/strolling/fire-dancing.jpg` at `Corporate.tsx:209` (fire ban)
with `stilt-walkers/01-83E27970-…png` (winged trio under tent — reads "resort
program") or `led-performers/03-6460CAB9-…_1_102_a.jpg` (ballroom formality).

---

## 5. Gallery rhythm, mobile crops, restrained delight

**Rhythm.** The site's existing pattern — 2-up feature row, then 3/4-up square grid —
is right; the discipline to add is *alternating scale and subject*: every gallery
should open with one large emotional frame (a face), follow with two context frames
(room/scale), and repeat. Never place two near-duplicate frames adjacently
(e.g. stilt 16/17, the two winged-trio PNGs). Portrait client files (most of
Brenton's July set, decor 01-D4D9, face-paint 12) belong in 4:5 cards; reserve
square crops for detail shots. Lazy-load everything below the first row; lightboxes
must be keyboard-operable (the acceptance gate already requires this).

**Mobile crops.** Almost all client selects are portrait or square — mobile-friendly
by default. The three that need explicit `object-position`:
- `13-IMG_6689.jpg` (hero): mobile fallback crop centered x≈45%, y≈35% keeps Jolie +
  jellyfish; better, serve `07-IMG_1596.jpg` via `<picture>` at <768px.
- `about-jolie/03` (shaka): see §1 — landscape slot or x≈42% crop.
- `stilt-walkers/02…png` (page hero): safe center crop; the trio spans the middle 60%.
At 360/390px, gallery grids should collapse to a single column of 4:5 cards, not 2-up
squares — the faces in these photos are the product; don't shrink them below ~160px.

**Restrained delight.** The delight budget is already spent well on rain + umbrella +
cloud wipe. Everything else should calm down so those three land:
- Keep hover treatments to a single behavior (existing subtle scale on `group` images
  is fine); no additional parallax inside galleries.
- The umbrella sway (±0.4°, 6s) is lovely — keep; do not add motion to the balloon
  bookends or menu buttons beyond the existing 0.5px hover lift.
- One new micro-moment, free of charge: the shaka image on About is the personality
  beat of the whole site — give it a caption ("Jolie says aloha") and nothing animated.
- `prefers-reduced-motion`: RainEffect already returns null; the Hero's infinite
  umbrella sway should also gate on `useReducedMotion` (it currently does not —
  `Hero.tsx:71` runs an infinite `animate` regardless). Flag for Sonnet.

---

## 6. Honest ambiguities and open flags

1. **Hero plate resolution** — `13-IMG_6689.jpg` is 1179×780 (email copy of a pro
   photo). Marginal at 1440px full-bleed. Action: source the original; otherwise ship
   dark-graded with the documented caveat, or fall back to the temporary-hero +
   photo-shoot-brief path in the acceptance matrix.
2. **Photographer credit** — "Bruce Forrester" watermark on 13-IMG_6689. Usage was
   implied by the client sending it, but the closeout should record confirmation and
   the credit treatment. Do not clone the watermark out.
3. **Brenton in the hero** — no supplied photograph shows Brenton and Jolie together
   in a hero-grade composition. Rather than fake one, I recommend the plate + duo-band
   structure (§2). If the clients insist both faces appear inside the hero frame
   itself, that is the photo-shoot-brief scenario.
4. **Low-res thumbnails** — every `_4_5005_c` file I sampled is ≤524px
   (`balloon-decor/24`, `face-painting/06/07/09`, `balloon-twisting/01`). Haiku's
   inventory should confirm the full list; none may exceed ~320px display.
5. **Near-duplicates** — stilt 16 vs 17 (same jellyfish stage moment), stilt PNG 01
   vs 02 (same trio, two setups), decor 15 vs the daisy-arch legacy
   `public/media/balloon-decor/tropical-arch-resort*.jpg` pairs. Pick one of each;
   the acceptance matrix forbids duplicated subjects without a reason.
6. **`about-jolie/01` vs `03`** — same shoot; 01 has a hand near the face that could
   be mistaken for a shaka at thumbnail size. The audio-confirmed shaka is
   unambiguously **03** (clear thumb-and-pinky extension). Noting so nobody swaps
   them during optimization.
7. **Legacy `casino-gameshow/casino-group-photo.jpg` and `casino-blackjack-table.jpg`**
   — real photos, but Brenton's July set now covers both subjects with client-weighted
   frames; retain only if a responsive slot needs their exact aspect.
8. **CloudReveal copy** — the revealed card text mentions "aerial arts"; I found no
   aerial imagery in the client set beyond the LED hoop frame. Copy owner should
   verify the claim or soften it.

— Fable 5, visual direction. No application code, public assets, or external state
were modified.
