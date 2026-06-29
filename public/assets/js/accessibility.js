const ACCESSIBILITY_PREFS_KEY = "ja-accessibility-prefs";
const ACCESSIBILITY_DEFAULTS = {
  textScale: 100,
  contrast: "normal",
  motion: "normal",
  lineSpacing: 1.6,
  letterSpacing: 0,
  underlineLinks: false,
  font: "default",
  cursor: "default",
  theme: "system"
};

function readPrefs() {
  try {
    return { ...ACCESSIBILITY_DEFAULTS, ...(JSON.parse(localStorage.getItem(ACCESSIBILITY_PREFS_KEY) || "{}")) };
  } catch {
    return { ...ACCESSIBILITY_DEFAULTS };
  }
}

function writePrefs(prefs) {
  localStorage.setItem(ACCESSIBILITY_PREFS_KEY, JSON.stringify(prefs));
}

function applyPrefs(prefs) {
  const root = document.documentElement;
  root.dataset.accessibilityTheme = prefs.theme || "system";
  root.dataset.accessibilityContrast = prefs.contrast || "normal";
  root.dataset.accessibilityMotion = prefs.motion || "normal";
  root.dataset.accessibilityFont = prefs.font || "default";
  root.dataset.accessibilityCursor = prefs.cursor || "default";
  root.style.fontSize = `${Number(prefs.textScale) || 100}%`;
  root.style.setProperty("--accessibility-line-height", String(prefs.lineSpacing || 1.6));
  root.style.setProperty("--accessibility-letter-spacing", `${Number(prefs.letterSpacing) || 0}em`);
  root.classList.toggle("accessibility-underline-links", Boolean(prefs.underlineLinks));
  root.classList.toggle("accessibility-reduced-motion", prefs.motion === "reduced");
  root.classList.toggle("accessibility-high-contrast", prefs.contrast === "high");
  root.classList.toggle("accessibility-dyslexia-font", prefs.font === "dyslexia");
  root.classList.toggle("accessibility-large-cursor", prefs.cursor === "large");
}

function createMenu() {
  if (document.getElementById("accessibilityWidget")) return;
  const widget = document.createElement("div");
  widget.id = "accessibilityWidget";
  widget.innerHTML = `
    <button type="button" class="accessibility-button" aria-expanded="false" aria-controls="accessibilityPanel">Accessibility</button>
    <div id="accessibilityPanel" class="accessibility-panel" hidden>
      <div class="accessibility-panel-head">
        <strong>Accessibility</strong>
        <button type="button" class="accessibility-close" aria-label="Close accessibility menu">×</button>
      </div>
      <div class="accessibility-grid">
        <label><span>Text size</span><select data-a11y="textScale"><option value="90">Decrease</option><option value="100">Default</option><option value="110">Increase</option><option value="120">Large</option></select></label>
        <label><span>Theme</span><select data-a11y="theme"><option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option></select></label>
        <label><span>Contrast</span><select data-a11y="contrast"><option value="normal">Normal</option><option value="high">High</option></select></label>
        <label><span>Motion</span><select data-a11y="motion"><option value="normal">Normal</option><option value="reduced">Reduced motion</option></select></label>
        <label><span>Font</span><select data-a11y="font"><option value="default">Default</option><option value="dyslexia">Dyslexia-friendly</option></select></label>
        <label><span>Cursor</span><select data-a11y="cursor"><option value="default">Default</option><option value="large">Large cursor</option></select></label>
        <label><span>Line spacing</span><select data-a11y="lineSpacing"><option value="1.5">Standard</option><option value="1.7">Spacious</option><option value="1.9">Wide</option></select></label>
        <label><span>Letter spacing</span><select data-a11y="letterSpacing"><option value="0">Standard</option><option value="0.02">Spaced</option><option value="0.04">Wide</option></select></label>
        <label class="toggle-row"><input type="checkbox" data-a11y="underlineLinks"><span>Underline links</span></label>
      </div>
      <div class="accessibility-actions">
        <button type="button" class="accessibility-reset">Reset accessibility preferences</button>
      </div>
    </div>`;
  document.body.appendChild(widget);

  const button = widget.querySelector(".accessibility-button");
  const panel = widget.querySelector(".accessibility-panel");
  const close = widget.querySelector(".accessibility-close");
  const inputs = widget.querySelectorAll("[data-a11y]");

  const sync = (prefs) => {
    inputs.forEach((input) => {
      const key = input.dataset.a11y;
      if (input.type === "checkbox") input.checked = Boolean(prefs.underlineLinks);
      else input.value = String(prefs[key] ?? ACCESSIBILITY_DEFAULTS[key]);
    });
  };

  const prefs = readPrefs();
  applyPrefs(prefs);
  sync(prefs);

  button.addEventListener("click", () => {
    const isOpen = !panel.hidden;
    panel.hidden = isOpen;
    button.setAttribute("aria-expanded", String(!isOpen));
  });
  close.addEventListener("click", () => {
    panel.hidden = true;
    button.setAttribute("aria-expanded", "false");
  });

  widget.querySelector(".accessibility-reset").addEventListener("click", () => {
    localStorage.removeItem(ACCESSIBILITY_PREFS_KEY);
    const reset = { ...ACCESSIBILITY_DEFAULTS };
    applyPrefs(reset);
    sync(reset);
  });

  inputs.forEach((input) => {
    input.addEventListener("change", () => {
      const current = readPrefs();
      const key = input.dataset.a11y;
      if (input.type === "checkbox") {
        current.underlineLinks = input.checked;
      } else if (key === "textScale") {
        current.textScale = Number(input.value);
      } else if (key === "letterSpacing") {
        current.letterSpacing = Number(input.value);
      } else if (key === "lineSpacing") {
        current.lineSpacing = Number(input.value);
      } else {
        current[key] = input.value;
      }
      writePrefs(current);
      applyPrefs(current);
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", createMenu);
} else {
  createMenu();
}
