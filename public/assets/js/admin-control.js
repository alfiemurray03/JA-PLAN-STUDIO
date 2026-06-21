const state = {
  currentSection: "overview",
  data: {}
};

document.addEventListener("DOMContentLoaded", () => {
  bindNav();
  loadSection("overview");
});

function bindNav() {
  document.querySelectorAll("[data-section]").forEach((button) => {
    button.addEventListener("click", () => {
      loadSection(button.dataset.section);
    });
  });
}

async function api(section, options = {}) {
  const response = await fetch(`/admin/api?section=${encodeURIComponent(section)}`, {
    credentials: "include",
    cache: "no-store",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    ...options
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Admin API problem.");
  }

  return data;
}

async function loadSection(section) {
  state.currentSection = section;

  document.querySelectorAll("[data-section]").forEach((button) => {
    button.classList.toggle("active", button.dataset.section === section);
  });

  const panel = document.getElementById("adminPanel");
  panel.innerHTML = `<div class="admin-loading">Loading ${escapeHtml(section)}...</div>`;

  try {
    const data = await api(section);
    state.data[section] = data;

    if (data.admin) {
      setText("adminName", data.admin.name || "JA admin");
      setText("adminEmail", data.admin.email || "");
      setText("adminStatus", "Admin access verified");
    }

    renderSection(section, data);
  } catch (error) {
    panel.innerHTML = `<div class="admin-alert">${escapeHtml(error.message)}</div>`;
  }
}

function renderSection(section, data) {
  if (section === "overview") renderOverview(data.overview);
  if (section === "customers") renderCustomers(data.customers);
  if (section === "plans") renderPlans(data.plans);
  if (section === "stripe") renderStripe(data.stripe);
  if (section === "branding") renderBranding(data.branding);
  if (section === "policies") renderPolicies(data.policies);
  if (section === "support") renderSupport(data.support);
  if (section === "maintenance") renderMaintenance(data.maintenance);
  if (section === "system") renderSystem(data.system);
}

function renderOverview(overview) {
  document.getElementById("adminPanel").innerHTML = `
    <div class="admin-grid">
      ${stat("Customers", overview.customers)}
      ${stat("Plans", overview.plans)}
      ${stat("Active plans", overview.activePlans)}
      ${stat("Policies", overview.policies)}
      ${stat("Support tickets", overview.supportTickets)}
      ${stat("Open issues", overview.openIssues)}
    </div>

    <div class="admin-card">
      <h2>Admin Control Centre</h2>
      <p>This is the central control point for JA Experiences & Discovery. Use the sidebar to manage CRM records, service plans, Stripe checks, company branding, policies, support and system issues.</p>
    </div>
  `;
}

function renderCustomers(customers) {
  const rows = customers.map((c) => `
    <tr>
      <td>
        <strong>${escapeHtml(c.display_name || c.verified_name || c.email)}</strong>
        <span>${escapeHtml(c.email || "")}</span>
      </td>
      <td>${escapeHtml(c.contact_email || c.email || "")}</td>
      <td>${escapeHtml(c.phone || "Not added")}</td>
      <td>${escapeHtml(c.communication_preference || "Email")}</td>
      <td>${escapeHtml(formatDate(c.updated_at || c.created_at))}</td>
    </tr>
  `).join("");

  document.getElementById("adminPanel").innerHTML = `
    <div class="admin-card">
      <h2>CRM / Customers</h2>
      <p>Customer profile records saved through JA Secure Access and the account profile database.</p>
      ${table(["Customer", "Contact email", "Phone", "Preference", "Updated"], rows)}
    </div>
  `;
}

function renderPlans(plans) {
  const options = plans.map((p) => `<option value="${escapeHtml(p.id)}">${escapeHtml(p.plan_name)}</option>`).join("");

  document.getElementById("adminPanel").innerHTML = `
    <div class="admin-card">
      <h2>Plans & Prices</h2>
      <p>Edit plan details, public price labels, active status, featured status and linked Stripe Price IDs.</p>

      <label class="admin-label">Select plan
        <select id="planSelect">${options}</select>
      </label>

      <form class="admin-form" id="planForm">
        <input type="hidden" id="plan_id">

        ${input("Plan name", "plan_name")}
        ${input("Plan type", "plan_type")}
        ${input("Price label", "price_label")}
        ${input("Price pence", "price_pence", "number")}
        ${input("Stripe Price ID", "stripe_price_id")}
        ${input("Delivery time", "delivery_time")}
        ${input("Revisions", "revisions")}
        ${textarea("Description", "description")}
        ${input("Button label", "button_label")}
        ${input("Sort order", "sort_order", "number")}

        <label class="check"><input id="is_active" type="checkbox"> Active / visible</label>
        <label class="check"><input id="is_featured" type="checkbox"> Featured</label>

        <button class="admin-button orange" type="submit">Save plan</button>
      </form>

      <div id="planSaved" class="admin-success" hidden></div>
    </div>
  `;

  const select = document.getElementById("planSelect");
  select.addEventListener("change", () => fillPlan(plans.find((p) => p.id === select.value)));

  document.getElementById("planForm").addEventListener("submit", savePlan);
  fillPlan(plans[0]);
}

function fillPlan(plan) {
  if (!plan) return;

  setValue("plan_id", plan.id);
  setValue("plan_name", plan.plan_name);
  setValue("plan_type", plan.plan_type);
  setValue("price_label", plan.price_label);
  setValue("price_pence", plan.price_pence);
  setValue("stripe_price_id", plan.stripe_price_id);
  setValue("delivery_time", plan.delivery_time);
  setValue("revisions", plan.revisions);
  setValue("description", plan.description);
  setValue("button_label", plan.button_label);
  setValue("sort_order", plan.sort_order);

  document.getElementById("is_active").checked = Number(plan.is_active) === 1;
  document.getElementById("is_featured").checked = Number(plan.is_featured) === 1;
}

async function savePlan(event) {
  event.preventDefault();

  const body = {
    id: getValue("plan_id"),
    plan_name: getValue("plan_name"),
    plan_type: getValue("plan_type"),
    price_label: getValue("price_label"),
    price_pence: Number(getValue("price_pence") || 0),
    stripe_price_id: getValue("stripe_price_id"),
    delivery_time: getValue("delivery_time"),
    revisions: getValue("revisions"),
    description: getValue("description"),
    button_label: getValue("button_label"),
    sort_order: Number(getValue("sort_order") || 100),
    is_active: document.getElementById("is_active").checked,
    is_featured: document.getElementById("is_featured").checked
  };

  const data = await api("plans", {
    method: "POST",
    body: JSON.stringify(body)
  });

  document.getElementById("planSaved").hidden = false;
  document.getElementById("planSaved").textContent = "Plan saved.";
  renderPlans(data.plans);
}

function renderStripe(stripe) {
  if (!stripe || !stripe.configured) {
    document.getElementById("adminPanel").innerHTML = `
      <div class="admin-alert">${escapeHtml(stripe?.message || "Stripe is not configured.")}</div>
    `;
    return;
  }

  const prices = (stripe.prices || []).map((price) => `
    <tr>
      <td>
        <strong>${escapeHtml(price.product?.name || price.product || "Product")}</strong>
        <span>${escapeHtml(price.id)}</span>
      </td>
      <td>${escapeHtml((price.currency || "").toUpperCase())}</td>
      <td>${escapeHtml(formatMoney(price.unit_amount, price.currency))}</td>
      <td>${price.active ? "Active" : "Inactive"}</td>
      <td>${escapeHtml(price.type || "")}</td>
    </tr>
  `).join("");

  document.getElementById("adminPanel").innerHTML = `
    <div class="admin-card">
      <h2>Stripe API Controls</h2>
      <p>Read-only Stripe checks for now. Refunds, price creation and destructive actions should be added later with confirmation.</p>

      <div class="admin-grid">
        ${stat("Stripe account", stripe.account?.id || "Connected")}
        ${stat("Charges", stripe.account?.charges_enabled ? "Enabled" : "Check")}
        ${stat("Payouts", stripe.account?.payouts_enabled ? "Enabled" : "Check")}
      </div>

      ${table(["Product", "Currency", "Amount", "Status", "Type"], prices)}
    </div>
  `;
}

function renderBranding(branding) {
  document.getElementById("adminPanel").innerHTML = `
    <div class="admin-card">
      <h2>Company Branding Info</h2>
      <p>Manage core business/service details stored in D1.</p>

      <form class="admin-form" id="brandingForm">
        ${input("Business name", "business_name")}
        ${input("Trading name", "trading_name")}
        ${input("Service name", "service_name")}
        ${input("Support email", "support_email", "email")}
        ${input("Phone", "phone")}
        ${input("Website", "website")}
        ${textarea("Footer notice", "footer_notice")}

        <button class="admin-button orange" type="submit">Save branding</button>
      </form>

      <div id="brandingSaved" class="admin-success" hidden></div>
    </div>
  `;

  ["business_name", "trading_name", "service_name", "support_email", "phone", "website", "footer_notice"].forEach((key) => {
    setValue(key, branding?.[key] || "");
  });

  document.getElementById("brandingForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const body = {};
    ["business_name", "trading_name", "service_name", "support_email", "phone", "website", "footer_notice"].forEach((key) => {
      body[key] = getValue(key);
    });

    await api("branding", {
      method: "POST",
      body: JSON.stringify(body)
    });

    document.getElementById("brandingSaved").hidden = false;
    document.getElementById("brandingSaved").textContent = "Branding saved.";
  });
}

function renderPolicies(policies) {
  const options = policies.map((p) => `<option value="${escapeHtml(p.slug)}">${escapeHtml(p.title)}</option>`).join("");

  document.getElementById("adminPanel").innerHTML = `
    <div class="admin-card">
      <h2>Publishable Policies</h2>
      <p>Edit policy content as HTML or plain text. The next wiring step is rendering these onto public policy pages.</p>

      <label class="admin-label">Select policy
        <select id="policySelect">${options}</select>
      </label>

      <form class="admin-form" id="policyForm">
        <input type="hidden" id="policy_slug">

        ${input("Title", "policy_title")}

        <label class="admin-label">Content type
          <select id="policy_content_type">
            <option value="html">HTML</option>
            <option value="text">Plain text</option>
          </select>
        </label>

        ${textarea("Content", "policy_content")}

        <label class="check"><input id="policy_is_published" type="checkbox"> Published</label>

        <button class="admin-button orange" type="submit">Save policy</button>
      </form>

      <div id="policySaved" class="admin-success" hidden></div>
    </div>
  `;

  const select = document.getElementById("policySelect");
  select.addEventListener("change", () => fillPolicy(policies.find((p) => p.slug === select.value)));

  document.getElementById("policyForm").addEventListener("submit", savePolicy);
  fillPolicy(policies[0]);
}

function fillPolicy(policy) {
  if (!policy) return;

  setValue("policy_slug", policy.slug);
  setValue("policy_title", policy.title);
  setValue("policy_content_type", policy.content_type || "html");
  setValue("policy_content", policy.content);

  document.getElementById("policy_is_published").checked = Number(policy.is_published) === 1;
}

async function savePolicy(event) {
  event.preventDefault();

  const body = {
    slug: getValue("policy_slug"),
    title: getValue("policy_title"),
    content_type: getValue("policy_content_type"),
    content: getValue("policy_content"),
    is_published: document.getElementById("policy_is_published").checked
  };

  const data = await api("policies", {
    method: "POST",
    body: JSON.stringify(body)
  });

  document.getElementById("policySaved").hidden = false;
  document.getElementById("policySaved").textContent = "Policy saved.";
  renderPolicies(data.policies);
}

function renderSupport(items) {
  const rows = items.map((t) => `
    <tr>
      <td>
        <strong>${escapeHtml(t.subject)}</strong>
        <span>${escapeHtml(t.customer_email)}</span>
      </td>
      <td>${escapeHtml(t.status)}</td>
      <td>${escapeHtml(t.priority)}</td>
      <td>${escapeHtml(formatDate(t.updated_at || t.created_at))}</td>
    </tr>
  `).join("");

  document.getElementById("adminPanel").innerHTML = `
    <div class="admin-card">
      <h2>Support</h2>
      <p>Create and track basic support records. Customer messaging can be added later.</p>

      <form class="admin-form" id="supportForm">
        ${input("Customer email", "support_customer_email", "email")}
        ${input("Subject", "support_subject")}
        ${input("Status", "support_status")}
        ${input("Priority", "support_priority")}
        ${textarea("Notes", "support_notes")}

        <button class="admin-button orange" type="submit">Save support ticket</button>
      </form>

      ${table(["Ticket", "Status", "Priority", "Updated"], rows)}
    </div>
  `;

  document.getElementById("support_status").value = "Open";
  document.getElementById("support_priority").value = "Normal";

  document.getElementById("supportForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    await api("support", {
      method: "POST",
      body: JSON.stringify({
        customer_email: getValue("support_customer_email"),
        subject: getValue("support_subject"),
        status: getValue("support_status"),
        priority: getValue("support_priority"),
        notes: getValue("support_notes")
      })
    });

    loadSection("support");
  });
}

function renderSystem(items) {
  const rows = items.map((e) => `
    <tr>
      <td>
        <strong>${escapeHtml(e.title)}</strong>
        <span>${escapeHtml(e.message)}</span>
      </td>
      <td>${escapeHtml(e.type)}</td>
      <td>${escapeHtml(e.severity)}</td>
      <td>${escapeHtml(e.status)}</td>
      <td>${escapeHtml(formatDate(e.updated_at || e.created_at))}</td>
    </tr>
  `).join("");

  document.getElementById("adminPanel").innerHTML = `
    <div class="admin-card">
      <h2>System / System Issues</h2>
      <p>Track site issues, deployment notes, bugs, admin notes and operational events.</p>

      <form class="admin-form" id="systemForm">
        ${input("Title", "system_title")}
        ${input("Type", "system_type")}
        ${input("Severity", "system_severity")}
        ${input("Status", "system_status")}
        ${textarea("Message", "system_message")}

        <button class="admin-button orange" type="submit">Save system event</button>
      </form>

      ${table(["Issue", "Type", "Severity", "Status", "Updated"], rows)}
    </div>
  `;

  document.getElementById("system_type").value = "General";
  document.getElementById("system_severity").value = "Info";
  document.getElementById("system_status").value = "Open";

  document.getElementById("systemForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    await api("system", {
      method: "POST",
      body: JSON.stringify({
        title: getValue("system_title"),
        type: getValue("system_type"),
        severity: getValue("system_severity"),
        status: getValue("system_status"),
        message: getValue("system_message")
      })
    });

    loadSection("system");
  });
}


function renderMaintenance(settings) {
  const enabled = settings && settings.maintenance_enabled === "true";

  document.getElementById("adminPanel").innerHTML = `
    <div class="admin-card">
      <h2>Maintenance Mode</h2>
      <p>Bring the public website down for maintenance while keeping the admin portal available.</p>

      <form class="admin-form" id="maintenanceForm">
        <label class="check">
          <input id="maintenance_enabled" type="checkbox">
          Maintenance mode enabled
        </label>

        ${input("Public maintenance title", "maintenance_title")}
        ${textarea("Public maintenance message", "maintenance_message")}
        ${input("Estimated return time", "maintenance_eta")}

        <button class="admin-button orange" type="submit">Save maintenance settings</button>
      </form>

      <div id="maintenanceSaved" class="admin-success" hidden></div>

      <div class="admin-alert" style="margin-top: 1rem;">
        When enabled, public visitors will see the maintenance page. The admin portal, Cloudflare Access and assets remain available.
      </div>
    </div>
  `;

  document.getElementById("maintenance_enabled").checked = enabled;
  setValue("maintenance_title", settings?.maintenance_title || "We’ll be back shortly.");
  setValue("maintenance_message", settings?.maintenance_message || "JA Experiences & Discovery is temporarily unavailable while essential maintenance is carried out.");
  setValue("maintenance_eta", settings?.maintenance_eta || "");

  document.getElementById("maintenanceForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = await api("maintenance", {
      method: "POST",
      body: JSON.stringify({
        maintenance_enabled: document.getElementById("maintenance_enabled").checked,
        maintenance_title: getValue("maintenance_title"),
        maintenance_message: getValue("maintenance_message"),
        maintenance_eta: getValue("maintenance_eta")
      })
    });

    document.getElementById("maintenanceSaved").hidden = false;
    document.getElementById("maintenanceSaved").textContent = data.maintenance.maintenance_enabled === "true"
      ? "Maintenance mode is ON. The public website is now showing the maintenance page."
      : "Maintenance mode is OFF. The public website is live again.";

    renderMaintenance(data.maintenance);
  });
}
function stat(label, value) {
  return `<article class="admin-stat"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></article>`;
}

function input(label, id, type = "text") {
  return `<label class="admin-label">${escapeHtml(label)}<input id="${escapeHtml(id)}" type="${escapeHtml(type)}"></label>`;
}

function textarea(label, id) {
  return `<label class="admin-label">${escapeHtml(label)}<textarea id="${escapeHtml(id)}"></textarea></label>`;
}

function table(headers, rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>${headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("")}</tr>
        </thead>
        <tbody>${rows || `<tr><td colspan="${headers.length}">No records yet.</td></tr>`}</tbody>
      </table>
    </div>
  `;
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value || "";
}

function setValue(id, value) {
  const el = document.getElementById(id);
  if (el) el.value = value ?? "";
}

function getValue(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

function formatMoney(amount, currency) {
  if (amount === null || amount === undefined) return "";

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: (currency || "gbp").toUpperCase()
  }).format(Number(amount) / 100);
}

