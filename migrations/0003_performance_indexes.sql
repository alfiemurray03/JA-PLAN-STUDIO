CREATE INDEX IF NOT EXISTS idx_profiles_email_lower
  ON profiles (lower(email));

CREATE INDEX IF NOT EXISTS idx_admin_users_email_lower
  ON admin_users (lower(email));

CREATE INDEX IF NOT EXISTS idx_admin_preferences_email_lower
  ON admin_preferences (lower(email));

CREATE INDEX IF NOT EXISTS idx_support_tickets_reference
  ON support_tickets (reference);

CREATE INDEX IF NOT EXISTS idx_support_tickets_updated_created
  ON support_tickets (updated_at DESC, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_support_tickets_email_lower
  ON support_tickets (lower(customer_email));

CREATE INDEX IF NOT EXISTS idx_data_protection_requests_reference
  ON data_protection_requests (reference);

CREATE INDEX IF NOT EXISTS idx_data_protection_requests_email_lower
  ON data_protection_requests (lower(customer_email));

CREATE INDEX IF NOT EXISTS idx_data_protection_requests_user_lower
  ON data_protection_requests (lower(user_id));

CREATE INDEX IF NOT EXISTS idx_data_protection_requests_status_updated
  ON data_protection_requests (status, updated_at DESC, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_system_reports_reference
  ON system_reports (reference);

CREATE INDEX IF NOT EXISTS idx_system_reports_email_lower
  ON system_reports (lower(customer_email));

CREATE INDEX IF NOT EXISTS idx_system_reports_user_lower
  ON system_reports (lower(user_id));

CREATE INDEX IF NOT EXISTS idx_system_reports_status_updated
  ON system_reports (status, updated_at DESC, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_closure_requests_reference
  ON closure_requests (reference);

CREATE INDEX IF NOT EXISTS idx_closure_requests_email_lower
  ON closure_requests (lower(customer_email));

CREATE INDEX IF NOT EXISTS idx_closure_requests_status_updated
  ON closure_requests (status, updated_at DESC, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_admin_audit_log_created
  ON admin_audit_log (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_admin_audit_log_actor
  ON admin_audit_log (actor_email, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_customer_account_flags_email_created
  ON customer_account_flags (email, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_customer_timeline_events_email_created
  ON customer_timeline_events (email, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_customer_support_cases_email_updated
  ON customer_support_cases (email, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_customer_support_messages_case_created
  ON customer_support_messages (case_reference, created_at ASC);

CREATE INDEX IF NOT EXISTS idx_customer_notifications_email_updated
  ON customer_notifications (email, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_customer_notifications_email_status
  ON customer_notifications (email, status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_customer_support_pins_email_created
  ON customer_support_pins (email, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_customer_support_pins_email_status
  ON customer_support_pins (email, status, expires_at DESC);

CREATE INDEX IF NOT EXISTS idx_customer_internal_notes_email_updated
  ON customer_internal_notes (email, pinned DESC, updated_at DESC);
