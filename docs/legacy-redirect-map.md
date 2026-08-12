# Legacy domain redirect map

Status: **planned only — do not activate yet**

This map preserves the most useful search equity from MagicBrent.com,
GameshowFanatics.com, and CirqueJolie.com while avoiding broad redirects that
Google may treat as soft 404s. None of these legacy-domain rules are present in
`vercel.json`; that file contains only exact aliases that already belonged to
this application.

## Activation gate

Do not turn on any legacy-domain redirect until all of the following are true:

- `https://www.rainingentertainment.com/robots.txt` returns plain text.
- `https://www.rainingentertainment.com/sitemap.xml` returns valid XML.
- Every mapped destination returns its own server-delivered title,
  description, canonical, Open Graph metadata, and structured data.
- An unknown path returns the branded page with HTTP 404, not the home shell
  with HTTP 200.
- The canonical property is verified in Google Search Console, the sitemap is
  submitted, URL Inspection renders representative routes correctly, and the
  home plus primary service pages have begun indexing.
- The business has confirmed its canonical public contact information.
- A private rollback archive exists for each legacy Wix/WordPress site.

The live deployment and brand assets currently support the canonical host
`https://www.rainingentertainment.com`. The brief also used the spelling
`reigningentertainment.com`, but that hostname did not resolve during the July
2026 audit. Resolve ownership and branding before purchasing or forwarding the
alternate spelling; do not mix both spellings in canonical tags.

## MagicBrent.com

| Legacy path | Destination | Treatment |
| --- | --- | --- |
| `/` | `/magic` | 301 after destination validation |
| `/event-details/the-mulligans-magic-show-*` | `/shows/mulligans-magic-show` | 301 to the evergreen series page; current future dates may later map to Airtable-generated event pages |
| `/event-details/mulligans-magic-show-*` | `/shows/mulligans-magic-show` | Same as above |
| `/event-details/*/form` | none | 410 Gone; these registration forms were already noindex |
| Other current public event detail | Matching new event URL | One-to-one 301 only when the event content exists |
| Expired one-off event without a replacement | none | 410 Gone rather than home-page redirect |

The audit found 186 event URLs in the Wix sitemap, including many expired or
duplicated Mulligan's occurrences. The evergreen show page is the safe landing
for the recurring series; unrelated historical appearances should not be
collapsed into it.

## GameshowFanatics.com

| Legacy path | Destination | Treatment |
| --- | --- | --- |
| `/` | `/game-show` | 301 |
| `/maui-party-entertainment/` | `/game-show` | 301; fixes the old canonical-to-redirect mismatch |
| `/aloha-trivia-game-show-nite/` | `/game-show` | 301 after preserving the custom-show details |
| `/lite/` | `/game-show` | 301; the destination includes Game Show Lite |
| `/casino-night/` | `/casino` | 301 |
| `/weddings/` | `/game-show` | 301 while wedding-specific content remains visible |
| `/faq/` | `/game-show` or a future `/faq` | Activate only after the practical setup FAQ is carried over |
| `/about/` | `/about` | 301 |
| `/contact/` | `/contact` | 301 |
| `/congrats/` | none or a real thank-you route | Prefer 410 unless a working form flow needs the route; always noindex |
| `/media/` | `/game-show` | 301 while the destination gallery remains visible |
| `/author/magicbrent/` | `/about` | 301 |
| `/author/adelleadmin1/` | `/about` | 301 only if the corresponding identity is represented; otherwise 410 |
| `/category/blog/` and `/blog/` | Future story archive | Do not redirect to home; create an archive or return 410 |
| `/blog/awarded-best-comedian-on-maui/` | `/about` | 301 while the 2019 award is retained |
| Game Show Lite field-report posts | `/game-show` | 301 while the Lite section remains substantial |
| Press posts | `/about` or a future press page | One-to-one only when the cited proof is retained |
| `/blog/covid-19-update/` | none | 410 Gone |

## CirqueJolie.com

| Legacy path | Destination | Treatment |
| --- | --- | --- |
| `/` | `/cirque-jolie` | 301 to the new branded hub |
| `/baby-luaus/` | `/balloon-twisting` or a future `/baby-luaus` | Use the dedicated page if created; otherwise retain baby-luau content on the service page |
| `/parenting-and-business-reflections/` | `/about` | 301 only while Jolie's story is retained |
| `/blog/` and `/category/entertainer/` | Future story archive or `/cirque-jolie` | Use the hub only if it includes the legacy story context; otherwise 410 |
| `/author/adelle7admin/` | `/about` | 301 |
| Attachment pages nested under a post | The migrated parent page | 301 to the parent, never to home |
| `/happy-new-year-2020/` | none | 410 Gone unless migrated as a story |
| `/mahalo/` | none | 410 Gone; a thank-you page should not be indexed |

The former Cirque Jolie home page ranked for several distinct services. A
single redirect cannot split those signals across balloon twisting, face
painting, balloon decor, and stilt performers, so `/cirque-jolie` now serves as
the branded hub and links directly to each focused service page.

## Migration operation

1. Export and archive the old sites, databases, media, and DNS records.
2. Attach each old hostname to a redirect-only project or equivalent origin.
3. Implement server-side 301 rules with one hop from every HTTP/HTTPS and
   www/apex variant to the final canonical URL.
4. Test the complete source list, including query strings and old sitemap URLs.
5. Verify every hostname variant in Search Console, submit Change of Address
   requests, and keep the old properties available for coverage monitoring.
6. Keep redirects for as long as possible, at minimum one year. Preserve
   rollback copies privately rather than restoring publicly indexable duplicate
   sites.

Broad wildcard rules to the new home page are intentionally excluded.
