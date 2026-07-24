import { useEffect, useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import { CirclePoundSterling, RefreshCw } from 'lucide-react';
import { PLANYX_EMAIL, normaliseContactDetails } from '@/lib/contact-details';

interface LegalContent { body: string; effectiveDate: string; version: number; }

export default function RefundPolicyPage() {
  const [liveContent, setLiveContent] = useState<LegalContent | null>(null);
  const [loadingLive, setLoadingLive] = useState(true);

  useEffect(() => {
    fetch('/api/legal?slug=refund-policy', { cache: 'no-store' })
      .then(response => response.json())
      .then((data: { success: boolean } & Partial<LegalContent>) => {
        if (data.success && data.body) setLiveContent(data as LegalContent);
      })
      .catch(() => { /* retain the reviewed static fallback */ })
      .finally(() => setLoadingLive(false));
  }, []);

  const effectiveDate = liveContent?.effectiveDate
    ? new Date(liveContent.effectiveDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '24 July 2026';

  return <>
    <Helmet>
      <title>Refund Policy — Planyx</title>
      <meta name="description" content="Planyx cancellation and refund policy." />
      <link rel="canonical" href="https://planyx.jagroupservices.co.uk/refund-policy" />
    </Helmet>
    <main className="min-h-screen bg-background">
      <article className="mx-auto max-w-3xl px-6 py-12 text-foreground">
        <header className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><CirclePoundSterling className="h-5 w-5 text-primary" /></div>
          <div><h1 className="text-2xl font-bold">Refund Policy</h1><p className="text-sm text-muted-foreground">Effective {effectiveDate}{liveContent ? ` · Version ${liveContent.version}` : ' · Version 1.0'}</p></div>
        </header>
        {liveContent ? (
          <div className="legal-html-body text-sm leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: normaliseContactDetails(liveContent.body, true) }} />
        ) : loadingLive ? (
          <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground"><RefreshCw className="h-4 w-4 animate-spin" /> Loading…</div>
        ) : (
          <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
            <section><p>This policy explains how cancellation and refund requests for Planyx subscriptions are handled. Nothing in this policy limits statutory consumer rights.</p></section>
            <section><h2 className="mb-2 text-lg font-semibold text-foreground">1. Subscription cancellations</h2><p>You may cancel a recurring subscription through your account or by contacting Planyx. Cancellation normally prevents the next renewal; access may continue until the end of the paid billing period.</p></section>
            <section><h2 className="mb-2 text-lg font-semibold text-foreground">2. Refund requests</h2><p>Refund eligibility depends on the circumstances, the service supplied and applicable consumer law. Contact <a className="text-primary underline" href={`mailto:${PLANYX_EMAIL}`}>{PLANYX_EMAIL}</a> with your account email, payment reference and reason for the request.</p></section>
            <section><h2 className="mb-2 text-lg font-semibold text-foreground">3. Third-party purchases</h2><p>Activities or experiences purchased from Headout, GetYourGuide or another provider are supplied by that provider. Its cancellation and refund terms apply, and requests should normally be made directly to it.</p></section>
          </div>
        )}
        <nav className="mt-12 flex flex-wrap gap-4 border-t border-border pt-6 text-sm text-muted-foreground"><Link to="/terms">Terms &amp; Conditions</Link><Link to="/privacy">Privacy Policy</Link><Link to="/complaints">Complaints Policy</Link><Link to="/contact">Contact</Link></nav>
      </article>
    </main>
  </>;
}
