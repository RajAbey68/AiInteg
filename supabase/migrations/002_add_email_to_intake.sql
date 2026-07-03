-- ============================================================
-- 002_add_email_to_intake.sql
-- The scope-call form promises a reply within one working day.
-- That requires a contact address. Add-only; no drops, no renames.
--
-- This migration is new on branch fix/leadership-p0 and unapplied
-- anywhere, so backfill + constraints are safe to include here.
-- ============================================================

ALTER TABLE intake_submissions ADD COLUMN IF NOT EXISTS email text;

-- Backfill rows that predate the email column so NOT NULL can hold.
-- The sentinel is deliberately loud: these leads need manual attention.
UPDATE intake_submissions
SET email = 'unknown@backfill.needs-attention'
WHERE email IS NULL;

ALTER TABLE intake_submissions ALTER COLUMN email SET NOT NULL;

ALTER TABLE intake_submissions
  ADD CONSTRAINT intake_submissions_email_not_empty CHECK (email <> '');
