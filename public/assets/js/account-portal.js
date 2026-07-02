const portalState = { profile: null, requests: null, pins: null };

const navItems = [
  ["/account/dashboard/", "Overview"],
  ["/account/profile/", "My Profile"],
  ["/account/settings/", "Settings"],
  ["/account/security/", "Security"],
  ["/account/bookings/", "Bookings"],
  ["/account/subscription/", "Membership"],
  ["/account/saved/", "Saved Experiences"],
  ["/account/messages/", "Messages"],
  ["/account/enquiries/", "Support"],
  ["/account/data-protection/", "Data Protection"],
  ["/account/downloads/", "Downloads"],
  ["/account/notifications/", "Notifications"]
];

const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]));
const initials = (value) => String(value || "JA").trim().split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "JA";
const fmt = (value) => value ? new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "Not available";

function shell(title, lead) {
  const root = document.getElementById("portalRoot");
  if (!root) return;
  const active = (href) => href === window.location.pathname ? "active" : "";
  root.innerHTML = `
    <div class="portal-shell">
      <aside class="portal-sidebar">
        <div class="portal-brand">
          <div class="portal-mark">JA</div>
          <div class="portal-brand-copy">
            <strong>JA Experiences &amp; Discovery</strong>
            <span>Customer account centre</span>
          </div>
        </div>
        <div class="portal-person">
          <div class="portal-avatar" id="sidebarAvatar">JA</div>
          <div>
            <strong id="sidebarName">Customer account</strong>
            <span id="sidebarEmail">Signed in securely</span>
          </div>
          <span class="portal-status" id="sidebarStatus">Secure</span>
        </div>
        <nav class="portal-nav" aria-label="Customer portal navigation">
          <div class="portal-nav-group">
            <div class="portal-nav-heading">Portal</div>
            ${navItems.map(([href, label]) => `<a class="portal-nav-link ${active(href)}" href="${href}">${label}</a>`).join("")}
          </div>
        </nav>
        <div class="portal-sidebar-footer">
          <a class="portal-button" href="/account/profile/">View profile</a>
          <a class="portal-button secondary" href="/account/logout">Sign out</a>
        </div>
      </aside>
      <main class="portal-main">
        <div class="portal-wrap" id="portalContent"></div>
      </main>
    </div>`;

  const content = document.getElementById("portalContent");
  content.innerHTML = `
    <section class="portal-hero">
      <div>
        <span class="portal-eyebrow">Customer portal</span>
        <h1>${escapeHtml(title)}</h1>
        <p class="portal-lead">${escapeHtml(lead)}</p>
      </div>
      <div class="portal-hero-panel">
        <div class="portal-entry"><span class="portal-label">Account</span><strong id="heroAccount">Loading…</strong></div>
        <div class="portal-entry"><span class="portal-label">Status</span><strong id="heroStatus">Loading…</strong></div>
        <div class="portal-entry"><span class="portal-label">Last sync</span><strong id="heroSync">Loading…</strong></div>
      </div>
    </section>
    <section id="portalPage"></section>`;
}

async function loadProfile() {
  if (portalState.profile) return portalState.profile;
  const response = await fetch("/account/profile", { credentials: "include", cache: "no-store", headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error("Profile data unavailable.");
  const payload = await response.json();
  portalState.profile = payload.profile || payload;
  return portalState.profile;
}

async function loadRequests() {
  if (portalState.requests) return portalState.requests;
  const response = await fetch("/account/requests", { credentials: "include", cache: "no-store", headers: { Accept: "application/json" } });
  if (!response.ok) return {};
  portalState.requests = await response.json().catch(() => ({}));
  return portalState.requests;
}

async function loadPins() {
  if (portalState.pins) return portalState.pins;
  const response = await fetch("/account/pins", { credentials: "include", cache: "no-store", headers: { Accept: "application/json" } });
  if (!response.ok) return { pins: [] };
  portalState.pins = await response.json().catch(() => ({ pins: [] }));
  return portalState.pins;
}

function updateShared(profile = {}) {
  const name = profile.displayName || profile.verifiedName || profile.name || "Customer";
  const email = profile.email || "";
  document.getElementById("sidebarName").textContent = name;
  document.getElementById("sidebarEmail").textContent = email || "Signed in securely";
  document.getElementById("sidebarAvatar").textContent = initials(name);
  document.getElementById("heroAccount").textContent = name;
  document.getElementById("heroStatus").textContent = profile.lifetimeAccess ? "Lifetime access" : (profile.customerStatus || "Active session");
  document.getElementById("heroSync").textContent = fmt(profile.microsoftUpdatedAt || profile.updatedAt || profile.createdAt);
}

function timelineItems(profile = {}, requests = {}) {
  const items = [
    { label: "Account created", detail: fmt(profile.createdAt) },
    { label: "Microsoft sign in", detail: fmt(profile.microsoftUpdatedAt || profile.updatedAt) },
    { label: "Profile updated", detail: fmt(profile.updatedAt) }
  ];

  (requests.dataProtectionRequests || []).slice(0, 2).forEach((request) => {
    items.push({ label: "GDPR request submitted", detail: `${escapeHtml(request.reference || "Request")} · ${fmt(request.submitted_at || request.created_at)}` });
  });

  (requests.systemReports || []).slice(0, 2).forEach((report) => {
    items.push({ label: "Website issue reported", detail: `${escapeHtml(report.reference || "Report")} · ${fmt(report.submitted_at || report.created_at)}` });
  });

  return items;
}

function timelineMarkup(items = []) {
  if (!items.length) {
    return '<div class="portal-note inline">No timeline activity yet.</div>';
  }

  return `<div class="portal-timeline">${items.map((item) => `
    <article class="portal-timeline-item">
      <span class="portal-timeline-dot" aria-hidden="true"></span>
      <div>
        <strong>${escapeHtml(item.label)}</strong>
        <small>${escapeHtml(item.detail)}</small>
      </div>
    </article>
  `).join("")}</div>`;
}

window.JAPortal = { shell, loadProfile, loadRequests, loadPins, updateShared, timelineItems, timelineMarkup, fmt, escapeHtml, initials, state: portalState };

document.addEventListener("DOMContentLoaded", async () => {
  const page = document.body.dataset.portalPage || "dashboard";
  const needsRequests = new Set(["dashboard", "membership", "support", "messages", "data", "notifications"]);
  const needsPins = page === "security";
  const titleMap = {
    dashboard: ["Overview", "Live overview of your account activity, support and membership."],
    profile: ["Profile", "Your master customer record, identity and preferences."],
    settings: ["Settings", "Control preferences, accessibility and session behaviour."],
    security: ["Security", "Manage sessions, sign-ins and support access settings."],
    bookings: ["Bookings", "Your upcoming, past and cancelled bookings."],
    membership: ["Membership", "Plan, benefits, Stripe status and billing history."],
    support: ["Support", "Tickets, enquiries, issues and conversation history."],
    data: ["Data Protection", "Subject access, deletion and other privacy requests."],
    downloads: ["Downloads", "Invoices, receipts, exports and support documents."],
    saved: ["Saved Experiences", "Wishlists, favourites and recently viewed items."],
    messages: ["Messages", "Notifications and conversations in one inbox."],
    notifications: ["Notifications", "System, support and membership notifications."]
  };

  shell(...(titleMap[page] || ["Customer portal", "Secure customer account centre."]));

  try {
    const bootstrap = [loadProfile()];
    if (needsRequests.has(page)) bootstrap.push(loadRequests());
    if (needsPins) bootstrap.push(loadPins());
    await Promise.all(bootstrap);
    updateShared(portalState.profile || {});
    await renderPage(page);
  } catch (error) {
    document.getElementById("portalPage").innerHTML = `<div class="portal-note inline">${escapeHtml(error.message || "Unable to load account data.")}</div>`;
  }
});

async function renderPage(page) {
  const profile = portalState.profile || {};
  const requests = portalState.requests || {};
  const pageRoot = document.getElementById("portalPage");
  if (!pageRoot) return;

  if (page === "dashboard") {
    pageRoot.innerHTML = `
      <section class="portal-grid">
        <article class="portal-card portal-span-8">
          <h2>Quick actions</h2>
          <div class="portal-quick-actions">
            <a class="portal-action" href="/account/profile/"><strong>View profile</strong><span>Master customer record</span></a>
            <a class="portal-action" href="/account/security/"><strong>Security centre</strong><span>Sessions and PINs</span></a>
            <a class="portal-action" href="/account/support/"><strong>Support centre</strong><span>Tickets and requests</span></a>
            <a class="portal-action" href="/account/downloads/"><strong>Downloads</strong><span>Invoices and exports</span></a>
          </div>
        </article>
        <article class="portal-card portal-span-4">
          <h2>Membership summary</h2>
          <div class="portal-stack">
            <div class="portal-entry"><span class="portal-label">Plan</span><strong>${escapeHtml(profile.currentPlan || "Standard")}</strong></div>
            <div class="portal-entry"><span class="portal-label">Lifetime access</span><strong>${profile.lifetimeAccess ? "Enabled" : "Not enabled"}</strong></div>
            <div class="portal-entry"><span class="portal-label">Stripe status</span><strong>${profile.stripeCustomerId ? "Linked" : "Not linked"}</strong></div>
          </div>
        </article>
        <article class="portal-card portal-span-6">
          <h2>Recent activity</h2>
          ${timelineMarkup(timelineItems(profile, requests).slice(0, 5))}
        </article>
        <article class="portal-card portal-span-6">
          <h2>Latest support activity</h2>
          <div class="portal-stack">
            ${(requests.dataProtectionRequests || []).slice(0, 2).map((request) => `
              <div class="portal-entry"><strong>${escapeHtml(request.reference)}</strong><small>${escapeHtml(request.request_type || "Data request")} · ${escapeHtml(request.status || "New")}</small></div>
            `).join("") || '<div class="portal-note inline">No recent requests yet.</div>'}
          </div>
        </article>
      </section>`;
    return;
  }

  if (page === "profile") {
    pageRoot.innerHTML = `
      <section class="portal-grid">
        <article class="portal-card portal-span-12">
          <details open>
            <summary><strong>Personal details</strong></summary>
            <div class="portal-form-grid">
              <label class="portal-field"><span class="portal-label">Display name</span><input id="profileDisplayName" value="${escapeHtml(profile.displayName || "")}"></label>
              <label class="portal-field"><span class="portal-label">Contact email</span><input id="profileContactEmail" value="${escapeHtml(profile.contactEmail || profile.email || "")}"></label>
              <label class="portal-field"><span class="portal-label">Phone</span><input id="profilePhone" value="${escapeHtml(profile.phone || "")}"></label>
              <label class="portal-field"><span class="portal-label">Communication preference</span><select id="profileComms"><option>Email</option><option>Phone</option><option>Email first, phone if urgent</option></select></label>
            </div>
          </details>
        </article>
        <article class="portal-card portal-span-6">
          <h2>Microsoft Entra identity</h2>
          <div class="portal-stack">
            <div class="portal-entry"><span class="portal-label">Tenant ID</span><strong>${escapeHtml(profile.microsoftTenantId || "Not provided")}</strong></div>
            <div class="portal-entry"><span class="portal-label">Object ID</span><strong>${escapeHtml(profile.microsoftObjectId || "Not provided")}</strong></div>
            <label class="portal-field"><span class="portal-label">Preferred username</span><input value="${escapeHtml(profile.microsoftPreferredUsername || "")}" disabled><small>Managed by Microsoft Entra</small></label>
            <label class="portal-field"><span class="portal-label">Preferred language</span><input value="${escapeHtml(profile.microsoftPreferredLanguage || "")}"><small>Editable where Microsoft Graph permits.</small></label>
            <div class="portal-entry"><span class="portal-label">Last sync</span><strong>${escapeHtml(fmt(profile.microsoftUpdatedAt))}</strong></div>
          </div>
        </article>
        <article class="portal-card portal-span-6">
          <h2>Account metadata</h2>
          <div class="portal-stack">
            <div class="portal-entry"><span class="portal-label">Current plan</span><strong>${escapeHtml(profile.currentPlan || "Standard")}</strong></div>
            <div class="portal-entry"><span class="portal-label">Stripe customer</span><strong>${escapeHtml(profile.stripeCustomerId || "Not provided")}</strong></div>
            <div class="portal-entry"><span class="portal-label">Verification</span><strong>${escapeHtml(profile.verificationStatus || "Not provided")}</strong></div>
          </div>
        </article>
        <article class="portal-card portal-span-12">
          <h2>Privacy and consent</h2>
          <div class="portal-form-grid">
            <label class="portal-field"><span class="portal-label">Support notes</span><textarea id="profileSupportNotes">${escapeHtml(profile.supportNotes || "")}</textarea></label>
            <div class="portal-stack">
              <div class="portal-entry"><span class="portal-label">Microsoft display name</span><strong>${escapeHtml(profile.microsoftDisplayName || "Not provided")}</strong></div>
              <div class="portal-entry"><span class="portal-label">Country</span><strong>${escapeHtml(profile.microsoftCountry || "Not provided")}</strong></div>
              <div class="portal-entry"><span class="portal-label">Job title</span><strong>${escapeHtml(profile.microsoftJobTitle || "Not provided")}</strong></div>
            </div>
          </div>
          <div class="portal-form-actions">
            <button class="portal-button" type="button" id="saveProfileBtn">Save changes</button>
          </div>
        </article>
      </section>`;
    document.getElementById("profileComms").value = profile.communicationPreference || "Email";
    document.getElementById("saveProfileBtn").addEventListener("click", async () => {
      const payload = {
        displayName: document.getElementById("profileDisplayName").value,
        contactEmail: document.getElementById("profileContactEmail").value,
        phone: document.getElementById("profilePhone").value,
        communicationPreference: document.getElementById("profileComms").value,
        supportNotes: document.getElementById("profileSupportNotes").value,
        termsAccepted: true,
        privacyAccepted: true,
        marketingConsent: false
      };
      const response = await fetch("/account/profile", {
        method: "POST",
        credentials: "include",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        alert(data.error || "Profile could not be saved.");
        return;
      }
      portalState.profile = data.profile;
      updateShared(portalState.profile);
      await renderPage("profile");
    });
    return;
  }

  if (page === "security") {
    const pins = portalState.pins || await loadPins().catch(() => ({ pins: [] }));
    pageRoot.innerHTML = `
      <section class="portal-grid">
        <article class="portal-card portal-span-6">
          <h2>Microsoft Entra connection</h2>
          <div class="portal-stack">
            <div class="portal-entry"><span class="portal-label">Connected</span><strong>${profile.microsoftEmail ? "Yes" : "Unknown"}</strong></div>
            <div class="portal-entry"><span class="portal-label">Last sign-in</span><strong>${escapeHtml(fmt(profile.microsoftUpdatedAt || profile.updatedAt))}</strong></div>
            <div class="portal-entry"><span class="portal-label">Account verification</span><strong>${escapeHtml(profile.verificationStatus || "Not provided")}</strong></div>
          </div>
        </article>
        <article class="portal-card portal-span-6">
          <h2>One-time PINs</h2>
          <div class="portal-note inline">Generate, rotate and revoke PINs here. The backend stores only hashed PINs.</div>
          <div class="portal-actions">
            <button class="portal-action" type="button" data-pin-action="generate"><strong>Generate PIN</strong><span>6-digit, 10 minute expiry</span></button>
            <button class="portal-action" type="button" data-pin-action="rotate"><strong>Rotate PIN</strong><span>Refresh an existing PIN</span></button>
            <button class="portal-action" type="button" data-pin-action="revoke"><strong>Revoke PIN</strong><span>Disable a support PIN</span></button>
          </div>
          <div class="portal-stack" id="pinHistory">
            ${(pins.pins || []).map((pin) => `<div class="portal-entry"><strong>${escapeHtml(pin.status || "Active")} PIN</strong><small>Last 4: ${escapeHtml(pin.pin_last4 || "----")} · Expires ${escapeHtml(fmt(pin.expires_at))}</small></div>`).join("") || '<div class="portal-note inline">No support PINs generated yet.</div>'}
          </div>
        </article>
        <article class="portal-card portal-span-12">
          <h2>Security history</h2>
          ${timelineMarkup(timelineItems(profile, requests).slice(0, 6))}
        </article>
      </section>`;
    pageRoot.querySelectorAll("[data-pin-action]").forEach((button) => {
      button.addEventListener("click", async () => {
        const action = button.dataset.pinAction;
        const target = pins.pins?.[0]?.id || "";
        const response = await fetch("/account/pins", {
          method: "POST",
          credentials: "include",
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({ action, id: target })
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          alert(data.error || "PIN action failed.");
          return;
        }
        await renderPage("security");
      });
    });
    return;
  }

  if (page === "membership") {
    pageRoot.innerHTML = `
      <section class="portal-grid">
        <article class="portal-card portal-span-6">
          <h2>Plan</h2>
          <div class="portal-stack">
            <div class="portal-entry"><span class="portal-label">Current plan</span><strong>${escapeHtml(profile.currentPlan || "Standard")}</strong></div>
            <div class="portal-entry"><span class="portal-label">Lifetime access</span><strong>${profile.lifetimeAccess ? "Enabled" : "Not enabled"}</strong></div>
            <div class="portal-entry"><span class="portal-label">Stripe status</span><strong>${profile.stripeCustomerId ? "Linked" : "Not linked"}</strong></div>
          </div>
        </article>
        <article class="portal-card portal-span-6">
          <h2>Benefits</h2>
          <div class="portal-stack">
            <div class="portal-entry"><span class="portal-label">Included services</span><strong>Support, profile, data requests</strong></div>
            <div class="portal-entry"><span class="portal-label">Upgrade path</span><strong>Compare plans through pricing</strong></div>
            <div class="portal-entry"><span class="portal-label">Membership timeline</span><strong>${escapeHtml(fmt(profile.createdAt || profile.updatedAt))}</strong></div>
          </div>
        </article>
        <article class="portal-card portal-span-12">
          <h2>Billing history</h2>
          <div class="portal-note inline">Invoices, receipts and billing history are surfaced from Stripe-backed records where enabled.</div>
        </article>
      </section>`;
    return;
  }

  if (page === "support" || page === "messages") {
    const supportCases = requests.supportCases || [];
    pageRoot.innerHTML = `
      <section class="portal-grid">
        <article class="portal-card portal-span-6">
          <h2>My support tickets</h2>
          <div class="portal-stack">
            ${supportCases.slice(0, 3).map((request) => `
              <div class="portal-entry"><strong>${escapeHtml(request.reference)}</strong><small>${escapeHtml(request.request_type || "Support request")} · ${escapeHtml(request.status || "New")} · ${escapeHtml(request.priority || "Normal")}</small></div>
            `).join("") || '<div class="portal-note inline">No support tickets yet.</div>'}
          </div>
          <div class="portal-form-actions">
            <button class="portal-button" type="button" data-support-create="general_enquiry">General enquiry</button>
            <button class="portal-button" type="button" data-support-create="website_issue">Website issue</button>
            <button class="portal-button" type="button" data-support-create="account_support">Account support</button>
            <button class="portal-button" type="button" data-support-create="billing_support">Billing support</button>
          </div>
        </article>
        <article class="portal-card portal-span-6">
          <h2>Website issues and enquiries</h2>
          <div class="portal-stack">
            ${(requests.systemReports || []).slice(0, 3).map((report) => `
              <div class="portal-entry"><strong>${escapeHtml(report.reference)}</strong><small>${escapeHtml(report.issue_type || "Website issue")} · ${escapeHtml(report.status || "New")}</small></div>
            `).join("") || '<div class="portal-note inline">No website issues reported yet.</div>'}
          </div>
        </article>
        <article class="portal-card portal-span-12">
          <h2>Conversation history</h2>
          <div class="portal-stack">
            ${timelineMarkup((requests.timeline || []).slice(0, 6))}
          </div>
        </article>
      </section>`;
    pageRoot.querySelectorAll("[data-support-create]").forEach((button) => {
      button.addEventListener("click", async () => {
        const type = button.dataset.supportCreate;
        const subject = prompt("Subject");
        if (!subject) return;
        const customer_message = prompt("Describe the issue");
        if (!customer_message) return;
        const response = await fetch("/account/requests", {
          method: "POST",
          credentials: "include",
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({ type, subject, category: type.replaceAll("_", " "), customer_message })
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          alert(data.error || "Request could not be submitted.");
          return;
        }
        alert(`Created ${data.reference || data.record?.reference || "request"}.`);
        await renderPage(page);
      });
    });
    return;
  }

  if (page === "data") {
    pageRoot.innerHTML = `
      <section class="portal-grid">
        <article class="portal-card portal-span-6">
          <h2>Submit request</h2>
          <div class="portal-note inline">Subject access, deletion, rectification, restriction, portability and objection requests are supported by the existing account workflow.</div>
        </article>
        <article class="portal-card portal-span-6">
          <h2>Current requests</h2>
          <div class="portal-stack">
            ${(requests.dataProtectionRequests || []).map((request) => `
              <div class="portal-entry"><strong>${escapeHtml(request.reference)}</strong><small>${escapeHtml(request.request_type || "Request")} · ${escapeHtml(request.status || "New")}</small></div>
            `).join("") || '<div class="portal-note inline">No current requests.</div>'}
          </div>
        </article>
      </section>`;
    return;
  }

  if (page === "notifications") {
    const notifications = requests.notifications || [];
    pageRoot.innerHTML = `
      <section class="portal-grid">
        <article class="portal-card portal-span-6">
          <h2>Unread notifications</h2>
          <div class="portal-stack">
            <div class="portal-entry"><span class="portal-label">Unread</span><strong>${notifications.filter((n) => n.status !== "Read").length}</strong></div>
            <div class="portal-entry"><span class="portal-label">Archived</span><strong>${notifications.filter((n) => n.status === "Archived").length}</strong></div>
            <div class="portal-entry"><span class="portal-label">Priority</span><strong>${notifications.filter((n) => n.priority === "Urgent").length}</strong></div>
          </div>
        </article>
        <article class="portal-card portal-span-6">
          <h2>Notification inbox</h2>
          <div class="portal-stack">
            ${(notifications.slice(0, 5).map((notification) => `
              <div class="portal-entry"><strong>${escapeHtml(notification.title)}</strong><small>${escapeHtml(notification.category)} · ${escapeHtml(notification.priority || "Normal")} · ${escapeHtml(notification.status || "Unread")}</small></div>
            `).join("")) || '<div class="portal-note inline">No notifications yet.</div>'}
          </div>
        </article>
      </section>`;
    return;
  }

  if (page === "saved") {
    pageRoot.innerHTML = `
      <section class="portal-grid">
        <article class="portal-card portal-span-6">
          <h2>Favourite destinations</h2>
          <div class="portal-note inline">Wishlist, recently viewed and recommended items will appear here.</div>
        </article>
        <article class="portal-card portal-span-6">
          <h2>Saved experiences</h2>
          <div class="portal-note inline">This page is ready for storage-backed favourites and categories.</div>
        </article>
      </section>`;
    return;
  }

  if (page === "bookings") {
    pageRoot.innerHTML = `
      <section class="portal-grid">
        <article class="portal-card portal-span-6">
          <h2>Upcoming</h2>
          <div class="portal-note inline">No bookings are currently linked.</div>
        </article>
        <article class="portal-card portal-span-6">
          <h2>Past and cancelled</h2>
          <div class="portal-note inline">Booking history, Stripe payments, invoices and receipts will be added here.</div>
        </article>
      </section>`;
    return;
  }

  if (page === "downloads") {
    pageRoot.innerHTML = `
      <section class="portal-grid">
        <article class="portal-card portal-span-6">
          <h2>Downloads</h2>
          <div class="portal-stack">
            <div class="portal-entry"><span class="portal-label">Invoices</span><strong>Ready</strong></div>
            <div class="portal-entry"><span class="portal-label">Receipts</span><strong>Ready</strong></div>
            <div class="portal-entry"><span class="portal-label">Exports</span><strong>Ready</strong></div>
          </div>
        </article>
        <article class="portal-card portal-span-6">
          <h2>Documents</h2>
          <div class="portal-note inline">Your invoices, itineraries, reports and exported data will appear here when they are ready.</div>
        </article>
      </section>`;
    return;
  }

  pageRoot.innerHTML = `<div class="portal-note inline">No items are available in this section yet. When content is ready, it will appear here.</div>`;
}
