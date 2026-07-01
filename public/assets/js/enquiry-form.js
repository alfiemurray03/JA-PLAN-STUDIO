document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#customerForm");
  const status = document.querySelector("#formStatus");
  const turnstileContainer = document.querySelector("#turnstileContainer");
  const turnstileStatus = document.querySelector("#turnstileStatus");
  if (!form || !status) return;

  const startedAt = form.querySelector('[name="startedAt"]');
  if (startedAt) startedAt.value = String(Date.now());
  const idempotencyKey = crypto.randomUUID();
  let turnstileEnabled = false;
  let turnstileAvailable = true;
  let turnstileToken = "";
  let widgetId = null;

  const params = new URLSearchParams(window.location.search);
  const destination = params.get("destination");
  if (destination && form.elements.destination) form.elements.destination.value = destination;

  function setStatus(element, message, isError = false) {
    if (!element) return;
    element.className = isError ? "form-status error" : "form-status";
    element.textContent = message;
  }

  function waitForTurnstile() {
    return new Promise((resolve, reject) => {
      if (window.turnstile) return resolve(window.turnstile);
      const existing = document.querySelector('script[data-ja-turnstile="true"]');
      if (existing) {
        existing.addEventListener("load", () => resolve(window.turnstile), { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.dataset.jaTurnstile = "true";
      script.addEventListener("load", () => resolve(window.turnstile), { once: true });
      script.addEventListener("error", reject, { once: true });
      document.head.appendChild(script);
    });
  }

  async function initialiseTurnstile() {
    try {
      const response = await fetch("/api/enquiries", { headers: { Accept: "application/json" }, cache: "no-store" });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error("Security configuration could not be loaded.");
      turnstileEnabled = Boolean(result.turnstile?.enabled);
      turnstileAvailable = result.turnstile?.available !== false;
      if (!turnstileAvailable) {
        setStatus(turnstileStatus, "The security check is temporarily unavailable. Please try again later.", true);
        return;
      }
      if (!turnstileEnabled) {
        if (turnstileContainer) turnstileContainer.hidden = true;
        return;
      }
      const turnstile = await waitForTurnstile();
      widgetId = turnstile.render(turnstileContainer, {
        sitekey: result.turnstile.siteKey,
        action: "contact_enquiry",
        callback(token) {
          turnstileToken = token;
          setStatus(turnstileStatus, "Security check completed.");
        },
        "expired-callback"() {
          turnstileToken = "";
          setStatus(turnstileStatus, "The security check expired. Please complete it again.", true);
        },
        "error-callback"() {
          turnstileToken = "";
          setStatus(turnstileStatus, "The security check could not be completed. Please try again.", true);
        }
      });
    } catch {
      turnstileAvailable = false;
      setStatus(turnstileStatus, "The security check is temporarily unavailable. Please try again later.", true);
    }
  }

  initialiseTurnstile();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const submit = form.querySelector('button[type="submit"]');
    const originalText = submit.textContent;

    if (!turnstileAvailable) {
      setStatus(status, "The security check is temporarily unavailable. Please try again later.", true);
      turnstileStatus?.focus();
      return;
    }
    if (turnstileEnabled && !turnstileToken) {
      setStatus(turnstileStatus, "Complete the security check before sending your message.", true);
      turnstileContainer?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    submit.disabled = true;
    submit.textContent = "Sending…";
    setStatus(status, "Sending your enquiry…");

    const data = Object.fromEntries(new FormData(form).entries());
    data.socialTariff = Boolean(form.elements.socialTariff?.checked);
    data.specialCategoryConsent = Boolean(form.elements.specialCategoryConsent?.checked);
    data.transportConfirmed = Boolean(form.elements.transportConfirmed?.checked);
    data.termsAccepted = Boolean(form.elements.termsAccepted?.checked);
    data.privacyAccepted = Boolean(form.elements.privacyAccepted?.checked);
    data.marketingConsent = Boolean(form.elements.marketingConsent?.checked);
    data.turnstileToken = turnstileToken;
    data.idempotencyKey = idempotencyKey;

    if (data.supportNeeds?.trim() && !data.specialCategoryConsent) {
      setStatus(status, "Please confirm the sensitive-information consent, or remove the accessibility information.", true);
      submit.disabled = false;
      submit.textContent = originalText;
      return;
    }

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      });
      const contentType = response.headers.get("content-type") || "";
      const result = contentType.includes("application/json") ? await response.json() : { ok: false, message: "The online form could not be sent. Please try again later." };
      if (!response.ok || !result.ok) throw new Error(result.message || "The form could not be sent.");

      form.hidden = true;
      status.className = "form-status success";
      status.replaceChildren();
      const heading = document.createElement("strong");
      heading.textContent = result.duplicate ? "Enquiry already received." : "Message sent.";
      const reference = document.createElement("strong");
      reference.textContent = result.reference;
      status.append(heading, document.createElement("br"), "Your reference is ", reference, ".");
      status.setAttribute("tabindex", "-1");
      status.focus();
    } catch (error) {
      setStatus(status, error.message, true);
      if (turnstileEnabled && widgetId !== null && window.turnstile) {
        window.turnstile.reset(widgetId);
        turnstileToken = "";
      }
      submit.disabled = false;
      submit.textContent = originalText;
    }
  });
});
