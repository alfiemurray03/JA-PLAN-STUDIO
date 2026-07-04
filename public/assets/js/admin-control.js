const state = {
  currentSection: "overview",
  data: {},
  selectedPolicy: null,
  favourites: [],
  branding: {},
  adminRole: "Administrator",
  allowedSections: ["overview"],
  adminRecentSections: [],
  dashboardPreferences: {},
  notificationPreferences: {},
  preferredLandingPage: "overview",
  themePreference: "system",
  planDraft: null,
  planDirty: false,
  planSaving: false,
  initialWorkspaceApplied: false
};

const sectionTitles = {
  overview: "Overview",
  health: "Production Health",
  operations: "Operations",
  admins: "Admin Users",
  roles: "Roles",
  customers: "CRM",
  customer: "Customer Profile",
  plans: "Plans & Prices",
  stripe: "Stripe",
  branding: "Branding",
  policies: "Policies",
  support: "Support",
  enquiries: "Contact Enquiries",
  notifications: "Notifications",
  membership: "Membership",
  security: "Security",
  cms: "Website CMS",
  system: "System",
  datarequests: "Data Protection Requests",
  systemreports: "System Reports",
  closures: "Closure Requests",
  reports: "Reports",
  analytics: "Analytics",
  status: "Status Centre",
  affiliate: "Affiliate Content",
  appearance: "Appearance",
  email: "Email",
  audit: "Audit Log",
  launchgateway: "Launch Gateway",
  maintenance: "Maintenance Mode",
  sessions: "Sessions"
};

// ... [ALL EXISTING CODE REMAINS UNCHANGED - omitted for brevity] ...

function openPlanModal(id = "") {
  const plan = (state.data.plans?.plans || []).find((item) => item.id === id) || {};
  openModal(`
    <div class="modal-head">
      <div><h2>${id ? "Edit plan" : "New plan"}</h2><p>Changes are published to the website after saving.</p></div>
      <button class="drawer-close" type="button" data-action="close-modal">×</button>
    </div>
    <form class="admin-form" id="planForm">
      ${input("Plan ID", "plan_id")}
      ${input("Plan name", "plan_name")}
      ${input("Plan type", "plan_type")}
      ${input("Price label", "price_label")}
      ${input("Price pence", "price_pence", "number")}
      ${input("Delivery time", "delivery_time")}
      ${input("Revisions", "revisions")}
      ${input("Stripe product ID", "stripe_product_id")}
      ${input("Stripe price ID", "stripe_price_id")}
      ${input("Button label", "button_label")}
      ${input("Sort order", "sort_order", "number")}
      ${textarea("Description", "description")}
      <label class="check"><input id="is_active" type="checkbox"> Active</label>
      <label class="check"><input id="is_featured" type="checkbox"> Featured</label>
      <button class="admin-button" type="submit">Save plan</button>
    </form>
  `);

  const derivedId = plan.id || `plan_${Date.now()}`;
  setValue("plan_id", derivedId);
  document.getElementById("plan_id").disabled = Boolean(id);
  ["plan_name", "plan_type", "price_label", "price_pence", "delivery_time", "revisions", "stripe_product_id", "stripe_price_id", "button_label", "sort_order", "description"].forEach((key) => {
    setValue(key, plan[key] || "");
  });
  document.getElementById("is_active").checked = Number(plan.is_active ?? 1) === 1;
  document.getElementById("is_featured").checked = Number(plan.is_featured || 0) === 1;

  document.getElementById("planForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    await savePlan({
      id: getValue("plan_id") || derivedId,
      plan_name: getValue("plan_name"),
      plan_type: getValue("plan_type"),
      price_label: getValue("price_label"),
      price_pence: Number(getValue("price_pence") || 0),
      delivery_time: getValue("delivery_time"),
      revisions: getValue("revisions"),
      stripe_product_id: getValue("stripe_product_id"),
      stripe_price_id: getValue("stripe_price_id"),
      button_label: getValue("button_label"),
      sort_order: Number(getValue("sort_order") || 100),
      description: getValue("description"),
      is_active: document.getElementById("is_active").checked,
      is_featured: document.getElementById("is_featured").checked
    });
    closeModal();
  });
}

// ... [REMAINDER OF EXISTING CODE UNCHANGED] ...