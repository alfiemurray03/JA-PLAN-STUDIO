export const CUSTOMER_PLAN_IDS = ['free', 'personal', 'standard', 'professional', 'org_starter'] as const;
export type CustomerPlanId = typeof CUSTOMER_PLAN_IDS[number];

export const CUSTOMER_PLAN_LABELS: Record<CustomerPlanId, string> = {
  free: 'Free Plan',
  personal: 'Explore Plan',
  standard: 'Plan Plan',
  professional: 'Complete Plan',
  org_starter: 'Together Plan',
};

export function customerPlanId(profile: Record<string, unknown>): CustomerPlanId {
  const raw = String(profile.currentPlanId || profile.currentPlan || 'free').toLowerCase().replace(/[\s-]+/g, '_');
  return (CUSTOMER_PLAN_IDS as readonly string[]).includes(raw) ? raw as CustomerPlanId : 'free';
}

export function customerPlanLabel(plan: string | undefined, isLifetime = false): string {
  const canonicalPlan = (CUSTOMER_PLAN_IDS as readonly string[]).includes(plan ?? '')
    ? plan as CustomerPlanId
    : 'free';
  const label = CUSTOMER_PLAN_LABELS[canonicalPlan];
  return isLifetime ? `${label} · Lifetime` : label;
}
