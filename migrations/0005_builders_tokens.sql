CREATE TABLE IF NOT EXISTS experience_builders (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  builder_type TEXT NOT NULL,
  category TEXT NOT NULL,
  token_cost INTEGER NOT NULL DEFAULT 15,
  plan_inclusion TEXT NOT NULL DEFAULT 'trial,membership,plus,family',
  status TEXT NOT NULL DEFAULT 'Active',
  visibility TEXT NOT NULL DEFAULT 'paid',
  description TEXT,
  form_schema TEXT NOT NULL DEFAULT '[]',
  usage_count INTEGER NOT NULL DEFAULT 0,
  blocked_attempts INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS builder_outputs (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  builder_id TEXT NOT NULL,
  builder_name TEXT NOT NULL,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Completed',
  token_cost INTEGER NOT NULL DEFAULT 0,
  input_payload TEXT NOT NULL DEFAULT '{}',
  output_payload TEXT NOT NULL DEFAULT '{}',
  request_id TEXT,
  archived_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(email, request_id)
);

CREATE TABLE IF NOT EXISTS builder_token_ledger (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  amount INTEGER NOT NULL,
  balance_after INTEGER NOT NULL,
  source TEXT NOT NULL,
  reason TEXT NOT NULL,
  builder_output_id TEXT,
  builder_id TEXT,
  admin_email TEXT,
  metadata TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS builder_blocked_attempts (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  builder_id TEXT,
  builder_name TEXT,
  reason TEXT NOT NULL,
  tokens_available INTEGER NOT NULL DEFAULT 0,
  tokens_required INTEGER NOT NULL DEFAULT 0,
  action_offered TEXT,
  metadata TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS trial_access_tokens (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'Active',
  activated_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  token_allowance INTEGER NOT NULL DEFAULT 30,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS token_addon_packages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price_pence INTEGER NOT NULL,
  token_amount INTEGER NOT NULL DEFAULT 0,
  package_type TEXT NOT NULL DEFAULT 'tokens',
  status TEXT NOT NULL DEFAULT 'Configuration Ready',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS manual_token_adjustments (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  amount INTEGER NOT NULL,
  reason TEXT NOT NULL,
  adjustment_type TEXT NOT NULL,
  admin_email TEXT NOT NULL,
  ledger_id TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_experience_builders_status ON experience_builders(status, visibility);
CREATE INDEX IF NOT EXISTS idx_builder_outputs_email_created ON builder_outputs(email, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_builder_token_ledger_email_created ON builder_token_ledger(email, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_builder_blocked_attempts_email_created ON builder_blocked_attempts(email, created_at DESC);
