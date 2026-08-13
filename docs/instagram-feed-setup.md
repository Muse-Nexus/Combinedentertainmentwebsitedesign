# Instagram live-feed activation through SocialFanout

Date: 2026-08-12

## What is already wired

The homepage checks `/api/instagram` first. It asks SocialFanout for a fresh,
tenant-owned media snapshot from `@magicbrent` and `@cirquejolie`, labels the
section `Live from Instagram`, and links each card to its original post.

No Instagram widget or provider slideshow is embedded. The browser never
receives a Meta token, SocialFanout API key, connection id, or expiring Meta CDN
URL. Thumbnails use signed, canonical `/api/instagram-image` URLs; that endpoint
refreshes the selected media through SocialFanout, validates the returned Meta
asset host, bounds the file size, and serves it from the Raining Entertainment
origin with CDN caching.

The fallback order remains:

1. live posts through SocialFanout;
2. approved Airtable `Moments` records;
3. the checked-in Raining Entertainment gallery.

No empty widget or broken Instagram frame is shown while Meta approval, an
account authorization, or SocialFanout is unavailable.

## One-time activation after Meta approval

Use one dedicated SocialFanout API key for this website. Both Instagram
connections must be authorized while that same key is selected so tenant
ownership checks cover the pair.

1. In SocialFanout, select or create the Raining Entertainment website key.
2. Connect `@magicbrent` through Instagram Publishing OAuth.
3. Connect `@cirquejolie` through Instagram Publishing OAuth.
4. Read `GET /v1/connections` with that key, keep only rows whose `provider`
   equals `instagram`, match each row by `handle`, and record those two
   connection ids. Do not copy provider tokens or use an `instagram_comments`
   or `instagram_messages` row.
5. Add the server-only values below to a private Vercel Preview and collect the
   activation receipts before adding them to Production.

The clients do not need individual developer apps or API keys. Each account
owner only authorizes the shared SocialFanout Meta app through OAuth. Ordinary
external accounts remain gated until that app's required Meta access is
approved.

## Server-only Vercel values

```text
SOCIALFANOUT_API_URL=https://socialfanout.com
SOCIALFANOUT_API_KEY=
SOCIALFANOUT_MAGICBRENT_CONNECTION_ID=
SOCIALFANOUT_CIRQUEJOLIE_CONNECTION_ID=
INSTAGRAM_FEED_SIGNING_SECRET=
```

Generate `INSTAGRAM_FEED_SIGNING_SECRET` as at least 32 random bytes. It is
separate from the SocialFanout key so either secret can be rotated without
changing the other. Never put any of these values in `VITE_*`, source files,
screenshots, tickets, chat, or client-side configuration.

One configured connection is sufficient; the feed automatically blends both
when both are present.

## Activation receipt

Do not call the feed live merely because variables exist. Collect all of these
receipts in Preview:

1. SocialFanout `GET /v1/connections/:id/media?limit=3` returns HTTP 200 for
   each connection under the Raining key, and a different key receives 404.
2. `/api/instagram` returns HTTP 200 with `source: "instagram"`, both handles,
   and current post permalinks without exposing the SocialFanout key,
   connection ids, Meta tokens, or Meta CDN URLs.
3. At least one signed `/api/instagram-image` request per account returns HTTP
   200 with an `image/*` content type.
4. The homepage says `Live from Instagram`, displays a current post from each
   connected account, and each card opens the correct Instagram permalink.
5. With the SocialFanout configuration removed or deliberately invalidated in
   Preview, the section falls back cleanly without broken images or an empty
   block.
6. Record the SocialFanout key owner, the two connection ids, the OAuth grant
   date, and the person responsible for reconnecting an account if Meta revokes
   it. SocialFanout owns proactive token refresh; the website owns only its API
   key and feed-signing secret.
