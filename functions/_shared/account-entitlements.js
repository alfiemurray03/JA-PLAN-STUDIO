export const ACCOUNT_TYPES = Object.freeze({
  INDIVIDUAL: "individual",
  ORGANISATION: "organisation"
});

export const SHARE_PERMISSIONS = Object.freeze({
  NONE: "none",
  VIEW: "view",
  EDIT: "edit"
});

const LIVE_PAID_PLANS = new Set(["personal", "standard", "professional", "org_starter"]);
const READ_ONLY_ORGANISATION_PLANS = new Set(["personal", "standard", "professional"]);

export function normaliseAccountType(value) {
  const normalised = String(value || "").trim().toLowerCase().replace(/[^a-z]/g, "");
  if (["organisation", "organization", "business", "company", "corporate"].includes(normalised)) {
    return ACCOUNT_TYPES.ORGANISATION;
  }
  return ACCOUNT_TYPES.INDIVIDUAL;
}

export function accountTypeFromProfile(profile = {}) {
  const explicit = profile.account_type ?? profile.accountType;
  if (explicit) return normaliseAccountType(explicit);

  // Legacy compatibility only. A company name must never classify an account.
  // Historic `both` records are treated as individual until the customer makes
  // an explicit choice, preventing personal and organisation workspaces mixing.
  const usageType = String(profile.usage_type ?? profile.usageType ?? "").trim().toLowerCase();
  return usageType === "business" ? ACCOUNT_TYPES.ORGANISATION : ACCOUNT_TYPES.INDIVIDUAL;
}

export function accountPlanEntitlements(accountTypeValue, planCodeValue) {
  const accountType = normaliseAccountType(accountTypeValue);
  const planCode = String(planCodeValue || "free").trim().toLowerCase().replace(/-/g, "_");
  const isOrganisation = accountType === ACCOUNT_TYPES.ORGANISATION;
  const paid = LIVE_PAID_PLANS.has(planCode);
  const readOnlySharing = isOrganisation && READ_ONLY_ORGANISATION_PLANS.has(planCode);
  const collaborativeSharing = isOrganisation && planCode === "org_starter";

  return Object.freeze({
    accountType,
    planCode,
    isIndividual: !isOrganisation,
    isOrganisation,
    paid,
    canShareItineraries: readOnlySharing || collaborativeSharing,
    canInviteViewers: readOnlySharing || collaborativeSharing,
    canInviteEditors: collaborativeSharing,
    maximumSharePermission: collaborativeSharing
      ? SHARE_PERMISSIONS.EDIT
      : readOnlySharing
        ? SHARE_PERMISSIONS.VIEW
        : SHARE_PERMISSIONS.NONE,
    organisationMemberWorkspace: collaborativeSharing,
    workspaceLabel: isOrganisation ? "Organisation workspace" : "Individual workspace"
  });
}

export function enforceSharePermission(accountType, planCode, requestedPermission) {
  const entitlements = accountPlanEntitlements(accountType, planCode);
  if (!entitlements.canShareItineraries) return SHARE_PERMISSIONS.NONE;
  if (entitlements.canInviteEditors && String(requestedPermission || "").toLowerCase() === SHARE_PERMISSIONS.EDIT) {
    return SHARE_PERMISSIONS.EDIT;
  }
  return SHARE_PERMISSIONS.VIEW;
}
