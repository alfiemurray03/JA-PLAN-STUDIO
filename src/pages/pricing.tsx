import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { ArrowRight, Check, ChevronDown, ChevronUp, Compass, RefreshCw, Route, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { JA_PLAN_STUDIO_SUBSCRIPTIONS, type ServicePlan } from '@/lib/service-plans';

const FAQS = [
  { q: 'Are these subscriptions?', a: 'Yes. Explore, Plan, Complete and Together are monthly subscriptions. You can manage your subscription from your JA Plan Studio account.' },
  { q: 'Does every plan include a free trial?', a: 'Yes. Every new Explore Plan, Plan Plan, Complete Plan and Together Plan subscription includes a 30-day free trial before the first monthly payment.' },
  { q: 'What does JA Plan Studio help me build?', a: 'Depending on the package, we help structure destination ideas, itinerary and experience planning, practical checks, priorities and next steps into a clear personalised plan.' },
  { q: 'Which subscription should I choose?', a: 'Explore is the simplest starting point, Plan adds more planning tools, Complete provides full individual access, and Together is designed for shared household, family and group planning.' },
  { q: 'Does JA Plan Studio make bookings?', a: 'No. JA Plan Studio provides discovery and planning guidance. Third-party bookings, prices, availability, refunds and provider terms remain between you and the relevant provider.' },
];

const FEATURE_ROWS: Array<{ feature: string; values: Record<string, string | boolean> }> = [
  { feature: '30-day free trial', values: { personal: true, standard: true, professional: true, org_starter: true } },
  { feature: 'Destination and activity discovery', values: { personal: true, standard: true, professional: true, org_starter: true } },
  { feature: 'Guided experience-planning builders', values: { personal: 'Essential', standard: 'Expanded', professional: 'Full access', org_starter: 'Full access' } },
  { feature: 'Saved plans', values: { personal: 'Up to 3', standard: 'Up to 5', professional: 'Up to 10', org_starter: 'Up to 10 shared' } },
  { feature: 'Saved-plan retention', values: { personal: '14 days', standard: '14 days', professional: '30 days', org_starter: '30 days' } },
  { feature: 'Download finished plans', values: { personal: false, standard: true, professional: true, org_starter: true } },
  { feature: 'Enhanced planning and outputs', values: { personal: false, standard: false, professional: true, org_starter: true } },
  { feature: 'Included users', values: { personal: '1', standard: '1', professional: '1', org_starter: '2' } },
  { feature: 'Shared household, family or group planning', values: { personal: false, standard: false, professional: false, org_starter: true } },
];

function PlanCard({ plan }: { plan: ServicePlan }) {
  const featured = Boolean(plan.is_featured);
  const href = `/create-checkout-session?plan=${encodeURIComponent(plan.id)}`;

  return (
    <article className={`relative flex h-full flex-col rounded-2xl border p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${featured ? 'border-primary ring-2 ring-primary/15 bg-primary/[0.03]' : 'border-border bg-card'}`}>
      {featured && <Badge className="absolute -top-3 left-6 bg-primary text-primary-foreground">JA Plan Studio package</Badge>}
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">{plan.plan_type}</p>
      <h3 className="text-xl font-bold leading-tight text-foreground">{plan.plan_name}</h3>
      <p className="mt-2 text-xs font-semibold text-emerald-600">30-day free trial</p>
      <div className="my-5 flex items-end gap-1"><span className="text-4xl font-extrabold text-foreground">{plan.price_label}</span><span className="pb-1 text-sm text-muted-foreground">/month</span></div>
      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>
      <ul className="mb-6 space-y-3 text-sm text-foreground">
        <li className="flex items-start gap-2"><RefreshCw className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{plan.delivery_time}</span></li>
        <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{plan.revisions}</span></li>
        <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>Personalised JA Plan Studio planning output</span></li>
      </ul>
      <a href={href} className="mt-auto block">
        <Button className="w-full gap-2">{plan.button_label || 'Choose this subscription'} <ArrowRight className="h-4 w-4" /></Button>
      </a>
    </article>
  );
}

export default function PricingPage() {
  const [plans, setPlans] = useState<ServicePlan[]>(JA_PLAN_STUDIO_SUBSCRIPTIONS);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchParams] = useSearchParams();
  const cancelled = searchParams.get('payment') === 'cancelled' || searchParams.get('checkout') === 'cancelled';

  useEffect(() => {
    fetch('/plans-data', { cache: 'no-store' })
      .then(response => response.ok ? response.json() : Promise.reject(new Error('Plan catalogue unavailable')))
      .then(data => {
        if (!Array.isArray(data.plans)) return;
        const recognised = new Set(JA_PLAN_STUDIO_SUBSCRIPTIONS.map(plan => plan.id));
        const current = data.plans.filter((plan: ServicePlan) => recognised.has(plan.id));
        if (current.length) setPlans(current);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Helmet>
        <title>Plans & Pricing | JA Plan Studio</title>
        <meta name="description" content="Choose a monthly JA Plan Studio subscription: Explore, Plan, Complete or Together." />
        <link rel="canonical" href="https://japlanstudio.jagroupservices.co.uk/pricing" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <section className="border-b border-border bg-gradient-to-b from-primary/10 to-background px-4 py-20 text-center">
          <Badge variant="outline" className="mb-5">JA Plan Studio plans</Badge>
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">A subscription for every way you plan</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">Choose Explore Plan, Plan Plan, Complete Plan or Together Plan. Every subscription starts with a 30-day free trial.</p>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {cancelled && <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">Checkout was cancelled. No payment was taken.</div>}

          <section aria-labelledby="subscription-plans" className="mb-20">
            <div className="mb-9 text-center">
              <h2 id="subscription-plans" className="text-3xl font-bold text-foreground">Monthly subscriptions</h2>
              <p className="mt-2 text-muted-foreground">Four clear options, billed monthly through secure Stripe checkout.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">{plans.map(plan => <PlanCard key={plan.id} plan={plan} />)}</div>
          </section>

          <section aria-labelledby="feature-comparison" className="mb-20">
            <div className="mb-8 text-center">
              <Badge variant="outline" className="mb-3">Compare features</Badge>
              <h2 id="feature-comparison" className="text-3xl font-bold text-foreground">Features included with each plan</h2>
              <p className="mt-2 text-muted-foreground">Compare all four subscriptions before starting your 30-day free trial.</p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
              <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th scope="col" className="sticky left-0 z-10 min-w-64 bg-muted px-5 py-4 font-semibold text-foreground">Feature</th>
                    {plans.map(plan => <th key={plan.id} scope="col" className="min-w-36 px-4 py-4 text-center font-semibold text-foreground">{plan.plan_name}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {FEATURE_ROWS.map((row, index) => (
                    <tr key={row.feature} className={index < FEATURE_ROWS.length - 1 ? 'border-b border-border' : ''}>
                      <th scope="row" className="sticky left-0 z-10 bg-card px-5 py-4 font-medium text-foreground">{row.feature}</th>
                      {plans.map(plan => {
                        const value = row.values[plan.id] ?? false;
                        return <td key={plan.id} className="px-4 py-4 text-center text-muted-foreground">
                          {value === true ? <Check aria-label="Included" className="mx-auto h-5 w-5 text-emerald-500" /> : value === false ? <span aria-label="Not included" className="text-muted-foreground/40">—</span> : value}
                        </td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-20">
            <div className="mb-9 text-center"><Badge variant="outline" className="mb-3">Building your plan</Badge><h2 className="text-3xl font-bold text-foreground">What JA Plan Studio helps you build</h2></div>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                { icon: Compass, title: 'Destination discovery', text: 'Turn early ideas, preferences and priorities into a focused destination direction.' },
                { icon: Route, title: 'Itinerary and experiences', text: 'Structure timings, experience ideas, practical checks and the steps needed before booking.' },
                { icon: Sparkles, title: 'Complete planning guidance', text: 'Bring discovery, itinerary thinking and practical planning guidance together in one complete package.' },
              ].map(item => <article key={item.title} className="rounded-2xl border border-border bg-card p-6"><item.icon className="mb-4 h-6 w-6 text-primary" /><h3 className="font-bold text-foreground">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p></article>)}
            </div>
          </section>

          <section className="mx-auto max-w-3xl">
            <h2 className="mb-7 text-center text-2xl font-bold text-foreground">Frequently asked questions</h2>
            <div className="space-y-3">{FAQS.map((faq, index) => <div key={faq.q} className="overflow-hidden rounded-xl border border-border bg-card"><button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-foreground">{faq.q}{openFaq === index ? <ChevronUp className="h-4 w-4 shrink-0" /> : <ChevronDown className="h-4 w-4 shrink-0" />}</button>{openFaq === index && <p className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>}</div>)}</div>
            <div className="mt-10 text-center"><p className="mb-4 text-muted-foreground">Not sure which subscription fits?</p><Button asChild variant="outline"><Link to="/contact">Contact JA Plan Studio <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
          </section>
        </div>
      </main>
    </>
  );
}
