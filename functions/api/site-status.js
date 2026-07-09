export async function onRequestGet({ env }) {
  if (!env.DB) {
    return new Response(JSON.stringify({ status: "normal" }), {
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }
  try {
    const row = await env.DB.prepare("SELECT value FROM site_settings WHERE key = 'site_status'").first();
    const status = row?.value || "normal";
    return new Response(JSON.stringify({ status }), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff"
      }
    });
  } catch {
    return new Response(JSON.stringify({ status: "normal" }), {
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }
}
