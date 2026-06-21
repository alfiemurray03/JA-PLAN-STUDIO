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
  const raw = env.ADMIN_EMAILS || env.ADMIN_EMAIL || "alfieholywoodmurray@jagroupservices.co.uk";
  return String(raw).split(",").map((email) => email.trim().toLowerCase()).filter(Boolean);
}

function isAllowedAdmin(identity, env) {
  return identity.email && getAllowedAdmins(env).includes(identity.email);
}

function clean(value, max = 2000) {
  return String(value || "").trim().slice(0, max);
}

async function ensureTables(DB) {
  await DB.prepare(`
    CREATE TABLE IF NOT EXISTS service_plans (
      id TEXT PRIMARY KEY,
      plan_name TEXT,
      plan_type TEXT,
      price_label TEXT,
      price_pence INTEGER,
      stripe_price_id TEXT,
      delivery_time TEXT,
      revisions TEXT,
      description TEXT,
      button_label TEXT,
      is_active INTEGER DEFAULT 1,
      is_featured INTEGER DEFAULT 0,
      sort_order INTEGER DEFAULT 100,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await DB.prepare(`
    CREATE TABLE IF NOT EXISTS policy_pages (
      slug TEXT PRIMARY KEY,
      title TEXT,
      content TEXT,
      content_type TEXT DEFAULT 'html',
      is_published INTEGER DEFAULT 1,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await DB.prepare(`
    CREATE TABLE IF NOT EXISTS company_branding (
      id TEXT PRIMARY KEY,
      business_name TEXT,
      trading_name TEXT,
      service_name TEXT,
      support_email TEXT,
      phone TEXT,
      website TEXT,
      footer_notice TEXT,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await DB.prepare(`
    CREATE TABLE IF NOT EXISTS support_tickets (
      id TEXT PRIMARY KEY,
      customer_email TEXT,
      subject TEXT,
      status TEXT,
      priority TEXT,
      notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await DB.prepare(`
    CREATE TABLE IF NOT EXISTS system_events (
      id TEXT PRIMARY KEY,
      type TEXT,
      severity TEXT,
      title TEXT,
      message TEXT,
      status TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `).run();
}

async function seedDefaults(DB) {
  const planCount = await DB.prepare(`SELECT COUNT(*) AS count FROM service_plans`).first();

  if (!planCount || Number(planCount.count) === 0) {
    const plans = [
      ["destination_discovery_standard", "Destination Discovery Plan", "Standard", "£49", 4900, "price_1TkZu2DZzb3r6Q3cuhKd6KTt", "3–5 working days", "1 minor revision", "A focused destination discovery plan for early-stage trip ideas.", "Buy now securely", 1, 1, 10],
      ["itinerary_experience_standard", "Itinerary and Experience Planning Plan", "Standard", "£89", 8900, "price_1TkZuJDZzb3r6Q3c9cEy41Iw", "5–7 working days", "1 minor revision", "A structured itinerary and experience planning service.", "Buy now securely", 1, 1, 20],
      ["complete_planning_standard", "Complete Discovery and Planning Guidance Plan", "Standard", "£149", 14900, "price_1TkZucDZzb3r6Q3cGVNcyvIF", "7–10 working days", "2 minor revisions", "A complete discovery and planning guidance package.", "Buy now securely", 1, 1, 30],
      ["destination_discovery_social", "Destination Discovery Social Tariff", "Social tariff", "£29", 2900, "price_1TkZuuDZzb3r6Q3c2C6jQuvo", "3–5 working days", "1 minor revision", "Reduced-rate destination discovery plan.", "Buy now securely", 1, 0, 40],
      ["itinerary_experience_social", "Itinerary Planning Social Tariff", "Social tariff", "£55", 5500, "price_1TkZv0DZzb3r6Q3cOh6tjkIM", "5–7 working days", "1 minor revision", "Reduced-rate itinerary and experience planning service.", "Buy now securely", 1, 0, 50],
      ["complete_planning_social", "Complete Planning Social Tariff", "Social tariff", "£95", 9500, "price_1TkZvDDZzb3r6Q3csGxh4vSL", "7–10 working days", "2 minor revisions", "Reduced-rate complete planning guidance package.", "Buy now securely", 1, 0, 60]
    ];

    for (const plan of plans) {
      await DB.prepare(`
        INSERT INTO service_plans (
          id, plan_name, plan_type, price_label, price_pence, stripe_price_id,
          delivery_time, revisions, description, button_label, is_active, is_featured, sort_order
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(...plan).run();
    }
  }

  const branding = await DB.prepare(`SELECT id FROM company_branding WHERE id = 'main'`).first();

  if (!branding) {
    await DB.prepare(`
      INSERT INTO company_branding (
        id, business_name, trading_name, service_name, support_email, phone, website, footer_notice
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      "main",
      "JA Group Services Ltd",
      "JA Experiences & Discovery",
      "JA Experiences & Discovery",
      "support@jagroupservices.co.uk",
      "",
      "https://experiences.jagroupservices.co.uk",
      "JA Experiences & Discovery is a service line of JA Group Services Ltd."
    ).run();
  }

  const policyCount = await DB.prepare(`SELECT COUNT(*) AS count FROM policy_pages`).first();

  if (!policyCount || Number(policyCount.count) === 0) {
    const policies = [
      ["privacy-notice", "Privacy Notice", "<p>This privacy notice explains how JA Experiences & Discovery handles customer account, enquiry and service information.</p>", "html", 1],
      ["terms-of-service", "Terms of Service", "<p>These terms explain the basis on which JA Experiences & Discovery provides discovery, planning and guidance services.</p>", "html", 1],
      ["refund-policy", "Refund and Cancellation Policy", "<p>This policy explains refunds, cancellations and service delivery boundaries for paid planning services.</p>", "html", 1],
      ["affiliate-disclosure", "Affiliate Disclosure", "<p>JA Experiences & Discovery may earn commission from third-party providers where customers book through affiliate links.</p>", "html", 1],
      ["important-information", "Important Information", "<p>JA Experiences & Discovery provides planning and guidance support only. Third-party bookings remain subject to provider terms.</p>", "html", 1]
    ];

    for (const policy of policies) {
      await DB.prepare(`
        INSERT INTO policy_pages (slug, title, content, content_type, is_published)
        VALUES (?, ?, ?, ?, ?)
      `).bind(...policy).run();
    }
  }
}

async function getOverview(DB) {
  const customers = await DB.prepare(`SELECT COUNT(*) AS count FROM profiles`).first().catch(() => ({ count: 0 }));
  const plans = await DB.prepare(`SELECT COUNT(*) AS count FROM service_plans`).first();
  const activePlans = await DB.prepare(`SELECT COUNT(*) AS count FROM service_plans WHERE is_active = 1`).first();
  const policies = await DB.prepare(`SELECT COUNT(*) AS count FROM policy_pages`).first();
  const tickets = await DB.prepare(`SELECT COUNT(*) AS count FROM support_tickets`).first();
  const issues = await DB.prepare(`SELECT COUNT(*) AS count FROM system_events WHERE status != 'Resolved'`).first();

  return {
    customers: customers?.count || 0,
    plans: plans?.count || 0,
    activePlans: activePlans?.count || 0,
    policies: policies?.count || 0,
    supportTickets: tickets?.count || 0,
    openIssues: issues?.count || 0
  };
}

async function all(DB, sql) {
  const result = await DB.prepare(sql).all();
  return result.results || [];
}

async function savePlan(DB, body) {
  const id = clean(body.id, 120);
  if (!id) throw new Error("Plan ID is required.");

  await DB.prepare(`
    UPDATE service_plans SET
      plan_name = ?, plan_type = ?, price_label = ?, price_pence = ?,
      stripe_price_id = ?, delivery_time = ?, revisions = ?, description = ?,
      button_label = ?, is_active = ?, is_featured = ?, sort_order = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(
    clean(body.plan_name, 180),
    clean(body.plan_type, 80),
    clean(body.price_label, 40),
    Number(body.price_pence || 0),
    clean(body.stripe_price_id, 180),
    clean(body.delivery_time, 120),
    clean(body.revisions, 120),
    clean(body.description, 1000),
    clean(body.button_label, 80) || "Buy now securely",
    body.is_active ? 1 : 0,
    body.is_featured ? 1 : 0,
    Number(body.sort_order || 100),
    id
  ).run();

  return all(DB, `SELECT * FROM service_plans ORDER BY sort_order ASC, plan_name ASC`);
}

async function savePolicy(DB, body) {
  const slug = clean(body.slug, 120);
  if (!slug) throw new Error("Policy slug is required.");

  await DB.prepare(`
    INSERT INTO policy_pages (slug, title, content, content_type, is_published, updated_at)
    VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(slug) DO UPDATE SET
      title = excluded.title,
      content = excluded.content,
      content_type = excluded.content_type,
      is_published = excluded.is_published,
      updated_at = CURRENT_TIMESTAMP
  `).bind(
    slug,
    clean(body.title, 180),
    clean(body.content, 20000),
    clean(body.content_type, 20) || "html",
    body.is_published ? 1 : 0
  ).run();

  return all(DB, `SELECT * FROM policy_pages ORDER BY title ASC`);
}

async function saveBranding(DB, body) {
  await DB.prepare(`
    INSERT INTO company_branding (
      id, business_name, trading_name, service_name, support_email, phone,
      website, footer_notice, updated_at
    )
    VALUES ('main', ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(id) DO UPDATE SET
      business_name = excluded.business_name,
      trading_name = excluded.trading_name,
      service_name = excluded.service_name,
      support_email = excluded.support_email,
      phone = excluded.phone,
      website = excluded.website,
      footer_notice = excluded.footer_notice,
      updated_at = CURRENT_TIMESTAMP
  `).bind(
    clean(body.business_name, 180),
    clean(body.trading_name, 180),
    clean(body.service_name, 180),
    clean(body.support_email, 180),
    clean(body.phone, 80),
    clean(body.website, 250),
    clean(body.footer_notice, 1000)
  ).run();

  return DB.prepare(`SELECT * FROM company_branding WHERE id = 'main'`).first();
}

async function saveSupport(DB, body) {
  const id = clean(body.id, 120) || crypto.randomUUID();

  await DB.prepare(`
    INSERT INTO support_tickets (id, customer_email, subject, status, priority, notes, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(id) DO UPDATE SET
      customer_email = excluded.customer_email,
      subject = excluded.subject,
      status = excluded.status,
      priority = excluded.priority,
      notes = excluded.notes,
      updated_at = CURRENT_TIMESTAMP
  `).bind(
    id,
    clean(body.customer_email, 180),
    clean(body.subject, 250),
    clean(body.status, 80) || "Open",
    clean(body.priority, 80) || "Normal",
    clean(body.notes, 4000)
  ).run();

  return all(DB, `SELECT * FROM support_tickets ORDER BY updated_at DESC, created_at DESC LIMIT 500`);
}

async function saveSystemEvent(DB, body) {
  const id = clean(body.id, 120) || crypto.randomUUID();

  await DB.prepare(`
    INSERT INTO system_events (id, type, severity, title, message, status, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(id) DO UPDATE SET
      type = excluded.type,
      severity = excluded.severity,
      title = excluded.title,
      message = excluded.message,
      status = excluded.status,
      updated_at = CURRENT_TIMESTAMP
  `).bind(
    id,
    clean(body.type, 100) || "General",
    clean(body.severity, 80) || "Info",
    clean(body.title, 250),
    clean(body.message, 4000),
    clean(body.status, 80) || "Open"
  ).run();

  return all(DB, `SELECT * FROM system_events ORDER BY updated_at DESC, created_at DESC LIMIT 500`);
}

async function getStripe(env) {
  if (!env.STRIPE_SECRET_KEY) {
    return { configured: false, message: "STRIPE_SECRET_KEY is not configured." };
  }

  const accountResponse = await fetch("https://api.stripe.com/v1/account", {
    headers: { "Authorization": `Bearer ${env.STRIPE_SECRET_KEY}` }
  });

  const account = await accountResponse.json();

  const pricesResponse = await fetch("https://api.stripe.com/v1/prices?limit=20&expand[]=data.product", {
    headers: { "Authorization": `Bearer ${env.STRIPE_SECRET_KEY}` }
  });

  const prices = await pricesResponse.json();

  return {
    configured: true,
    account: {
      id: account.id,
      charges_enabled: account.charges_enabled,
      payouts_enabled: account.payouts_enabled,
      country: account.country,
      default_currency: account.default_currency
    },
    prices: prices.data || [],
    note: "Stripe controls are read-only in this admin version."
  };
}

export async function onRequest(context) {
  const { request, env } = context;

  if (!env.DB) return json({ error: "Database binding DB is missing." }, 500);

  const identity = getAccessIdentity(request);

  if (!identity.email) return json({ error: "Not signed in." }, 401);
  if (!isAllowedAdmin(identity, env)) return json({ error: "Forbidden.", signedInAs: identity.email }, 403);

  await ensureTables(env.DB);
  await seedDefaults(env.DB);

  const url = new URL(request.url);
  const section = url.searchParams.get("section") || "overview";

  try {
    if (request.method === "GET") {
      if (section === "overview") return json({ admin: identity, overview: await getOverview(env.DB) });
      if (section === "customers") return json({ admin: identity, customers: await all(env.DB, `SELECT email, verified_name, display_name, contact_email, phone, communication_preference, support_notes, created_at, updated_at FROM profiles ORDER BY updated_at DESC, created_at DESC LIMIT 500`) });
      if (section === "plans") return json({ admin: identity, plans: await all(env.DB, `SELECT * FROM service_plans ORDER BY sort_order ASC, plan_name ASC`) });
      if (section === "policies") return json({ admin: identity, policies: await all(env.DB, `SELECT * FROM policy_pages ORDER BY title ASC`) });
      if (section === "branding") return json({ admin: identity, branding: await env.DB.prepare(`SELECT * FROM company_branding WHERE id = 'main'`).first() });
      if (section === "support") return json({ admin: identity, support: await all(env.DB, `SELECT * FROM support_tickets ORDER BY updated_at DESC, created_at DESC LIMIT 500`) });
      if (section === "system") return json({ admin: identity, system: await all(env.DB, `SELECT * FROM system_events ORDER BY updated_at DESC, created_at DESC LIMIT 500`) });
      if (section === "stripe") return json({ admin: identity, stripe: await getStripe(env) });
    }

    if (request.method === "POST") {
      const body = await request.json().catch(() => ({}));
      if (section === "plans") return json({ plans: await savePlan(env.DB, body), saved: true });
      if (section === "policies") return json({ policies: await savePolicy(env.DB, body), saved: true });
      if (section === "branding") return json({ branding: await saveBranding(env.DB, body), saved: true });
      if (section === "support") return json({ support: await saveSupport(env.DB, body), saved: true });
      if (section === "system") return json({ system: await saveSystemEvent(env.DB, body), saved: true });
    }

    return json({ error: "Method or section not allowed." }, 405);
  } catch (error) {
    return json({ error: error.message || "Admin API error." }, 500);
  }
}
