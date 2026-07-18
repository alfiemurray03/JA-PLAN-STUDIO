(() => {
  "use strict";

  const byId = (id) => document.getElementById(id);
  const pad = (value) => String(Math.max(0, Number(value) || 0)).padStart(2, "0");
  const checkIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M20 6L9 17l-5-5"></path></svg>';
  let countdownTimer = null;

  function setText(id, value) {
    const element = byId(id);
    if (element && typeof value === "string" && value.trim()) element.textContent = value.trim();
  }

  function renderFeatures(features) {
    const list = byId("coming-soon-features");
    if (!list || !Array.isArray(features)) return;
    const values = features.map((item) => String(item || "").trim()).filter(Boolean);
    if (!values.length) return;

    list.replaceChildren(...values.map((value) => {
      const item = document.createElement("li");
      item.className = "feature";
      item.innerHTML = checkIcon;
      const text = document.createElement("span");
      text.textContent = value;
      item.append(text);
      return item;
    }));
  }

  function stopCountdown() {
    if (countdownTimer) window.clearInterval(countdownTimer);
    countdownTimer = null;
  }

  function startCountdown(launchDate, enabled) {
    const countdown = byId("countdown");
    if (!countdown) return;

    stopCountdown();
    const target = launchDate ? new Date(launchDate).getTime() : Number.NaN;
    if (!enabled || !launchDate || Number.isNaN(target)) {
      countdown.hidden = true;
      return;
    }

    function tick() {
      const remaining = target - Date.now();
      if (remaining <= 0) {
        countdown.hidden = true;
        stopCountdown();
        return;
      }

      const totalSeconds = Math.floor(remaining / 1000);
      setText("days", pad(Math.floor(totalSeconds / 86400)));
      setText("hours", pad(Math.floor((totalSeconds % 86400) / 3600)));
      setText("minutes", pad(Math.floor((totalSeconds % 3600) / 60)));
      setText("seconds", pad(totalSeconds % 60));
      countdown.hidden = false;
    }

    tick();
    countdownTimer = window.setInterval(tick, 1000);
  }

  async function loadConfiguration() {
    try {
      const response = await fetch("/api/coming-soon-config", {
        headers: { Accept: "application/json" },
        cache: "no-store",
        credentials: "same-origin"
      });
      if (!response.ok) return;
      const config = await response.json();
      if (!config || config.success === false) return;

      setText("platform-name", config.platformName || "JA Plan Studio");
      setText("coming-soon-title", config.headline || "Coming Soon");
      setText("coming-soon-subtext", config.subtext || "We are putting the finishing touches on something great.");
      setText("coming-soon-description", config.description || "");
      renderFeatures(config.features);
      startCountdown(config.launchDate, config.countdownEnabled === true);

      const title = String(config.headline || "Coming Soon").trim();
      document.title = `${title} — ${String(config.platformName || "JA Plan Studio").trim()}`;
    } catch (error) {
      console.warn("Coming Soon configuration could not be loaded.", error instanceof Error ? error.message : error);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadConfiguration, { once: true });
  } else {
    loadConfiguration();
  }
})();
