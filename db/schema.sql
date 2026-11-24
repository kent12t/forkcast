CREATE TABLE IF NOT EXISTS quiz_results (
  id               BIGSERIAL PRIMARY KEY,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at     TIMESTAMPTZ,
  personality_type TEXT NOT NULL DEFAULT '',
  session_id       TEXT NOT NULL,
  completed        BOOLEAN NOT NULL DEFAULT false
);

-- Speeds up the "complete attempt" UPDATE lookup.
CREATE INDEX IF NOT EXISTS quiz_results_open_session_idx
  ON quiz_results (session_id) WHERE completed = false;
