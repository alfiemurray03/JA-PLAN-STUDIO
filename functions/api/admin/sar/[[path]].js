import { assertSameOrigin, getNativeSession, withIdentity } from "../../../_shared/oidc.js";
import { onRequest as legacyAdminApi } from "../../../admin/api.js";
import { cleanSarValue, sarDatabaseStatus, sarDto, sarSummary } from "../../../_shared/admin-sar.js";

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...headers }
  });
}

function pathParts(context) {
  const raw = Array.isArray(context.params?.path) ? context.params.path.join("/") : String(context.params?.path || "");
  return raw.split("/").filter(Boolean).map(decodeURIComponent);
}

function configuredAdmins(env) {
  return String(env.ADMIN_EMAILS || env.ADMIN_EMAIL || "alfieholywoodmurray@jagroupservices.co.uk")
    .split(",").map((value) => value.trim().toLowerCase()).filter(Boolean);
}

async function authorised(DB, identity, env) {
  if (configuredAdmins(env).includes(String(identity.email || "").toLowerCase())) return true;
  const row = await DB.prepare("SELECT status FROM admin_users WHERE lower(email)=lower(?)").bind(identity.email).first().catch(() => null);
  return Boolean(row) && !["blocked", "closed", "disabled", "inactive", "suspended"].includes(String(row.status || "active").toLowerCase());
}

async function callDataRequests(context, identity, method = "GET", body) {
  const url = new URL(context.request.url);
  url.pathname = "/admin/api";
  url.search = "?section=datarequests";
  const identityRequest = withIdentity(new Request(context.request.url, { headers: context.request.headers }), identity);
  const headers = new Headers(identityRequest.headers);
  headers.delete("content-length");
  if (body !== undefined) headers.set("Content-Type", "application/json");
  const request = new Request(url, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
  const response = await legacyAdminApi({ ...context, request });
  const data = await response.json().catch(() => ({}));
  return { response, data };
}

async function listRequests(context, identity) {
  const { response, data } = await callDataRequests(context, identity);
  if (!response.ok) return json({ success: false, error: data.error || "Data protection requests could not be loaded." }, response.status);
  const allRows = (Array.isArray(data.datarequests) ? data.datarequests : []).map(sarDto);
  const url = new URL(context.request.url);
  const status = cleanSarValue(url.searchParams.get("status"), 40);
  const type = cleanSarValue(url.searchParams.get("requestType"), 40);
  const search = cleanSarValue(url.searchParams.get("search"), 120).toLowerCase();
  const overdueOnly = url.searchParams.get("overdue") === "true";
  const requests = allRows.filter((row) => {
    if (status && status !== "all" && row.status !== status) return false;
    if (type && type !== "all" && row.requestType !== type) return false;
    if (overdueOnly && !row.isOverdue) return false;
    return !search || `${row.uuid} ${row.email} ${row.fullName}`.toLowerCase().includes(search);
  });
  return json({ success: true, requests, summary: sarSummary(allRows) });
}

async function updateRequest(context, identity, id) {
  const body = await context.request.json().catch(() => ({}));
  const notes = [body.adminNotes, body.identityNotes, body.rejectionReason]
    .map((value) => cleanSarValue(value, 6000)).filter(Boolean).join("\n\n");
  const { response, data } = await callDataRequests(context, identity, "POST", {
    id,
    status: sarDatabaseStatus(body.status),
    internal_notes: notes,
    assigned_admin_id: cleanSarValue(body.assignedTo, 254)
  });
  if (!response.ok) return json({ success: false, error: data.error || "Data protection request could not be updated." }, response.status);
  return json({ success: true, message: "Data protection request updated." });
}

async function generateExport(context, identity, id) {
  const { response, data } = await callDataRequests(context, identity, "POST", {
    id,
    action: "export_customer_data",
    format: "json",
    status: "Ready to Send"
  });
  if (!response.ok) return json({ success: false, error: data.error || "The export could not be generated." }, response.status);
  return json({ success: true, message: "Customer data export generated and audit-logged." });
}

async function downloadRecord(context, identity, id) {
  const { response, data } = await callDataRequests(context, identity);
  if (!response.ok) return json({ success: false, error: data.error || "The request could not be loaded." }, response.status);
  const row = (data.datarequests || []).find((item) => String(item.id) === String(id) || String(item.reference) === String(id));
  if (!row) return json({ success: false, error: "Data protection request not found." }, 404);
  return new Response(JSON.stringify({ generatedAt: new Date().toISOString(), request: row }, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename=\"${cleanSarValue(row.reference || id, 80)}-request.json\"`,
      "Cache-Control": "no-store"
    }
  });
}

export async function onRequest(context) {
  if (!context.env.DB) return json({ success: false, error: "Database binding is unavailable." }, 503);
  const identity = await getNativeSession(context.request, context.env, "admin").catch(() => null);
  if (!identity) return json({ success: false, error: "Admin session expired. Please sign in again." }, 401);
  if (!(await authorised(context.env.DB, identity, context.env))) return json({ success: false, error: "This account is not authorised for the Admin Portal." }, 403);
  if (context.request.method !== "GET" && !assertSameOrigin(context.request)) return json({ success: false, error: "The request origin could not be verified." }, 403);

  const parts = pathParts(context);
  if (context.request.method === "GET" && !parts.length) return listRequests(context, identity);
  if (context.request.method === "PATCH" && parts.length === 1) return updateRequest(context, identity, parts[0]);
  if (context.request.method === "POST" && parts[1] === "generate-export") return generateExport(context, identity, parts[0]);
  if (context.request.method === "GET" && parts[1] === "download") return downloadRecord(context, identity, parts[0]);
  return json({ success: false, error: "SAR route not found." }, 404);
}
