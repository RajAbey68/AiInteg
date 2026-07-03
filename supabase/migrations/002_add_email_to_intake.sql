-- ============================================================
-- 002_add_email_to_intake.sql
-- The scope-call form promises a reply within one working day.
-- That requires a contact address. Add-only; no drops, no renames.
--
-- Column is nullable by design (round-2 panel decision): the email
-- requirement is enforced server-side in the lead-intake edge
-- function and client-side in the form. Keeping the column nullable
-- avoids a table lock and a sentinel backfill on existing rows.
-- ============================================================

ALTER TABLE intake_submissions ADD COLUMN IF NOT EXISTS email text;
