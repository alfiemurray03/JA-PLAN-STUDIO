import assert from 'node:assert/strict';
import test from 'node:test';
import { customerPlanId, customerPlanLabel } from '../src/lib/customer-plan.ts';

test('customer account uses the canonical lifetime plan ID instead of the display type', () => {
  assert.equal(customerPlanId({ currentPlanId: 'professional', currentPlan: 'Complete Plan', currentPlanType: 'Monthly subscription', lifetimeAccess: true }), 'professional');
  assert.equal(customerPlanId({ currentPlanId: 'org_starter', currentPlanType: 'Monthly subscription', lifetimeAccess: true }), 'org_starter');
});

test('customer navigation shows the public plan name and lifetime status', () => {
  assert.equal(customerPlanLabel('org_starter', true), 'Together Plan · Lifetime');
  assert.equal(customerPlanLabel('professional', false), 'Complete Plan');
  assert.equal(customerPlanLabel('unknown', false), 'Free Plan');
});
