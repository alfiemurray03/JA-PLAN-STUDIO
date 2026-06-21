function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function pageHtml(settings, mode) {
  const isComingSoon = mode === "coming-soon";

  const title = isComingSoon
    ? settings.comingsoon_title || "JA Experiences & Discovery is coming soon."
    : settings.maintenance_title || "We’ll be back shortly.";

  const message = isComingSoon
    ? settings.comingsoon_message || "Our new experiences and discovery service is being prepared. Please check back soon."
    : settings.maintenance_message || "JA Experiences & Discovery is temporarily unavailable while essential maintenance is carried out.";

  const eta = isComingSoon
    ? settings.comingsoon_eta || ""
    : settings.maintenance_eta || "";

  const kicker = isComingSoon ? "Pre-launch" : "Maintenance";
  const status = isComingSoon ? "Coming soon" : "Maintenance mode";

  return `<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(status)} | JA Experiences & Discovery</title>
  <meta name="robots" content="noindex,nofollow">
  <style>
    :root {
      --navy: #071f36;
      --ink: #08233c;
      --muted: #526276;
      --orange: #f26a2e;
      --cream: #f7f4ed;
      --line: #dde7f0;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background:
        radial-gradient(circle at 20% 15%, rgba(242,106,46,0.22), transparent 34%),
        radial-gradient(circle at 80% 80%, rgba(255,255,255,0.12), transparent 32%),
        linear-gradient(135deg, #071f36, #041424);
      color: #ffffff;
      font-family: Inter, Arial, sans-serif;
      padding: 1.5rem;
    }

    .wrap {
      width: min(1040px, 100%);
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 1.2rem;
      align-items: stretch;
    }

    .card,
    .side {
      border-radius: 34px;
      box-shadow: 0 30px 90px rgba(0,0,0,0.32);
    }

    .card {
      background: #ffffff;
      color: var(--ink);
      padding: clamp(2rem, 6vw, 4.4rem);
    }

    .side {
      background: rgba(255,255,255,0.10);
      border: 1px solid rgba(255,255,255,0.16);
      backdrop-filter: blur(18px);
      padding: clamp(1.4rem, 4vw, 2rem);
      display: grid;
      align-content: end;
      min-height: 420px;
    }

    .logo {
      width: 62px;
      height: 62px;
      border-radius: 20px;
      background: linear-gradient(135deg, var(--orange), #ff8f5d);
      display: grid;
      place-items: center;
      color: #ffffff;
      font-weight: 950;
      margin-bottom: 1.5rem;
      box-shadow: 0 18px 38px rgba(242,106,46,0.28);
    }

    .kicker {
      color: var(--orange);
      font-size: 0.78rem;
      font-weight: 950;
      letter-spacing: 0.13em;
      text-transform: uppercase;
      margin-bottom: 0.85rem;
    }

    h1 {
      margin: 0;
      font-size: clamp(2.6rem, 7vw, 5.2rem);
      line-height: 0.9;
      letter-spacing: -0.075em;
    }

    p {
      margin: 1.2rem 0 0;
      color: var(--muted);
      font-size: 1.08rem;
      line-height: 1.7;
      max-width: 680px;
    }

    .eta {
      margin-top: 1.45rem;
      padding: 1rem;
      border-radius: 18px;
      background: #fff7ed;
      color: #7c2d12;
      font-weight: 850;
    }

    .side h2 {
      margin: 0;
      font-size: clamp(1.9rem, 4vw, 3rem);
      line-height: 0.95;
      letter-spacing: -0.06em;
    }

    .side p {
      color: rgba(255,255,255,0.72);
    }

    .pill {
      display: inline-flex;
      width: fit-content;
      margin-bottom: 1rem;
      border-radius: 999px;
      background: rgba(255,255,255,0.14);
      color: #ffffff;
      padding: 0.55rem 0.8rem;
      font-size: 0.78rem;
      font-weight: 900;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    @media (max-width: 850px) {
      .wrap {
        grid-template-columns: 1fr;
      }

      .side {
        min-height: auto;
      }
    }
  </style>
</head>
<body>
  <main class="wrap">
    <section class="card">
      <div class="logo">JA</div>
      <div class="kicker">${escapeHtml(kicker)}</div>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(message)}</p>
      ${eta ? `<div class="eta">Estimated launch / return: ${escapeHtml(eta)}</div>` : ""}
    </section>

    <aside class="side">
      <div>
        <span class="pill">JA Experiences & Discovery</span>
        <h2>Curated discovery, planning and experience guidance.</h2>
        <p>Part of JA Group Services Ltd.</p>
      </div>
    </aside>
  </main>
</body>
</html>`;
}

async function getSiteSettings(DB) {
  try {
    const result = await DB.prepare(`
      SELECT key, value
      FROM site_settings
      WHERE key IN (
        'maintenance_enabled',
        'maintenance_title',
        'maintenance_message',
        'maintenance_eta',
        'comingsoon_enabled',
        'comingsoon_title',
        'comingsoon_message',
        'comingsoon_eta'
      )
    `).all();

    const settings = {};

    for (const row of result.results || []) {
      settings[row.key] = row.value;
    }

    return settings;
  } catch {
    return {
      maintenance_enabled: "false",
      comingsoon_enabled: "false"
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

  const settings = await getSiteSettings(env.DB);

  if (settings.maintenance_enabled === "true") {
    return new Response(pageHtml(settings, "maintenance"), {
      status: 503,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "Retry-After": "3600"
      }
    });
  }

  if (settings.comingsoon_enabled === "true") {
    return new Response(pageHtml(settings, "coming-soon"), {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  }

  return next();
}
