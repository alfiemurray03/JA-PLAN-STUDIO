document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#customerForm");
  const status = document.querySelector("#formStatus");
  if (!form || !status) return;

  const startedAt = form.querySelector('[name="startedAt"]');
  if (startedAt) startedAt.value = String(Date.now());

  const params = new URLSearchParams(window.location.search);
  const destination = params.get("destination");
  if (destination && form.elements.destination) form.elements.destination.value = destination;

  // --- Turnstile: attempt to load public site key from /site-settings and render widget ---
  (async function initTurnstile() {
    try {
      const resp = await fetch("/site-settings", { cache: "no-store" });
      if (!resp.ok) {
        console.info("Turnstile: /site-settings unavailable", resp.status);
        return;
      }
      const settings = await resp.json();
      // Two places we may find the key: top-level or inside branding
      const siteKey = (settings && (settings.turnstile_site_key || settings.branding?.turnstile_site_key)) || "";
      if (!siteKey) {
        console.info("Turnstile: site key not configured in site-settings");
        return;
      }

      // Ensure submit button exists before injecting the widget
      const submit = form.querySelector('button[type="submit"]');
      if (!submit) {
        console.warn("Turnstile: submit button not found; will not render widget.");
        return;
      }

      // Insert a container for the Turnstile widget (before the submit button)
      let container = form.querySelector("#turnstileContainer");
      if (!container) {
        container = document.createElement("div");
        container.id = "turnstileContainer";
        submit.parentNode.insertBefore(container, submit);
      }

      // Create the widget element now (so there's something in DOM for auto-init)
      container.innerHTML = `<div class="cf-turnstile" data-sitekey="${siteKey}"></div>`;

      // Add the Turnstile script if it's not present
      let script = document.querySelector('script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]');
      let scriptLoaded = false;
      if (!script) {
        script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
        script.defer = true;
        script.async = true;
        script.onload = () => {
          scriptLoaded = true;
          renderTurnstile();
        };
        script.onerror = (e) => console.warn("Turnstile script failed to load", e);
        document.head.appendChild(script);
      } else {
        // If the script tag exists, check if the API is already available
        scriptLoaded = !!window.turnstile;
      }

      function renderTurnstile() {
        try {
          const el = container.querySelector('.cf-turnstile');
          if (!el) {
            container.innerHTML = `<div class="cf-turnstile" data-sitekey="${siteKey}"></div>`;
          }

          // If the Turnstile API is present, render programmatically to handle cases
          // where the script loaded before we inserted the element.
          if (window.turnstile && typeof window.turnstile.render === 'function') {
            try {
              // Clear any previous rendered widget inside the element first (safe no-op)
              // Use the element itself as the target
              window.turnstile.render(container.querySelector('.cf-turnstile'), { sitekey: siteKey });
            } catch (e) {
              console.warn('Turnstile: programmatic render failed', e);
            }
          } else {
            // If turnstile API not present yet, the script's auto-init will handle it when it loads.
            if (!scriptLoaded) {
              // wait for onload to call renderTurnstile
            }
          }
        } catch (e) {
          console.warn('Turnstile: widget render error', e);
        }
      }

      // If API already available, try to render immediately
      if (window.turnstile && typeof window.turnstile.render === 'function') {
        renderTurnstile();
      }
    } catch (e) {
      // Non-fatal — proceed without Turnstile if settings unavailable or network fails
      console.warn("Turnstile initialisation error", e);
    }
  })();
  // --- End Turnstile init ---

  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const submit = form.querySelector('button[type="submit"]');
    const originalText = submit ? submit.textContent : "";
    if (submit) {
      submit.disabled = true;
      submit.textContent = "Sending...";
    }
    status.className = "form-status";
    status.textContent = "";

    const data = Object.fromEntries(new FormData(form).entries());
    data.socialTariff = Boolean(form.elements.socialTariff?.checked);
    data.specialCategoryConsent = Boolean(form.elements.specialCategoryConsent?.checked);
    data.transportConfirmed = Boolean(form.elements.transportConfirmed?.checked);
    data.termsAccepted = Boolean(form.elements.termsAccepted?.checked);
    data.privacyAccepted = Boolean(form.elements.privacyAccepted?.checked);
    data.marketingConsent = Boolean(form.elements.marketingConsent?.checked);

    // Add the Turnstile token (if present). The widget will populate an input named "cf-turnstile-response".
    const tokenInput = document.querySelector('[name="cf-turnstile-response"]');
    data["cf-turnstile-response"] = tokenInput ? tokenInput.value : "";

    if (data.supportNeeds?.trim() && !data.specialCategoryConsent) {
      status.className = "form-status error";
      status.textContent = "Please confirm the sensitive-information consent, or remove the accessibility information.";
      if (submit) {
        submit.disabled = false;
        submit.textContent = originalText;
      }
      return;
    }

    if (!data.termsAccepted || !data.privacyAccepted) {
      status.className = "form-status error";
      status.textContent = "Please confirm the Terms of Service and Privacy Notice before sending your enquiry.";
      if (submit) {
        submit.disabled = false;
        submit.textContent = originalText;
      }
      return;
    }

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
      });
      const contentType = response.headers.get("content-type") || "";
      const result = contentType.includes("application/json")
        ? await response.json()
        : { ok: false, message: "The online form could not be sent. Please try again later." };
      if (!response.ok || !result.ok) throw new Error(result.message || "The form could not be sent.");

      form.hidden = true;
      status.className = "form-status success";
      status.innerHTML = `<strong>Message sent.</strong><br>Your reference is <strong>${result.reference}</strong>.`;
    } catch (error) {
      status.className = "form-status error";
      status.textContent = error.message;
      if (submit) {
        submit.disabled = false;
        submit.textContent = originalText;
      }
    }
  });
});
