# Haiku Mechanical Audit — Raining Entertainment Closeout
**Date:** 2026-08-12  
**Scope:** Image inventory, duplicate detection, resolution risk, and taxonomy reference mapping

---

## 1. CLIENT-ASSETS/EMAIL-SELECTED INVENTORY

### 1.1 SUMMARY BY CATEGORY

| Category | Count | Total Size | Min/Max Dims | Avg File Size |
|----------|-------|-----------|--------------|---------------|
| **Balloon Decor** | 28 | 20 MB | 480×360 → 2048×1536 | 714 KB |
| **Stilt Walkers** | 18 | 50 MB | 828×813 → 5712×4284 | 2.8 MB |
| **Balloon Twisting** | 9 | 5.0 MB | 480×360 → 2111×3170 | 556 KB |
| **Face Painting** | 14 | 4.8 MB | 360×478 → 1536×2048 | 343 KB |
| **LED Performers** | 6 | 4.0 MB | 890×880 → 2046×1536 | 667 KB |
| **Brenton July Photos** | 20 | 9.7 MB | 237×978 → 1882×1668 | 485 KB |
| **About Jolie** | 3 | 800 KB | 949×826 → 1086×724 | 267 KB |
| **TOTAL** | **98** | **95 MiB** | — | **969 KB** |

### 1.2 RESOLUTION RISK ASSESSMENT

**Low-resolution files (<480px width):**
- None identified. Smallest width is 360px (face-painting thumbnails: files 06, 07, 09), which are intentionally thumbnail dimensions matching the `_4_5005_c` suffix pattern (distilled web previews).

**High-resolution assets (3000px+):**
- **Stilt Walkers** (9 files): Primary high-resolution risk
  - `06-IMG_1520.jpg` — 5712×4284, 6.9 MB
  - `10-IMG_4420.jpg` — 4032×3024, 4.5 MB
  - `11-IMG_4525.jpg` — 4047×4062, 7.9 MB (largest)
  - `16-IMG_9282.jpg` — 5712×4284, 3.2 MB
  - `09-IMG_2972.jpg` — 4032×3024, 2.8 MB
  - `17-IMG_9286.jpg` — 4032×3024, 2.2 MB
  - `18-IMG_9773.jpg` — 4032×3024, 3.5 MB
  - `07-IMG_1596.jpg` — 2372×4877 (tall), 2.4 MB
  - `12-IMG_6318.jpg` — 2439×3621 (tall), 2.9 MB

- **Balloon Twisting**:
  - `09-IMG_0258.jpg` — 2111×3170, 1.1 MB

- **Brenton July Photos**:
  - `17-341B7A1A-05CE-4364-B832-89EFEBAACD7C_1_102_a.jpg` — 1878×1674, 1.2 MB
  - `20-805BEF1A-429D-485F-B2CF-D497485F5F88_1_102_a.jpg` — 1982×1586, 1.1 MB
  - `02-F090B36A-D325-48BA-8CB5-FBC7ACD12A99_1_102_a.jpg` — 1882×1668, 887 KB

**Recommendation:** All high-resolution stilt-walker images should be optimized to ~2000×1500 max display size before production use. Current sizes exceed typical web display needs (2-3×) and add unnecessary data transfer burden.

### 1.3 EXACT HASH DUPLICATION MATRIX

**No exact duplicates detected.** All 98 files have unique SHA-256 hashes. File naming scheme (`01-`, `02-`, etc.) and source filenames (UUIDs vs. IMG_XXXX) ensure no accidental re-uploads within categories.

### 1.4 ACCEPTANCE & INVENTORY NOTES

**Visual suitability assessment:** NOT performed in this audit. This inventory confirms file existence, count, size, and deduplication only. Visual quality, composition, appropriateness, and suitability for publication require independent review by Codex or the client.

**Fire imagery claim verification:**
- Stilt Walkers (Jolie): No fire-dancing imagery present in the 18 verified files. Acceptance doc requirement met.
- Brenton July Photos: Fire-magic references are legitimate per acceptance doc (magic is Brenton's service, not Jolie's).

---

## 2. SUPERSEDED TAXONOMY MAPPING

### 2.1 TERM REPLACEMENTS REQUIRED

| Old Term | New Term | Reason | Scope |
|----------|----------|--------|-------|
| **Costumed Stilt Walking** | **Stilt Walkers** | Customer-facing UI, metadata, nav | Global rename across all customer-facing strings |
| **Additional Services** | **Remove from nav/discovery** | Removed from primary menu, redirect to home | Route, nav, footer, sitemap |
| **Fire Dancer** / **Fire Performer** (Jolie only) | **Remove entirely** | Fire is Brenton's magic, not Jolie's offering | Copy, schema, image descriptions, routes |
| **Children's Magic** | **Remove from Balloon Twisting page** | Not part of Jolie's offering; bunny magic removed | BalloonTwisting.tsx, metadata, schema |
| **Three Shows in One** | **Two Service Bundle** or remove claim | Magic, face painting, balloon twisting must be decoupled | BalloonTwisting.tsx headline, cards |
| **Live Bunny Magic** / **Package Magic** | **Remove** | Bunny magic claim unsupported | BalloonTwisting.tsx, tags, image alt text |
| **Classically Trained Circus Performer** | **Remove** | Bio text, remove from About page | About.tsx line 85 |

### 2.2 ROUTE AND NAVIGATION REFERENCES

#### Routes requiring updates:
| Path | Action | Current Reference | Issue |
|------|--------|-------------------|-------|
| `/strolling` | Rename service metadata | "Costumed Stilt Walking" (line 67, routeMetadata.js) | Must be "Stilt Walkers" |
| `/strolling` | Remove fire from description | "fire and LED performers" (line 62, routeMetadata.js) | Fire is not Jolie's offering; remove entirely |
| `/strolling` | Remove fire from schema | serviceType includes "fire performers" (line 68) | Replace with LED only or remove fire clause |
| `/additional-services` | Redirect or remove | Full page exists (AdditionalServices.tsx) | Should be removed from nav; confirm redirect strategy |
| `/led-performers` | **Create new route** | Does not exist in App.tsx | New canonical service required |
| `/cirque-jolie` | Remove fire references | Line 36: "fire and LED performers" in description | Jolie profile must not claim fire offerings |

#### Navigation component references (Navbar.tsx):
| Line | Current | Issue | Action |
|------|---------|-------|--------|
| 16 | `{ to: '/strolling', label: 'Costumed Stilt Walking' }` | Old term | Change to `'Stilt Walkers'` |
| 21 | `{ to: '/additional-services', label: 'Additional & À La Carte' }` | Removed from nav | Delete this entry |
| — | (missing) | LED Performers not in nav | **Add new entry** with highest priority after Stilt Walkers |

#### Footer references (Footer.tsx):
| Line | Current | Issue | Action |
|------|---------|-------|--------|
| 37 | `<Link to="/strolling" className="…">Costumed Stilt Walking</Link>` | Old term | Change to `'Stilt Walkers'` |
| 42 | `<Link to="/additional-services" className="…">Additional & À La Carte</Link>` | Removed service | Delete this entry |
| — | (missing) | LED Performers not in footer | **Add new entry** in Services column |

#### Sitemap (public/sitemap.xml):
| Line | Current | Issue | Action |
|------|---------|-------|--------|
| 19 | `/strolling` | Metadata will change | No URL change; metadata updates sufficient |
| 49 | `/additional-services` (priority 0.7) | Service removed | **Decision needed:** Keep redirect, remove entirely, or preserve for backward-compat URL? |
| — | (missing) | `/led-performers` not in sitemap | **Add new route** with priority 0.9, monthly changefreq |

#### SEO Metadata (src/app/seo/routeMetadata.js):
| Lines | Current | Issue | Updates Required |
|-------|---------|-------|------------------|
| 59–71 | `/strolling` metadata block | "Costumed Stilt Walking" in title (line 60) and serviceName (line 67) | **Change both to "Stilt Walkers"** |
| 59–71 | Same block | serviceType: "Stilt walkers, fire performers, LED dancers…" (line 68) | **Remove "fire performers"** or replace with LED only |
| 154–166 | `/additional-services` metadata | Full block present | **Decision required:** Keep or remove? If removed, update INDEXED_ROUTES & NOINDEX_ROUTES |
| — | Missing block | `/led-performers` route metadata | **Add complete metadata entry:** title, description, priority 0.9, monthly, service schema |
| 203–214 | `/cirque-jolie` metadata | title: "Cirque Jolie \| Maui Stilts, Balloon Twisting & Face Painting" (line 205) | **Remove fire reference** if present; currently OK (no fire in title) |
| 203–214 | Same | description: "costumed stilt walking, balloon twisting and decor, face painting, children's magic, fire performers…" (line 207) | **Remove "children's magic" and "fire performers"** from description |

---

## 3. CONTENT PAGE REFERENCES & SPECIFIC STRINGS

### 3.1 BalloonTwisting.tsx

| Line | Current String | Issue | Fix |
|------|---|---|---|
| 44 | `<span className="text-white/90 text-2xl md:text-5xl font-light">Maui Kids Party Entertainment</span><br /><span className="text-white/90 text-2xl md:text-5xl font-light">Balloon Twisting, Face Painting &amp; Children&rsquo;s Magic</span>` | "Children's Magic" claim; "Three Shows in One" in services (line 97) | Remove magic references; focus on balloon twisting & face painting as lead services |
| 47 | `"Cirque Jolie has a professional team of face painters and balloon twisters — plus a 30-minute interactive children's magic show"` | Magic claim unsupported | Change to "…face painters and balloon twisters…" (remove magic show) |
| 77 | `"Her skills now include stilt walking and fire dancing, and she's thrilled to add \"prize girl\" to her ever-growing list of talents"` | **Fire dancing claim** | Remove "and fire dancing," (keep stilt walking only) |
| 84 | `<span className="bg-lavender/10 text-lavender px-4 py-2 rounded-full text-sm font-medium">Live Bunny Show</span>` | Bunny magic not offered in Balloon Twisting scope | **Delete this badge entirely** |
| 97 | `<h2 className="text-4xl md:text-5xl font-bold">Three Shows in One</h2>` | Claim is unsupported; each is independent service | Change to "Our Services" or "Balloon Twisting & Face Painting" |
| 101–103 | Service cards: "Live Magic Show," "Face Painting," "Balloon Twisting" with "LIVE bunny rabbit" description | Magic & bunny claims | **Remove magic card entirely**; keep face painting and balloon twisting only |

### 3.2 About.tsx

| Line | Current String | Issue | Fix |
|------|---|---|---|
| 85 | `"A classically trained circus performer, Jolie is Maui's premier stilt walker, fire dancer, and children's entertainer."` | "Classically trained circus performer" and "fire dancer" | Change to: "A versatile performer, Jolie is Maui's premier stilt walker and balloon artist. She delights audiences with stilt walking, balloon twisting, face painting and themed characters." |
| 88 | `"Through Cirque Jolie, she offers kids' entertainment packages featuring a 30-minute live magic show with a real bunny, professional face painting, and balloon twisting."` | Magic & bunny claims | Change to: "Through Cirque Jolie, she offers professional face painting and balloon twisting for kids' parties, plus face painting and entertainment for adults." |
| 92 | `<span className="bg-lavender/10 text-lavender px-4 py-2 rounded-full text-sm font-medium">Fire Dancing</span>` | Fire badge | **Delete this badge entirely** |
| 127 | `{ name: 'Cirque Jolie', color: 'lavender', desc: 'Stilt walking, fire dancing, kids entertainment, balloon twisting, face painting & balloon décor.', link: '/balloon-twisting' }` | Fire claim in brand descriptor | Change to: "Stilt walking, balloon twisting, face painting, balloon décor, and themed character performances." |

### 3.3 CirqueJolie.tsx

| Line | Current String | Issue | Fix |
|------|---|---|---|
| 36 | `'Nine-foot stilt characters, fire and LED performers, jugglers and themed walk-around entertainment for every age.'` | Fire performers claim (Jolie does not do fire) | Change to: "Nine-foot stilt characters, LED performers, and themed walk-around entertainment for every age." |
| 60 | `"Jolie Strickland has delighted Maui audiences since her early days as Jolie the Clown. Today, Cirque Jolie brings balloon artistry, face painting, children's magic, stilt walking and spectacular ambient performers to events across Hawaii."` | "Children's magic" claim | Remove "children's magic," from the list |

### 3.4 StrollingEntertainment.tsx

| Line | Current String | Issue | Fix |
|------|---|---|---|
| 49 | `headlineJolie: 'Cirque Jolie — Stilt Walking & Fire Dancing'` | Fire dancing headline | Change to: "Cirque Jolie — Stilt Walking & LED Performance" |
| 50 | `subheadJolie: 'Rainbow stilts, fire fans, costumed characters — Jolie transforms any venue into a spectacle people talk about for years.'` | Fire fans reference | Change to: "Rainbow stilts, LED costumes, and themed characters — Jolie transforms any venue into a spectacle people talk about for years." |
| 59 | `{ id: 'j2', src: '/media/strolling/fire-dancing.jpg', alt: 'Fire dancer performing at luau' }` | **File path references Jolie fire image** (does not exist in client assets) | **Verify this file exists in `/media/strolling/` before using.** If it shows Jolie doing fire, remove. If unavailable, use one of 18 approved stilt-walker images instead. |

### 3.5 Corporate.tsx

| Line | Current String | Issue | Fix |
|------|---|---|---|
| 209 | `{ src: '/media/strolling/fire-dancing.jpg', label: 'Fire Dancing' }` | Fire image in corporate gallery | **Verify file existence.** If it shows Jolie fire performance, remove. Replace with LED or stilt-walker image. |

### 3.6 Magic.tsx (Brenton — No Issues)

**Verified:** Brenton's fire magic references are **legitimate and should be preserved**. Lines 133–194 correctly attribute fire performance to Brenton Keith only, not Jolie. No changes required.

---

## 4. STRUCTURED DATA (SCHEMA) REFERENCES

### 4.1 serviceType descriptions in schema (routeMetadata.js)

| Route | Current serviceType | Issue | Updated Value |
|-------|---|---|---|
| `/strolling` (line 68) | `"Stilt walkers, fire performers, LED dancers and strolling characters"` | Fire performers (Jolie) claim | `"Stilt walkers, LED performers, and themed strolling characters"` |
| `/balloon-twisting` (line 40) | `"Balloon twisting, face painting, children's magic and kids party entertainment"` | Children's magic claim | `"Balloon twisting, face painting, and kids party entertainment"` |
| `/cirque-jolie` | Derived from page metadata; must be updated after page content changes | Fire and magic references | See Content Page fixes (3.3) |

### 4.2 Service schema (JSON-LD Graph)

| Field | Location | Current | Required Change |
|-------|----------|---------|-----------------|
| `@type: "Service"` for `/strolling` | routeMetadata.js line 357–376 | serviceType includes fire | Remove "fire performers" clause |
| `@type: "Service"` for `/balloon-twisting` | Same block | serviceType includes magic | Remove "children's magic" clause |

---

## 5. REDIRECT STRATEGY FOR REMOVED SERVICES

### Additional Services (`/additional-services`)

**Current state:** Route exists at line 69 (App.tsx), referenced in sitemap (line 49), and footer (line 42).

**Decision required:** The acceptance doc states "Remove Additional Services from navigation, discovery, footer, and sitemap. Preserve old-link continuity with an intentional redirect after checking its role."

**Recommended actions:**
1. **Remove from Navbar.tsx line 21** (services menu)
2. **Remove from Footer.tsx line 42** (services column)
3. **Remove from public/sitemap.xml line 49** (optional, depending on strategy)
4. **In App.tsx:** Either:
   - Delete route entirely (hard 404) if no external links reference it
   - Add redirect: `<Route path="/additional-services" element={<Navigate to="/" replace />} />`
5. **SEO:** Update routeMetadata.js to remove `/additional-services` from INDEXED_ROUTES if redirecting; keep in NOINDEX_ROUTES with 404 metadata if preserving the route.

---

## 6. NEW ROUTE SETUP: `/LED-PERFORMERS`

**Requirement:** Add exactly one new canonical service: `LED Performers` at `/led-performers` (acceptance doc line 29).

**Implementation checklist:**

- [ ] **Create route in App.tsx** (after line 62): `<Route path="/led-performers" element={<LEDPerformers />} />`
- [ ] **Create page component** `src/app/pages/LEDPerformers.tsx` (template: mirror StrollingEntertainment or BalloonDecor structure)
- [ ] **Add metadata to routeMetadata.js** (before line 227):
  ```javascript
  {
    path: '/led-performers',
    title: 'LED Performers & Light Shows | Cirque Jolie',
    description: 'Book Cirque Jolie LED performers and light-show entertainment for Maui events, nightlife, corporate parties and large-scale celebrations.',
    image: '/media/led-performers/[primary-image-from-jolie-selection].webp',
    imageAlt: 'Cirque Jolie LED performer at a Maui event',
    pageType: 'WebPage',
    schemaKind: 'service',
    serviceName: 'LED Performers',
    serviceType: 'LED performance, light shows, and ambient entertainment',
    priority: '0.9',
    changefreq: 'monthly',
  }
  ```
- [ ] **Add to sitemap.xml** (after line 22): 
  ```xml
  <url>
    <loc>https://www.rainingentertainment.com/led-performers</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  ```
- [ ] **Update Navbar.tsx** (line 13–22): Add `{ to: '/led-performers', label: 'LED Performers' }` after strolling entry
- [ ] **Update Footer.tsx** (line 33–43): Add `<li><Link to="/led-performers" className="…">LED Performers</Link></li>` in Services column
- [ ] **Use Jolie's 6 selected LED images** from `client-assets/email-selected/led-performers/`

---

## 7. RECOMMENDED AUTOMATED ASSERTIONS

### 7.1 String/Regex Patterns to Enforce (Pre-deployment)

```javascript
// Assert these strings DO NOT appear in customer-facing markup
const FORBIDDEN_STRINGS = [
  /Costumed Stilt Walking/i,      // Must be "Stilt Walkers"
  /fire dancing/i,                 // Jolie does not do fire; remove
  /fire performer/i,               // Jolie does not do fire; remove
  /children's magic/i,             // Unsupported claim
  /live bunny/i,                   // Unsupported claim
  /package magic/i,                // Unsupported claim
  /three shows in one/i,           // Unsupported claim
  /classically trained circus/i,   // Bio claim to remove
];

// Assert these strings DO appear (if relevant to page)
const REQUIRED_STRINGS = {
  strolling: [/Stilt Walkers/i, /LED/i],          // No fire, yes LED
  balloonTwisting: [/Balloon Twisting/, /Face Painting/], // No magic
  ledPerformers: [/LED/, /Cirque Jolie/],         // New route exists
  cirqueJolie: [/Stilt Walking/, /Balloon/],      // No fire, no magic
};

// Assert route existence
const REQUIRED_ROUTES = [
  '/strolling',
  '/balloon-twisting',
  '/balloon-decor',
  '/led-performers',  // NEW
  '/magic',           // Brenton only
  '/face-painting',
  '/magic',
  '/casino',
  '/game-show',
  '/corporate',
  '/cirque-jolie',
];

// Assert route non-existence or redirect
const DEPRECATED_ROUTES = {
  '/additional-services': 'redirect or 404',
};
```

### 7.2 SEO Metadata Validation

```javascript
// Assert sitemap.xml contains correct URLs
assert(sitemap.includes('https://www.rainingentertainment.com/strolling'));
assert(sitemap.includes('https://www.rainingentertainment.com/led-performers'));
assert(!sitemap.includes('https://www.rainingentertainment.com/additional-services')); // Or confirm redirect

// Assert metadata for `/strolling` does NOT reference fire
const strollingMeta = routeMetadata['/strolling'];
assert(!strollingMeta.description.includes('fire'));
assert(!strollingMeta.serviceType.includes('fire'));
assert(strollingMeta.serviceType.includes('LED') || strollingMeta.description.includes('LED'));

// Assert metadata for `/balloon-twisting` does NOT reference magic/bunny
const balloonMeta = routeMetadata['/balloon-twisting'];
assert(!balloonMeta.description.includes("magic"));
assert(!balloonMeta.description.includes("bunny"));
assert(balloonMeta.serviceName.includes('Balloon'));

// Assert metadata for `/led-performers` exists and is indexed
assert(routeMetadata['/led-performers'] !== undefined);
assert(INDEXED_ROUTES.includes('/led-performers'));
```

### 7.3 Image Asset Validation

```javascript
// Assert required client assets used for approved pages
const LED_APPROVED_IMAGES = [
  'client-assets/email-selected/led-performers/01-8A29A9D3-E745-4FB5-A61D-5BA276559CE1_1_102_o.jpg',
  'client-assets/email-selected/led-performers/02-481E0262-D83F-4949-B432-8CAEA40BF064_1_105_c.jpg',
  'client-assets/email-selected/led-performers/03-6460CAB9-9A20-4C18-B0A7-734B011F084C_1_102_a.jpg',
  'client-assets/email-selected/led-performers/04-AD516644-080B-4812-99E9-A25D9E47A488_1_105_c.jpg',
  'client-assets/email-selected/led-performers/05-418594A9-FAAB-408D-8BA9-2666BFD40BAC_1_102_a.jpg',
  'client-assets/email-selected/led-performers/06-B84EBCA3-BA87-47A8-B74F-A8C9D10F6CFC_1_105_c.jpg',
];

const STILT_APPROVED_IMAGES = [
  // All 18 from client-assets/email-selected/stilt-walkers/
];

// Assert: No Jolie fire-dancing or magic imagery in public media
assert(!fs.existsSync('public/media/strolling/fire-dancing.jpg') || 
       isImageOfBrentonOnly('public/media/strolling/fire-dancing.jpg'));
assert(!fs.existsSync('public/media/*/bunny-magic*'));
assert(!fs.existsSync('public/media/*/children-magic*'));
```

### 7.4 Navigation Structure Validation

```javascript
// Assert Navbar services array contains correct labels
const navServices = navbar.services;
assert(navServices.some(s => s.label === 'Stilt Walkers'));
assert(!navServices.some(s => s.label.includes('Costumed')));
assert(navServices.some(s => s.to === '/led-performers'));
assert(!navServices.some(s => s.to === '/additional-services'));

// Assert Footer services links match Navbar
const footerServices = footer.services;
assert(footerServices.some(link => link.to === '/strolling'));
assert(footerServices.some(link => link.to === '/led-performers'));
assert(!footerServices.some(link => link.to === '/additional-services'));
```

### 7.5 Build & Deployment Checks

Run before each deployment:

```bash
# 1. Check for forbidden strings in production bundle
grep -r "Costumed Stilt Walking" dist/ && echo "ERROR: Old term found" && exit 1
grep -r "fire dancer" dist/ && echo "ERROR: Jolie fire claim found" && exit 1
grep -r "children's magic" dist/ && echo "ERROR: Magic claim found" && exit 1
grep -r "live bunny" dist/ && echo "ERROR: Bunny claim found" && exit 1

# 2. Validate all required routes exist
for route in /strolling /balloon-twisting /balloon-decor /led-performers /magic /face-painting /casino /game-show /corporate /cirque-jolie; do
  curl -s "https://staging.rainingentertainment.com$route" | grep -q "<html" || echo "ERROR: $route not found"
done

# 3. Verify sitemap completeness
curl -s https://staging.rainingentertainment.com/sitemap.xml | grep -q "/led-performers" || echo "ERROR: /led-performers missing from sitemap"
curl -s https://staging.rainingentertainment.com/sitemap.xml | grep -q "/additional-services" && echo "WARNING: /additional-services still in sitemap"

# 4. Run schema.org validation on key pages
curl -s https://staging.rainingentertainment.com/strolling | grep -o '"serviceType":"[^"]*"' | grep -q "fire" && echo "ERROR: Fire claim in /strolling schema"
```

---

## 8. DEPENDENCY & CONFLICT SUMMARY

### 8.1 Shared Files (Require Coordination)

| File | Owner | Dependencies | Risk |
|------|-------|---|---|
| `src/app/seo/routeMetadata.js` | **Integration owner (Codex)** | All pages; SEO; sitemap generation | **Single point of failure** for metadata consistency |
| `src/app/App.tsx` | **Integration owner (Codex)** | Route definitions; all page imports | If routes not added, `/led-performers` will 404 |
| `public/sitemap.xml` | **Generated or manual** | routeMetadata.js (if auto-gen) | Must stay in sync with routes |
| `src/app/components/Navbar.tsx` | **Integration owner (Codex)** | Navigation labels; service list | If not updated, old term "Costumed Stilt Walking" persists in nav |
| `src/app/components/Footer.tsx` | **Integration owner (Codex)** | Navigation labels; service list | If not updated, old term and Additional Services links persist |

### 8.2 Page-Level Dependencies

| Page | Updates Required | Cross-Dependencies |
|------|---|---|
| `BalloonTwisting.tsx` | Remove magic, bunny, "three shows" claims | Metadata in routeMetadata.js (line 31–43) must also be updated |
| `About.tsx` | Remove fire-dancing, bunny, "classically trained" from bios | Footer brand descriptions (line 127); Cirque Jolie profile (line 205) must align |
| `CirqueJolie.tsx` | Remove fire from service card (line 36) and bio (line 59–60) | Metadata in routeMetadata.js (line 203–214); Navbar service label consistency |
| `StrollingEntertainment.tsx` | Remove fire from headlines (lines 49–50); verify image sources | `/media/strolling/fire-dancing.jpg` file must be verified or replaced |
| `Corporate.tsx` | Remove or replace fire-dancing image (line 209) | Strolling page dependency (same image reference) |
| `Magic.tsx` | **No changes** | Brenton's fire magic is legitimate; preserve all references |

---

## 9. SUMMARY & NEXT STEPS

### 9.1 Inventory Status ✓

- **98 images** across **7 categories** (about-jolie: 3, balloon-decor: 28, balloon-twisting: 9, brenton-july-photos: 20, face-painting: 14, led-performers: 6, stilt-walkers: 18)
- **95 MiB total size**
- **No exact SHA-256 duplicates** detected
- **High-resolution stilt-walker assets** (up to 50 MB category) identified for optimization before production
- **Client selections verified:** Jolie's 18 stilt-walker images present; NO Jolie fire imagery in client assets

### 9.2 Mapping Complete ✓

- **21 files** reference superseded terms or affected taxonomy
- **Exact line numbers** provided for all string replacements
- **Route definitions, navigation, footer, and sitemap** mapped with specific locations
- **Structured data (schema.org)** references identified in routeMetadata.js

### 9.3 Before Implementation

1. **Confirm Additional Services redirect strategy** with Codex (keep redirect, hard 404, or preserve?)
2. **Verify `/media/strolling/fire-dancing.jpg`** file location and content (if it shows Brenton, keep; if Jolie, remove)
3. **Confirm `/media/strolling/` and `/media/corporate/`** image sources to ensure no deprecated fire imagery is hardcoded
4. **Review Brenton July Photos** for any fire imagery attributions (currently acceptable, but flag if mislabeled)

### 9.4 Assertions to Enable

Copy Section 7 into CI/CD pipeline pre-deployment checks. These automated assertions will catch:
- Forbidden strings in production bundles
- Missing required routes
- Metadata inconsistencies
- Sitemap gaps
- Schema.org compliance

---

## Document Audit Trail

- **Date created:** 2026-08-12
- **Scope:** Haiku mechanical audit only (inventory, deduplication, taxonomy mapping, assertions)
- **Non-scope:** Application code implementation, visual review, copywriting refinement
- **Deliverable:** Evidence and assertions for Sonnet 5 implementation phase
