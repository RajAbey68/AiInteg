-- ============================================================
-- 001_initial_schema.sql
-- AI Integ — Sprint 0 database bootstrap
-- ============================================================

-- pgvector extension (required for future AI embedding features)
CREATE EXTENSION IF NOT EXISTS vector;

-- ============================================================
-- intake_submissions
-- Captures project scope requests from potential clients.
-- ============================================================
CREATE TABLE intake_submissions (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name        text        NOT NULL,
  job_title        text,
  organisation     text,
  sector           text,
  what_to_build    text        CHECK (char_length(what_to_build) <= 300),
  timeline         text,
  referral_source  text,
  priority_callback boolean    NOT NULL DEFAULT false,
  created_at       timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- skool_referrals
-- Tracks Skool community referrals at handover.
-- ============================================================
CREATE TABLE skool_referrals (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  intake_id   uuid        NOT NULL REFERENCES intake_submissions (id) ON DELETE CASCADE,
  referred_at timestamptz NOT NULL DEFAULT now(),
  tier        text        NOT NULL DEFAULT 'firm'
);

-- ============================================================
-- Row-Level Security
-- All access is denied by default.
-- The service-role key bypasses RLS and is the only permitted
-- write path (via Edge Functions). No client-side writes allowed.
-- ============================================================
ALTER TABLE intake_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE skool_referrals    ENABLE ROW LEVEL SECURITY;

-- Deny all access to anon and authenticated roles.
-- Service role bypasses these policies automatically.
CREATE POLICY "service role only" ON intake_submissions
  FOR ALL
  USING (false);

CREATE POLICY "service role only" ON skool_referrals
  FOR ALL
  USING (false);
