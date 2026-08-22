CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL CHECK (
    kind IN ('contact', 'eligibility_request', 'existing_bilan')
  ),
  status text NOT NULL DEFAULT 'new' CHECK (
    status IN ('new', 'in_progress', 'completed', 'archived')
  ),
  email text NOT NULL,
  payload jsonb NOT NULL,
  file_name text,
  file_type text,
  file_size integer,
  file_data bytea,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS submissions_kind_created_at_idx
  ON submissions (kind, created_at DESC);

CREATE INDEX IF NOT EXISTS submissions_email_idx
  ON submissions (lower(email));

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (
    status IN ('active', 'unsubscribed')
  ),
  subscribed_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS newsletter_subscribers_email_idx
  ON newsletter_subscribers (lower(email));
