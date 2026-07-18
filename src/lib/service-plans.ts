export interface ServicePlan {
  id: string;
  plan_name: string;
  plan_type: string;
  price_label: string;
  price_pence: number;
  delivery_time: string;
  revisions: string;
  description: string;
  button_label: string;
  is_featured: number;
  payment_available?: boolean;
  included_features: string[];
}

export type PlanFeatureValue = string | boolean;

export const PLAN_FEATURE_COMPARISON: Array<{ feature: string; values: Record<string, PlanFeatureValue> }> = [
  { feature: '30-day free trial', values: { personal: true, standard: true, professional: true, org_starter: true } },
  { feature: 'Destination and partner-activity galleries', values: { personal: true, standard: true, professional: true, org_starter: true } },
  { feature: 'Builder usage while subscribed', values: { personal: 'Unlimited', standard: 'Unlimited', professional: 'Unlimited', org_starter: 'Unlimited' } },
  { feature: 'Experience-planning builders', values: { personal: 'Essential builder collection', standard: 'All published builders', professional: 'All published builders', org_starter: 'All published builders' } },
  { feature: 'Travel Itinerary Builder', values: { personal: false, standard: true, professional: true, org_starter: true } },
  { feature: 'Accessibility planning suite', values: { personal: false, standard: true, professional: true, org_starter: true } },
  { feature: 'Saved drafts', values: { personal: 'Up to 3', standard: 'Up to 5', professional: 'Up to 10', org_starter: 'Up to 10' } },
  { feature: 'Draft retention', values: { personal: '14 days', standard: '14 days', professional: '30 days', org_starter: '30 days' } },
  { feature: 'Personalised planning outputs', values: { personal: true, standard: true, professional: true, org_starter: true } },
  { feature: 'Group-focused plan content', values: { personal: false, standard: false, professional: false, org_starter: true } },
  { feature: 'Multi-user shared workspace', values: { personal: false, standard: false, professional: false, org_starter: false } },
];

/** The public JA Plan Studio subscription catalogue. */
export const JA_PLAN_STUDIO_SUBSCRIPTIONS: ServicePlan[] = [
  {
    id: 'personal',
    plan_name: 'Explore Plan',
    plan_type: 'Monthly subscription',
    price_label: '£5.99',
    price_pence: 599,
    delivery_time: 'Essential planning builders',
    revisions: 'Save and revisit your plans',
    description: 'A simple starting point for exploring ideas and building clear, practical plans.',
    button_label: 'Start 30-day free trial',
    is_featured: 0,
    included_features: ['30-day free trial', 'Essential experience-planning builder collection', 'Unlimited builder completions while subscribed', 'Up to 3 saved drafts', '14-day draft retention', 'Destination and partner-activity galleries'],
  },
  {
    id: 'standard',
    plan_name: 'Plan Plan',
    plan_type: 'Monthly subscription',
    price_label: '£7.99',
    price_pence: 799,
    delivery_time: 'More builders and planning tools',
    revisions: 'Download your finished plans',
    description: 'For regularly creating detailed destination, itinerary, experience and everyday plans.',
    button_label: 'Start 30-day free trial',
    is_featured: 1,
    included_features: ['30-day free trial', 'All published experience-planning builders', 'Travel itinerary and accessibility builders', 'Unlimited builder completions while subscribed', 'Up to 5 saved drafts', '14-day draft retention'],
  },
  {
    id: 'professional',
    plan_name: 'Complete Plan',
    plan_type: 'Monthly subscription',
    price_label: '£14.99',
    price_pence: 1499,
    delivery_time: 'Full planning-builder access',
    revisions: 'Enhanced planning and outputs',
    description: 'Complete access for building and managing more comprehensive personalised plans.',
    button_label: 'Start 30-day free trial',
    is_featured: 0,
    included_features: ['30-day free trial', 'All published experience-planning builders', 'Unlimited builder completions while subscribed', 'Up to 10 saved drafts', '30-day draft retention', 'Complete individual planning access'],
  },
  {
    id: 'org_starter',
    plan_name: 'Together Plan',
    plan_type: 'Monthly subscription',
    price_label: '£39.99',
    price_pence: 3999,
    delivery_time: 'Shared planning for groups',
    revisions: 'All builders and collaborative tools',
    description: 'Shared planning for households, families and groups who want to build plans together.',
    button_label: 'Start 30-day free trial',
    is_featured: 0,
    included_features: ['30-day free trial', 'All published experience-planning builders', 'Unlimited builder completions while subscribed', 'Up to 10 saved drafts', '30-day draft retention', 'Group-focused planning content under one customer account'],
  },
];
