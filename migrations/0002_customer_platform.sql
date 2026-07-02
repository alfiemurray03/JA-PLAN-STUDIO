CREATE TABLE IF NOT EXISTS customer_account_flags (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  flag TEXT NOT NULL,
  note TEXT,
  source TEXT NOT NULL DEFAULT 'customer',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (email) REFERENCES profiles(email) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_customer_account_flags_email_created
  ON customer_account_flags (email, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_customer_account_flags_email
  ON customer_account_flags (email, flag);

CREATE TABLE IF NOT EXISTS customer_timeline_events (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  event_type TEXT NOT NULL,
  title TEXT NOT NULL,
  detail TEXT,
  actor_type TEXT NOT NULL DEFAULT 'system',
  actor_email TEXT,
  metadata TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (email) REFERENCES profiles(email) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_customer_timeline_events_email_created
  ON customer_timeline_events (email, created_at DESC);

CREATE TABLE IF NOT EXISTS customer_support_cases (
  id TEXT PRIMARY KEY,
  reference TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  request_type TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'New',
  priority TEXT NOT NULL DEFAULT 'Normal',
  assigned_department TEXT,
  assigned_admin TEXT,
  subject TEXT NOT NULL,
  latest_message TEXT,
  attachments TEXT NOT NULL DEFAULT '[]',
  audit_history TEXT NOT NULL DEFAULT '[]',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (email) REFERENCES profiles(email) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_customer_support_cases_reference
  ON customer_support_cases (reference);

CREATE INDEX IF NOT EXISTS idx_customer_support_cases_email_updated
  ON customer_support_cases (email, updated_at DESC);

CREATE TABLE IF NOT EXISTS customer_support_messages (
  id TEXT PRIMARY KEY,
  case_reference TEXT NOT NULL,
  author_type TEXT NOT NULL,
  author_email TEXT,
  message TEXT NOT NULL,
  is_internal INTEGER NOT NULL DEFAULT 0,
  attachments TEXT NOT NULL DEFAULT '[]',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (case_reference) REFERENCES customer_support_cases(reference) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_customer_support_messages_case_created
  ON customer_support_messages (case_reference, created_at ASC);

CREATE TABLE IF NOT EXISTS customer_notifications (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'Normal',
  title TEXT NOT NULL,
  body TEXT,
  status TEXT NOT NULL DEFAULT 'Unread',
  archived_at TEXT,
  reference_type TEXT,
  reference_id TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (email) REFERENCES profiles(email) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_customer_notifications_email_updated
  ON customer_notifications (email, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_customer_notifications_email_status
  ON customer_notifications (email, status, created_at DESC);

CREATE TABLE IF NOT EXISTS customer_support_pins (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  pin_hash TEXT NOT NULL,
  pin_last4 TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Active',
  expires_at TEXT NOT NULL,
  used_at TEXT,
  revoked_at TEXT,
  revoked_by TEXT,
  last_used_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (email) REFERENCES profiles(email) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_customer_support_pins_email_created
  ON customer_support_pins (email, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_customer_support_pins_email_status
  ON customer_support_pins (email, status, expires_at DESC);
