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
    const decoded = atob(padded);

    return JSON.parse(decoded);
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

  const email =
    emailHeader ||
    tokenIdentity.email ||
    tokenIdentity.user_email ||
    tokenIdentity.username ||
    "";

  const name =
    tokenIdentity.name ||
    tokenIdentity.common_name ||
    tokenIdentity.user_name ||
    tokenIdentity.preferred_username ||
    email ||
    "";

  return {
    email: String(email || "").trim().toLowerCase(),
    name: String(name || "").trim()
  };
}

function getAllowedAdmins(env) {
  const fallback = "alfieholywoodmurray@jagroupservices.co.uk";

  const raw =
    env.ADMIN_EMAILS ||
    env.ADMIN_EMAIL ||
    fallback;

  return String(raw)
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

async function ensureAdminUsers(DB, env) {
  await DB.prepare(`
    CREATE TABLE IF NOT EXISTS admin_users (
      email TEXT PRIMARY KEY,
      name TEXT,
      source TEXT DEFAULT 'portal',
      created_by TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  for (const email of getAllowedAdmins(env)) {
    await DB.prepare(`
      INSERT INTO admin_users (email, name, source, created_by, updated_at)
      VALUES (?, ?, 'default', 'system', CURRENT_TIMESTAMP)
      ON CONFLICT(email) DO UPDATE SET updated_at = CURRENT_TIMESTAMP
    `).bind(email, email).run();
  }
}

async function isAllowedAdmin(DB, identity, env) {
  if (!identity.email) return false;
  if (getAllowedAdmins(env).includes(identity.email)) return true;

  const admin = await DB.prepare(`SELECT email FROM admin_users WHERE lower(email) = lower(?)`).bind(identity.email).first();
  return Boolean(admin);
}

async function getAdminPermissions(DB, identity) {
  const admin = await DB.prepare(`SELECT role, permissions FROM admin_users WHERE lower(email) = lower(?)`).bind(identity.email).first();
  const role = admin?.role || "Auditor";
  if (role === "Platform Owner") return ["*"];
  const roleRows = await DB.prepare(`SELECT permission_code FROM role_permissions WHERE role_name = ? ORDER BY permission_code ASC`).bind(role).all();
  const rolePermissions = (roleRows.results || []).map((row) => row.permission_code).filter(Boolean);
  let explicit = [];
  try {
    const parsed = JSON.parse(admin?.permissions || "[]");
    explicit = Array.isArray(parsed) ? parsed : [];
  } catch {
    explicit = [];
  }
  return [...new Set([...rolePermissions, ...explicit])];
}

async function ensureProfileTable(DB) {
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
}

async function ensureRoleTables(DB) {
  await DB.prepare(`
    CREATE TABLE IF NOT EXISTS admin_roles (
      name TEXT PRIMARY KEY,
      description TEXT,
      is_system INTEGER DEFAULT 0,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await DB.prepare(`
    CREATE TABLE IF NOT EXISTS role_permissions (
      role_name TEXT,
      permission_code TEXT,
      PRIMARY KEY (role_name, permission_code)
    )
  `).run();
}

export async function onRequest(context) {
  const { request, env } = context;

  if (!env.DB) {
    return json({ error: "Profile database binding DB is missing." }, 500);
  }

  const identity = getAccessIdentity(request);

  if (!identity.email) {
    return json({ error: "Not signed in." }, 401);
  }

  await ensureAdminUsers(env.DB, env);

  if (!(await isAllowedAdmin(env.DB, identity, env))) {
    return json({
      error: "Forbidden.",
      signedInAs: identity.email
    }, 403);
  }
  const permissions = await getAdminPermissions(env.DB, identity);

  if (request.method !== "GET") {
    return json({ error: "Method not allowed." }, 405);
  }

  await ensureRoleTables(env.DB);
  if (!(permissions.includes("*") || permissions.includes("manage_users") || permissions.includes("manage_crm"))) {
    return json({ error: "Forbidden.", section: "customers" }, 403);
  }

  await ensureProfileTable(env.DB);

  const result = await env.DB.prepare(`
    SELECT
      email,
      verified_name,
      display_name,
      contact_email,
      phone,
      communication_preference,
      support_notes,
      created_at,
      updated_at
    FROM profiles
    ORDER BY updated_at DESC, created_at DESC
    LIMIT 250
  `).all();

  return json({
    admin: {
      email: identity.email,
      name: identity.name
    },
    customers: result.results || [],
    count: result.results ? result.results.length : 0
  });
}
