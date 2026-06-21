function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

function decodeJwtPayload(jwt) {
  try {
    if (!jwt || !jwt.includes(".")) return {};
    const payload = jwt.split(".")[1];
    const normalised = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalised.padEnd(normalised.length + ((4 - normalised.length % 4) % 4), "=");
    return JSON.parse(atob(padded));
  } catch {
    return {};
  }
}

function getAccessIdentity(request) {
  const emailHeader =
    request.headers.get("cf-access-authenticated-user-email") ||
    request.headers.get("CF-Access-Authenticated-User-Email") ||
    "";
  const jwt =
    request.headers.get("cf-access-jwt-assertion") ||
    request.headers.get("CF-Access-Jwt-Assertion") ||
    "";
  const tokenIdentity = decodeJwtPayload(jwt);
  const email = emailHeader || tokenIdentity.email || tokenIdentity.user_email || tokenIdentity.username || "";
  const name = tokenIdentity.name || tokenIdentity.common_name || tokenIdentity.user_name || tokenIdentity.preferred_username || email || "";
  return {
    email: String(email || "").trim().toLowerCase(),
    name: String(name || "").trim()
  };
}

function clean(value, max = 2000) {
  return String(value || "").trim().slice(0, max);
}

const DPR_TYPES = new Set([
  "Access my personal data / Subject Access Request",
  "Correct my personal data",
  "Delete my personal data",
  "Restrict the use of my personal data",
  "Object to processing",
  "Data portability",
  "Withdraw consent",
  "Other data protection request"
]);

const SYS_TYPES = new Set([
  "Website not loading",
  "Page not responding",
  "Booking widget not working",
  "Broken link",
  "Login or account issue",
  "Access or membership issue",
  "Incorrect destination, activity or tour information",
  "Mobile display issue",
  "Payment or checkout issue",
  "Other technical issue"
]);

async function ensureTables(DB) {
  await DB.prepare(`
    CREATE TABLE IF NOT EXISTS profiles (
      email TEXT PRIMARY KEY,
      verified_name TEXT,
      display_name TEXT,
      contact_email TEXT,
      phone TEXT,
      communication_preference TEXT,
      support_notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await DB.prepare(`
    CREATE TABLE IF NOT EXISTS data_protection_requests (
      id TEXT PRIMARY KEY,
      reference TEXT UNIQUE,
      user_id TEXT,
      customer_name TEXT,
      customer_email TEXT,
      request_type TEXT,
      customer_message TEXT,
      status TEXT DEFAULT 'New',
      submitted_at TEXT,
      due_at TEXT,
      completed_at TEXT,
      assigned_admin_id TEXT,
      internal_notes TEXT,
      attachments TEXT,
      audit_log TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await DB.prepare(`
    CREATE TABLE IF NOT EXISTS system_reports (
      id TEXT PRIMARY KEY,
      reference TEXT UNIQUE,
      user_id TEXT,
      customer_name TEXT,
      customer_email TEXT,
      issue_type TEXT,
      affected_url TEXT,
      device_browser TEXT,
      description TEXT,
      status TEXT DEFAULT 'New',
      priority TEXT DEFAULT 'Normal',
      submitted_at TEXT,
      resolved_at TEXT,
      assigned_admin_id TEXT,
      internal_notes TEXT,
      attachments TEXT,
      audit_log TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `).run();
}

async function ensureProfile(DB, identity) {
  const existing = await DB.prepare(`SELECT email, verified_name, display_name, contact_email FROM profiles WHERE lower(email) = lower(?)`).bind(identity.email).first();
  if (existing) return existing;

  await DB.prepare(`
    INSERT INTO profiles (email, verified_name, display_name, contact_email)
    VALUES (?, ?, ?, ?)
  `).bind(identity.email, identity.name, identity.name || identity.email, identity.email).run();

  return DB.prepare(`SELECT email, verified_name, display_name, contact_email FROM profiles WHERE lower(email) = lower(?)`).bind(identity.email).first();
}

async function nextReference(DB, table, prefix) {
  const row = await DB.prepare(`
    SELECT reference FROM ${table}
    WHERE reference LIKE ?
    ORDER BY reference DESC
    LIMIT 1
  `).bind(`${prefix}-%`).first();

  const last = row?.reference ? Number(String(row.reference).replace(`${prefix}-`, "")) : 0;
  return `${prefix}-${String(last + 1).padStart(6, "0")}`;
}

function auditEvent(type, actor, detail = {}) {
  return JSON.stringify([{
    type,
    actor: actor.email || actor.name || "customer",
    timestamp: new Date().toISOString(),
    ...detail
  }]);
}

async function createDataProtectionRequest(DB, identity, profile, body) {
  const requestType = clean(body.request_type, 160);
  const message = clean(body.customer_message, 4000);
  const confirmed = Boolean(body.confirmed);

  if (!DPR_TYPES.has(requestType) || !message || !confirmed) {
    return json({ error: "Request type, details and confirmation are required." }, 400);
  }

  const reference = await nextReference(DB, "data_protection_requests", "DPR");
  const submittedAt = new Date().toISOString();
  const dueAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  await DB.prepare(`
    INSERT INTO data_protection_requests (
      id, reference, user_id, customer_name, customer_email, request_type, customer_message,
      status, submitted_at, due_at, attachments, audit_log, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, 'New', ?, ?, '[]', ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `).bind(
    crypto.randomUUID(),
    reference,
    identity.email,
    profile.display_name || profile.verified_name || identity.name || identity.email,
    identity.email,
    requestType,
    message,
    submittedAt,
    dueAt,
    auditEvent("Record created", identity, { newValue: "New" })
  ).run();

  const record = await getOwnDataRequest(DB, identity.email, reference);
  await sendConfirmationEmail(body.env, identity.email, "Data Protection Request", reference, requestType).catch(() => {});
  return json({ saved: true, record });
}

async function createSystemReport(DB, identity, profile, body) {
  const issueType = clean(body.issue_type, 180);
  const description = clean(body.description, 4000);
  if (!SYS_TYPES.has(issueType) || !description) {
    return json({ error: "Issue type and description are required." }, 400);
  }

  const reference = await nextReference(DB, "system_reports", "SYS");
  const submittedAt = new Date().toISOString();

  await DB.prepare(`
    INSERT INTO system_reports (
      id, reference, user_id, customer_name, customer_email, issue_type, affected_url,
      device_browser, description, status, priority, submitted_at, attachments, audit_log,
      created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'New', 'Normal', ?, '[]', ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `).bind(
    crypto.randomUUID(),
    reference,
    identity.email,
    profile.display_name || profile.verified_name || identity.name || identity.email,
    identity.email,
    issueType,
    clean(body.affected_url, 500),
    clean(body.device_browser, 500),
    description,
    submittedAt,
    auditEvent("Record created", identity, { newValue: "New" })
  ).run();

  const record = await getOwnSystemReport(DB, identity.email, reference);
  await sendConfirmationEmail(body.env, identity.email, "System Report", reference, issueType).catch(() => {});
  return json({ saved: true, record });
}

async function sendConfirmationEmail(env, email, label, reference, type) {
  if (!env?.RESEND_API_KEY || !env.ENQUIRY_FROM_EMAIL) return;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      from: env.ENQUIRY_FROM_EMAIL,
      to: [email],
      subject: `${reference}: ${label} received`,
      html: `<p>Thank you. JA Experiences &amp; Discovery has received your ${label.toLowerCase()}.</p><p><strong>Reference:</strong> ${reference}<br><strong>Type:</strong> ${escapeHtml(type)}</p><p>We will review your submission and respond where appropriate.</p>`
    })
  });
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

async function getOwnDataRequest(DB, email, reference) {
  return DB.prepare(`
    SELECT reference, request_type, customer_message, status, submitted_at, due_at, completed_at, created_at, updated_at
    FROM data_protection_requests
    WHERE lower(customer_email) = lower(?) AND reference = ?
  `).bind(email, reference).first();
}

async function getOwnSystemReport(DB, email, reference) {
  return DB.prepare(`
    SELECT reference, issue_type, affected_url, device_browser, description, status, priority, submitted_at, resolved_at, created_at, updated_at
    FROM system_reports
    WHERE lower(customer_email) = lower(?) AND reference = ?
  `).bind(email, reference).first();
}

async function listOwnRecords(DB, email) {
  const dpr = await DB.prepare(`
    SELECT reference, request_type, customer_message, status, submitted_at, due_at, completed_at, created_at, updated_at
    FROM data_protection_requests
    WHERE lower(customer_email) = lower(?)
    ORDER BY submitted_at DESC, created_at DESC
    LIMIT 100
  `).bind(email).all();

  const system = await DB.prepare(`
    SELECT reference, issue_type, affected_url, device_browser, description, status, priority, submitted_at, resolved_at, created_at, updated_at
    FROM system_reports
    WHERE lower(customer_email) = lower(?)
    ORDER BY submitted_at DESC, created_at DESC
    LIMIT 100
  `).bind(email).all();

  return {
    dataProtectionRequests: dpr.results || [],
    systemReports: system.results || []
  };
}

export async function onRequest(context) {
  const { request, env } = context;
  if (!env.DB) return json({ error: "Database binding DB is missing." }, 500);

  const identity = getAccessIdentity(request);
  if (!identity.email) return json({ error: "Not signed in." }, 401);

  await ensureTables(env.DB);
  const profile = await ensureProfile(env.DB, identity);

  if (request.method === "GET") {
    return json(await listOwnRecords(env.DB, identity.email));
  }

  if (request.method === "POST") {
    const body = await request.json().catch(() => ({}));
    const type = clean(body.type, 40);
    body.env = env;
    if (type === "data_protection") return createDataProtectionRequest(env.DB, identity, profile, body);
    if (type === "system_report") return createSystemReport(env.DB, identity, profile, body);
    return json({ error: "Unknown request type." }, 400);
  }

  return json({ error: "Method not allowed." }, 405);
}
