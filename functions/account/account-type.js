import { accountTypeFromProfile, normaliseAccountType } from "../_shared/account-entitlements.js";

const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
});

const clean = (value, max = 255) => String(value || "").trim().slice(0, max);

async function alter(DB, sql) {
  try { await DB.prepare(sql).run(); } catch { /* already available */ }
}

async function prepareProfiles(DB) {
  await DB.prepare(`CREATE TABLE IF NOT EXISTS profiles (
    email TEXT PRIMARY KEY,
    verified_name TEXT,
    display_name TEXT,
    contact_email TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`).run();
  await alter(DB, `ALTER TABLE profiles ADD COLUMN account_type TEXT DEFAULT 'individual'`);
  await alter(DB, `ALTER TABLE profiles ADD COLUMN organisation_name TEXT`);
  await alter(DB, `ALTER TABLE profiles ADD COLUMN usage_type TEXT DEFAULT 'personal'`);
  await alter(DB, `ALTER TABLE profiles ADD COLUMN microsoft_company_name TEXT`);
  await alter(DB, `ALTER TABLE profiles ADD COLUMN account_type_selected_at TEXT`);
}

function responseFields(profile) {
  const accountType = accountTypeFromProfile(profile || {});
  return {
    accountType,
    organisationName: accountType === "organisation"
      ? clean(profile?.organisation_name || profile?.microsoft_company_name, 180)
      : "",
    explicitlySelected: Boolean(profile?.account_type_selected_at),
    selectedAt: profile?.account_type_selected_at || null,
    workspaceLabel: accountType === "organisation" ? "Organisation workspace" : "Individual workspace"
  };
}

export async function onRequest({ request, env }) {
  if (!env.DB) return json({ success: false, error: "Account database is unavailable." }, 503);
  const email = clean(request.headers.get("x-ja-auth-email"), 254).toLowerCase();
  if (!email) return json({ success: false, error: "Please sign in to continue." }, 401);

  await prepareProfiles(env.DB);
  let profile = await env.DB.prepare(`SELECT * FROM profiles WHERE lower(email)=lower(?)`).bind(email).first();
  if (!profile) {
    const displayName = clean(request.headers.get("x-ja-auth-name"), 160) || email;
    await env.DB.prepare(`INSERT INTO profiles
      (email, verified_name, display_name, contact_email, account_type, usage_type, created_at, updated_at)
      VALUES (?, ?, ?, ?, 'individual', 'personal', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`)
      .bind(email, displayName, displayName, email).run();
    profile = await env.DB.prepare(`SELECT * FROM profiles WHERE lower(email)=lower(?)`).bind(email).first();
  }

  if (request.method === "GET" || request.method === "HEAD") {
    return json({ success: true, ...responseFields(profile) });
  }
  if (!["POST", "PATCH"].includes(request.method)) {
    return json({ success: false, error: "Method not allowed." }, 405);
  }

  const body = await request.json().catch(() => ({}));
  const accountType = normaliseAccountType(body.accountType);
  const existingName = clean(profile?.organisation_name || profile?.microsoft_company_name, 180);
  const organisationName = accountType === "organisation"
    ? clean(body.organisationName || body.organizationName || existingName, 180)
    : "";

  if (accountType === "organisation" && !organisationName) {
    return json({ success: false, error: "Enter the organisation name before selecting an Organisation account." }, 400);
  }

  await env.DB.prepare(`UPDATE profiles SET
    account_type=?, organisation_name=?, usage_type=?, account_type_selected_at=CURRENT_TIMESTAMP,
    updated_at=CURRENT_TIMESTAMP WHERE lower(email)=lower(?)`)
    .bind(accountType, organisationName || null, accountType === "organisation" ? "business" : "personal", email).run();

  profile = await env.DB.prepare(`SELECT * FROM profiles WHERE lower(email)=lower(?)`).bind(email).first();
  return json({ success: true, saved: true, ...responseFields(profile) });
}
