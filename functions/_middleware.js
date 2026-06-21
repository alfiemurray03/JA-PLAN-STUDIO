function maintenanceHtml(settings) {
  const title = settings.maintenance_title || "We’ll be back shortly.";
  const message = settings.maintenance_message || "JA Experiences & Discovery is temporarily unavailable while essential maintenance is carried out.";
  const eta = settings.maintenance_eta || "";

  return `<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Maintenance | JA Experiences & Discovery</title>
  <meta name="robots" content="noindex,nofollow">
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: #071f36;
      color: #ffffff;
      font-family: Inter, Arial, sans-serif;
      padding: 1.5rem;
    }

    .card {
      width: min(720px, 100%);
      background: #ffffff;
      color: #08233c;
      border-radius: 30px;
      padding: clamp(2rem, 6vw, 4rem);
      box-shadow: 0 30px 90px rgba(0,0,0,0.32);
    }

    .logo {
      width: 58px;
      height: 58px;
      border-radius: 18px;
      background: #f26a2e;
      display: grid;
      place-items: center;
      color: #ffffff;
      font-weight: 900;
      margin-bottom: 1.4rem;
    }

    .kicker {
      color: #f26a2e;
      font-size: 0.78rem;
      font-weight: 900;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 0.8rem;
    }

    h1 {
      margin: 0;
      font-size: clamp(2.4rem, 7vw, 4.8rem);
      line-height: 0.95;
      letter-spacing: -0.065em;
    }

    p {
      margin: 1.2rem 0 0;
      color: #526276;
      font-size: 1.08rem;
      line-height: 1.65;
    }

    .eta {
      margin-top: 1.4rem;
      padding: 1rem;
      border-radius: 18px;
      background: #fff7ed;
      color: #7c2d12;
      font-weight: 800;
    }
  </style>
</head>
<body>
  <main class="card">
    <div class="logo">JA</div>
    <div class="kicker">JA Experiences & Discovery</div>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(message)}</p>
    ${eta ? `<div class="eta">Estimated return: ${escapeHtml(eta)}</div>` : ""}
  </main>
</body>
</html>`;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function getMaintenanceSettings(DB) {
  try {
    const result = await DB.prepare(`
      SELECT key, value
      FROM site_settings
      WHERE key IN (
        'maintenance_enabled',
        'maintenance_title',
        'maintenance_message',
        'maintenance_eta'
      )
    `).all();

    const settings = {};

    for (const row of result.results || []) {
      settings[row.key] = row.value;
    }

    return settings;
  } catch {
    return {
      maintenance_enabled: "false"
    };
  }
}

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  const bypass =
    path.startsWith("/admin") ||
    path.startsWith("/cdn-cgi") ||
    path.startsWith("/assets") ||
    path === "/favicon.ico" ||
    path === "/robots.txt" ||
    path === "/sitemap.xml";

  if (bypass || !env.DB) {
    return next();
  }

  const settings = await getMaintenanceSettings(env.DB);

  if (settings.maintenance_enabled === "true") {
    return new Response(maintenanceHtml(settings), {
      status: 503,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "Retry-After": "3600"
      }
    });
  }

  return next();
}
