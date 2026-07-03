import assert from "node:assert/strict";
import test from "node:test";
import { onRequest } from "../functions/account/pins.js";

class PinsD1Mock {
  constructor() {
    this.rows = [];
    this.alterStatements = [];
  }

  prepare(sql) {
    const database = this;
    let values = [];
    const statement = {
      bind(...bound) {
        values = bound;
        return statement;
      },
      async all() {
        if (sql.includes("FROM customer_support_pins")) return { results: database.rows };
        return { results: [] };
      },
      async first() {
        if (!sql.includes("FROM customer_support_pins")) return null;
        return database.rows.find((row) => row.id === values[0] && row.email === values[1]) || null;
      },
      async run() {
        if (sql.includes("ALTER TABLE")) database.alterStatements.push(sql);
        if (sql.includes("INSERT INTO customer_support_pins")) {
          database.rows.unshift({
            id: values[0], email: values[1], pin_hash: values[2], pin_ciphertext: values[3], pin_iv: values[4],
            pin_last4: values[5], status: "Active", expires_at: values[6], audit_history: values[7],
            used_at: null, revoked_at: null, revoked_by: null, last_used_at: null,
            created_at: new Date().toISOString(), updated_at: new Date().toISOString()
          });
        }
        if (sql.includes("SET pin_hash =")) {
          const row = database.rows.find((candidate) => candidate.id === values[5]);
          Object.assign(row, { pin_hash: values[0], pin_ciphertext: values[1], pin_iv: values[2], pin_last4: values[3], status: "Active", expires_at: values[4] });
        }
        return { success: true };
      }
    };
    return statement;
  }
}

const headers = {
  Accept: "application/json",
  "x-ja-auth-email": "customer@example.test",
  "x-ja-auth-name": "Test Customer"
};
test("GET /account/pins creates an encrypted PIN with a rotatable record ID", async () => {
  const env = { DB: new PinsD1Mock(), AUTH_COOKIE_SECRET: "test-auth-cookie-secret" };
  const response = await onRequest({ request: new Request("https://example.test/account/pins", { headers }), env });
  const payload = await response.json();

  assert.equal(response.status, 200);
  assert.match(payload.pins[0].id, /^[0-9a-f-]{36}$/);
  assert.match(payload.pins[0].active_pin, /^\d{6}$/);
  assert.ok(env.DB.rows[0].pin_ciphertext);
  assert.ok(env.DB.rows[0].pin_iv);
  assert.ok(env.DB.alterStatements.some((sql) => sql.includes("pin_ciphertext TEXT")));
  assert.ok(env.DB.alterStatements.some((sql) => sql.includes("pin_iv TEXT")));
});

test("POST /account/pins rotates the generated PIN by its returned ID", async () => {
  const env = { DB: new PinsD1Mock(), AUTH_COOKIE_SECRET: "test-auth-cookie-secret" };
  await onRequest({ request: new Request("https://example.test/account/pins", { headers }), env });
  const id = env.DB.rows[0].id;
  const previousHash = env.DB.rows[0].pin_hash;
  const response = await onRequest({
    request: new Request("https://example.test/account/pins", {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ action: "rotate", id })
    }),
    env
  });
  const payload = await response.json();

  assert.equal(response.status, 200);
  assert.match(payload.pin, /^\d{6}$/);
  assert.notEqual(env.DB.rows[0].pin_hash, previousHash);
});
