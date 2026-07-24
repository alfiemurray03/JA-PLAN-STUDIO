import { Building2, Check, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFeatureConfig } from '@/lib/feature-config-context';
import {
  INDIVIDUAL_PLAN_FEATURE_COMPARISON,
  PLANYX_SUBSCRIPTIONS,
  ORGANISATION_PLAN_FEATURE_COMPARISON,
  type PlanFeatureRow,
  type ServicePlan,
} from '@/lib/service-plans';

type Audience = 'individual' | 'organisation';

function PlanCard({ plan, audience, payments }: { plan: ServicePlan; audience: Audience; payments: boolean }) {
  const business = audience === 'organisation';
  const features = business ? plan.organisation_features : plan.individual_features;
  const checkout = `/create-checkout-session?plan=${encodeURIComponent(plan.id)}&accountType=${audience}`;
  return (
    <article className={`flex min-w-0 flex-col rounded-2xl border bg-card p-5 shadow-sm ${plan.is_featured ? 'border-primary ring-2 ring-primary/15' : 'border-border'}`}>
      <p className="text-xs font-bold uppercase tracking-wide text-primary">{business ? 'Business plan' : 'Standard plan'}</p>
      <h3 className="mt-1 break-words text-xl font-bold text-foreground">{plan.plan_name}</h3>
      <p className="mt-3 text-3xl font-extrabold text-foreground">{plan.price_label}<span className="ml-1 text-sm font-normal text-muted-foreground">/month</span></p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>
      <ul className="my-5 space-y-2 text-sm text-foreground">
        {features.map(feature => <li key={feature} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /><span className="break-words">{feature}</span></li>)}
      </ul>
      {payments ? <a className="mt-auto block" href={checkout}><Button className="w-full whitespace-normal">Choose {business ? 'Business' : 'Standard'} {plan.plan_name}</Button></a> : <Button className="mt-auto w-full" variant="secondary" disabled>Payments coming soon</Button>}
    </article>
  );
}

function Comparison({ title, rows }: { title: string; rows: PlanFeatureRow[] }) {
  const plans = PLANYX_SUBSCRIPTIONS;
  return (
    <div className="mt-8">
      <h3 className="mb-4 text-xl font-bold text-foreground">{title} comparison</h3>
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[820px] border-collapse text-sm">
          <thead><tr className="border-b border-border bg-muted/50"><th className="sticky left-0 bg-muted px-5 py-4 text-left">Feature</th>{plans.map(plan => <th key={plan.id} className="px-4 py-4 text-center">{plan.plan_name}<span className="block text-xs font-normal text-muted-foreground">{plan.price_label}/month</span></th>)}</tr></thead>
          <tbody>{rows.map(row => <tr key={row.feature} className="border-b border-border last:border-0"><th className="sticky left-0 bg-card px-5 py-4 text-left font-medium">{row.feature}</th>{plans.map(plan => { const value = row.values[plan.id] ?? false; return <td key={plan.id} className="px-4 py-4 text-center text-muted-foreground">{value === true ? <Check className="mx-auto h-5 w-5 text-emerald-500" /> : value === false ? '—' : value}</td>; })}</tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

function Family({ audience, compare }: { audience: Audience; compare: boolean }) {
  const business = audience === 'organisation';
  const Icon = business ? Building2 : User;
  const { config, isLoading } = useFeatureConfig();
  return (
    <section id={business ? 'business-plans' : 'standard-plans'} className="scroll-mt-24">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-border bg-muted/30 p-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
        <div><h2 className="text-2xl font-bold text-foreground">{business ? 'Business Plans' : 'Standard Plans'}</h2><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{business ? 'For businesses and organisations. Explore, Plan and Complete allow read-only itinerary sharing. Together also allows invited editing and the organisation member workspace.' : 'For individual customers. These plans use a private personal workspace without business sharing or organisation member controls.'}</p><p className="mt-2 text-xs font-semibold text-primary">The plan names and monthly prices are currently the same across both ranges.</p></div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">{PLANYX_SUBSCRIPTIONS.map(plan => <PlanCard key={`${audience}-${plan.id}`} plan={plan} audience={audience} payments={!isLoading && config.payments} />)}</div>
      {compare ? <Comparison title={business ? 'Business Plans' : 'Standard Plans'} rows={business ? ORGANISATION_PLAN_FEATURE_COMPARISON : INDIVIDUAL_PLAN_FEATURE_COMPARISON} /> : null}
    </section>
  );
}

export default function StandardBusinessPlans({ comparisons = true }: { comparisons?: boolean }) {
  return <div className="mx-auto w-full max-w-7xl space-y-16"><nav className="grid gap-3 sm:grid-cols-2" aria-label="Plan ranges"><a href="#standard-plans" className="rounded-xl border border-border bg-card p-4 font-semibold text-foreground">Standard Plans<span className="block text-sm font-normal text-muted-foreground">Individual customers</span></a><a href="#business-plans" className="rounded-xl border border-border bg-card p-4 font-semibold text-foreground">Business Plans<span className="block text-sm font-normal text-muted-foreground">Businesses and organisations</span></a></nav><Family audience="individual" compare={comparisons} /><Family audience="organisation" compare={comparisons} /></div>;
}
