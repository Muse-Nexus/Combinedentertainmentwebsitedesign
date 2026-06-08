# Competitor SEO Tracker & "Improvement Engine" — Due Diligence

Status: research / scoping. Goal Brenton set: track how we rank vs. competitors
(Adele, N Drafts Entertainment, Sergio Lee / Cirque Jolie keywords, etc.), do it
**manually for now**, then build it as a reusable **MCP plugin** we can use
internally and sell to other small local-service businesses.

This doc captures the diligence so we can decide build-vs-buy and scope an MVP.

---

## 1. Two layers, keep them separate

1. **Tracking** — where do we / competitors rank for a keyword set, over time.
2. **Improvement engine** — turn the gap data into ranked, actionable
   recommendations (copy, schema, photos, GBP signals, internal links) sorted by
   expected lift. This is the differentiator; pure rank trackers are commodities.

Ship tracking first. The "engine" is what makes it sellable.

---

## 2. Short-term manual process (do this now, no code)

Spreadsheet (one tab per competitor + one "us" tab). Columns:

- Keyword | Search intent | Our rank | Competitor rank | URL that ranks |
  Title tag | H1 | Word count | Schema present (Y/N) | GBP review count |
  Last checked

Seed keyword buckets (local-service intent, Maui):

- `maui magician`, `comedy magic maui`, `maui kids party entertainment`,
  `balloon twisting maui`, `face painting maui`, `maui casino night`,
  `casino party rental maui`, `maui game show`, `stilt walker maui`,
  `fire dancer maui`, `corporate entertainment maui`.

Check method (free): incognito + Maui-localized search, record position of each
domain. Repeat weekly. Capture the title/H1 of the page that beats us — that is
the cheapest source of copy ideas.

Competitors to seed: Cirque Jolie (own), Magic Brent (own), Adele (stilt/LED),
N Drafts Entertainment (casino), plus whoever shows in the map pack.

> Note from Brent's transcript: Jolie already ranks well for
> "maui kids party entertainment" — protect that keyword, don't refactor copy
> that's winning. Track it so we notice if it slips.

---

## 3. Build-vs-buy: existing tools

Off-the-shelf rank trackers already exist (so don't reinvent the tracker for our
own use): SE Ranking, SerpRobot, Nightwatch, AccuRanker, Wincher, SEMrush/Ahrefs
(heavier). For **local** specifically: BrightLocal, Local Falcon (map-grid rank),
Whitespark. Any of these covers "manual for now" better than hand-checking.

Decision: use a cheap tracker (e.g. Wincher/SE Ranking) for our own sites in the
interim **while** we build the MCP — because the MCP's value is the
*improvement engine + multi-tenant resale*, not the raw SERP numbers.

---

## 4. MCP plugin — data source options (the real diligence)

The MCP server needs SERP + page + local data. Options, with the checks that
matter before committing (verify current pricing/ToS at build time — do not
assume the numbers below are live):

| Source | Gives us | Watch out for |
|---|---|---|
| **DataForSEO** | SERP, ranked keywords, competitors, local pack, backlinks | Pay-per-call; cheapest at volume; verify per-task cost |
| **SerpAPI** | Google/Maps SERP JSON | Per-search pricing; clean but pricier at scale |
| **Serper.dev** | Google SERP JSON | Cheap, fast; thinner local data |
| **ScrapingBee / ScrapingDog** | Generic scraping incl. SERP | You own parsing + ToS risk |
| **Google Business Profile API** | Our own GBP reviews/insights | Only our profiles, not competitors |
| **PageSpeed Insights / Lighthouse** | On-page technical signals | Free, official |

Hard rule: **don't scrape Google directly from our own IPs.** Use a provider that
takes ToS/compliance liability. Respect robots.txt when fetching competitor
pages for content analysis.

### Cost-to-serve sketch (per tracked client)
`keywords × locations × frequency × cost_per_query`
e.g. 20 keywords × 1 location × weekly × $0.002 ≈ ~$0.16/wk raw SERP cost.
Local map-grid (Local Falcon style) multiplies by grid points — budget for it.

---

## 5. MCP tool surface (proposed)

Expose as MCP tools so any agent (ours + clients') can call them:

- `track_keyword(domain, keyword, location)` → current rank + SERP snapshot
- `competitor_gap(ourDomain, competitorDomain, keywordSet)` → keywords they win
- `audit_page(url)` → title/H1/schema/word-count/CWV + issues
- `local_grid(business, keyword, gridSize)` → map-pack visibility heatmap
- `suggest_improvements(url, targetKeyword)` → ranked actions w/ expected-lift
  score (this is the "engine")
- `report(domain, range)` → weekly diff: movers, new gaps, suggested actions

State (history for trend lines) → small SQLite/D1; this fits a Cloudflare Worker
+ Durable Object / D1 nicely (see `agents-sdk` / `cloudflare` skills) if we want
it hosted and multi-tenant.

---

## 6. Differentiation / resale angle

- Don't sell "rank tracking" (commodity). Sell **"weekly: here are the 3 things
  to change and the words to change them to, ranked by impact."**
- Target buyers = other solo/small local entertainers & service businesses who
  will never log into Ahrefs. White-label friendly.
- Pricing models to model out: per-domain/mo, per-keyword-bucket, or flat
  managed tier. Keep cost-to-serve (section 4) under ~20% of price.

---

## 7. Open questions before building

- [ ] Confirm current DataForSEO vs SerpAPI vs Serper pricing + local-pack
      coverage (live check).
- [ ] Do we need map-grid (Local Falcon style) for v1, or is single-point rank
      enough? (Local entertainment is map-pack heavy → probably yes.)
- [ ] Hosting: Cloudflare Worker + D1 (multi-tenant, cheap) vs local CLI MCP.
- [ ] "Expected lift" scoring: heuristic v1 (gap severity × keyword volume) vs
      model-based later.
- [ ] ToS/compliance sign-off on competitor page fetching + SERP source.

## 8. MVP scope (smallest sellable slice)

1 client site, 10 keywords, single Maui location, weekly SERP pull, competitor
gap report vs 2 competitors, on-page audit, and a ranked `suggest_improvements`
list. Output = one weekly markdown/email report. Build tracker + `audit_page` +
`competitor_gap` first; layer `suggest_improvements` once we have a few weeks of
real gap data to tune the scoring.
