document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#customerForm");
  const status = document.querySelector("#formStatus");
  if (!form || !status) return;

  const startedAt = form.querySelector('[name="startedAt"]');
  startedAt.value = String(Date.now());

  const params = new URLSearchParams(window.location.search);
  const destination = params.get("destination");
  if (destination && form.elements.destination) form.elements.destination.value = destination;

  // --- Turnstile: attempt to load public site key from /site-settings and render widget ---
  (async function initTurnstile() {
    try {
      const resp = await fetch("/site-settings", { cache: "no-store" });
      if (!resp.ok) return;
      const settings = await resp.json();
      // Two possible places to store the key: top-level turnstile_site_key or inside branding
      const siteKey = (settings && (settings.turnstile_site_key || settings.branding?.turnstile_site_key)) || "";
      if (!siteKey) return;

      // Insert a container for the Turnstile widget (before the submit button)
      let container = form.querySelector("#turnstileContainer");
      if (!container) {
        const submit = form.querySelector('button[type="submit"]');
        container = document.createElement("div");
        container.id = "turnstileContainer";
        // put it right before the submit button to keep layout predictable
        submit.parentNode.insertBefore(container, submit);
      }

      // Add the Turnstile script (once)
      if (!document.querySelector('script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]')) {
        const s = document.createElement("script");
        s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
        s.defer = true;
        s.async = true;
        document.head.appendChild(s);
      }

      // Render the widget element (the Turnstile script will auto-initialize elements with class 'cf-turnstile'
      // but we create the element now with the sitekey)
      container.innerHTML = `<div class="cf-turnstile" data-sitekey="${siteKey}"></div>`;
    } catch (e) {
      // Non-fatal — proceed without Turnstile if settings unavailable
      console.warn("Turnstile not initialised", e);
    }
  })();
  // --- End Turnstile init ---

  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const submit = form.querySelector('button[type="submit"]');
    const originalText = submit.textContent;
    submit.disabled = true;
    submit.textContent = "Sending...";
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
      submit.disabled = false;
      submit.textContent = originalText;
      return;
    }

    if (!data.termsAccepted || !data.privacyAccepted) {
      status.className = "form-status error";
      status.textContent = "Please confirm the Terms of Service and Privacy Notice before sending your enquiry.";
      submit.disabled = false;
      submit.textContent = originalText;
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
      submit.disabled = false;
      submit.textContent = originalText;
    }
  });
});
