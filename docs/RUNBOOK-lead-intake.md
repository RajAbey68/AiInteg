# Runbook — lead-intake pipeline (30-minute recovery)

One page. If leads stop arriving or the owner is unavailable, this is the whole system.

## How a lead flows
1. Visitor submits the form on ai-integ.com or asimov-ai.org (both post to the same endpoint).
2. Edge function `lead-intake` (Supabase project `qcawafyfaqjwolgczhap`) validates → inserts a row in `intake_submissions` → sends a push notification (no personal data in the ping) → returns success.
3. The owner replies within one working day. That promise is the product.

## Where things live
- **Leads:** table `intake_submissions` (Supabase dashboard → Table Editor). RLS deny-all; service-role only.
- **Notifications:** ntfy push topic. The topic URL is stored as the `LEAD_NOTIFY_WEBHOOK` secret (dashboard → Edge Functions → Secrets, or `supabase secrets list --project-ref qcawafyfaqjwolgczhap`). Subscribe on a phone with the ntfy app or in a browser at the topic URL. Never commit the topic URL — it is a capability URL.
- **Function source:** `supabase/functions/lead-intake/index.ts` in this repo. Deployed version must match `main`.
- **Retention:** pg_cron job `intake-retention-12mo` deletes rows older than 12 months (Mondays 03:00 UTC), honouring the privacy pages.

## If notifications stop (10 min)
1. Submit a test lead on the live site with organisation `TEST`, email `test@example.com`.
2. No DB row? → check function logs (dashboard → Edge Functions → lead-intake → Logs). A 404 means the function is gone: redeploy with
   `supabase functions deploy lead-intake --project-ref qcawafyfaqjwolgczhap --use-api --no-verify-jwt`
3. Row but no ping? → check `LEAD_NOTIFY_WEBHOOK` secret exists; test the topic directly: `curl -d test <topic-url>`. Re-set the secret and redeploy if missing.
4. Delete your test row: `delete from intake_submissions where organisation = 'TEST';`

## Known sharp edges (learned in production, 2026-07-03)
- The notify fetch MUST be awaited — the edge runtime kills detached fetches after the response returns.
- HTTP header values must be ASCII (ByteStrings). An em-dash in the `Title` header silently killed every notification.
- ntfy.sh rejects anonymous `X-Email` with a 400 and drops the whole message. Email mirroring requires a paid ntfy tier or a separate route.

## If the owner is away (bus factor)
- Set a Gmail auto-responder: "Away until [date]; enquiries are logged and will be answered on return."
- Leads keep accumulating safely in the table; nothing is lost while unattended.
- Recovery contact: this runbook + the Supabase dashboard are sufficient — no other infrastructure exists.
