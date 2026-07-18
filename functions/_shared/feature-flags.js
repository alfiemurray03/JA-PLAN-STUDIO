const PUBLIC_DEFAULTS = Object.freeze({
  registration: true,
  free_plan: true,
  pdf_export: true,
  word_export: true,
  new_templates: true,
  usage_analytics: true,
  maintenance: false,
  payments: false,
  a11y_enabled: true,
  a11y_position: "bottom-right",
  a11y_feat_font_size: true,
  a11y_feat_contrast: true,
  a11y_feat_motion: true,
  a11y_feat_dyslexia: true,
  a11y_feat_links: true,
  a11y_feat_grayscale: true
});

function booleanValue(value, fallback) {
  if (value === null || value === undefined || value === "") return fallback;
  return String(value).trim().toLowerCase() === "true";
}

export async function readFeatureFlag(DB, key, fallback = false) {
  if (!DB) return fallback;
  try {
    const row = await DB.prepare("SELECT value FROM site_settings WHERE key = ?")
      .bind(`toggle_${key}`)
      .first();
    return booleanValue(row?.value, fallback);
  } catch (error) {
    console.error(JSON.stringify({
      event: "feature_flag_read_failed",
      key,
      message: error instanceof Error ? error.message : String(error)
    }));
    return fallback;
  }
}

export async function readPublicFeatureConfig(DB) {
  if (!DB) return { ...PUBLIC_DEFAULTS };

  try {
    const result = await DB.prepare(`
      SELECT key, value
      FROM site_settings
      WHERE key LIKE 'toggle_%' OR key LIKE 'a11y_%'
    `).all();
    const settings = Object.fromEntries((result.results || []).map((row) => [String(row.key), String(row.value ?? "")]));

    return {
      registration: booleanValue(settings.toggle_registration, PUBLIC_DEFAULTS.registration),
      free_plan: booleanValue(settings.toggle_free_plan, PUBLIC_DEFAULTS.free_plan),
      pdf_export: booleanValue(settings.toggle_pdf_export, PUBLIC_DEFAULTS.pdf_export),
      word_export: booleanValue(settings.toggle_word_export, PUBLIC_DEFAULTS.word_export),
      new_templates: booleanValue(settings.toggle_new_templates, PUBLIC_DEFAULTS.new_templates),
      usage_analytics: booleanValue(settings.toggle_usage_analytics, PUBLIC_DEFAULTS.usage_analytics),
      maintenance: booleanValue(settings.toggle_maintenance, PUBLIC_DEFAULTS.maintenance),
      payments: booleanValue(settings.toggle_payments, PUBLIC_DEFAULTS.payments),
      a11y_enabled: booleanValue(settings.a11y_enabled, PUBLIC_DEFAULTS.a11y_enabled),
      a11y_position: ["bottom-left", "bottom-right"].includes(settings.a11y_position)
        ? settings.a11y_position
        : PUBLIC_DEFAULTS.a11y_position,
      a11y_feat_font_size: booleanValue(settings.a11y_feat_font_size, PUBLIC_DEFAULTS.a11y_feat_font_size),
      a11y_feat_contrast: booleanValue(settings.a11y_feat_contrast, PUBLIC_DEFAULTS.a11y_feat_contrast),
      a11y_feat_motion: booleanValue(settings.a11y_feat_motion, PUBLIC_DEFAULTS.a11y_feat_motion),
      a11y_feat_dyslexia: booleanValue(settings.a11y_feat_dyslexia, PUBLIC_DEFAULTS.a11y_feat_dyslexia),
      a11y_feat_links: booleanValue(settings.a11y_feat_links, PUBLIC_DEFAULTS.a11y_feat_links),
      a11y_feat_grayscale: booleanValue(settings.a11y_feat_grayscale, PUBLIC_DEFAULTS.a11y_feat_grayscale)
    };
  } catch (error) {
    console.error(JSON.stringify({
      event: "public_feature_config_read_failed",
      message: error instanceof Error ? error.message : String(error)
    }));
    return { ...PUBLIC_DEFAULTS };
  }
}
