# Raining Instagram invitation broker

`POST /api/instagram-invite` is a narrow, Preview-only bridge for the Gmail
reply automation. It lets that automation request a short-lived SocialFanout
Instagram invitation without receiving the reusable SocialFanout API key.

## Security boundary

- The function returns `404` unless Vercel sets `VERCEL_ENV=preview`.
- The selected Preview deployment must keep Vercel Deployment Protection set
  to **Only people with access**. Disable Shareable Links, remove external
  collaborators, and remove other protection-bypass exceptions for this
  deployment before activation.
- The automation calls the exact protected Preview URL through the
  authenticated Vercel CLI (`vercel curl`). Current Vercel CLI versions use a
  Vercel-managed Protection Bypass for Automation credential; this is accepted
  here as the project access boundary, not misrepresented as proof of a named
  SSO user inside the function. Do not copy that credential into the prompt,
  request body, repository, logs, or email.
- An unauthenticated request to the exact Preview URL must be intercepted by
  Vercel's sign-in/protection layer before activation. A JSON response from the
  function to an unauthenticated caller is a stop condition. A working
  Shareable Link is also a stop condition.
- The request must identify the one existing Gmail thread, carry the exact
  automation-intent header, contain only an inbound Gmail message ID, its exact
  allowlisted sender, and one handle, and use JSON under 1 KB.
- The only handles accepted are `@magicbrent`, `@cirquejolie`, and
  `@gameshowfanatics`.
- Brenton's exact email may request only `@magicbrent` or
  `@gameshowfanatics`; Jolie's exact email may request only `@cirquejolie`.
  The original outbound message and thread IDs are rejected as inbound IDs.
- Per-IP and per-message limits add abuse resistance. They are intentionally
  not described as durable distributed locks.
- The SocialFanout key stays in the server-only `SOCIALFANOUT_API_KEY`
  environment variable and is never returned or logged.
- The key is sent only to the exact `https://socialfanout.com` origin; other
  configured origins fail closed.

Do not expose this route in Production, disable Preview Deployment Protection,
enable a Shareable Link, invite an external collaborator, or give the Gmail
automation the SocialFanout key. The static intent/thread headers are defense
against operator mistakes; they are not authentication by themselves.

## Required upstream contract

The broker is disabled until Preview has:

```dotenv
SOCIALFANOUT_DELEGATED_INVITE_CONTRACT=v1
```

Set that value only after the deployed SocialFanout start endpoint supports:

```text
GET /v1/connections/instagram/start?useCase=publishing&delegateTo=@handle
```

and returns all of the following:

- `ok: true`
- `type: "delegated_instagram_invite"`
- `provider: "instagram"`
- `delegated: true`
- the exact expected handle
- a canonical `toISOString()` expiration with seven to eleven minutes left
- an HTTPS `authorizationUrl` on the configured SocialFanout origin, with the
  exact path `/v1/oauth/authorize` and only one state parameter matching
  `sfoauth_` plus exactly 43 base64url characters; the separate `state` field
  must match the URL

The broker rejects old owner-session responses, a different handle or origin,
an unexpected URL shape, and invitations outside the seven-to-eleven-minute
window.
It never returns a rejected upstream URL.

The exact Gmail message ID is forwarded as:

```text
Idempotency-Key: raining-instagram-gmail:<message-id>
```

The current delegated SocialFanout implementation does not yet provide durable
idempotency for that header. For this single-Mac workflow, the heartbeat's
atomic local lock, exact Sent-message reference search, and post-send Gmail
label are the delivery fence. Do not claim Gmail/API atomicity or run another
sender concurrently.

## Request and response

The authenticated CLI request must supply:

```text
Content-Type: application/json
X-Raining-Automation-Intent: instagram-delegated-invite-v1
X-Raining-Gmail-Thread-Id: 1a0d13d83b1268b8
```

with an exact body such as:

```json
{
  "gmailMessageId": "1a0d13de2bcccfa6",
  "handle": "@magicbrent",
  "senderEmail": "brentonkeith@magicbrent.com"
}
```

The successful `201` response contains `ok: true`, the exact validated handle,
the handle-bound invitation URL, its expiration, the delegated-invite type, and
the deterministic email reference `SF-IG-<gmail-message-id>`. It does not expose
the API key or provider credentials.

## Activation gates

1. Merge and deploy the SocialFanout delegated-invite implementation and its
   database migration.
2. Verify the Raining Preview API key is nonempty and belongs to the intended
   SocialFanout tenant; never print it during the check.
3. Set `SOCIALFANOUT_DELEGATED_INVITE_CONTRACT=v1` in Preview only.
4. Deploy this branch to a protected Preview deployment. Set access to **Only
   people with access**, disable Shareable Links and other bypass exceptions,
   confirm project membership is limited to trusted operators, and do not
   promote it to Production.
5. Verify an unauthenticated request is blocked by Vercel. For the real inbound
   Gmail message, use the complete authenticated CLI form below (with the
   actual body values). Do not mint a test invitation against a client's handle.

   ```sh
   vercel curl /api/instagram-invite \
     --deployment <exact-preview-url> -- \
     -X POST \
     -H 'Content-Type: application/json' \
     -H 'X-Raining-Automation-Intent: instagram-delegated-invite-v1' \
     -H 'X-Raining-Gmail-Thread-Id: 1a0d13d83b1268b8' \
     --data '<exact validated JSON body>'
   ```

6. The heartbeat may email the URL only after it revalidates the returned type,
   handle, expiration, and SocialFanout origin and confirms there is no prior
   `SF-IG-<gmail-message-id>` Sent marker.
