/**
 * Admin Portal Theme Context
 * Separate from the customer-facing ThemeProvider.
 * The selected mode is cached locally and persisted to Admin site settings.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Bot, Moon, Sun } from 'lucide-react';

export type AdminTheme = 'light' | 'dark' | 'system';

interface AdminThemeContextType {
  theme: AdminTheme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (t: AdminTheme) => void;
}

const AdminThemeContext = createContext<AdminThemeContextType | null>(null);
const STORAGE_KEY = 'ja_admin_theme';

function validTheme(value: unknown): value is AdminTheme {
  return value === 'light' || value === 'dark' || value === 'system';
}

async function loadSavedTheme(): Promise<AdminTheme | null> {
  for (const endpoint of ['/api/site-settings/public', '/site-settings']) {
    try {
      const response = await fetch(endpoint, { cache: 'no-store', headers: { Accept: 'application/json' } });
      if (!response.ok) continue;
      const data = await response.json() as {
        settings?: Record<string, string>;
        browser?: { admin_theme_mode?: string };
      };
      const saved = data.settings?.admin_theme_mode ?? data.browser?.admin_theme_mode;
      if (validTheme(saved)) return saved;
    } catch {
      // Try the next runtime endpoint.
    }
  }
  return null;
}

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<AdminTheme>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem(STORAGE_KEY);
    return validTheme(stored) ? stored : 'light';
  });
  const [adminPortalMounted, setAdminPortalMounted] = useState(false);

  const [systemDark, setSystemDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (event: MediaQueryListEvent) => setSystemDark(event.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!window.location.pathname.startsWith('/admin')) return;
    void loadSavedTheme().then(saved => {
      if (!saved) return;
      setThemeState(saved);
      localStorage.setItem(STORAGE_KEY, saved);
    });
  }, []);

  const resolvedTheme: 'light' | 'dark' =
    theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;

  function setTheme(next: AdminTheme) {
    setThemeState(next);
    localStorage.setItem(STORAGE_KEY, next);
    if (!window.location.pathname.startsWith('/admin')) return;
    void fetch('/api/admin/site-settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ settings: { admin_theme_mode: next } }),
    }).catch(() => { /* the local preference still remains effective */ });
  }

  useEffect(() => {
    const root = document.getElementById('admin-theme-root');
    if (!root) return;

    const syncTheme = () => {
      const adminRouteActive = window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/');
      const portalMounted = Boolean(root.querySelector('.admin-portal'));
      setAdminPortalMounted(portalMounted);
      root.classList.toggle('dark', adminRouteActive && resolvedTheme === 'dark');
      root.dataset.adminTheme = adminRouteActive ? resolvedTheme : 'inactive';
    };

    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { childList: true, subtree: true });
    window.addEventListener('popstate', syncTheme);
    return () => {
      observer.disconnect();
      window.removeEventListener('popstate', syncTheme);
      root.classList.remove('dark');
      delete root.dataset.adminTheme;
    };
  }, [resolvedTheme]);

  const toggleLabel = resolvedTheme === 'dark' ? 'Switch Admin Portal to light mode' : 'Switch Admin Portal to dark mode';

  return (
    <AdminThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
      {adminPortalMounted && (
        <div className="fixed bottom-20 right-4 z-[60] flex flex-col items-end gap-2 lg:bottom-6 lg:right-6">
          <a
            href="/admin/ai-chatbot"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-xl transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            title="Open AI Chatbot Control Centre"
          >
            <Bot className="h-4 w-4" />
            <span>Chatbot settings</span>
          </a>
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-xl transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            aria-label={toggleLabel}
            title={toggleLabel}
          >
            {resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span>{resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
          </button>
        </div>
      )}
    </AdminThemeContext.Provider>
  );
}

export function useAdminTheme() {
  const context = useContext(AdminThemeContext);
  if (!context) throw new Error('useAdminTheme must be used within AdminThemeProvider');
  return context;
}
