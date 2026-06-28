function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

async function all(DB, sql, bindings = []) {
  const statement = DB.prepare(sql);
  const result = bindings.length ? await statement.bind(...bindings).all() : await statement.all();
  return result.results || [];
}

async function settingMap(DB, keys, defaults = {}) {
  const placeholders = keys.map(() => "?").join(", ");
  const rows = await all(DB, `SELECT key, value FROM site_settings WHERE key IN (${placeholders})`, keys);
  const settings = { ...defaults };
  for (const row of rows) settings[row.key] = row.value;
  return settings;
}

async function migrateStatusPageContent(DB) {
  for (const prefix of ["comingsoon", "maintenance"]) {
    await DB.prepare(`
      INSERT OR IGNORE INTO site_settings (key, value, updated_at)
      VALUES (
        ?,
        COALESCE((SELECT value FROM site_settings WHERE key = ?), ''),
        CURRENT_TIMESTAMP
      )
    `).bind(`${prefix}_content`, `${prefix}_message`).run();
  }
}

export async function onRequestGet({ env }) {
  if (!env.DB) return json({ theme: "dark", branding: {}, affiliate: [] });

  await migrateStatusPageContent(env.DB).catch(() => {});

  const [theme, branding, affiliate] = await Promise.all([
    settingMap(env.DB, ["site_theme_mode"], { site_theme_mode: "dark" }).catch(() => ({ site_theme_mode: "dark" })),
    env.DB.prepare(`SELECT * FROM company_branding WHERE id = 'main'`).first().catch(() => null),
    all(env.DB, `
      SELECT id, block_type, title, body, widget_code, cta_label, cta_url, legal_notice, sort_order
      FROM affiliate_content_blocks
      WHERE is_enabled = 1 AND is_published = 1
      ORDER BY sort_order ASC, updated_at DESC
      LIMIT 100
    `).catch(() => [])
  ]);

  return json({
    theme: theme.site_theme_mode || "dark",
    branding: branding || {},
    affiliate
  });
}
