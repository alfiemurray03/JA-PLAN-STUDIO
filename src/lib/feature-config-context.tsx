/**
 * FeatureConfigContext
 * Loads public feature toggles + accessibility settings from /api/system-config/public.
 * Provides useFeatureConfig() throughout the customer application.
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface FeatureConfig {
  registration:    boolean;
  pdf_export:      boolean;
  word_export:     boolean;
  new_templates:   boolean;
  usage_analytics: boolean;
  maintenance:     boolean;
  payments:        boolean;

  a11y_enabled:        boolean;
  a11y_position:       'bottom-right' | 'bottom-left';
  a11y_feat_font_size: boolean;
  a11y_feat_contrast:  boolean;
  a11y_feat_motion:    boolean;
  a11y_feat_dyslexia:  boolean;
  a11y_feat_links:     boolean;
  a11y_feat_grayscale: boolean;
}

const DEFAULTS: FeatureConfig = {
  registration:    true,
  pdf_export:      true,
  word_export:     true,
  new_templates:   true,
  usage_analytics: true,
  maintenance:     false,
  payments:        false,

  a11y_enabled:        true,
  a11y_position:       'bottom-right',
  a11y_feat_font_size: true,
  a11y_feat_contrast:  true,
  a11y_feat_motion:    true,
  a11y_feat_dyslexia:  true,
  a11y_feat_links:     true,
  a11y_feat_grayscale: true,
};

interface FeatureConfigContextType {
  config: FeatureConfig;
  isLoading: boolean;
  refresh: () => Promise<void>;
}

const FeatureConfigContext = createContext<FeatureConfigContextType>({
  config: DEFAULTS,
  isLoading: true,
  refresh: async () => {},
});

export function FeatureConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<FeatureConfig>(DEFAULTS);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/system-config/public', {
        cache: 'no-store',
        credentials: 'same-origin',
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`Feature configuration returned ${res.status}.`);
      const data = await res.json() as { success: boolean; config?: Partial<FeatureConfig> };
      if (!data.success || !data.config) throw new Error('Feature configuration response was incomplete.');
      setConfig({ ...DEFAULTS, ...data.config });
    } catch (error) {
      console.warn('feature-config.refresh', error);
      // Safe defaults deliberately keep new payment collection disabled.
      setConfig(DEFAULTS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    document.documentElement.dataset.paymentsEnabled = isLoading
      ? 'loading'
      : config.payments ? 'true' : 'false';
  }, [config.payments, isLoading]);

  return (
    <FeatureConfigContext.Provider value={{ config, isLoading, refresh }}>
      {children}
    </FeatureConfigContext.Provider>
  );
}

export function useFeatureConfig(): FeatureConfigContextType {
  return useContext(FeatureConfigContext);
}
