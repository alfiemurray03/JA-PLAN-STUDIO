import { useEffect } from 'react';

const RTL_LANGUAGES = new Set(['ar', 'dv', 'fa', 'he', 'ku', 'ps', 'ur', 'yi']);

function normaliseLanguage(value: string | undefined): string {
  const language = String(value || 'en-GB').trim().replace('_', '-');
  return /^[a-z]{2,3}(?:-[A-Z]{2})?$/.test(language) ? language : 'en-GB';
}

function applyDocumentLocale() {
  const language = normaliseLanguage(navigator.languages?.[0] || navigator.language);
  const primary = language.split('-')[0].toLowerCase();
  document.documentElement.lang = language;
  document.documentElement.dir = RTL_LANGUAGES.has(primary) ? 'rtl' : 'ltr';
}

function focusRouteMainContent() {
  window.requestAnimationFrame(() => {
    const target = document.querySelector<HTMLElement>('#main-content, main, [role="main"]');
    if (!target) return;
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
}

export default function AccessibilityRuntime() {
  useEffect(() => {
    applyDocumentLocale();

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyMotionPreference = () => {
      document.documentElement.classList.toggle('system-reduced-motion', reducedMotion.matches);
    };
    applyMotionPreference();
    reducedMotion.addEventListener?.('change', applyMotionPreference);

    let lastUrl = window.location.href;
    const observer = new MutationObserver(() => {
      if (window.location.href === lastUrl) return;
      lastUrl = window.location.href;
      focusRouteMainContent();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });

    const handlePopState = () => focusRouteMainContent();
    window.addEventListener('popstate', handlePopState);

    return () => {
      reducedMotion.removeEventListener?.('change', applyMotionPreference);
      observer.disconnect();
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return null;
}
