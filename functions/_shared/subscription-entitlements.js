export const SUBSCRIPTION_ENTITLEMENTS = Object.freeze({
  personal: Object.freeze({ planCode: "personal", draftLimit: 3, retentionDays: 14 }),
  standard: Object.freeze({ planCode: "standard", draftLimit: 5, retentionDays: 14 }),
  professional: Object.freeze({ planCode: "professional", draftLimit: 10, retentionDays: 30 }),
  org_starter: Object.freeze({ planCode: "org_starter", draftLimit: 10, retentionDays: 30 }),
  trial: Object.freeze({ planCode: "trial", draftLimit: 3, retentionDays: 14 })
});

const PLAN_ALIASES = Object.freeze({
  personal: "personal", explore: "personal", "explore-plan": "personal",
  standard: "standard", plan: "standard", "plan-plan": "standard",
  professional: "professional", complete: "professional", "complete-plan": "professional",
  org_starter: "org_starter", "org-starter": "org_starter", together: "org_starter", "together-plan": "org_starter",
  trial: "trial", "30-day-free-trial": "trial"
});

export function normalisePlanCode(value) {
  const key = String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return PLAN_ALIASES[key] || "";
}

export function planEntitlements(value) {
  const code = normalisePlanCode(value);
  return SUBSCRIPTION_ENTITLEMENTS[code] || null;
}
