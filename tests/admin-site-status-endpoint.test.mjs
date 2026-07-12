import assert from "node:assert/strict";
import test from "node:test";
import { onRequest } from "../functions/admin/api/site-status.js";

class SiteStatusD1 {
  constructor() {
    this.values = new Map([
      ["site_status", "normal"],
      ["maintenance_enabled", "false"],
      ["launchgateway_enabled", "false"]
    ]);
    this.writes = [];
    this.auditWrites = 0;
  }

  prepare(sql) {
    const db = this;
    const statement = {
      bindings: [],
      bind(...values) { statement.bindings = values; return statement; },
      async first() {
        if (sql.includes("FROM admin_users")) return { role: "Platform Owner", status: "Active", permissions: "[]" };
        if (sql.includes("FROM role_permissions")) return { permission_code: "manage_status" };
        return null;
      },
      async all() {
        if (sql.includes("FROM site_settings")) {
          return { results: [...db.values].map(([key, value]) => ({ key, value })) };
        }
        return { results: [] };
      },
      async run() {
        if (sql.includes("INSERT INTO site_settings")) {
          const [key, value] = statement.bindings;
          db.writes.push([key, value]);
          db.values.set(key, value);
        }
        if (sql.includes("INSERT INTO admin_audit_log")) db.auditWrites += 1;
        return { success: true };
      }
    };
    return statement;
  }
}

const env = (DB) => ({ DB, ADMIN_EMAIL: "admin@example.test" });
const headers = (origin = "https://experiences.example.test") => ({
  Origin: origin,
  "Content-Type": "application/json",
  "x-ja-auth-email": "admin@example.test",
  "cf-ray": "site-status-test-ray"
});
function request(method = "GET", body, requestHeaders = headers()) {
  return new Request("https://experiences.example.test/admin/api/site-status", {
    method,
    headers: requestHeaders,
    ...(body ? { body: JSON.stringify(body) } : {})
  });
}

test("authenticated GET returns the authoritative Site Status", async () => {
  const response = await onRequest({ request: request(), env: env(new SiteStatusD1()) });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).site_status, "normal");
});

test("POST writes each status sequentially with the required legacy flags and persists through GET", async () => {
  const DB = new SiteStatusD1();
  const expected = {
    normal: [["site_status", "normal"], ["maintenance_enabled", "false"], ["launchgateway_enabled", "false"]],
    coming_soon: [["site_status", "coming_soon"], ["maintenance_enabled", "false"], ["launchgateway_enabled", "true"]],
    maintenance: [["site_status", "maintenance"], ["maintenance_enabled", "true"], ["launchgateway_enabled", "false"]]
  };
  for (const status of ["normal", "coming_soon", "maintenance", "normal"]) {
    DB.writes.length = 0;
    const response = await onRequest({ request: request("POST", { site_status: status }), env: env(DB) });
    assert.equal(response.status, 200);
    const payload = await response.json();
    assert.equal(payload.saved, true);
    assert.equal(payload.site_status, status);
    assert.deepEqual(DB.writes, expected[status]);
    const getResponse = await onRequest({ request: request(), env: env(DB) });
    assert.equal((await getResponse.json()).site_status, status);
  }
  assert.equal(DB.auditWrites, 4);
});

test("endpoint rejects unauthenticated, cross-origin and invalid requests", async () => {
  const DB = new SiteStatusD1();
  assert.equal((await onRequest({ request: request("GET", null, {}), env: env(DB) })).status, 401);
  assert.equal((await onRequest({ request: request("POST", { site_status: "normal" }, headers("https://attacker.example")), env: env(DB) })).status, 403);
  assert.equal((await onRequest({ request: request("POST", { site_status: "closed" }), env: env(DB) })).status, 400);
  assert.equal((await onRequest({ request: request("POST", { site_status: "normal", extra: true }), env: env(DB) })).status, 400);
  assert.equal(DB.writes.length, 0);
});

test("read-back mismatch returns structured JSON with a correlation ID", async () => {
  const DB = new SiteStatusD1();
  const originalPrepare = DB.prepare.bind(DB);
  DB.prepare = (sql) => {
    const statement = originalPrepare(sql);
    if (sql.includes("FROM site_settings")) statement.all = async () => ({ results: [{ key: "site_status", value: "normal" }] });
    return statement;
  };
  const response = await onRequest({ request: request("POST", { site_status: "coming_soon" }), env: env(DB) });
  assert.equal(response.status, 500);
  const payload = await response.json();
  assert.equal(payload.success, false);
  assert.equal(payload.correlation_id, "site-status-test-ray");
  assert.doesNotMatch(JSON.stringify(payload), /SELECT|INSERT|cookie|token|secret|stack/i);
});
