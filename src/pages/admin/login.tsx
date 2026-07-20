import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertTriangle, ArrowRight, BarChart3, Bot, Compass, CreditCard,
  LockKeyhole, MapPinned, Moon, RefreshCw, ShieldCheck, Sun, Users,
} from 'lucide-react';

const OIDC_ERRORS: Record<string, { title: string; body: string }> = {
  oidc_unavailable: { title: 'Sign-in temporarily unavailable', body: 'We could not complete your sign-in. Please wait a moment and try again.' },
  oidc_state_missing: { title: 'Session expired', body: 'Your sign-in session timed out. Please start again.' },
  oidc_state_invalid: { title: 'Sign-in could not be verified', body: 'Something went wrong verifying your sign-in. Please try again.' },
  oidc_wrong_tenant: { title: 'Access denied', body: 'This portal is restricted to JA Group Services Ltd accounts only.' },
  oidc_no_email: { title: 'Email address not available', body: 'We could not retrieve your email address from your account. Please try again.' },
  oidc_not_authorised: { title: 'Not authorised', body: 'Your account is not authorised for this portal. Contact your administrator.' },
  oidc_account_suspended: { title: 'Account suspended', body: 'Your account has been suspended. Contact your administrator.' },
  oidc_callback_failed: { title: 'Sign-in did not complete', body: 'Authentication did not complete successfully. Please try again.' },
};

const CONTROL_AREAS = [
  { icon: Compass, title: 'Experience builders', text: 'Planning catalogue, availability and customer experience.' },
  { icon: Users, title: 'Customer CRM', text: 'Customers, memberships, enquiries and account records.' },
  { icon: CreditCard, title: 'Plans and billing', text: 'Subscriptions, payment settings and plan access.' },
  { icon: Bot, title: 'AI support assistant', text: 'Conversations, knowledge and support escalation.' },
];

type LandingTheme = 'light' | 'dark';

function initialTheme(): LandingTheme {
  if (typeof window === 'undefined') return 'light';
  const saved = window.localStorage.getItem('ja_admin_landing_theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function AdminLoginPage() {
  const [searchParams] = useSearchParams();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [theme, setTheme] = useState<LandingTheme>(initialTheme);
  const dark = theme === 'dark';
  const errorCode = searchParams.get('error') ?? '';
  const errorInfo = OIDC_ERRORS[errorCode] ?? (errorCode ? { title: 'Sign-in failed', body: 'An unexpected error occurred. Please try again.' } : null);

  function handleSignIn() {
    setIsRedirecting(true);
    window.location.href = '/admin/login?return_to=%2Fadmin%2Fdashboard%2F';
  }

  function toggleTheme() {
    const next = dark ? 'light' : 'dark';
    window.localStorage.setItem('ja_admin_landing_theme', next);
    setTheme(next);
  }

  return (
    <>
      <Helmet>
        <title>Admin Centre — JA Plan Studio</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="color-scheme" content={dark ? 'dark' : 'light'} />
      </Helmet>

      <main className={`min-h-screen transition-colors ${dark ? 'bg-[#0b1120] !text-white' : 'bg-[#f6f8fc] !text-black'}`}>
        <header className={`border-b ${dark ? 'border-slate-800 bg-[#101827]' : 'border-slate-200 bg-white'}`}>
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#2463eb] text-white">
                <Compass className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className={`text-sm font-semibold leading-tight ${dark ? '!text-white' : '!text-black'}`}>JA Plan Studio</p>
                <p className={`text-xs ${dark ? '!text-slate-300' : '!text-slate-600'}`}>Admin Centre</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`hidden items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs sm:inline-flex ${dark ? 'border-slate-700 bg-slate-900 !text-slate-200' : 'border-blue-100 bg-blue-50 !text-blue-800'}`}>
                <ShieldCheck className="h-3.5 w-3.5" />Staff system
              </span>
              <button type="button" onClick={toggleTheme} aria-label={dark ? 'Use light mode' : 'Use dark mode'} aria-pressed={dark} className={`inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-medium ${dark ? 'border-slate-700 bg-slate-900 !text-white hover:bg-slate-800' : 'border-slate-300 bg-white !text-black hover:bg-slate-50'}`}>
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="hidden sm:inline">{dark ? 'Light' : 'Dark'}</span>
              </button>
            </div>
          </div>
        </header>

        <section className="mx-auto grid max-w-6xl gap-7 px-5 py-8 sm:px-7 lg:grid-cols-[1.12fr_.88fr] lg:items-center lg:py-11">
          <div>
            <div className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${dark ? 'border-blue-800 bg-blue-950/50 !text-blue-200' : 'border-blue-200 bg-white !text-blue-800'}`}>
              <MapPinned className="h-3.5 w-3.5" />Planning platform operations
            </div>
            <h1 className={`max-w-2xl text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-[44px] lg:leading-[1.08] ${dark ? '!text-white' : '!text-black'}`}>
              The control centre for <span className="!text-[#2463eb]">JA Plan Studio.</span>
            </h1>
            <p className={`mt-4 max-w-2xl text-sm leading-6 sm:text-base ${dark ? '!text-slate-300' : '!text-slate-700'}`}>
              Manage planning experiences, customers, memberships, support and platform operations from one secure workspace.
            </p>

            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {CONTROL_AREAS.map(({ icon: Icon, title, text }) => (
                <article key={title} className={`rounded-xl border p-3.5 ${dark ? 'border-slate-700 bg-[#111b2d]' : 'border-slate-200 bg-white'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${dark ? 'bg-blue-950 !text-blue-300' : 'bg-blue-50 !text-blue-700'}`}><Icon className="h-4 w-4" /></div>
                    <div>
                      <h2 className={`text-sm font-medium ${dark ? '!text-white' : '!text-black'}`}>{title}</h2>
                      <p className={`mt-0.5 text-xs leading-5 ${dark ? '!text-slate-300' : '!text-slate-600'}`}>{text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className={`mt-5 flex flex-wrap gap-4 text-xs ${dark ? '!text-slate-300' : '!text-slate-600'}`}>
              <span className="inline-flex items-center gap-1.5"><BarChart3 className="h-3.5 w-3.5 text-blue-600" />Live operational visibility</span>
              <span className="inline-flex items-center gap-1.5"><LockKeyhole className="h-3.5 w-3.5 text-blue-600" />Microsoft sign-in and Admin PIN</span>
            </div>
          </div>

          <section aria-labelledby="admin-sign-in-title" className={`mx-auto w-full max-w-sm rounded-2xl border p-6 ${dark ? 'border-slate-700 bg-[#111b2d] shadow-2xl shadow-black/20' : 'border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,.09)]'}`}>
            <div className={`mb-5 grid h-10 w-10 place-items-center rounded-xl ${dark ? 'bg-white !text-black' : 'bg-slate-950 !text-white'}`}><ShieldCheck className="h-5 w-5" /></div>
            <p className={`text-xs font-semibold uppercase tracking-[.12em] ${dark ? '!text-blue-300' : '!text-blue-700'}`}>Secure staff access</p>
            <h2 id="admin-sign-in-title" className={`mt-2 text-xl font-semibold tracking-tight ${dark ? '!text-white' : '!text-black'}`}>Sign in to the Admin Centre</h2>
            <p className={`mt-2 text-sm leading-6 ${dark ? '!text-slate-300' : '!text-slate-700'}`}>Use your authorised JA Group Services Microsoft account. Your personal four-digit Admin PIN is requested next.</p>

            {errorInfo && (
              <Alert variant="destructive" className="mt-5 border-red-300 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-700" />
                <AlertDescription className="!text-red-800"><span className="block font-semibold">{errorInfo.title}</span><span className="text-sm">{errorInfo.body}</span></AlertDescription>
              </Alert>
            )}

            <Button type="button" size="lg" className="mt-5 h-11 w-full gap-2 text-sm font-medium" onClick={handleSignIn} disabled={isRedirecting}>
              {isRedirecting ? <><RefreshCw className="h-4 w-4 animate-spin" />Connecting to Microsoft…</> : <>Continue with Microsoft<ArrowRight className="h-4 w-4" /></>}
            </Button>

            <div className={`mt-4 rounded-lg border px-3.5 py-3 ${dark ? 'border-blue-900 bg-blue-950/50' : 'border-blue-100 bg-blue-50'}`}>
              <p className={`text-xs leading-5 ${dark ? '!text-blue-200' : '!text-blue-900'}`}><LockKeyhole className="mr-1.5 inline h-3.5 w-3.5" />Authorised administrators only. Sign-ins and privileged actions are audited.</p>
            </div>

            <div className={`my-5 h-px ${dark ? 'bg-slate-700' : 'bg-slate-200'}`} />
            <Button type="button" variant="outline" className={`h-10 w-full text-sm font-medium ${dark ? 'border-slate-600 bg-transparent !text-white hover:bg-slate-800 hover:!text-white' : '!text-black'}`} onClick={() => { window.location.href = '/login'; }}>Go to customer sign-in</Button>
          </section>
        </section>

        <footer className={`border-t ${dark ? 'border-slate-800 bg-[#101827]' : 'border-slate-200 bg-white'}`}>
          <div className={`mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 text-xs sm:px-7 ${dark ? '!text-slate-400' : '!text-slate-600'}`}>
            <p>JA Plan Studio is operated by JA Group Services Ltd.</p>
            <p>Copyright 2025–{new Date().getFullYear()} JA Group Services Ltd and/or its Licensors – All Rights Reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
