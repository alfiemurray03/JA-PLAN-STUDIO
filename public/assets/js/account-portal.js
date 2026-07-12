const portalState = { profile: null, requests: null, pins: null, saved: null, billing: null, builders: null };

const navItems = [
  ["/account/dashboard/", "Overview"],
  ["/account/profile/", "My Account"],
  ["/account/tokens/", "Builder Usage Tokens"],
  ["/account/builders/", "My Builders"],
  ["/account/saved/", "Saved Plans"],
  ["/account/saved/?view=experiences", "Saved Experiences"],
  ["/account/bookings/", "Bookings"],
  ["/account/subscription/", "Membership"],
  ["/account/messages/", "Messages"],
  ["/account/enquiries/", "Enquiries"],
  ["/account/support/", "Support"],
  ["/account/security/", "Security"],
  ["/account/settings/", "Settings"],
  ["/account/data-protection/", "Data Protection"],
  ["/account/downloads/", "Downloads"],
  ["/account/logout/", "Sign out"]
];

const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]));
const initials = (value) => String(value || "JA").trim().split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "JA";
const fmt = (value) => value ? new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "Not available";
const money = (value, currency = "gbp") => Number.isFinite(Number(value))
  ? new Intl.NumberFormat("en-GB", { style: "currency", currency: String(currency || "gbp").toUpperCase() }).format(Number(value) / 100)
  : "Not available";

/* ---- Legacy portal-* class fragments (shared component patterns) ---- */
const cls = {
  // sidebar navigation items
  sidebarItem: "portal-nav-link",
  sidebarItemActive: "portal-nav-link active",
  // page header (title block)
  pageHeader: "portal-page-header",
  // status badges
  statusActive: "portal-status active",
  statusPending: "portal-status pending",
  statusInactive: "portal-status inactive",
  // table
  tableBase: "portal-table",
  tableWrap: "portal-table-wrap",
  tableTh: "portal-table th",
  tableTd: "portal-table td",
  // tabs
  tabBase: "portal-tab",
  tabActive: "portal-tab active",
  // alerts
  alertInfo: "portal-alert info",
  alertWarning: "portal-alert warning",
  alertDanger: "portal-alert error",
  alertSuccess: "portal-alert success",
  // badge-warning (not in tailwind.css)
  badgeWarning: "portal-badge warning",
  // portal-specific composites
  shell: "portal-shell",
  sidebar: "portal-sidebar",
  main: "portal-main",
  brandCopyStrong: "portal-brand-copy strong",
  brandCopySpan: "portal-brand-copy span",
  person: "portal-person",
  personStrong: "portal-person strong",
  personSpan: "portal-person span",
  avatar: "portal-avatar",
  statusPill: "portal-status",
  navGroup: "portal-nav-group",
  navHeading: "portal-nav-heading",
  sidebarFooter: "portal-sidebar-footer",
  wrap: "portal-wrap",
  wrapCentered: "portal-wrap-centered",
  eyebrow: "portal-eyebrow",
  lead: "portal-lead",
  heroPanel: "portal-hero-panel",
  heroEntry: "portal-hero-panel",
  heroLabel: "portal-eyebrow",
  heroValue: "portal-card-title",
  grid12: "portal-grid",
  gridMini: "portal-grid mini",
  span4: "portal-span-4",
  span6: "portal-span-6",
  span8: "portal-span-8",
  span12: "portal-span-12",
  cardHeading: "portal-card-heading",
  cardTitle: "portal-card-title",
  cardDesc: "portal-card-description",
  stack: "portal-stack",
  accountPage: "portal-account-page",
  accountSummary: "portal-account-summary",
  accountAvatar: "portal-account-avatar",
  badgeRow: "portal-badge-row",
  entry: "portal-entry",
  entryStrong: "portal-entry strong",
  entrySmall: "portal-entry small",
  listRow: "portal-list-row",
  quickActions: "portal-quick-actions",
  action: "portal-action",
  actionStrong: "portal-action strong",
  actionSpan: "portal-action span",
  note: "portal-note",
  noteInline: "portal-note inline",
  formGrid: "portal-form-grid",
  field: "portal-field",
  formActions: "portal-form-actions",
  toggle: "portal-toggle",
  toggleInput: "portal-toggle input",
  helpText: "portal-help-text",
  timeline: "portal-timeline",
  timelineItem: "portal-timeline-item",
  timelineDot: "portal-timeline-dot",
  surface: "portal-surface",
  trialBanner: "portal-trial-banner",
  trialBannerExpired: "portal-trial-banner expired",
  trialStrong: "portal-trial-banner strong",
  trialSpan: "portal-trial-banner span",
  miniBtn: "portal-mini"
};

function shell(title, lead, options = {}) {
  const root = document.getElementById("portalRoot");
  if (!root) return;
  const currentPath = window.location.pathname;
  const currentRoute = `${window.location.pathname}${window.location.search}`;
  const active = (href) => href.includes("?") ? (href === currentRoute ? cls.sidebarItemActive : cls.sidebarItem) : (href === currentPath ? cls.sidebarItemActive : cls.sidebarItem);
  root.innerHTML = `
    <div class="${cls.shell}">
      <aside class="${cls.sidebar}">
        <div class="portal-brand">
          <div class="${cls.brandCopyStrong}">JA Experiences &amp; Discovery</div>
          <div class="${cls.brandCopySpan}">Customer portal</div>
        </div>
        <div class="${cls.person}">
          <div class="${cls.avatar}" id="sidebarAvatar">JA</div>
          <div class="portal-account-summary-copy">
            <strong class="${cls.personStrong}" id="sidebarName">Customer account</strong>
            <span class="${cls.personSpan}" id="sidebarEmail">Signed in securely</span>
          </div>
          <span class="${cls.statusPill}" id="sidebarStatus">Secure</span>
        </div>
        <nav class="portal-nav" aria-label="Customer portal navigation">
          <div class="${cls.navGroup}">
            <div class="${cls.navHeading}">Portal</div>
            ${navItems.map(([href, label]) => `<a class="${active(href)}" href="${href}">${label}</a>`).join("")}
          </div>
        </nav>
        <div class="${cls.sidebarFooter}">
          <a class="portal-button-secondary" href="/">Back to JA Experiences &amp; Discovery</a>
          <a class="portal-button-primary" href="/account/profile/">My Account</a>
          <a class="portal-button-secondary" href="/account/logout">Sign out</a>
        </div>
      </aside>
      <main class="${cls.main}">
        <div class="${options.centered ? cls.wrapCentered : cls.wrap}" id="portalContent"></div>
      </main>
    </div>`;

  const content = document.getElementById("portalContent");
  content.innerHTML = `
    <section class="${cls.pageHeader}">
      <div>
        <span class="${cls.eyebrow}">Customer portal</span>
        <h1 class="portal-page-header h1">${escapeHtml(title)}</h1>
        <p class="${cls.lead}">${escapeHtml(lead)}</p>
      </div>
      ${options.showStats === false ? "" : `<div class="${cls.heroPanel}">
        <div class="${cls.heroEntry}"><span class="${cls.heroLabel}">Account</span><strong class="${cls.heroValue}" id="heroAccount">Loading…</strong></div>
        <div class="${cls.heroEntry}"><span class="${cls.heroLabel}">Status</span><strong class="${cls.heroValue}" id="heroStatus">Loading…</strong></div>
        <div class="${cls.heroEntry}"><span class="${cls.heroLabel}">Last sync</span><strong class="${cls.heroValue}" id="heroSync">Loading…</strong></div>
        <div class="${cls.heroEntry}"><span class="${cls.heroLabel}">Notifications</span><strong class="${cls.heroValue}" id="heroNotifications">Loading…</strong></div>
      </div>`}
    </section>
    <div id="portalTrialBanner"></div>
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

async function loadPins(force = false) {
  if (!force && portalState.pins) return portalState.pins;
  const response = await fetch("/account/pins", { credentials: "include", cache: "no-store", headers: { Accept: "application/json" } });
  if (!response.ok) return { pins: [] };
  portalState.pins = await response.json().catch(() => ({ pins: [] }));
  return portalState.pins;
}

async function loadSaved() {
  if (portalState.saved) return portalState.saved;
  const response = await fetch("/account/api/saved", { credentials: "include", cache: "no-store", headers: { Accept: "application/json" } });
  if (!response.ok) return { items: [] };
  portalState.saved = await response.json().catch(() => ({ items: [] }));
  return portalState.saved;
}

async function loadBilling() {
  if (portalState.billing) return portalState.billing;
  const response = await fetch("/account/billing", { credentials: "include", cache: "no-store", headers: { Accept: "application/json" } });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "Billing data unavailable.");
  portalState.billing = payload;
  return payload;
}

async function loadBuilders(force = false) {
  if (!force && portalState.builders) return portalState.builders;
  const response = await fetch("/account/api/builders", { credentials: "include", cache: "no-store", headers: { Accept: "application/json" } });
  if (!response.ok) return { builders: [], outputs: [], ledger: [], blocked_attempts: [], token_summary: {} };
  portalState.builders = await response.json().catch(() => ({ builders: [], outputs: [], ledger: [], blocked_attempts: [], token_summary: {} }));
  return portalState.builders;
}

async function openStripeBillingPortal() {
  const response = await fetch("/account/billing", {
    method: "POST",
    credentials: "include",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: "{}"
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.url) throw new Error(payload.error || "Stripe Billing Portal could not be opened.");
  window.location.assign(payload.url);
}

function updateShared(profile = {}) {
  const name = profile.displayName || profile.verifiedName || profile.name || "Customer";
  const email = profile.email || "";
  document.getElementById("sidebarName").textContent = name;
  document.getElementById("sidebarEmail").textContent = email || "Signed in securely";
  document.getElementById("sidebarAvatar").textContent = initials(name);
  const heroAccount = document.getElementById("heroAccount");
  const heroStatus = document.getElementById("heroStatus");
  const heroSync = document.getElementById("heroSync");
  const heroNotifications = document.getElementById("heroNotifications");
  if (heroAccount) heroAccount.textContent = name;
  if (heroStatus) heroStatus.textContent = profile.lifetimeAccess ? "Lifetime access" : (profile.customerStatus || "Active session");
  if (heroSync) heroSync.textContent = fmt(profile.microsoftUpdatedAt || profile.updatedAt || profile.createdAt);
  if (heroNotifications) heroNotifications.textContent = `${(portalState.requests?.notifications || []).filter((n) => n.status !== "Read" && n.status !== "Archived").length} unread`;
}

function daysRemaining(value) {
  if (!value) return 0;
  const diff = new Date(value).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86400000));
}

function formatDateOnly(value) {
  if (!value) return "Not available";
  const d = new Date(value);
  const day = d.getDate();
  const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

function renderTrialBanner(page) {
  const mount = document.getElementById("portalTrialBanner");
  if (!mount) return;
  const visiblePages = new Set(["dashboard", "profile", "tokens", "builders", "saved", "membership"]);
  const summary = portalState.builders?.token_summary || {};
  const trial = summary.trial;
  const hasPaidPlan = Boolean(summary.subscription_active);
  if (!visiblePages.has(page) || !trial || hasPaidPlan) {
    mount.innerHTML = "";
    return;
  }
  if (summary.trial_active) {
    mount.innerHTML = `
      <section class="${cls.trialBanner}">
        <div>
          <strong class="${cls.trialStrong}">FREE TRIAL — ENDS ON ${formatDateOnly(trial.expires_at)}</strong>
          <span class="${cls.trialSpan}">30 Builder Usage Tokens included once only. ${escapeHtml(String(summary.remaining_tokens ?? 0))} Builder Usage Tokens remaining.</span>
        </div>
        <a class="portal-button-secondary" href="/pricing/">View Plans / Upgrade</a>
      </section>`;
    return;
  }
  mount.innerHTML = `
    <section class="${cls.trialBannerExpired}">
      <div>
        <strong class="${cls.trialStrong}">Free trial expired</strong>
        <span class="${cls.trialSpan}">Choose a paid plan to continue using saved builder outputs and Builder Usage Tokens.</span>
      </div>
      <a class="portal-button-secondary" href="/pricing/">View Plans / Upgrade</a>
    </section>`;
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
    return `<div class="${cls.noteInline}">No timeline activity yet.</div>`;
  }

  return `<div class="${cls.timeline}">${items.map((item) => `
    <article class="${cls.timelineItem}">
      <span class="${cls.timelineDot}" aria-hidden="true"></span>
      <div>
        <strong class="portal-entry strong">${escapeHtml(item.label)}</strong>
        <small class="${cls.entrySmall}">${escapeHtml(item.detail)}</small>
      </div>
    </article>
  `).join("")}</div>`;
}

function portalTable(headers, rows = []) {
  if (!rows.length) return `<div class="${cls.noteInline}">No records yet.</div>`;
  return `
    <div class="${cls.tableWrap}">
      <table class="${cls.tableBase}">
        <thead><tr>${headers.map((header) => `<th class="${cls.tableTh}">${escapeHtml(header)}</th>`).join("")}</tr></thead>
        <tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td class="${cls.tableTd}">${String(cell || "").startsWith("<") ? cell : escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function emptyPortalState(title, body, actionHref = "", actionLabel = "") {
  return `
    <div class="portal-empty-state">
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(body)}</p>
      ${actionHref ? `<a class="portal-button-primary" href="${escapeHtml(actionHref)}">${escapeHtml(actionLabel)}</a>` : ""}
    </div>
  `;
}

window.JAPortal = { shell, loadProfile, loadRequests, loadPins, loadSaved, loadBilling, loadBuilders, updateShared, timelineItems, timelineMarkup, fmt, escapeHtml, initials, state: portalState };

document.addEventListener("click", async (event) => {
  const archive = event.target.closest('[data-action="archive-builder-output"]');
  if (archive) {
    archive.disabled = true;
    await fetch("/account/api/builders", {
      method: "POST",
      credentials: "include",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ action: "archive_output", id: archive.dataset.id })
    });
    portalState.builders = null;
    await loadBuilders(true);
    await renderPage("builders");
    return;
  }

  const deleteDraft = event.target.closest('[data-action="delete-builder-draft"]');
  if (deleteDraft) {
    if (!confirm("Are you sure you want to delete this builder draft?")) return;
    deleteDraft.disabled = true;
    await fetch("/account/api/builders", {
      method: "POST",
      credentials: "include",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete_draft_by_id", id: deleteDraft.dataset.id })
    });
    portalState.builders = null;
    await loadBuilders(true);
    await renderPage("builders");
    return;
  }

  const button = event.target.closest('[data-action="manage-stripe-billing"]');
  const cookiePreferences = event.target.closest('[data-action="cookie-preferences"]');
  if (cookiePreferences) {
    if (window.Cookiebot?.renew) window.Cookiebot.renew();
    return;
  }

  if (!button) return;
  button.disabled = true;
  const originalText = button.textContent;
  button.textContent = "Opening Stripe…";
  try {
    await openStripeBillingPortal();
  } catch (error) {
    button.disabled = false;
    button.textContent = originalText;
    window.alert(error.message || "Stripe Billing Portal could not be opened.");
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  if (!document.getElementById("portalRoot")) return;

  const page = document.body.dataset.portalPage || "dashboard";
  const needsRequests = new Set(["dashboard", "membership", "support", "messages", "data", "bookings", "saved"]);
  const needsPins = page === "security";
  const needsSaved = new Set(["dashboard", "membership", "bookings", "saved", "builders"]);
  const needsBuilders = new Set(["dashboard", "profile", "tokens", "builders", "membership", "saved"]);
  const needsBilling = new Set(["membership", "downloads"]);
  const titleMap = {
    dashboard: ["Overview", "Live overview of your account activity, support and membership."],
    profile: ["My Account", "Your account details and membership information"],
    tokens: ["Builder Usage Tokens", "View your token balance, allowance, usage ledger and blocked attempts."],
    builders: ["My Builders", "Saved builder outputs, plans and self-service planning history."],
    settings: ["Settings", "Control preferences, accessibility and session behaviour."],
    security: ["Security", "Manage sessions, sign-ins and support access settings."],
    bookings: ["Bookings", "Your upcoming, past and cancelled bookings."],
    membership: ["Membership", "Plan, benefits, Stripe status and billing history."],
    support: ["Support", "Tickets, enquiries, issues and conversation history."],
    data: ["Data Protection", "Subject access, deletion and other privacy requests."],
    downloads: ["Downloads", "Invoices, receipts, exports and support documents."],
    saved: ["Saved Plans", "Saved builder outputs, saved experiences and planning items."],
    messages: ["Messages", "Notifications and conversations in one inbox."],
    notifications: ["Notifications", "System, support and membership notifications."]
  };

  shell(...(titleMap[page] || ["Customer portal", "Secure customer account centre."]), { centered: page === "profile", showStats: page !== "profile" });

  try {
    const bootstrap = [loadProfile()];
    if (needsRequests.has(page)) bootstrap.push(loadRequests());
    if (needsPins) bootstrap.push(loadPins());
    if (needsSaved.has(page)) bootstrap.push(loadSaved());
    if (needsBuilders.has(page) || page === "saved") bootstrap.push(loadBuilders());
    if (needsBilling.has(page)) bootstrap.push(loadBilling());
    await Promise.all(bootstrap);
    updateShared(portalState.profile || {});
    renderTrialBanner(page);
    await renderPage(page);
  } catch (error) {
    document.getElementById("portalPage").innerHTML = `<div class="${cls.noteInline}">${escapeHtml(error.message || "Unable to load account data.")}</div>`;
  }
});

async function renderPage(page) {
  const profile = portalState.profile || {};
  const requests = portalState.requests || {};
  const pageRoot = document.getElementById("portalPage");
  if (!pageRoot) return;

  if (page === "dashboard") {
    const builderData = portalState.builders || {};
    const tokenSummary = builderData.token_summary || {};
    const outputs = Array.isArray(builderData.outputs) ? builderData.outputs : [];
    pageRoot.innerHTML = `
      <section class="${cls.grid12}">
        <article class="portal-card ${cls.span8}">
          <h2 class="${cls.cardTitle}">Quick actions</h2>
          <div class="${cls.quickActions}">
            <a class="${cls.action}" href="/builders/"><strong class="${cls.actionStrong}">Open Builders</strong><span class="${cls.actionSpan}">Create a new self-service experience plan</span></a>
            <a class="${cls.action}" href="/account/tokens/"><strong class="${cls.actionStrong}">Builder Usage Tokens</strong><span class="${cls.actionSpan}">${escapeHtml(String(tokenSummary.remaining_tokens ?? "0"))} remaining</span></a>
            <a class="${cls.action}" href="/account/saved/"><strong class="${cls.actionStrong}">View Saved Plans</strong><span class="${cls.actionSpan}">Plans and saved experiences</span></a>
            <a class="${cls.action}" href="/account/builders/"><strong class="${cls.actionStrong}">Continue My Builders</strong><span class="${cls.actionSpan}">Review saved builder outputs</span></a>
            <a class="${cls.action}" href="/account/support/"><strong class="${cls.actionStrong}">Contact Support</strong><span class="${cls.actionSpan}">Tickets, enquiries and help</span></a>
            <a class="${cls.action}" href="/account/subscription/"><strong class="${cls.actionStrong}">Manage Membership</strong><span class="${cls.actionSpan}">Plan, billing and invoices</span></a>
          </div>
        </article>
        <article class="portal-card ${cls.span4}">
          <h2 class="${cls.cardTitle}">Membership summary</h2>
          <div class="${cls.stack}">
            <div class="${cls.entry}"><span class="portal-label">Plan</span><strong class="${cls.entryStrong}">${escapeHtml(tokenSummary.plan_name || profile.currentPlan || "No active plan detected")}</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Builder Usage Tokens</span><strong class="${cls.entryStrong}">${escapeHtml(String(tokenSummary.remaining_tokens ?? "0"))} remaining</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Saved builder outputs</span><strong class="${cls.entryStrong}">${escapeHtml(String(outputs.length))}</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Lifetime access</span><strong class="${cls.entryStrong}">${profile.lifetimeAccess ? "Enabled" : "Not enabled"}</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Stripe status</span><strong class="${cls.entryStrong}">${profile.stripeLinked ? "Linked" : "Not linked"}</strong></div>
          </div>
        </article>
        <article class="portal-card ${cls.span6}">
          <h2 class="${cls.cardTitle}">Recent activity</h2>
          ${timelineMarkup(timelineItems(profile, requests).slice(0, 5))}
        </article>
        <article class="portal-card ${cls.span6}">
          <h2 class="${cls.cardTitle}">Latest support activity</h2>
          <div class="${cls.stack}">
            ${(requests.dataProtectionRequests || []).slice(0, 2).map((request) => `
              <div class="${cls.entry}"><strong class="${cls.entryStrong}">${escapeHtml(request.reference)}</strong><small class="${cls.entrySmall}">${escapeHtml(request.request_type || "Data request")} · ${escapeHtml(request.status || "New")}</small></div>
            `).join("") || `<div class="${cls.noteInline}">No recent requests yet.</div>`}
          </div>
        </article>
      </section>`;
    return;
  }

  if (page === "profile") {
    const builderData = portalState.builders || {};
    const tokenSummary = builderData.token_summary || {};
    const builderOutputs = Array.isArray(builderData.outputs) ? builderData.outputs : [];
    const displayName = profile.displayName || profile.verifiedName || profile.microsoftDisplayName || profile.name || "Customer";
    const email = profile.email || profile.microsoftEmail || profile.microsoftPreferredUsername || "Email not available";
    const currentPlan = tokenSummary.plan_name || profile.currentPlan || "No active plan detected";
    const membershipStatus = profile.customerStatus || (tokenSummary.plan_active ? "Active" : "Not active");
    pageRoot.innerHTML = `
      <section class="${cls.accountPage}">
        <article class="portal-card ${cls.accountSummary}">
          <div class="${cls.accountAvatar}">${escapeHtml(initials(displayName))}</div>
          <div class="portal-account-summary-copy">
            <h2 class="portal-account-summary-copy h2">${escapeHtml(displayName)}</h2>
            <p class="portal-account-summary-copy p">${escapeHtml(email)}</p>
            <div class="${cls.badgeRow}">
              <span class="portal-badge">${escapeHtml(profile.verificationStatus || "Verified")}</span>
              ${profile.lifetimeAccess ? '<span class="portal-badge">Lifetime access</span>' : ""}
              <span class="portal-badge">${escapeHtml(currentPlan)}</span>
            </div>
          </div>
        </article>

        <article class="portal-card">
          <div class="${cls.cardHeading}">
            <div>
              <h2 class="${cls.cardTitle}">Account Details</h2>
              <p class="${cls.cardDesc}">Your primary customer account information.</p>
            </div>
            <a class="portal-button-secondary" href="#editAccountDetails">Edit</a>
          </div>
          <div class="${cls.stack}">
            <div class="${cls.listRow}"><span class="portal-label">Full name</span><strong class="${cls.entryStrong}">${escapeHtml(displayName)}</strong></div>
            <div class="${cls.listRow}"><span class="portal-label">Email address</span><strong class="${cls.entryStrong}">${escapeHtml(email)}</strong></div>
            <div class="${cls.listRow}"><span class="portal-label">Account type</span><strong class="${cls.entryStrong}">${escapeHtml(profile.accountType || "Customer")}</strong></div>
            <div class="${cls.listRow}"><span class="portal-label">Member since</span><strong class="${cls.entryStrong}">${escapeHtml(fmt(profile.createdAt))}</strong></div>
          </div>
        </article>

        <article class="portal-card">
          <div class="${cls.cardHeading}">
            <div>
              <h2 class="${cls.cardTitle}">Current Plan / Membership</h2>
              <p class="${cls.cardDesc}">Membership and billing status for JA Experiences &amp; Discovery.</p>
            </div>
            <button class="portal-button-secondary" type="button" data-action="manage-stripe-billing">Manage</button>
          </div>
          <div class="${cls.stack}">
            <div class="${cls.listRow}"><span class="portal-label">Current plan</span><strong class="${cls.entryStrong}">${escapeHtml(currentPlan)}</strong></div>
            <div class="${cls.listRow}"><span class="portal-label">Membership status</span><strong class="${cls.entryStrong}">${escapeHtml(membershipStatus)}</strong></div>
            <div class="${cls.listRow}"><span class="portal-label">Billing status</span><strong class="${cls.entryStrong}">${profile.stripeLinked ? "Stripe linked" : "Not linked"}</strong></div>
          </div>
        </article>

        <article class="portal-card">
          <h2 class="${cls.cardTitle}">Builder Usage Tokens</h2>
          <div class="${cls.gridMini}">
            <div class="${cls.entry}"><span class="portal-label">Remaining tokens</span><strong class="${cls.entryStrong}">${escapeHtml(String(tokenSummary.remaining_tokens ?? 0))}</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Used tokens</span><strong class="${cls.entryStrong}">${escapeHtml(String(tokenSummary.used_tokens ?? 0))}</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Trial Builder Usage Tokens</span><strong class="${cls.entryStrong}">${escapeHtml(String(tokenSummary.trial_tokens ?? 0))}</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Purchased tokens</span><strong class="${cls.entryStrong}">${escapeHtml(String(tokenSummary.purchased_addon_tokens ?? 0))}</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Trial status</span><strong class="${cls.entryStrong}">${tokenSummary.trial_active ? "Active" : tokenSummary.trial ? "Used/expired" : "Not activated"}</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Saved outputs</span><strong class="${cls.entryStrong}">${escapeHtml(String(builderOutputs.length))}</strong></div>
          </div>
          <p class="${cls.noteInline}">${escapeHtml(tokenSummary.deduction_rule || "Builder Usage Tokens are deducted only when a finished builder output is saved successfully. Opening, selecting, typing and previewing do not deduct tokens.")}</p>
          <div class="${cls.formActions}">
            <a class="portal-button-secondary" href="/account/tokens/">View token ledger</a>
            <a class="portal-button-primary" href="/builders/">Open Experience Builders</a>
          </div>
        </article>

        <article class="portal-card">
          <div class="${cls.cardHeading}">
            <div>
              <h2 class="${cls.cardTitle}">Security and JA Group Services ID</h2>
              <p class="${cls.cardDesc}">Your sign-in is protected by Microsoft Entra External ID.</p>
            </div>
            <a class="portal-button-secondary" href="/account/security/">Security</a>
          </div>
          <div class="${cls.stack}">
            <div class="${cls.listRow}"><span class="portal-label">Connection</span><strong class="${cls.entryStrong}">${profile.microsoftEmail || profile.microsoftObjectId ? "Connected" : "Not confirmed"}</strong></div>
            <div class="${cls.listRow}"><span class="portal-label">Last sync</span><strong class="${cls.entryStrong}">${escapeHtml(fmt(profile.microsoftUpdatedAt || profile.updatedAt))}</strong></div>
            <div class="${cls.listRow}"><span class="portal-label">Verification status</span><strong class="${cls.entryStrong}">${escapeHtml(profile.verificationStatus || "Not provided")}</strong></div>
          </div>
        </article>

        <article class="portal-card">
          <div class="${cls.cardHeading}">
            <div>
              <h2 class="${cls.cardTitle}">Privacy and data</h2>
              <p class="${cls.cardDesc}">Manage privacy requests and consent preferences.</p>
            </div>
          </div>
          <div class="${cls.stack}">
            <div class="${cls.listRow}"><span class="portal-label">Data protection</span><a class="portal-button-secondary" href="/account/data-protection/">Open</a></div>
            <div class="${cls.listRow}"><span class="portal-label">Cookie Preferences</span><button class="portal-button-secondary" type="button" data-action="cookie-preferences">Manage</button></div>
            <div class="${cls.listRow}"><span class="portal-label">Support notes</span><strong class="${cls.entryStrong}">${escapeHtml(profile.supportNotes || "No support notes saved")}</strong></div>
          </div>
        </article>

        <article class="portal-card" id="editAccountDetails">
          <details>
            <summary class="portal-card-title"><strong>Edit account details</strong></summary>
            <div class="${cls.formGrid}">
              <label class="${cls.field}"><span class="portal-label">Display name</span><input class="portal-input" id="profileDisplayName" value="${escapeHtml(profile.displayName || "")}"></label>
              <label class="${cls.field}"><span class="portal-label">Given name</span><input class="portal-input" id="profileGivenName" value="${escapeHtml(profile.microsoftGivenName || "")}"></label>
              <label class="${cls.field}"><span class="portal-label">Surname</span><input class="portal-input" id="profileFamilyName" value="${escapeHtml(profile.microsoftFamilyName || "")}"></label>
              <label class="${cls.field}"><span class="portal-label">Phone</span><input class="portal-input" id="profilePhone" value="${escapeHtml(profile.phone || "")}"></label>
              <label class="${cls.field}"><span class="portal-label">Communication preference</span><select class="portal-input" id="profileComms"><option>Email</option><option>Phone</option><option>Email first, phone if urgent</option></select></label>
              <label class="${cls.field}"><span class="portal-label">Preferred language</span><input class="portal-input" id="profilePreferredLanguage" value="${escapeHtml(profile.microsoftPreferredLanguage || "")}"></label>
              <label class="${cls.field}"><span class="portal-label">Mobile phone</span><input class="portal-input" id="profileMobilePhone" value="${escapeHtml(profile.microsoftMobilePhone || "")}"></label>
              <label class="${cls.field}"><span class="portal-label">Office location</span><input class="portal-input" id="profileOfficeLocation" value="${escapeHtml(profile.microsoftOfficeLocation || "")}"></label>
              <label class="${cls.field}"><span class="portal-label">City</span><input class="portal-input" id="profileCity" value="${escapeHtml(profile.microsoftCity || "")}"></label>
              <label class="${cls.field}"><span class="portal-label">State</span><input class="portal-input" id="profileState" value="${escapeHtml(profile.microsoftState || "")}"></label>
              <label class="${cls.field}"><span class="portal-label">Country</span><input class="portal-input" id="profileCountry" value="${escapeHtml(profile.microsoftCountry || "")}"></label>
              <label class="${cls.field}"><span class="portal-label">Postal code</span><input class="portal-input" id="profilePostalCode" value="${escapeHtml(profile.microsoftPostalCode || "")}"></label>
              <label class="${cls.field}"><span class="portal-label">Street address</span><input class="portal-input" id="profileStreetAddress" value="${escapeHtml(profile.microsoftStreetAddress || "")}"></label>
              <label class="${cls.field}"><span class="portal-label">Support notes</span><textarea class="portal-input" id="profileSupportNotes" style="min-height:118px;resize:vertical">${escapeHtml(profile.supportNotes || "")}</textarea></label>
            </div>
          </details>
          <div class="${cls.formActions}">
            <button class="portal-button-primary" type="button" id="saveProfileBtn">Save changes</button>
          </div>
        </article>
      </section>`;
    document.getElementById("profileComms").value = profile.communicationPreference || "Email";
    document.getElementById("saveProfileBtn").addEventListener("click", async () => {
      const payload = {
        displayName: document.getElementById("profileDisplayName").value,
        givenName: document.getElementById("profileGivenName").value,
        familyName: document.getElementById("profileFamilyName").value,
        phone: document.getElementById("profilePhone").value,
        communicationPreference: document.getElementById("profileComms").value,
        preferredLanguage: document.getElementById("profilePreferredLanguage").value,
        mobilePhone: document.getElementById("profileMobilePhone").value,
        officeLocation: document.getElementById("profileOfficeLocation").value,
        city: document.getElementById("profileCity").value,
        state: document.getElementById("profileState").value,
        country: document.getElementById("profileCountry").value,
        postalCode: document.getElementById("profilePostalCode").value,
        streetAddress: document.getElementById("profileStreetAddress").value,
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

  if (page === "settings") {
    pageRoot.innerHTML = `
      <section class="${cls.grid12}">
        <article class="portal-card ${cls.span6}">
          <h2 class="${cls.cardTitle}">Display Name</h2>
          <div class="${cls.formGrid}">
            <label class="${cls.field}"><span class="portal-label">Display name</span><input class="portal-input" value="${escapeHtml(profile.displayName || "")}" placeholder="Your name"></label>
            <label class="${cls.field}"><span class="portal-label">Email Address</span><input class="portal-input" value="${escapeHtml(profile.email || profile.microsoftEmail || "")}" disabled></label>
          </div>
        </article>
        <article class="portal-card ${cls.span6}">
          <h2 class="${cls.cardTitle}">Personalisation</h2>
          <div class="${cls.stack}">
            <label class="${cls.toggle}"><span><strong class="portal-card-title">Compact dashboard widgets</strong><small class="${cls.helpText}">Show dense cards on the Overview page.</small></span><input type="checkbox" class="${cls.toggleInput}"></label>
            <label class="${cls.toggle}"><span><strong class="portal-card-title">Reduced motion</strong><small class="${cls.helpText}">Limit non-essential transitions.</small></span><input type="checkbox" class="${cls.toggleInput}"></label>
            <label class="${cls.toggle}"><span><strong class="portal-card-title">Accessibility-first layout</strong><small class="${cls.helpText}">Keep high contrast controls and clear labels.</small></span><input type="checkbox" checked class="${cls.toggleInput}"></label>
          </div>
        </article>
        <article class="portal-card ${cls.span6}">
          <h2 class="${cls.cardTitle}">Notification Preferences</h2>
          <div class="${cls.stack}">
            <label class="${cls.toggle}"><span><strong class="portal-card-title">Account alerts</strong><small class="${cls.helpText}">Security, profile and sign-in updates.</small></span><input type="checkbox" checked class="${cls.toggleInput}"></label>
            <label class="${cls.toggle}"><span><strong class="portal-card-title">Support updates</strong><small class="${cls.helpText}">Replies to tickets, enquiries and complaints.</small></span><input type="checkbox" checked class="${cls.toggleInput}"></label>
            <label class="${cls.toggle}"><span><strong class="portal-card-title">Membership updates</strong><small class="${cls.helpText}">Billing, plan and token notices.</small></span><input type="checkbox" checked class="${cls.toggleInput}"></label>
          </div>
        </article>
        <article class="portal-card ${cls.span6}">
          <h2 class="${cls.cardTitle}">Telephone Support PIN</h2>
          <div class="${cls.stack}">
            <div class="${cls.entry}"><span class="portal-label">Verification</span><strong class="${cls.entryStrong}">Managed in Security</strong></div>
            <a class="portal-button-secondary" href="/account/security/">Open Security Settings</a>
          </div>
        </article>
        <article class="portal-card ${cls.span12}">
          <h2 class="${cls.cardTitle}">Danger Zone</h2>
          <div class="${cls.alertWarning}">Closing an account requires support review so membership, billing, data protection and saved plans are handled correctly.</div>
          <div class="${cls.formActions}">
            <a class="portal-button-danger" style="background:linear-gradient(135deg,#dc2626,#ef4444);box-shadow:0 8px 24px rgba(220,38,38,.25),inset 0 1px 0 hsla(0,0%,100%,.15)" href="/account/support/">Close My Account</a>
          </div>
        </article>
      </section>`;
    return;
  }

  if (page === "security") {
    const pins = await loadPins(true).catch(() => ({ pins: [] }));
    const activePinRecord = (pins.pins || []).find((pin) => pin.active_pin) || (pins.pins || [])[0] || null;
    let activePinValue = activePinRecord?.active_pin || "";
    let activePinList = pins.pins || [];
    const securityQuestions = pins.security_questions || [];
    const activePinId = activePinList[0]?.id || activePinRecord?.id || "";
    pageRoot.innerHTML = `
      <section class="${cls.grid12}">
        <article class="portal-card ${cls.span6}">
          <h2 class="${cls.cardTitle}">Microsoft Entra connection</h2>
          <div class="${cls.stack}">
            <div class="${cls.entry}"><span class="portal-label">Connected</span><strong class="${cls.entryStrong}">${profile.microsoftEmail ? "Yes" : "Unknown"}</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Last sign-in</span><strong class="${cls.entryStrong}">${escapeHtml(fmt(profile.microsoftUpdatedAt || profile.updatedAt))}</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Account verification</span><strong class="${cls.entryStrong}">${escapeHtml(profile.verificationStatus || "Not provided")}</strong></div>
          </div>
        </article>
        <article class="portal-card ${cls.span6}">
          <h2 class="${cls.cardTitle}">One-time PINs</h2>
          <div class="${cls.alertInfo}">Support staff may request this PIN to verify identity before discussing the account. The backend stores only hashed PINs.</div>
          <div class="${cls.surface}">
            <div class="${cls.eyebrow}">One-time support PIN</div>
            <div class="portal-card-title">${activePinValue ? escapeHtml(activePinValue) : "No active support PIN available."}</div>
            <div class="${cls.stack}" id="pinHistory">
              ${activePinList.map((pin) => `<div class="${cls.entry}"><strong class="${cls.entryStrong}">${escapeHtml(pin.active_pin ? `PIN ending ${pin.active_pin.slice(-4)}` : pin.pin_last4 ? `PIN ending ${pin.pin_last4}` : `${pin.status || "Support"} PIN`)}</strong><small class="${cls.entrySmall}">Status: ${escapeHtml(pin.status || "Active")} · Created ${escapeHtml(fmt(pin.created_at))} · Expires ${escapeHtml(fmt(pin.expires_at))}</small></div>`).join("") || `<div class="${cls.noteInline}">Generate a support PIN when you need identity verification for a support conversation.</div>`}
            </div>
          </div>
          <div class="${cls.quickActions}">
            <button class="${cls.action}" type="button" data-pin-action="rotate"><strong class="${cls.actionStrong}">Rotate PIN</strong><span class="${cls.actionSpan}">Refresh the active PIN</span></button>
            <button class="${cls.action}" type="button" data-pin-action="revoke"><strong class="${cls.actionStrong}">Revoke PIN</strong><span class="${cls.actionSpan}">Disable this PIN</span></button>
            ${activePinValue ? '<button class="' + cls.action + '" type="button" data-pin-action="copy"><strong class="' + cls.actionStrong + '">Copy PIN</strong><span class="' + cls.actionSpan + '">Copy the active PIN to your clipboard</span></button>' : '<button class="' + cls.action + '" type="button" data-pin-action="generate"><strong class="' + cls.actionStrong + '">Generate PIN</strong><span class="' + cls.actionSpan + '">Create a new one-time support PIN</span></button>'}
          </div>
        </article>
        <article class="portal-card ${cls.span12}">
          <h2 class="${cls.cardTitle}">Security Questions</h2>
          <div class="${cls.alertInfo}">Configure recovery questions for support identity verification. Stored answers are hashed and are never displayed.</div>
          <form class="${cls.stack}" id="securityQuestionsForm">
            ${[0, 1, 2].map((index) => `
              <div class="${cls.entry}">
                <label class="${cls.field}">Question ${index + 1}<input class="portal-input" id="security_question_${index}" type="text" value="${escapeHtml(securityQuestions[index]?.question_label || "")}" autocomplete="off"></label>
                <label class="${cls.field}">Answer ${index + 1}<input class="portal-input" id="security_answer_${index}" type="password" autocomplete="off"></label>
              </div>
            `).join("")}
            <button class="portal-button-primary" type="submit">Save Security Questions</button>
          </form>
        </article>
        <article class="portal-card ${cls.span12}">
          <h2 class="${cls.cardTitle}">Security history</h2>
          ${timelineMarkup(timelineItems(profile, requests).slice(0, 6))}
        </article>
      </section>`;
    pageRoot.querySelectorAll("[data-pin-action]").forEach((button) => {
      button.addEventListener("click", async () => {
        const action = button.dataset.pinAction;
        const target = activePinId;
        if (action === "copy") {
          const currentPin = activePinValue;
          if (!currentPin) {
            alert("Generate or rotate the PIN first.");
            return;
          }
          await navigator.clipboard.writeText(currentPin).catch(() => {});
          alert("Support PIN copied.");
          return;
        }
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
        portalState.pins = null;
        await renderPage("security");
      });
    });
    document.getElementById("securityQuestionsForm")?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const questions = [0, 1, 2].map((index) => ({
        question: document.getElementById(`security_question_${index}`)?.value || "",
        answer: document.getElementById(`security_answer_${index}`)?.value || ""
      })).filter((item) => item.question.trim() && item.answer.trim());
      const response = await fetch("/account/pins", {
        method: "POST",
        credentials: "include",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save_questions", questions })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        alert(data.error || "Security questions could not be saved.");
        return;
      }
      portalState.pins = null;
      alert("Security questions saved.");
      await renderPage("security");
    });
    return;
  }

  if (page === "tokens") {
    const data = portalState.builders || await loadBuilders();
    const summary = data.token_summary || {};
    const ledger = Array.isArray(data.ledger) ? data.ledger : [];
    const attempts = Array.isArray(data.blocked_attempts) ? data.blocked_attempts : [];
    pageRoot.innerHTML = `
      <section class="${cls.grid12}">
        <article class="portal-card ${cls.span6}"><h2 class="${cls.cardTitle}">Token balance</h2><div class="${cls.stack}">
          <div class="${cls.entry}"><span class="portal-label">Plan</span><strong class="${cls.entryStrong}">${escapeHtml(summary.plan_name || "Not available")}</strong></div>
          <div class="${cls.entry}"><span class="portal-label">Monthly allowance</span><strong class="${cls.entryStrong}">${escapeHtml(String(summary.monthly_allowance ?? 0))}</strong></div>
          <div class="${cls.entry}"><span class="portal-label">Remaining tokens</span><strong class="${cls.entryStrong}">${escapeHtml(String(summary.remaining_tokens ?? 0))}</strong></div>
          <div class="${cls.entry}"><span class="portal-label">Used tokens</span><strong class="${cls.entryStrong}">${escapeHtml(String(summary.used_tokens ?? 0))}</strong></div>
          <div class="${cls.entry}"><span class="portal-label">Purchased add-on tokens</span><strong class="${cls.entryStrong}">${escapeHtml(String(summary.purchased_addon_tokens ?? 0))}</strong></div>
          <div class="${cls.entry}"><span class="portal-label">Trial expiry</span><strong class="${cls.entryStrong}">${escapeHtml(fmt(summary.trial?.expires_at))}</strong></div>
        </div></article>
        <article class="portal-card ${cls.span6}"><h2 class="${cls.cardTitle}">How tokens work</h2><p class="portal-card-description">${escapeHtml(summary.deduction_rule || "Builder Usage Tokens are deducted only on completed saved outputs.")}</p><a class="portal-button-primary" href="/builders/">Open Experience Builders</a></article>
      </section>
      <section class="portal-card"><h2 class="${cls.cardTitle}">Token ledger</h2>${portalTable(["Date", "Amount", "Source", "Reason", "Balance"], ledger.map((item) => [fmt(item.created_at), item.amount, item.source, item.reason, item.balance_after]))}</section>
      <section class="portal-card"><h2 class="${cls.cardTitle}">Blocked attempts</h2>${portalTable(["Date", "Builder", "Reason", "Available", "Required", "Action"], attempts.map((item) => [fmt(item.created_at), item.builder_name, item.reason, item.tokens_available, item.tokens_required, item.action_offered]))}</section>
    `;
    return;
  }

  if (page === "builders") {
    const data = portalState.builders || await loadBuilders();
    const outputs = Array.isArray(data.outputs) ? data.outputs : [];
    const drafts = Array.isArray(data.drafts) ? data.drafts : [];

    let draftsSection = "";
    if (drafts.length > 0) {
      draftsSection = `
        <section class="portal-card" style="margin-bottom: 2rem;">
          <h2 class="${cls.cardTitle}">Drafts in Progress</h2>
          <p class="${cls.cardDesc}">You have unfinished builder drafts. Click "Continue" to resume planning.</p>
          ${portalTable(["Last Saved", "Builder", "Progress", "Action"], drafts.map((item) => [
            fmt(item.last_saved_at),
            (item.builder_icon || "📋") + " " + item.builder_name,
            `Step ${item.current_step + 1}`,
            `<div class="flex gap-2">
               <a class="portal-button-primary" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;" href="/builders/?builder=${escapeHtml(item.builder_id)}">Continue</a>
               <button class="portal-button-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;" type="button" data-action="delete-builder-draft" data-id="${escapeHtml(item.id)}">Delete</button>
             </div>`
          ]))}
        </section>
      `;
    }

    pageRoot.innerHTML = `
      ${draftsSection}
      <section class="portal-card"><h2 class="${cls.cardTitle}">Saved builder outputs and plans</h2>
        ${outputs.length ? portalTable(["Created", "Builder", "Title", "Tokens used", "Status", "Action"], outputs.map((item) => [fmt(item.created_at), item.builder_name, item.title, item.token_cost, item.status, `<button class="portal-button-secondary" type="button" data-action="archive-builder-output" data-id="${escapeHtml(item.id)}">Archive</button>`])) : emptyPortalState("No builder outputs yet", "Open a builder and save a finished output to see it here.", "/builders/", "Open Experience Builders")}
      </section>
    `;
    return;
  }

  if (page === "membership") {
    const saved = portalState.saved || { items: [] };
    const billing = portalState.billing || {};
    const subscription = billing.subscription;
    const savedDestinations = (saved.items || []).filter((item) => item.item_type === "destination");
    const savedExperiences = (saved.items || []).filter((item) => item.item_type === "experience");
    pageRoot.innerHTML = `
      <section class="${cls.grid12}">
        <article class="portal-card ${cls.span12}">
          <div class="${cls.cardHeading}">
            <div><h2 class="${cls.cardTitle}">Manage Membership</h2><p class="${cls.cardDesc}">Payments, invoices, billing details and subscription controls are securely managed by Stripe.</p></div>
            <button class="portal-button-primary" type="button" data-action="manage-stripe-billing" ${billing.portalAvailable ? "" : "disabled"}>Manage Billing with Stripe</button>
          </div>
          ${billing.portalAvailable ? "" : `<div class="${cls.alertInfo}">No Stripe billing account is linked to this customer profile.</div>`}
        </article>
        <article class="portal-card ${cls.span12}">
          <h2 class="${cls.cardTitle}">JA Experiences membership plans</h2>
          <div class="${cls.gridMini}">
            <div class="${cls.entry}"><span class="portal-label">Trial</span><strong class="${cls.entryStrong}">14 days · 30 tokens once only</strong></div>
            <div class="${cls.entry}"><span class="portal-label">JA Experience Builder Membership</span><strong class="${cls.entryStrong}">£19.99/month · 150 tokens/month</strong></div>
            <div class="${cls.entry}"><span class="portal-label">JA Experience Builder Plus</span><strong class="${cls.entryStrong}">£29.99/month · 350 tokens/month</strong></div>
            <div class="${cls.entry}"><span class="portal-label">JA Experience Builder Family</span><strong class="${cls.entryStrong}">£39.99/month · 750 tokens/month</strong></div>
          </div>
        </article>
        <article class="portal-card ${cls.span6}">
          <h2 class="${cls.cardTitle}">Live membership</h2>
          <div class="${cls.stack}">
            <div class="${cls.entry}"><span class="portal-label">Current plan</span><strong class="${cls.entryStrong}">${escapeHtml(subscription?.plan || profile.currentPlan || "Standard")}</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Membership status</span><strong class="${cls.entryStrong}">${escapeHtml(subscription?.membershipStatus || profile.customerStatus || "Not active")}</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Billing status</span><strong class="${cls.entryStrong}">${escapeHtml(subscription?.billingStatus || "Not available")}</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Billing interval</span><strong class="${cls.entryStrong}">${escapeHtml(subscription?.billingInterval || "Not available")}</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Renewal date</span><strong class="${cls.entryStrong}">${escapeHtml(fmt(subscription?.renewalDate))}</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Next payment date</span><strong class="${cls.entryStrong}">${escapeHtml(fmt(subscription?.nextPaymentDate))}</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Subscription start</span><strong class="${cls.entryStrong}">${escapeHtml(fmt(subscription?.subscriptionStartDate))}</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Subscription reference</span><strong class="${cls.entryStrong}">${escapeHtml(subscription?.subscriptionReference || "Not available")}</strong></div>
          </div>
        </article>
        <article class="portal-card ${cls.span6}">
          <h2 class="${cls.cardTitle}">Billing details</h2>
          <div class="${cls.stack}">
            <div class="${cls.entry}"><span class="portal-label">Payment method</span><strong class="${cls.entryStrong}">${escapeHtml(subscription?.paymentMethod || "Not available")}</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Trial status</span><strong class="${cls.entryStrong}">${escapeHtml(subscription?.trialStatus || "No trial")}</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Trial end</span><strong class="${cls.entryStrong}">${escapeHtml(fmt(subscription?.trialEndDate))}</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Cancellation</span><strong class="${cls.entryStrong}">${escapeHtml(subscription?.cancellationStatus || "Not scheduled")}</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Scheduled cancellation</span><strong class="${cls.entryStrong}">${escapeHtml(fmt(subscription?.scheduledCancellationDate))}</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Saved destinations</span><strong class="${cls.entryStrong}">${savedDestinations.length}</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Saved experiences</span><strong class="${cls.entryStrong}">${savedExperiences.length}</strong></div>
          </div>
        </article>
        <article class="portal-card ${cls.span12}">
          <h2 class="${cls.cardTitle}">Billing responsibility</h2>
          <div class="${cls.alertInfo}">Stripe securely manages payment methods, invoices, billing details, subscription changes and cancellations. JA Experiences &amp; Discovery displays synchronised status only.</div>
        </article>
      </section>`;
    return;
  }

  if (page === "support") {
    const supportCases = requests.supportCases || [];
    pageRoot.innerHTML = `
      <section class="${cls.grid12}">
        <article class="portal-card ${cls.span6}">
          <h2 class="${cls.cardTitle}">Search knowledge base</h2>
          <div class="${cls.alertInfo}">Search support articles, travel help, payments, memberships, refunds, accessibility and account guidance.</div>
          <div class="${cls.quickActions}">
            <a class="${cls.action}" href="/enquiry/"><strong class="${cls.actionStrong}">Create request</strong><span class="${cls.actionSpan}">Open a new support case</span></a>
            <a class="${cls.action}" href="/account/data-protection/"><strong class="${cls.actionStrong}">GDPR request</strong><span class="${cls.actionSpan}">Use the privacy centre</span></a>
          </div>
        </article>
        <article class="portal-card ${cls.span6}">
          <h2 class="${cls.cardTitle}">Tickets</h2>
          <div class="${cls.stack}">
            ${supportCases.slice(0, 3).map((request) => `
              <div class="${cls.entry}"><strong class="${cls.entryStrong}">${escapeHtml(request.reference)}</strong><small class="${cls.entrySmall}">Status: ${escapeHtml(request.status || "New")} · Team: ${escapeHtml(request.assigned_department || "Support")} · Updated ${escapeHtml(fmt(request.updated_at || request.created_at))}</small></div>
            `).join("") || `<div class="${cls.noteInline}">No support tickets yet. Create a request and the team will respond here.</div>`}
          </div>
        </article>
        <article class="portal-card ${cls.span6}">
          <h2 class="${cls.cardTitle}">Categories</h2>
          <div class="${cls.stack}">
            <div class="${cls.entry}"><span class="portal-label">Membership</span><strong class="${cls.entryStrong}">Plan help and entitlement questions</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Billing</span><strong class="${cls.entryStrong}">Stripe payments, invoices and receipts</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Technical</span><strong class="${cls.entryStrong}">Website errors and account issues</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Data Protection</span><strong class="${cls.entryStrong}">Privacy and rights requests</strong></div>
          </div>
        </article>
        <article class="portal-card ${cls.span12}">
          <h2 class="${cls.cardTitle}">Conversation history</h2>
          <div class="${cls.stack}">${timelineMarkup((requests.timeline || []).slice(0, 6))}</div>
        </article>
      </section>`;
    return;
  }

  if (page === "messages") {
    const notifications = requests.notifications || [];
    pageRoot.innerHTML = `
      <section class="${cls.grid12}">
        <article class="portal-card ${cls.span6}">
          <h2 class="${cls.cardTitle}">Messages</h2>
          <div class="${cls.stack}">
            ${notifications.slice(0, 6).map((notification) => `
              <div class="${cls.entry}"><div><strong class="${cls.entryStrong}">${escapeHtml(notification.title || "Account message")}</strong><small class="${cls.entrySmall}">${escapeHtml(notification.category || "Message")} · ${escapeHtml(notification.status || "Unread")} · ${escapeHtml(fmt(notification.created_at || notification.updated_at))}</small></div></div>
            `).join("") || `<div class="${cls.noteInline}">No messages yet. Support replies and service notices will appear here.</div>`}
          </div>
        </article>
        <article class="portal-card ${cls.span6}">
          <h2 class="${cls.cardTitle}">Enquiries</h2>
          <div class="${cls.stack}">
            ${(requests.supportCases || []).slice(0, 4).map((request) => `
              <div class="${cls.entry}"><div><strong class="${cls.entryStrong}">${escapeHtml(request.reference || "Support enquiry")}</strong><small class="${cls.entrySmall}">${escapeHtml(request.status || "New")} · ${escapeHtml(request.assigned_department || "Support")}</small></div><a class="portal-button-secondary" href="/account/support/">Open Support</a></div>
            `).join("") || `<div class="${cls.noteInline}">No open enquiries yet.</div>`}
          </div>
        </article>
      </section>`;
    return;
  }

  if (page === "data") {
    pageRoot.innerHTML = `
      <section class="${cls.grid12}">
        <article class="portal-card ${cls.span6}">
          <h2 class="${cls.cardTitle}">Information</h2>
          <div class="${cls.alertInfo}">The Data Protection Act 2018 and UK GDPR give you rights over your personal information. JA Group Services Ltd and its trading names are registered with the ICO.</div>
        </article>
        <article class="portal-card ${cls.span6}">
          <h2 class="${cls.cardTitle}">Rights</h2>
          <div class="${cls.stack}">
            <div class="${cls.entry}"><span class="portal-label">Access</span><strong class="${cls.entryStrong}">Subject Access Request</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Rectification</span><strong class="${cls.entryStrong}">Request corrections to your details</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Erasure</span><strong class="${cls.entryStrong}">Request deletion where lawful</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Portability</span><strong class="${cls.entryStrong}">Request a portable copy of your data</strong></div>
          </div>
        </article>
        <article class="portal-card ${cls.span12}">
          <h2 class="${cls.cardTitle}">Request history</h2>
          <div class="${cls.stack}">
            ${(requests.dataProtectionRequests || []).map((request) => `
              <div class="${cls.entry}"><strong class="${cls.entryStrong}">${escapeHtml(request.reference)}</strong><small class="${cls.entrySmall}">${escapeHtml(request.request_type || "Request")} · ${escapeHtml(request.status || "New")} · Due ${escapeHtml(fmt(request.due_at || request.updated_at))}</small></div>
            `).join("") || `<div class="${cls.noteInline}">No privacy requests yet. Submit one through the support team when needed.</div>`}
          </div>
        </article>
      </section>`;
    return;
  }

  if (page === "notifications") {
    const notifications = requests.notifications || [];
    pageRoot.innerHTML = `
      <section class="${cls.grid12}">
        <article class="portal-card ${cls.span6}">
          <h2 class="${cls.cardTitle}">Notification summary</h2>
          <div class="${cls.stack}">
            <div class="${cls.entry}"><span class="portal-label">Unread</span><strong class="${cls.entryStrong}">${notifications.filter((n) => n.status !== "Read").length}</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Read</span><strong class="${cls.entryStrong}">${notifications.filter((n) => n.status === "Read").length}</strong></div>
            <div class="${cls.entry}"><span class="portal-label">Archived</span><strong class="${cls.entryStrong}">${notifications.filter((n) => n.status === "Archived").length}</strong></div>
          </div>
        </article>
        <article class="portal-card ${cls.span6}">
          <h2 class="${cls.cardTitle}">Notification inbox</h2>
          <div class="${cls.stack}">
            ${(notifications.slice(0, 5).map((notification) => `
              <div class="${cls.entry}"><strong class="${cls.entryStrong}">${escapeHtml(notification.title)}</strong><small class="${cls.entrySmall}">${escapeHtml(notification.category)} · ${escapeHtml(notification.priority || "Normal")} · ${escapeHtml(notification.status || "Unread")}</small></div>
            `).join("")) || `<div class="${cls.noteInline}">No notifications yet.</div>`}
          </div>
        </article>
      </section>`;
    return;
  }

  if (page === "saved") {
    const saved = portalState.saved || { items: [] };
    const builderData = portalState.builders || await loadBuilders();
    const outputs = Array.isArray(builderData.outputs) ? builderData.outputs : [];
    const savedDestinations = (saved.items || []).filter((item) => item.item_type === "destination");
    const savedExperiences = (saved.items || []).filter((item) => item.item_type === "experience");
    pageRoot.innerHTML = `
      <section class="${cls.grid12}">
        <article class="portal-card ${cls.span12}">
          <h2 class="${cls.cardTitle}">Saved Plans</h2>
          <div class="${cls.stack}">
            ${outputs.map((item) => `<div class="${cls.entry}"><div><strong class="${cls.entryStrong}">${escapeHtml(item.title || item.builder_name || "Saved plan")}</strong><small class="${cls.entrySmall}">${escapeHtml(item.builder_name || "Experience Builder")} · ${escapeHtml(fmt(item.created_at))}</small></div><a class="portal-button-secondary" href="/account/builders/">View</a></div>`).join("") || emptyPortalState("No saved plans yet", "When you save a finished builder output, it will appear here.", "/builders/", "Open Experience Builders")}
            <a class="portal-button-secondary" href="/account/tokens/">View Builder Usage Tokens</a>
          </div>
        </article>
        <article class="portal-card ${cls.span6}">
          <h2 class="${cls.cardTitle}">Saved experiences</h2>
          <div class="${cls.stack}">
            ${savedExperiences.map((item) => `<div class="${cls.entry}"><div><strong class="${cls.entryStrong}">${escapeHtml(item.item_title)}</strong><small class="${cls.entrySmall}">${escapeHtml(item.category || item.source_page || "Experience")}</small></div><button class="${cls.miniBtn}" type="button" data-saved-remove="experience" data-item-key="${escapeHtml(item.item_key)}">Remove</button></div>`).join("") || `<div class="${cls.noteInline}">No saved experiences yet. Add experiences to keep them in one place.</div>`}
          </div>
        </article>
        <article class="portal-card ${cls.span6}">
          <h2 class="${cls.cardTitle}">Saved destinations</h2>
          <div class="${cls.stack}">
            ${savedDestinations.map((item) => `<div class="${cls.entry}"><div><strong class="${cls.entryStrong}">${escapeHtml(item.item_title)}</strong><small class="${cls.entrySmall}">${escapeHtml(item.category || item.source_page || "Destination")}</small></div><button class="${cls.miniBtn}" type="button" data-saved-remove="destination" data-item-key="${escapeHtml(item.item_key)}">Remove</button></div>`).join("") || `<div class="${cls.noteInline}">No saved destinations yet.</div>`}
          </div>
        </article>
      </section>`;
    pageRoot.querySelectorAll("[data-saved-remove]").forEach((button) => {
      button.addEventListener("click", async () => {
        const response = await fetch("/account/api/saved", {
          method: "POST",
          credentials: "include",
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "remove",
            item_type: button.dataset.savedRemove,
            item_key: button.dataset.itemKey,
            item_title: button.closest(".flex")?.querySelector("strong")?.textContent || button.dataset.itemKey
          })
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          alert(data.error || "Unable to remove saved item.");
          return;
        }
        portalState.saved = data;
        await renderPage("saved");
      });
    });
    return;
  }

  if (page === "bookings") {
    pageRoot.innerHTML = `
      <section class="${cls.grid12}">
        <article class="portal-card ${cls.span6}">
          <h2 class="${cls.cardTitle}">My travel planner</h2>
          <div class="${cls.alertInfo}">Save trip ideas, favourite destinations, experiences and notes here while you plan your visit.</div>
        </article>
        <article class="portal-card ${cls.span6}">
          <h2 class="${cls.cardTitle}">Planning checklist</h2>
          <div class="${cls.alertInfo}">No trips are saved yet. Add destinations and experiences to create a personal shortlist.</div>
        </article>
        <article class="portal-card ${cls.span12}">
          <h2 class="${cls.cardTitle}">Recent activity</h2>
          ${timelineMarkup(timelineItems(profile, requests).slice(0, 4))}
        </article>
      </section>`;
    return;
  }

  if (page === "downloads") {
    const billing = portalState.billing || {};
    const invoices = Array.isArray(billing.invoices) ? billing.invoices : [];
    pageRoot.innerHTML = `
      <section class="${cls.grid12}">
        <article class="portal-card ${cls.span12}">
          <div class="${cls.cardHeading}">
            <div><h2 class="${cls.cardTitle}">Recent invoices</h2><p class="${cls.cardDesc}">Recent Stripe invoice references cached for your account.</p></div>
            <button class="portal-button-primary" type="button" data-action="manage-stripe-billing" ${billing.portalAvailable ? "" : "disabled"}>View All Invoices in Stripe</button>
          </div>
          <div class="${cls.stack}">
            ${invoices.slice(0, 5).map((invoice) => `
              <div class="${cls.entry}">
                <div><strong class="${cls.entryStrong}">${escapeHtml(invoice.reference)}</strong><small class="${cls.entrySmall}">${escapeHtml(fmt(invoice.date))} · ${escapeHtml(invoice.status)}</small></div>
                <strong class="${cls.entryStrong}">${escapeHtml(money(invoice.amountPaid ?? invoice.amountDue, invoice.currency))}</strong>
              </div>
            `).join("") || `<div class="${cls.noteInline}">No cached Stripe invoices are available.</div>`}
          </div>
        </article>
        <article class="portal-card ${cls.span12}">
          <h2 class="${cls.cardTitle}">Other documents</h2>
          <div class="${cls.alertInfo}">Customer data exports and support documents remain available through their relevant portal sections. Stripe remains the source of truth for invoices and receipts.</div>
        </article>
      </section>`;
    return;
  }

  pageRoot.innerHTML = `<div class="${cls.noteInline}">This section is not available right now.</div>`;
}
