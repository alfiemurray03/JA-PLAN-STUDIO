export function installPwaSupport() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
  if (import.meta.env.MODE === 'development') return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((error) => {
      console.warn('JA Plan Studio service worker registration failed.', error);
    });
  }, { once: true });
}
