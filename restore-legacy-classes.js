#!/usr/bin/env node
/**
 * restore-legacy-classes.js
 *
 * Restores public HTML pages from Tailwind CSS component classes back to
 * the original legacy CSS classes defined in public-saas.css and theme.css.
 *
 * The Tailwind migration introduced component classes like:
 *   btn-primary, btn-secondary, btn-ghost, card-base, card-hover, card-glass,
 *   badge-primary, badge-base, badge-success, badge-warning, badge-error,
 *   input-base, label-base, alert-*, nav-link, container-base, page-header,
 *   empty-state, skeleton, modal-overlay, modal-panel, table-base,
 *   status-active, status-pending, status-inactive, tab-base, tab-active,
 *   sidebar-item, glass-blur
 *
 * And Tailwind utility classes for layout:
 *   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6, py-16 md:py-24,
 *   text-3xl md:text-4xl font-extrabold, etc.
 *
 * These need to be mapped back to the legacy equivalents:
 *   btn btn-primary, btn btn-secondary, btn btn-outline, platform-card, glass,
 *   badge, container, section-padding, text-gradient, grid grid-3, etc.
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');

// ─── Files to process ───────────────────────────────────────────────────────
const FILES = [
  'index.html',
  'destinations/index.html',
  'login/index.html',
  'account/index.html',
  'pricing/index.html',
  'about/index.html',
  'contact/index.html',
  'experiences/index.html',
  'activities/index.html',
  'builders/index.html',
  'how-it-works/index.html',
  'faqs/index.html',
  'coming-soon/index.html',
  'accessibility-support/index.html',
  'enquiry/index.html',
  'legal/cookies/index.html',
  'legal/privacy/index.html',
  'legal/provider-disclaimer/index.html',
  'legal/travel-insurance/index.html',
];

// ─── Helper: replace a class token within a class attribute ─────────────────
// We operate on class="..." attribute values to avoid replacing inside text.
function replaceInClassAttr(html, replacements) {
  // Match class="..." or class='...'
  return html.replace(/class=(["'])(.*?)\1/gi, (fullMatch, quote, classValue) => {
    let newClassValue = classValue;
    for (const [from, to] of replacements) {
      // Use a regex that matches the token as a whole word (class token)
      // We need to be careful with tokens that contain special regex chars.
      const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Match token surrounded by word boundaries (spaces, start, end of string)
      const tokenRegex = new RegExp('(^|\\s)' + escaped + '(\\s|$)', 'g');
      newClassValue = newClassValue.replace(tokenRegex, (match, pre, post) => {
        return pre + to + post;
      });
    }
    return 'class=' + quote + newClassValue + quote;
  });
}

// ─── Helper: replace entire class attribute values that match a pattern ─────
function replaceFullClassAttr(html, exactMatchReplacements) {
  return html.replace(/class=(["'])(.*?)\1/gi, (fullMatch, quote, classValue) => {
    let newClassValue = classValue;
    for (const [pattern, replacement] of exactMatchReplacements) {
      newClassValue = newClassValue.replace(pattern, replacement);
    }
    return 'class=' + quote + newClassValue + quote;
  });
}

// ─── Main restoration function ──────────────────────────────────────────────
function restoreFile(filePath) {
  const fullPath = path.join(PUBLIC_DIR, filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`  SKIP (not found): ${filePath}`);
    return false;
  }

  let html = fs.readFileSync(fullPath, 'utf8');
  const original = html;

  // ── Step 1: Replace Tailwind CSS stylesheet link with public-saas.css ─────
  // Replace any tailwind.css link with public-saas.css
  html = html.replace(
    /<link\s+rel=["']stylesheet["']\s+href=["']\/assets\/css\/tailwind\.css[^"']*["']\s*>/gi,
    '<link rel="stylesheet" href="/assets/css/public-saas.css?v=20260710-wordmark-unified-1">'
  );

  // ── Step 2: Replace site-shell.js version ─────────────────────────────────
  // Replace v=20260711-tw-1 with v=20260710-partners-1 for site-shell.js
  html = html.replace(
    /\/assets\/js\/site-shell\.js\?v=20260711-tw-1/g,
    '/assets/js/site-shell.js?v=20260710-partners-1'
  );

  // ── Step 3: Replace theme.css version (20260711-tw-1 → 20260709-airo-2) ───
  html = html.replace(
    /\/assets\/css\/theme\.css\?v=20260711-tw-1/g,
    '/assets/css/theme.css?v=20260709-airo-2'
  );

  // ── Step 4: Replace portal.css version (20260711-tw-1 → keep stable) ──────
  html = html.replace(
    /\/assets\/css\/portal\.css\?v=20260711-tw-1/g,
    '/assets/css/portal.css?v=20260709-builders-portal-1'
  );

  // ── Step 5: Component class replacements (within class="...") ────────────
  // NOTE: For buttons, we only add "btn" if it's not already present in the class list.
  // We handle this in a post-processing step to avoid "btn btn btn-primary".
  const componentReplacements = [
    // Buttons — these are handled specially below to avoid doubling "btn"
    ['btn-primary', '__BTN_PRIMARY__'],
    ['btn-secondary', '__BTN_SECONDARY__'],
    ['btn-ghost', '__BTN_OUTLINE__'],
    ['btn-destructive', '__BTN_DESTRUCTIVE__'],

    // Cards — use placeholders to avoid doubling "platform-card"
    ['card-base', '__CARD_BASE__'],
    ['card-hover', '__CARD_HOVER__'],
    ['card-glass', '__CARD_GLASS__'],
    ['glass-blur', '__GLASS_BLUR__'],

    // Badges — use placeholders to avoid doubling "badge"
    ['badge-primary', '__BADGE_PRIMARY__'],
    ['badge-base', '__BADGE_BASE__'],
    ['badge-success', '__BADGE_SUCCESS__'],
    ['badge-warning', '__BADGE_WARNING__'],
    ['badge-error', '__BADGE_ERROR__'],

    // Inputs / Labels
    ['input-base', 'form-input'],
    ['label-base', 'form-label'],

    // Alerts
    ['alert-success', 'saas-alert saas-success'],
    ['alert-warning', 'saas-alert saas-warning'],
    ['alert-error', 'saas-alert saas-error'],
    ['alert-info', 'saas-alert saas-info'],

    // Navigation
    ['nav-link', 'site-nav-link'],

    // Layout
    ['container-base', 'container'],
    ['page-header', 'section-head'],

    // Empty state / skeleton
    ['empty-state', 'saas-empty'],
    ['skeleton', 'loading-skeleton'],

    // Modals
    ['modal-overlay', 'modal-backdrop'],
    ['modal-panel', 'modal-card'],

    // Tables
    ['table-base', 'data-table'],

    // Status pills
    ['status-active', 'status-pill status-active'],
    ['status-pending', 'status-pill status-pending'],
    ['status-inactive', 'status-pill status-inactive'],

    // Tabs
    ['tab-base', 'tab'],
    ['tab-active', 'tab tab-active'],

    // Sidebar
    ['sidebar-item', 'nav-item'],
    ['sidebar-item-active', 'nav-item nav-item-active'],
  ];

  html = replaceInClassAttr(html, componentReplacements);

  // Post-process button placeholders: add "btn" prefix only if not already present
  html = html.replace(/class=(["'])(.*?)\1/gi, (fullMatch, quote, classValue) => {
    let newClassValue = classValue;
    const hasBtn = /(^|\s)btn(\s|$)/.test(newClassValue);
    const btnPrefix = hasBtn ? '' : 'btn ';
    newClassValue = newClassValue.replace(/__BTN_PRIMARY__/g, btnPrefix + 'btn-primary');
    newClassValue = newClassValue.replace(/__BTN_SECONDARY__/g, btnPrefix + 'btn-secondary');
    newClassValue = newClassValue.replace(/__BTN_OUTLINE__/g, btnPrefix + 'btn-outline');
    newClassValue = newClassValue.replace(/__BTN_DESTRUCTIVE__/g, btnPrefix + 'btn-destructive');
    // Fix any "btn btn btn-" that may have been created by a previous run
    newClassValue = newClassValue.replace(/\bbtn\s+btn\s+btn-/g, 'btn btn-');
    // Fix any "btn btn-" duplicates (e.g., "btn btn-primary" where btn was already there)
    // We want exactly one "btn" before "btn-primary" etc.
    newClassValue = newClassValue.replace(/\bbtn\s+btn\s+(btn-primary|btn-secondary|btn-outline|btn-destructive)/g, 'btn $1');

    // Process badge placeholders: add "badge" prefix only if not already present
    const hasBadge = /(^|\s)badge(\s|$)/.test(newClassValue);
    const badgePrefix = hasBadge ? '' : 'badge ';
    newClassValue = newClassValue.replace(/__BADGE_PRIMARY__/g, badgePrefix + 'badge-primary');
    newClassValue = newClassValue.replace(/__BADGE_BASE__/g, badgePrefix + 'badge-base');
    // For colored badges, we want "badge badge-success" etc.
    newClassValue = newClassValue.replace(/__BADGE_SUCCESS__/g, badgePrefix + 'badge-success');
    newClassValue = newClassValue.replace(/__BADGE_WARNING__/g, badgePrefix + 'badge-warning');
    newClassValue = newClassValue.replace(/__BADGE_ERROR__/g, badgePrefix + 'badge-error');
    // Fix any "badge badge badge" duplicates from previous runs
    newClassValue = newClassValue.replace(/\bbadge\s+badge\s+badge/g, 'badge badge');
    newClassValue = newClassValue.replace(/\bbadge\s+badge\s+(badge-success|badge-warning|badge-error|badge-primary|badge-base)/g, 'badge $1');

    // Process card placeholders: avoid doubling "platform-card" or "glass"
    const hasPlatformCard = /(^|\s)platform-card(\s|$)/.test(newClassValue);
    const hasGlass = /(^|\s)glass(\s|$)/.test(newClassValue);
    // card-base → platform-card (if not already present)
    newClassValue = newClassValue.replace(/__CARD_BASE__/g, hasPlatformCard ? '' : 'platform-card');
    // card-hover → platform-card glass-hover (add platform-card if not present, add glass-hover)
    newClassValue = newClassValue.replace(/__CARD_HOVER__/g, () => {
      let result = hasPlatformCard ? '' : 'platform-card';
      result += (result ? ' ' : '') + 'glass-hover';
      return result;
    });
    // card-glass → glass (if not already present)
    newClassValue = newClassValue.replace(/__CARD_GLASS__/g, hasGlass ? '' : 'glass');
    // glass-blur → glass (if not already present)
    newClassValue = newClassValue.replace(/__GLASS_BLUR__/g, hasGlass ? '' : 'glass');
    // Fix any "platform-card platform-card" duplicates from previous runs
    newClassValue = newClassValue.replace(/\bplatform-card\s+platform-card\b/g, 'platform-card');
    // Clean up any double spaces left by empty replacements
    newClassValue = newClassValue.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');

    return 'class=' + quote + newClassValue + quote;
  });

  // ── Step 6: Grid layout replacements ──────────────────────────────────────
  // These need to be done as full class attribute replacements because they
  // involve multiple tokens that need to be replaced together.
  const gridReplacements = [
    // 4-column grids
    [/\bgrid\s+grid-cols-1\s+sm:grid-cols-2\s+lg:grid-cols-3\s+xl:grid-cols-4\s+gap-4\b/g, 'grid grid-4'],
    [/\bgrid\s+grid-cols-1\s+sm:grid-cols-2\s+lg:grid-cols-3\s+xl:grid-cols-4\b/g, 'grid grid-4'],
    [/\bgrid\s+grid-cols-1\s+md:grid-cols-2\s+lg:grid-cols-3\s+xl:grid-cols-4\s+gap-4\b/g, 'grid grid-4'],
    [/\bgrid\s+grid-cols-1\s+md:grid-cols-2\s+lg:grid-cols-3\s+xl:grid-cols-4\b/g, 'grid grid-4'],
    [/\bgrid\s+grid-cols-2\s+md:grid-cols-4\s+gap-4\b/g, 'grid grid-4'],
    [/\bgrid\s+grid-cols-2\s+md:grid-cols-4\b/g, 'grid grid-4'],
    [/\bmd:grid-cols-4\s+gap-8\b/g, 'grid-4'],
    [/\bmd:grid-cols-4\s+gap-6\b/g, 'grid-4'],
    [/\bmd:grid-cols-4\b/g, 'grid-4'],

    // 3-column grids
    [/\bgrid\s+grid-cols-1\s+md:grid-cols-2\s+lg:grid-cols-3\s+gap-6\b/g, 'grid grid-3'],
    [/\bgrid\s+grid-cols-1\s+md:grid-cols-2\s+lg:grid-cols-3\b/g, 'grid grid-3'],
    [/\bgrid\s+grid-cols-1\s+md:grid-cols-3\s+gap-6\b/g, 'grid grid-3'],
    [/\bgrid\s+grid-cols-1\s+md:grid-cols-3\s+gap-8\b/g, 'grid grid-3'],
    [/\bgrid\s+grid-cols-1\s+md:grid-cols-3\b/g, 'grid grid-3'],
    [/\bgrid\s+grid-cols-1\s+lg:grid-cols-3\s+gap-6\b/g, 'grid grid-3'],
    [/\bgrid\s+grid-cols-1\s+lg:grid-cols-3\b/g, 'grid grid-3'],
    [/\bmd:grid-cols-3\s+gap-8\b/g, 'grid-3'],
    [/\bmd:grid-cols-3\s+gap-6\b/g, 'grid-3'],
    [/\bmd:grid-cols-3\b/g, 'grid-3'],
    [/\blg:grid-cols-3\s+gap-6\b/g, 'grid-3'],
    [/\blg:grid-cols-3\b/g, 'grid-3'],

    // 2-column grids
    [/\bgrid\s+grid-cols-1\s+md:grid-cols-2\s+gap-6\b/g, 'grid grid-2'],
    [/\bgrid\s+grid-cols-1\s+md:grid-cols-2\s+gap-8\b/g, 'grid grid-2'],
    [/\bgrid\s+grid-cols-1\s+md:grid-cols-2\s+gap-4\b/g, 'grid grid-2'],
    [/\bgrid\s+grid-cols-1\s+md:grid-cols-2\b/g, 'grid grid-2'],
    [/\bgrid\s+grid-cols-1\s+lg:grid-cols-2\s+gap-12\b/g, 'grid grid-2'],
    [/\bgrid\s+grid-cols-1\s+lg:grid-cols-2\s+gap-8\b/g, 'grid grid-2'],
    [/\bgrid\s+grid-cols-1\s+lg:grid-cols-2\b/g, 'grid grid-2'],
    [/\bmd:grid-cols-2\s+gap-8\b/g, 'grid-2'],
    [/\bmd:grid-cols-2\s+gap-6\b/g, 'grid-2'],
    [/\bmd:grid-cols-2\s+gap-4\b/g, 'grid-2'],
    [/\bmd:grid-cols-2\b/g, 'grid-2'],
    [/\blg:grid-cols-2\s+gap-12\b/g, 'grid-2'],
    [/\blg:grid-cols-2\s+gap-8\b/g, 'grid-2'],
    [/\blg:grid-cols-2\b/g, 'grid-2'],

    // Single grid with responsive
    [/\bgrid\s+grid-cols-1\s+sm:grid-cols-2\s+lg:grid-cols-3\s+gap-4\b/g, 'grid grid-3'],
    [/\bgrid\s+grid-cols-1\s+sm:grid-cols-2\s+lg:grid-cols-3\b/g, 'grid grid-3'],
  ];

  html = replaceFullClassAttr(html, gridReplacements);

  // ── Step 7: Section padding / hero spacing replacements ───────────────────
  const spacingReplacements = [
    // Hero sections: py-16 md:py-24 lg:py-28 → platform-hero or section-padding
    [/\brelative\s+overflow-hidden\s+py-16\s+md:py-24\s+lg:py-28\b/g, 'platform-hero'],
    [/\bpy-16\s+md:py-24\s+lg:py-28\b/g, 'section-padding'],
    [/\bpy-16\s+md:py-24\b/g, 'section-padding'],
    [/\bpy-16\s+md:py-20\b/g, 'section-padding'],
    [/\bpy-16\b/g, 'section-padding'],
    [/\bmd:py-24\b/g, 'section-padding'],

    // bg-muted/30 → soft-band (light background section)
    [/\bbg-muted\/30\b/g, 'soft-band'],
    [/\bbg-muted\/20\b/g, 'soft-band'],
    [/\bbg-muted\/50\b/g, 'soft-band'],
    [/\bbg-muted\b/g, 'soft-band'],

    // bg-navy-900 → cta-section (dark CTA background)
    [/\bbg-navy-900\s+relative\s+overflow-hidden\b/g, 'cta-section'],
    [/\brelative\s+overflow-hidden\s+bg-navy-900\b/g, 'cta-section'],
    [/\bbg-navy-900\b/g, 'cta-section'],
  ];

  html = replaceFullClassAttr(html, spacingReplacements);

  // ── Step 8: Text color replacements ───────────────────────────────────────
  const textReplacements = [
    ['text-muted-foreground', 'muted'],
    // text-foreground and text-default are redundant in legacy CSS (body color is already foreground).
    // Replace with __REMOVE__ placeholder, then strip it.
    ['text-foreground', '__REMOVE_TOKEN__'],
    ['text-default', '__REMOVE_TOKEN__'],
    // text-primary-foreground → text-white (used on primary-colored backgrounds)
    ['text-primary-foreground', 'text-white'],
    // text-on-primary is an artifact from a previous run → text-white
    ['text-on-primary', 'text-white'],
    // text-white/70 and text-white/50 → text-white (legacy only has text-white and text-white/80)
    ['text-white/70', 'text-white'],
    ['text-white/50', 'text-white'],
    // text-white-70, text-white-50 are artifacts from a previous run → text-white
    ['text-white-70', 'text-white'],
    ['text-white-50', 'text-white'],
    // text-white-80 is an artifact from a previous run → text-white/80 (which exists in legacy CSS)
    ['text-white-80', 'text-white/80'],
    // text-white/80 exists in legacy CSS, keep it but handle the slash
    ['text-white/80', '__TEXT_WHITE_80__'],
    // text-primary, text-success, text-warning, text-accent, text-white are kept
    // (they exist in public-saas.css / theme.css)
  ];

  html = replaceInClassAttr(html, textReplacements);

  // Remove __REMOVE_TOKEN__ placeholders and clean up extra spaces
  html = html.replace(/class=(["'])(.*?)\1/gi, (fullMatch, quote, classValue) => {
    let newClassValue = classValue.replace(/__REMOVE_TOKEN__/g, '');
    // Restore text-white/80 (the slash was causing issues with token replacement)
    newClassValue = newClassValue.replace(/__TEXT_WHITE_80__/g, 'text-white/80');
    // Clean up double spaces and trim
    newClassValue = newClassValue.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');
    return 'class=' + quote + newClassValue + quote;
  });

  // ── Step 9: Background color replacements (non-section) ────────────────────
  // Note: bg-primary/10, bg-accent/5 etc. are Tailwind utilities for subtle backgrounds.
  // The legacy CSS doesn't have direct equivalents, so we leave them as-is.
  // Only replace bg-card and bg-background which have legacy equivalents.
  // Also clean up any bg-*-soft artifacts from previous runs.
  const bgReplacements = [
    ['bg-card', 'bg-card-surface'],
    ['bg-background', 'bg-page'],
    ['bg-transparent', 'bg-none'],
    ['bg-white', 'bg-solid-white'],
    // Revert bg-*-soft artifacts from previous runs back to Tailwind utilities
    ['bg-primary-soft', 'bg-primary/10'],
    ['bg-accent-soft', 'bg-accent/5'],
    ['bg-success-soft', 'bg-success/10'],
    ['bg-warning-soft', 'bg-warning/10'],
  ];

  html = replaceInClassAttr(html, bgReplacements);

  // ── Step 10: Border replacements ──────────────────────────────────────────
  const borderReplacements = [
    ['border-border', 'border-default'],
    ['border-primary/20', 'border-primary-soft'],
    ['border-primary/30', 'border-primary-soft'],
    ['border-accent/10', 'border-accent-soft'],
    ['border-accent/20', 'border-accent-soft'],
    ['border-white/10', 'border-white-soft'],
  ];

  html = replaceInClassAttr(html, borderReplacements);

  // ── Step 11: Write the file back ───────────────────────────────────────────
  if (html !== original) {
    fs.writeFileSync(fullPath, html, 'utf8');
    console.log(`  RESTORED: ${filePath}`);
    return true;
  } else {
    console.log(`  NO CHANGE: ${filePath}`);
    return false;
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────
console.log('═══════════════════════════════════════════════════════════════');
console.log('  Legacy CSS Restoration Script');
console.log('  Restoring Tailwind component classes → legacy CSS classes');
console.log('═══════════════════════════════════════════════════════════════\n');

let restoredCount = 0;
let skippedCount = 0;

for (const file of FILES) {
  console.log(`\nProcessing: ${file}`);
  if (restoreFile(file)) {
    restoredCount++;
  } else {
    skippedCount++;
  }
}

console.log('\n═══════════════════════════════════════════════════════════════');
console.log(`  Done! Restored: ${restoredCount}, No changes: ${skippedCount}`);
console.log('═══════════════════════════════════════════════════════════════');
