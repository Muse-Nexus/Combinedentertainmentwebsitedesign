# Instagram live-feed connection

Date: 2026-08-12

## What is already wired

The homepage checks `/api/instagram` first. When valid Meta credentials are configured, it shows the newest public posts from `@magicbrent` and `@cirquejolie`, labels the section `Live from Instagram`, and links each card to its original post.

The browser never receives a Meta access token. Post thumbnails are requested through signed, canonical `/api/instagram-image` URLs, validated against known Meta image hosts, and served from the Raining Entertainment origin with bounded file sizes and CDN caching. This avoids a third-party Instagram embed script and keeps the homepage useful when Meta is slow or unavailable.

The fallback order is:

1. Meta Instagram API live posts;
2. approved Airtable `Moments` records;
3. the checked-in Raining Entertainment gallery.

No empty widget or broken Instagram frame is shown.

## Meta requirements

Use professional Instagram accounts—Business or Creator—not personal accounts. For the Facebook Login path currently used by the server, each Instagram professional account must be linked to a Facebook Page that the client controls.

Create or reuse a client-owned Meta Business app and request only the read permissions needed for an owned-account feed:

- `instagram_basic`;
- `pages_show_list`;
- `pages_read_engagement`.

For accounts owned and managed by the app's business, Meta Standard Access is normally the relevant starting lane. If the app will serve unrelated third-party accounts, Meta may require Advanced Access and App Review. Confirm the current requirement in the Meta dashboard rather than assuming an older approval still applies.

## Server-only Vercel values

Add these as encrypted Vercel environment variables. Connect Preview first; add Production only after the preview receipt is good.

```text
INSTAGRAM_GRAPH_HOST=graph.facebook.com
INSTAGRAM_GRAPH_API_VERSION=v25.0
INSTAGRAM_MAGICBRENT_USER_ID=
INSTAGRAM_MAGICBRENT_ACCESS_TOKEN=
INSTAGRAM_CIRQUEJOLIE_USER_ID=
INSTAGRAM_CIRQUEJOLIE_ACCESS_TOKEN=
```

One configured account is sufficient; the section automatically uses both when both are available. Do not put tokens in `VITE_*`, source files, screenshots, tickets, chat, or client-side configuration.

If the team chooses Meta's newer Instagram Login path instead, set `INSTAGRAM_GRAPH_HOST=graph.instagram.com`, use the Instagram professional-account IDs and Instagram user tokens issued by that app, and confirm the current `instagram_business_basic` permission in Meta before activation.

## Activation receipt

Do not call the feed live merely because variables exist. Collect all of these receipts:

1. `/api/instagram` returns HTTP 200 with `source: "instagram"` and current post permalinks.
2. At least one proxied `/api/instagram-image` request returns HTTP 200 with an `image/*` content type and no token in the URL or response body.
3. The homepage says `Live from Instagram`, displays current posts from each connected account, and each card opens the correct Instagram permalink.
4. With credentials removed or deliberately invalidated in Preview, the section falls back cleanly without broken images or an empty block.
5. Record token owner, access level, expiry/refresh method, and the person responsible for renewal. A feed that works once but silently expires is not production-ready.
