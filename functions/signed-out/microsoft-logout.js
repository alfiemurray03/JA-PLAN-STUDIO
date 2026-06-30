function safeReturnTarget(origin, value, fallback = "/signed-out/") {
  const text = String(value || "").trim();
  if (!text) return `${origin}${fallback}`;

  try {
    const resolved = new URL(text, origin);
    if (resolved.origin !== origin) return `${origin}${fallback}`;
    return resolved.toString();
  } catch {
    return `${origin}${fallback}`;
  }
}

function buildMicrosoftLogoutUrl(origin, env = {}, returnTarget) {
  const redirectTarget = safeReturnTarget(origin, returnTarget);
  const configured = String(env.MICROSOFT_LOGOUT_URL || "").trim();
  if (configured) {
    const url = new URL(configured);
    if (!url.searchParams.has("post_logout_redirect_uri")) {
      url.searchParams.set("post_logout_redirect_uri", redirectTarget);
    }
    return url.toString();
  }
  return `https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(redirectTarget)}`;
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const returnTarget = url.searchParams.get("return_to") || "/signed-out/";
  return Response.redirect(buildMicrosoftLogoutUrl(url.origin, context.env, returnTarget), 302);
}
