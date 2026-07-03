-- ============================================================
-- 002_add_email_to_intake.sql
-- The scope-call form promises a reply within one working day.
-- That requires a contact address. Add-only; no drops, no renames.
-- ============================================================

ALTER TABLE intake_submissions ADD COLUMN IF NOT EXISTS email text;
