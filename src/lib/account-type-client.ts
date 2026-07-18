import type { AccountType } from './account-entitlements';

export interface AccountClassification {
  accountType: AccountType;
  organisationName: string;
  explicitlySelected: boolean;
  selectedAt: string | null;
  workspaceLabel: string;
}

const DEFAULT_CLASSIFICATION: AccountClassification = {
  accountType: 'individual',
  organisationName: '',
  explicitlySelected: false,
  selectedAt: null,
  workspaceLabel: 'Individual workspace',
};

export async function getAccountClassification(): Promise<AccountClassification> {
  try {
    const response = await fetch('/account/account-type', {
      credentials: 'include',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
    if (!response.ok) return DEFAULT_CLASSIFICATION;
    const data = await response.json() as Partial<AccountClassification> & { success?: boolean };
    if (!data.success) return DEFAULT_CLASSIFICATION;
    return {
      accountType: data.accountType === 'organisation' ? 'organisation' : 'individual',
      organisationName: String(data.organisationName ?? ''),
      explicitlySelected: Boolean(data.explicitlySelected),
      selectedAt: data.selectedAt ?? null,
      workspaceLabel: String(data.workspaceLabel || (data.accountType === 'organisation' ? 'Organisation workspace' : 'Individual workspace')),
    };
  } catch {
    return DEFAULT_CLASSIFICATION;
  }
}

export async function saveAccountClassification(
  accountType: AccountType,
  organisationName = '',
): Promise<{ success: boolean; error?: string; classification?: AccountClassification }> {
  try {
    const response = await fetch('/account/account-type', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ accountType, organisationName }),
    });
    const data = await response.json() as Partial<AccountClassification> & { success?: boolean; error?: string };
    if (!response.ok || !data.success) return { success: false, error: data.error || 'The account type could not be saved.' };
    return {
      success: true,
      classification: {
        accountType: data.accountType === 'organisation' ? 'organisation' : 'individual',
        organisationName: String(data.organisationName ?? ''),
        explicitlySelected: Boolean(data.explicitlySelected),
        selectedAt: data.selectedAt ?? null,
        workspaceLabel: String(data.workspaceLabel || (data.accountType === 'organisation' ? 'Organisation workspace' : 'Individual workspace')),
      },
    };
  } catch {
    return { success: false, error: 'Network error. Please try again.' };
  }
}
