import { useEffect } from 'react';
import { getAnalyticsConsent, onConsentChange } from '@/lib/analytics-consent';
import { useSiteSettings } from '@/lib/site-settings-context';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __JAPS_GA_ID__?: string;
    __JAPS_GA_NAV_INSTALLED__?: boolean;
  }
}

const MEASUREMENT_ID = /^G-[A-Z0-9]{4,20}$/;

function normaliseMeasurementId(value: string): string {
  const measurementId = value.trim().toUpperCase();
  return MEASUREMENT_ID.test(measurementId) ? measurementId : '';
}

function sendPageView(measurementId: string) {
  window.gtag?.('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
    send_to: measurementId,
  });
}

function installNavigationTracking() {
  if (window.__JAPS_GA_NAV_INSTALLED__) return;
  window.__JAPS_GA_NAV_INSTALLED__ = true;

  const notify = () => window.dispatchEvent(new Event('ja:navigation'));
  const pushState = window.history.pushState.bind(window.history);
  const replaceState = window.history.replaceState.bind(window.history);

  window.history.pushState = (...args) => {
    pushState(...args);
    window.setTimeout(notify, 0);
  };
  window.history.replaceState = (...args) => {
    replaceState(...args);
    window.setTimeout(notify, 0);
  };
  window.addEventListener('popstate', notify);
}

function initialiseGoogleAnalytics(measurementId: string) {
  if (window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/')) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };

  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });

  if (window.__JAPS_GA_ID__ !== measurementId) {
    window.__JAPS_GA_ID__ = measurementId;
    const existing = document.getElementById('ja-google-analytics');
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.id = 'ja-google-analytics';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      send_page_view: false,
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  }

  installNavigationTracking();
  sendPageView(measurementId);
}

export default function GoogleAnalytics() {
  const { googleAnalyticsId } = useSiteSettings();

  useEffect(() => {
    const measurementId = normaliseMeasurementId(googleAnalyticsId);
    if (!measurementId) return;

    const trackNavigation = () => {
      if (getAnalyticsConsent()) sendPageView(measurementId);
    };
    window.addEventListener('ja:navigation', trackNavigation);

    if (getAnalyticsConsent()) initialiseGoogleAnalytics(measurementId);
    const removeConsentListener = onConsentChange((consented) => {
      if (consented) {
        initialiseGoogleAnalytics(measurementId);
      } else {
        window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
      }
    });

    return () => {
      removeConsentListener();
      window.removeEventListener('ja:navigation', trackNavigation);
    };
  }, [googleAnalyticsId]);

  return null;
}
