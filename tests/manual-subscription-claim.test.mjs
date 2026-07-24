import assert from 'node:assert/strict';
import test from 'node:test';

import { claimPaidStripeSubscription } from '../functions/_shared/stripe-subscription-claim.js';

class ClaimDB {
  constructor({ subscription = null, owner = null } = {}) {
    this.subscription = subscription;
    this.owner = owner;
    this.updates = [];
  }

  prepare(sql) {
    const DB = this;
    const entry = { sql, bindings: [] };
    return {
      bind(...bindings) {
        entry.bindings = bindings;
        return {
          async first() {
            if (sql.includes('FROM stripe_subscriptions')) return DB.subscription;
            if (sql.includes('FROM profiles') && sql.includes('stripe_customer_id')) return DB.owner;
            return null;
          },
          async run() {
            DB.updates.push(entry);
            return { success: true };
          },
        };
      },
    };
  }
}

test('a paid Stripe subscription is claimed when the verified account email matches', async () => {
  const DB = new ClaimDB({
    subscription: {
      id: 'sub_manual',
      customer_id: 'cus_manual',
      customer_email: 'customer@example.test',
      plan_code: 'standard',
      plan_name: 'Plan',
      status: 'active',
      billing_status: 'paid',
      current_period_end: '2030-01-01T00:00:00.000Z',
    },
  });

  const result = await claimPaidStripeSubscription(DB, ' Customer@Example.Test ');
  assert.equal(result.claimed, true);
  assert.equal(result.customerId, 'cus_manual');
  assert.equal(DB.updates.some(({ sql }) => sql.includes('UPDATE profiles SET')), true);
});

test('a Stripe customer already owned by another Planyx account cannot be claimed', async () => {
  const DB = new ClaimDB({
    subscription: {
      id: 'sub_manual',
      customer_id: 'cus_manual',
      customer_email: 'customer@example.test',
      plan_code: 'standard',
      plan_name: 'Plan',
      status: 'active',
      billing_status: 'paid',
    },
    owner: { email: 'different@example.test' },
  });

  const result = await claimPaidStripeSubscription(DB, 'customer@example.test');
  assert.deepEqual(result, { claimed: false, reason: 'already_claimed' });
  assert.equal(DB.updates.length, 0);
});
