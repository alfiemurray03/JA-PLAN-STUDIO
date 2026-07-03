import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";

import { onRequestPost } from "../functions/stripe-webhook.js";

class FakeDB {
  constructor(secret = "whsec_test") {
    this.secret = secret;
    this.statements = [];
  }

  prepare(sql) {
    const entry = { sql, bindings: [] };
    this.statements.push(entry);
    return {
      bind: (...bindings) => {
        entry.bindings = bindings;
        return this.prepareResult(entry);
      },
      first: () => this.first(entry),
      run: async () => ({ success: true })
    };
  }

  prepareResult(entry) {
    return {
      first: () => this.first(entry),
      run: async () => ({ success: true })
    };
  }

  async first(entry) {
    if (entry.sql.includes("stripe_webhook_signing_secret")) return { value: this.secret };
    if (entry.sql.includes("stripe_webhook_events")) return null;
    return null;
  }

  async batch(statements) {
    return statements.map(() => ({ success: true }));
  }
}

function signedRequest(event, secret = "whsec_test") {
  const payload = JSON.stringify(event);
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = createHmac("sha256", secret).update(`${timestamp}.${payload}`).digest("hex");
  return new Request("https://experiences.example.test/stripe-webhook", {
    method: "POST",
    headers: { "content-type": "application/json", "stripe-signature": `t=${timestamp},v1=${signature}` },
    body: payload
  });
}

test("rejects an invalid Stripe signature before processing", async () => {
  const DB = new FakeDB();
  const response = await onRequestPost({
    request: new Request("https://experiences.example.test/stripe-webhook", {
      method: "POST",
      headers: { "stripe-signature": "t=1,v1=invalid" },
      body: "{}"
    }),
    env: { DB }
  });
  assert.equal(response.status, 400);
  assert.equal(DB.statements.some(({ sql }) => sql.includes("INSERT INTO stripe_webhook_events")), false);
});

test("persists a verified checkout event and acknowledges it", async () => {
  const DB = new FakeDB();
  const response = await onRequestPost({
    request: signedRequest({
      id: "evt_checkout",
      type: "checkout.session.completed",
      data: { object: { id: "cs_1", customer: "cus_1", payment_status: "paid", amount_total: 4900, currency: "gbp", metadata: { plan_code: "plan_1", plan_name: "Plan 1" }, customer_details: { email: "customer@example.test" } } }
    }),
    env: { DB }
  });
  assert.equal(response.status, 200);
  assert.equal(DB.statements.some(({ sql }) => sql.includes("INSERT INTO stripe_checkout_sessions")), true);
  assert.equal(DB.statements.some(({ sql }) => sql.includes("status = 'processed'")), true);
  assert.equal(DB.statements.some(({ sql }) => sql.includes("UPDATE profiles SET")), true);
});

test("persists every required subscription and invoice lifecycle event", async () => {
  for (const [type, object, target] of [
    ["customer.subscription.created", { id: "sub_created", customer: "cus_1", status: "active", items: { data: [{ price: { id: "price_1" } }] } }, "stripe_subscriptions"],
    ["customer.subscription.updated", { id: "sub_updated", customer: "cus_1", status: "active", current_period_end: 2000000000, items: { data: [{ price: { id: "price_1" } }] } }, "stripe_subscriptions"],
    ["customer.subscription.deleted", { id: "sub_deleted", customer: "cus_1", status: "canceled", items: { data: [{ price: { id: "price_1" } }] } }, "stripe_subscriptions"],
    ["invoice.paid", { id: "in_paid", customer: "cus_1", subscription: "sub_1", status: "paid", amount_due: 4900, amount_paid: 4900, currency: "gbp" }, "stripe_invoices"],
    ["invoice.payment_failed", { id: "in_failed", customer: "cus_1", subscription: "sub_1", status: "open", amount_due: 4900, amount_paid: 0, currency: "gbp" }, "stripe_invoices"],
    ["invoice.finalized", { id: "in_finalized", customer: "cus_1", subscription: "sub_1", status: "open", amount_due: 4900, amount_paid: 0, currency: "gbp" }, "stripe_invoices"]
  ]) {
    const DB = new FakeDB();
    const response = await onRequestPost({ request: signedRequest({ id: `evt_${type}`, type, data: { object } }), env: { DB } });
    assert.equal(response.status, 200);
    assert.equal(DB.statements.some(({ sql }) => sql.includes(`INSERT INTO ${target}`)), true);
  }
});
