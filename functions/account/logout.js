import { expireSessionCookie, revokeHashedSession } from "../_shared/logout.js";
import { nativeLogout } from "../_shared/oidc.js";

export async function onRequestGet(context) {
  await revokeHashedSession(context, { cookieName: "ja_customer_session", table: "customer_sessions" });
  return nativeLogout(context, "customer", [expireSessionCookie("ja_customer_session")]);
}
