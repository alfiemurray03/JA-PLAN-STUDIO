import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { useState, useEffect, useLayoutEffect } from 'react';
import InstallAppBanner from '@/components/InstallAppBanner';

/**
 * When the app is running as an installed PWA (standalone display mode),
 * the marketing homepage makes no sense — redirect straight to the dashboard.
 * The manifest already sets start_url=/dashboard, but this catches any edge
 * case where the user navigates back to / while in standalone mode.
 */
function usePwaRedirect() {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as { standalone?: boolean }).standalone === true;
    if (isStandalone) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);
}
import {
  QrCode, Link2, Globe, Phone, Mail, BarChart3, Palette,
  Check, ArrowRight, Users, Briefcase,
  Scissors, Wrench, Star, Zap, Shield,
  Layout, UserCheck, Loader2, Building2,
  Share2, ChevronDown, ChevronUp, Megaphone,
  Lock, Smartphone, FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

/* ─── Shared class helpers ──────────────────────────────────────────────── */
const glass = [
  'bg-card',
  'border border-border',
  'rounded-2xl',
  'shadow-[0_4px_24px_-4px_rgba(37,99,235,0.10)] dark:shadow-[0_4px_24px_-4px_rgba(37,99,235,0.18)]',
].join(' ');

const glassStrong = [
  'bg-card',
  'border border-border',
  'rounded-2xl',
  'shadow-[0_8px_40px_-8px_rgba(37,99,235,0.14),0_2px_8px_-2px_rgba(0,0,0,0.06)]',
  'dark:shadow-[0_8px_40px_-8px_rgba(37,99,235,0.28),0_2px_8px_-2px_rgba(0,0,0,0.30)]',
].join(' ');

const glassHover = 'hover:-translate-y-1 hover:shadow-[0_12px_40px_-8px_rgba(37,99,235,0.20)] dark:hover:shadow-[0_12px_40px_-8px_rgba(37,99,235,0.35)] transition-all duration-300';

/* ─── Demo document card ─────────────────────────────────────────────────── */
function DemoProfileCard() {
  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      <div className="absolute inset-0 rounded-3xl bg-blue-500/20 dark:bg-blue-500/30 blur-3xl scale-110 pointer-events-none" />
      <div className={`relative ${glassStrong} overflow-hidden`}>
        <div className="flex items-center gap-2 px-4 py-2.5 bg-black/4 dark:bg-white/5 border-b border-black/6 dark:border-white/8">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
          </div>
          <div className="flex-1 mx-2 bg-black/6 dark:bg-white/10 rounded-md px-2.5 py-1 text-[10px] text-muted-foreground font-mono truncate">
            japlanstudio.jagroupservices.co.uk/documents/<span className="text-primary">business-proposal</span>
          </div>
        </div>
        <div className="px-5 py-5">
          <div className="flex flex-col items-center mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white text-lg font-bold mb-2.5 ring-4 ring-blue-500/20 shadow-lg shadow-blue-500/25">
              JA
            </div>
            <h3 className="text-foreground font-bold text-sm">Business Proposal</h3>
            <p className="text-primary text-xs mt-0.5 font-medium">Professional template</p>
            <p className="text-muted-foreground text-[10px] mt-0.5">Ready to customise</p>
          </div>
          <div className="space-y-2 mb-4">
            {[
              { icon: <FileText className="w-3 h-3" />, label: 'Executive summary' },
              { icon: <Briefcase className="w-3 h-3" />, label: 'Scope and deliverables' },
              { icon: <Check className="w-3 h-3" />, label: 'Terms and approval' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2 border border-border">
                <span className="text-primary flex-shrink-0">{item.icon}</span>
                <span className="text-foreground text-[10px] truncate">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="flex-1 bg-blue-600 rounded-xl py-2 text-center text-white text-[10px] font-semibold shadow-sm shadow-blue-600/30">
              Edit Document
            </div>
            <div className="flex-1 bg-muted rounded-xl py-2 text-center text-muted-foreground text-[10px] font-semibold border border-border">
              Export PDF
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Demo business documents card ─────────────────────────────────────────── */
function DemoBusinessCard() {
  return (
    <div className={`relative ${glassStrong} overflow-hidden w-full max-w-[300px]`}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/8 via-transparent to-purple-600/6 pointer-events-none" />
      <div className="relative p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600/80 flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">JA</div>
          <div>
            <p className="text-foreground font-bold text-sm leading-tight">Employment Contract</p>
            <p className="text-primary text-[10px] mt-0.5">Contract Builder</p>
          </div>
        </div>
        <div className="space-y-1.5 mb-4">
          {[
            { icon: <Users className="w-3 h-3" />, label: 'Employer and employee details' },
            { icon: <Briefcase className="w-3 h-3" />, label: 'Role, pay and working hours' },
            { icon: <Shield className="w-3 h-3" />, label: 'Terms and signatures' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="text-primary">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="flex-1 bg-blue-600 rounded-lg py-1.5 text-center text-white text-[10px] font-semibold">
            View Document
          </div>
          <div className="flex-1 bg-muted rounded-lg py-1.5 text-center text-muted-foreground text-[10px] font-semibold border border-border">
            Download PDF
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Section badge ──────────────────────────────────────────────────────── */
function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-600/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 mb-4">
      {children}
    </span>
  );
}

/* ─── Trust strip ────────────────────────────────────────────────────────── */
function TrustStrip() {
  const items = [
    { icon: <Lock className="w-4 h-4" />,       label: 'UK-based & GDPR compliant' },
    { icon: <Shield className="w-4 h-4" />,      label: 'Secure sign-in via JA Group Services ID' },
    { icon: <Smartphone className="w-4 h-4" />,  label: 'Works on any device' },
    { icon: <FileText className="w-4 h-4" />,    label: 'No credit card to get started' },
  ];
  return (
    <div className="border-y border-border bg-muted/20 py-5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {items.map(item => (
            <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-primary">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── FAQ item ───────────────────────────────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${glass} overflow-hidden`}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors"
      >
        <span className="text-foreground font-semibold text-sm">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-4 text-muted-foreground text-sm leading-relaxed border-t border-border/50 pt-3">
          {a}
        </div>
      )}
    </div>
  );
}

/* ─── Homepage content type ──────────────────────────────────────────────── */
interface HomepageContent {
  hero_badge: string;
  hero_title_line1: string;
  hero_title_highlight: string;
  hero_subtitle: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  announcement_enabled: boolean;
  announcement_text: string;
  announcement_link: string;
  announcement_link_label: string;
}

const HOMEPAGE_DEFAULTS: HomepageContent = {
  hero_badge:              'Professional document builders',
  hero_title_line1:        'Professional documents,',
  hero_title_highlight:    'generated in minutes',
  hero_subtitle:           'Create letters, contracts, invoices, policies, forms, reports and more from one secure JA Plan Studio account.',
  hero_cta_primary:        'Explore Builders',
  hero_cta_secondary:      'See how it works',
  stats_users:             '',
  stats_profiles:          '',
  stats_countries:         '',
  stats_uptime:            '',
  announcement_enabled:    false,
  announcement_text:       '',
  announcement_link:       '',
  announcement_link_label: 'Learn more',
};

/* ─── Plan types ─────────────────────────────────────────────────────────── */
interface ApiPlan {
  id: number; name: string; slug: string;
  price_monthly: number; price_yearly: number;
  is_lifetime: boolean;
  max_profiles: number;
  max_org_profiles: number;
  max_seats: number;
  core_features: string[];
  included_features: string[];
  coming_soon_features: string[];
}

const PLAN_META: Record<string, { badge: string | null; highlight: boolean; cta: string; note: string; contactUs?: boolean }> = {
  free:             { badge: null,               highlight: false, cta: 'Create Free Account',  note: 'Free forever. No credit card required.' },
  personal:         { badge: '14-day free trial', highlight: false, cta: 'Start Free Trial',    note: 'For personal document creation.' },
  standard:         { badge: '14-day free trial', highlight: false, cta: 'Start Free Trial',    note: 'More builders and branding tools.' },
  professional:     { badge: 'Most popular',      highlight: true,  cta: 'Start Free Trial',    note: 'All builders, templates and signing.' },
  org_starter:      { badge: 'For teams',         highlight: false, cta: 'Choose Plan',         note: 'Organisation workspace with 3 seats.' },
  org_growth:       { badge: 'Growing teams',     highlight: false, cta: 'Choose Plan',         note: 'Organisation workspace with 10 seats.' },
  org_professional: { badge: 'Advanced',          highlight: false, cta: 'Choose Plan',         note: 'Organisation workspace with 25 seats.' },
  // lifetime is intentionally omitted — it is not publicly listed
};

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  usePwaRedirect();
  const navigate = useNavigate();
  const [plans] = useState<ApiPlan[]>([
    { id: 1, name: 'Free', slug: 'free', price_monthly: 0, price_yearly: 0, is_lifetime: false, max_profiles: 1, max_org_profiles: 0, max_seats: 1, core_features: ['1 free template demo', 'PDF export and download', 'Browse the template catalogue'], included_features: [], coming_soon_features: [] },
    { id: 2, name: 'Personal', slug: 'personal', price_monthly: 5.99, price_yearly: 59.90, is_lifetime: false, max_profiles: 25, max_org_profiles: 0, max_seats: 1, core_features: ['Core document builders', 'Save document drafts', '14-day draft retention'], included_features: [], coming_soon_features: [] },
    { id: 3, name: 'Standard', slug: 'standard', price_monthly: 7.99, price_yearly: 79.90, is_lifetime: false, max_profiles: 100, max_org_profiles: 0, max_seats: 1, core_features: ['More builders and templates', 'Branding controls', '14-day free trial'], included_features: [], coming_soon_features: [] },
    { id: 4, name: 'Professional', slug: 'professional', price_monthly: 14.99, price_yearly: 149.90, is_lifetime: false, max_profiles: 999, max_org_profiles: 0, max_seats: 1, core_features: ['All builders and templates', 'Electronic signing', '30-day draft retention'], included_features: [], coming_soon_features: [] },
    { id: 5, name: 'Organisation Starter', slug: 'org_starter', price_monthly: 29.99, price_yearly: 299.90, is_lifetime: false, max_profiles: 999, max_org_profiles: 1, max_seats: 3, core_features: ['Professional features', '3 included seats', 'Organisation controls'], included_features: [], coming_soon_features: [] },
    { id: 6, name: 'Organisation Growth', slug: 'org_growth', price_monthly: 59.99, price_yearly: 599.90, is_lifetime: false, max_profiles: 999, max_org_profiles: 1, max_seats: 10, core_features: ['Professional features', '10 included seats', 'Team management'], included_features: [], coming_soon_features: [] },
    { id: 7, name: 'Organisation Professional', slug: 'org_professional', price_monthly: 99.99, price_yearly: 999.90, is_lifetime: false, max_profiles: 999, max_org_profiles: 1, max_seats: 25, core_features: ['Professional features', '25 included seats', 'Advanced organisation controls'], included_features: [], coming_soon_features: [] },
  ]);
  const plansLoading = false;
  const [hpContent, setHpContent] = useState<HomepageContent>(HOMEPAGE_DEFAULTS);

  useEffect(() => {
    fetch('/api/homepage-content')
      .then(r => r.json())
      .then(d => { if (d.success && d.data) setHpContent(d.data); })
      .catch(() => {});
  }, []);

  const handleTrialCta = (planSlug: string) => {
    // Pass trial intent as URL params — no sessionStorage needed
    navigate(`/sign-in?trial=1&plan=${encodeURIComponent(planSlug)}`);
  };

  const site = 'https://japlanstudio.jagroupservices.co.uk';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${site}/#website`,
        name: 'JA Plan Studio',
        alternateName: 'JA Plan Studio by JA Group Services',
        url: `${site}/`,
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: `${site}/search?q={search_term_string}` },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${site}/#organization`,
        name: 'JA Plan Studio',
        legalName: 'JA Group Services Ltd',
        url: `${site}/`,
        logo: `${site}/airo-assets/images/logo/main`,
        sameAs: [],
      },
      {
        '@type': 'WebPage', '@id': `${site}/#webpage`, url: `${site}/`,
        name: 'JA Plan Studio | Your Professional Document, Ready to Share',
        isPartOf: { '@id': `${site}/#website` },
        about: { '@id': `${site}/#organization` },
        datePublished: '2025-01-01', dateModified: '2026-07-12',
      },
    ],
  };

  return (
    <>
    <div className="relative">
      <Helmet>
        <title>JA Plan Studio | Professional Documents Generated in Minutes</title>
        <meta name="description" content="Create professional letters, contracts, invoices, policies, forms, reports and more. Build, save, export and manage documents from one secure account." />
        <meta property="og:title" content="JA Plan Studio | Professional Documents Generated in Minutes" />
        <meta property="og:description" content="Create professional letters, contracts, invoices, policies, forms, reports and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/`} />
        <meta property="og:image" content={`${site}/og-image.png`} />
        <meta property="og:site_name" content="JA Plan Studio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="JA Plan Studio | Professional Documents Generated in Minutes" />
        <meta name="twitter:description" content="Create professional letters, contracts, invoices, policies, forms, reports and more." />
        <meta name="twitter:image" content={`${site}/og-image.png`} />
        <link rel="canonical" href={`${site}/`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ── Ambient background ── */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full bg-blue-300/15 dark:bg-blue-600/15 blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-indigo-300/10 dark:bg-purple-600/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-sky-300/10 dark:bg-blue-800/12 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(hsl(221 83% 53%) 1px, transparent 1px), linear-gradient(90deg, hsl(221 83% 53%) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════════ */}
      <section className="relative pt-20 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">

          {/* Announcement banner */}
          {hpContent.announcement_enabled && hpContent.announcement_text && (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-sm text-primary mb-8 max-w-3xl mx-auto">
              <Megaphone className="w-4 h-4 shrink-0" />
              <span className="flex-1">{hpContent.announcement_text}</span>
              {hpContent.announcement_link && hpContent.announcement_link_label && (
                <a href={hpContent.announcement_link} className="font-semibold underline hover:no-underline shrink-0">
                  {hpContent.announcement_link_label}
                </a>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — copy */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' as const }}
              style={{ isolation: 'isolate' }}
            >
              <SectionBadge>{hpContent.hero_badge}</SectionBadge>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-foreground leading-[1.1] tracking-tight mb-6">
                {hpContent.hero_title_line1}{' '}
                <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                  {hpContent.hero_title_highlight}
                </span>
              </h1>
              <p className="text-lg text-foreground/80 leading-relaxed mb-8 max-w-lg font-normal">
                {hpContent.hero_subtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/sign-in">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-xl shadow-blue-600/25 px-7 rounded-xl transition-all duration-200 hover:-translate-y-px"
                  >
                    {hpContent.hero_cta_primary} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted px-7 rounded-xl font-medium">
                    {hpContent.hero_cta_secondary}
                  </Button>
                </a>
              </div>

            </motion.div>

            {/* Right — demo cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' as const }}
              className="relative flex items-center justify-center"
            >
              <div className="relative w-full max-w-sm mx-auto">
                <DemoProfileCard />
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' as const }}
                  className="absolute -bottom-10 -right-4 hidden sm:block z-10"
                >
                  <DemoBusinessCard />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <TrustStrip />

      {/* ══════════════════════════════════════════════════════════
          2. PERSONAL vs BUSINESS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <SectionBadge>Built for every document</SectionBadge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-3">
              Personal documents or organisation workflows — you choose
            </h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              Create a one-off professional document for yourself or give your organisation a shared, controlled document workspace.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`${glass} p-7`}
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 mb-5">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-foreground font-bold text-xl mb-3">Personal Documents</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                Create polished everyday documents without starting from a blank page. Choose a builder, select a template and enter the details that matter.
              </p>
              <ul className="space-y-2.5">
                {[
                  'Letters, invoices and proposals',
                  'Contracts, policies and forms',
                  'Reports, minutes and checklists',
                  'Guided fields and live preview',
                  'Save drafts securely',
                  'Export professional PDFs',
                ].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <Check className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Business */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`${glass} p-7`}
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 mb-5">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-foreground font-bold text-xl mb-3">Organisation Documents</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                A shared document workspace with organisation branding, managed seats and controlled access. Ideal for businesses, charities and growing teams.
              </p>
              <ul className="space-y-2.5">
                {[
                  'Organisation name, logo and branding',
                  'Shared templates and documents',
                  'Role-based team access',
                  'Electronic signing workflows',
                  'Organisation seats for staff members',
                  'Central billing and controls',
                ].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <Check className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3. DASHBOARD
      ══════════════════════════════════════════════════════════ */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <SectionBadge>Your dashboard</SectionBadge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-3">
              Everything managed from one place
            </h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              Your JA Plan Studio dashboard gives you full control over builders, documents, signing, organisation members and settings—all in one clean interface.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <Layout className="w-5 h-5" />,    title: 'Document Builders',       desc: 'Use guided builders for letters, contracts, invoices, policies, forms, reports and more.' },
              { icon: <Link2 className="w-5 h-5" />,     title: 'Template Catalogue',      desc: 'Browse professional templates by builder, category, industry and plan.' },
              { icon: <QrCode className="w-5 h-5" />,    title: 'Live Preview',            desc: 'See the finished document update while you complete each guided field.' },
              { icon: <BarChart3 className="w-5 h-5" />, title: 'Document History',        desc: 'Find saved drafts, recent documents and audit information from one place.' },
              { icon: <Mail className="w-5 h-5" />,      title: 'Electronic Signing',      desc: 'Send supported documents for secure signing with a complete audit trail.' },
              { icon: <Palette className="w-5 h-5" />,   title: 'Branding',                desc: 'Apply your colours, logo and organisation identity to supported documents.' },
              { icon: <Users className="w-5 h-5" />,     title: 'Organisation Seats',      desc: 'Invite team members with role-based access and shared organisation controls.' },
              { icon: <Shield className="w-5 h-5" />,    title: 'Security',                desc: 'Manage your account security, sessions and privacy settings.' },
              { icon: <Share2 className="w-5 h-5" />,    title: 'Export Tools',            desc: 'Download, print or share completed documents from your workspace.' },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`${glass} ${glassHover} p-5 group cursor-default`}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-3 group-hover:bg-primary/20 transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-foreground font-semibold text-sm mb-1.5">{f.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. HOW IT WORKS
      ══════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <SectionBadge>How it works</SectionBadge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Up and running in minutes
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Choose a builder and template', desc: 'Select the document type you need, then choose the template that best matches your purpose.' },
              { step: '02', title: 'Complete the guided fields', desc: 'Add your details while the live preview assembles and formats your professional document.' },
              { step: '03', title: 'Save, export or send for signing', desc: 'Keep a secure draft, download the finished document or start an electronic signing workflow.' },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`${glass} p-7 relative overflow-hidden`}
              >
                <div className="absolute top-3 right-4 text-6xl font-black text-blue-600/6 dark:text-white/5 select-none leading-none">
                  {s.step}
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm mb-4 shadow-lg shadow-blue-600/30">
                  {parseInt(s.step)}
                </div>
                <h3 className="text-foreground font-bold text-base mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. WHO IT'S FOR
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <SectionBadge>Who it's for</SectionBadge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Built for professionals, organisations and businesses of all sizes
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: <Briefcase className="w-5 h-5" />,  label: 'Organisations & Businesses' },
              { icon: <UserCheck className="w-5 h-5" />,  label: 'Freelancers' },
              { icon: <Scissors className="w-5 h-5" />,   label: 'Barbers & Beauty' },
              { icon: <Wrench className="w-5 h-5" />,     label: 'Tradespeople' },
              { icon: <Star className="w-5 h-5" />,       label: 'Consultants' },
              { icon: <Users className="w-5 h-5" />,      label: 'Sales Professionals' },
              { icon: <Zap className="w-5 h-5" />,        label: 'Creators' },
              { icon: <Globe className="w-5 h-5" />,      label: 'Event Staff' },
            ].map((w, i) => (
              <motion.div
                key={w.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`${glass} ${glassHover} p-5 flex flex-col items-center text-center gap-3 cursor-default`}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  {w.icon}
                </div>
                <span className="text-foreground text-sm font-semibold">{w.label}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-muted-foreground text-sm mt-6">
            And anyone who needs a polished professional document without starting from scratch.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          6. PRICING
      ══════════════════════════════════════════════════════════ */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <SectionBadge>Pricing</SectionBadge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-3">
              Simple, transparent pricing
            </h2>
            <p className="text-muted-foreground text-base">
              Start free. Upgrade when you need more.
            </p>
          </motion.div>

          {plansLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* Plan cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch mb-4">
                {plans.filter(p => !p.is_lifetime).map((plan, i) => {
                  const display = PLAN_META[plan.slug] ?? { badge: null, highlight: false, cta: 'Get Started', note: '' };
                  const isEnterprise = false;
                  const priceLabel = plan.price_monthly === 0 ? 'Free' : `£${plan.price_monthly}`;
                  const period = (isEnterprise || plan.price_monthly === 0) ? '' : '/mo';
                  const isPaid = plan.price_monthly > 0 && !isEnterprise;

                  return (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.07 }}
                      className={`relative flex flex-col rounded-2xl overflow-hidden ${
                        isEnterprise
                          ? 'bg-gradient-to-br from-amber-500/8 to-orange-500/5 border-2 border-amber-500/40 shadow-md shadow-amber-500/10'
                          : display.highlight
                            ? 'bg-blue-600 shadow-2xl shadow-blue-600/30 ring-2 ring-blue-500'
                            : 'bg-card border border-border shadow-md'
                      }`}
                    >
                      {display.badge && (
                        <div className="px-5 pt-4 pb-0">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isEnterprise
                              ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                              : display.highlight
                                ? 'bg-white/20 text-white'
                                : 'bg-primary/10 text-primary border border-primary/20'
                          }`}>
                            {display.badge}
                          </span>
                        </div>
                      )}

                      <div className="p-5 flex flex-col flex-1 gap-4">
                        {/* Name + price */}
                        <div>
                          <h3 className={`font-bold text-base mb-0.5 ${display.highlight ? 'text-white' : 'text-foreground'}`}>
                            {plan.name}
                          </h3>
                          <div className="flex items-baseline gap-0.5">
                            <span className={`text-3xl font-extrabold ${isEnterprise ? 'text-amber-600' : display.highlight ? 'text-white' : 'text-foreground'}`}>
                              {priceLabel}
                            </span>
                            {period && (
                              <span className={`text-sm ml-0.5 ${display.highlight ? 'text-blue-100' : 'text-muted-foreground'}`}>
                                {period}
                              </span>
                            )}
                          </div>
                          <p className={`text-xs mt-1 leading-snug ${display.highlight ? 'text-blue-100' : 'text-muted-foreground'}`}>
                            {display.note}
                          </p>
                        </div>

                        {/* Document allowance — the key differentiator */}
                        <div className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                          isEnterprise
                            ? 'bg-amber-500/10 text-amber-700 border border-amber-500/20'
                            : display.highlight
                              ? 'bg-white/15 text-white'
                              : 'bg-primary/8 text-primary border border-primary/20'
                        }`}>
                          {(() => {
                            const seats = plan.max_seats ?? 1;
                            if (plan.slug.startsWith('org_')) return `Organisation workspace · ${seats} seats`;
                            if (plan.max_profiles === 999) return 'Unlimited document creation';
                            if (plan.slug === 'free') return '1 free template demo';
                            return 'Personal document workspace';
                          })()}
                        </div>

                        {/* Feature list */}
                        {plan.core_features && plan.core_features.length > 0 && (
                          <ul className="space-y-1.5">
                            {plan.core_features.map((f: string, fi: number) => (
                              <li key={fi} className={`flex items-start gap-1.5 text-xs ${display.highlight ? 'text-blue-100' : 'text-muted-foreground'}`}>
                                <svg className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isEnterprise ? 'text-amber-500' : display.highlight ? 'text-white' : 'text-primary'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                {f}
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* CTA */}
                        <div className="mt-auto pt-1">
                          {isEnterprise ? (
                            <a href="mailto:japlanstudio@jagroupservices.co.uk?subject=Organisation%20Plan%20Enquiry" className="block w-full">
                              <Button className="w-full text-sm font-semibold rounded-xl py-2 bg-amber-500 hover:bg-amber-400 text-white shadow-sm shadow-amber-500/20">
                                Get in touch
                              </Button>
                            </a>
                          ) : !isPaid ? (
                            <Link to="/sign-in">
                              <Button className="w-full text-sm font-semibold rounded-xl py-2 bg-muted text-foreground hover:bg-muted/80 border border-border">
                                {display.cta}
                              </Button>
                            </Link>
                          ) : (
                            <Button
                              onClick={() => handleTrialCta(plan.slug)}
                              className={`w-full text-sm font-semibold rounded-xl py-2 ${
                                display.highlight
                                  ? 'bg-white text-blue-600 hover:bg-blue-50 shadow-md'
                                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm shadow-blue-600/20'
                              }`}
                            >
                              {display.cta}
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <p className="text-center text-xs text-muted-foreground mt-5">
                No credit card required to start. Sign in to see the full feature breakdown for each plan.
              </p>
            </>
          )}

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          7. FAQ
      ══════════════════════════════════════════════════════════ */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <SectionBadge>FAQ</SectionBadge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Frequently asked questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {[
              { q: 'What is JA Plan Studio?', a: 'JA Plan Studio is a secure professional document-building service for individuals and organisations. It provides guided builders, reusable templates, saved drafts, exports and supported signing workflows.' },
              { q: 'Which builders are included?', a: 'JA Plan Studio includes builders for letters, emails, invoices, contracts, policies, forms, reports, minutes, proposals and checklists, plus an expanding catalogue of specialist templates.' },
              { q: 'What does the dashboard include?', a: 'Your dashboard brings together document builders, saved documents, templates, signing requests, organisation members, account settings and support.' },
              { q: 'Is there a free plan?', a: 'Yes. The Free plan includes one template demo, PDF export and access to browse the catalogue. Paid plans unlock more builders, templates, saved drafts and additional tools.' },
              { q: 'Can I add my organisation branding?', a: 'Supported plans let you apply organisation details, colours and a logo to compatible document layouts.' },
              { q: 'Who can use JA Plan Studio?', a: 'JA Plan Studio supports individuals, sole traders, businesses, charities, community groups and organisations that need professional documents.' },
              { q: 'How do I get started?', a: 'Sign in through JA Group Services ID, choose a builder and select a template. Your account is created automatically on first sign-in.' },
              { q: 'Who operates JA Plan Studio?', a: 'JA Plan Studio is a service brand operated by JA Group Services Ltd, a company registered in England and Wales.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <FaqItem q={item.q} a={item.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          8. FINAL CTA
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`${glassStrong} p-10 sm:p-14 text-center relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/6 via-transparent to-indigo-600/4 pointer-events-none rounded-2xl" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-600 mx-auto mb-6">
                <QrCode className="w-7 h-7" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Ready to create your professional document?
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed text-base max-w-xl mx-auto">
                Sign in through JA Group Services ID, choose a builder and create your first professional document. Free to start—no credit card required.
              </p>
              <div className="flex flex-wrap gap-3 justify-center mb-8">
                <Link to="/sign-in">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-xl shadow-blue-600/25 px-8 rounded-xl transition-all duration-200 hover:-translate-y-px"
                  >
                    Explore Builders <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/sign-in">
                  <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted px-8 rounded-xl font-medium">
                    Sign in to dashboard
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-5 pt-6 border-t border-border">
                {['Free to get started', 'No credit card required', 'UK-based service'].map(t => (
                  <div key={t} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    <InstallAppBanner />
    </>
  );
}
