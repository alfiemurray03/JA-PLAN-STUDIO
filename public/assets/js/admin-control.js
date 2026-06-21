document.addEventListener("DOMContentLoaded", async () => {
  const panel = document.getElementById("adminPanel");

  try {
    const response = await fetch("/admin/api?section=overview", {
      credentials: "include",
      cache: "no-store",
      headers: { "Accept": "application/json" }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Admin API error.");
    }

    document.getElementById("adminName").textContent = data.admin.name || "JA admin";
    document.getElementById("adminEmail").textContent = data.admin.email || "";
    document.getElementById("adminStatus").textContent = "Admin access verified";

    panel.innerHTML = `
      <div class="admin-grid">
        <article class="admin-stat"><span>Customers</span><strong>${data.overview.customers}</strong></article>
        <article class="admin-stat"><span>Plans</span><strong>${data.overview.plans}</strong></article>
        <article class="admin-stat"><span>Active plans</span><strong>${data.overview.activePlans}</strong></article>
        <article class="admin-stat"><span>Policies</span><strong>${data.overview.policies}</strong></article>
        <article class="admin-stat"><span>Support tickets</span><strong>${data.overview.supportTickets}</strong></article>
        <article class="admin-stat"><span>Open issues</span><strong>${data.overview.openIssues}</strong></article>
      </div>
      <div class="admin-card">
        <h2>Admin Control Centre API connected.</h2>
        <p>The database-backed admin API is now live. Next we will add the full tabbed controls for CRM, Plans, Stripe, Branding, Policies, Support and System Issues.</p>
      </div>
    `;
  } catch (error) {
    panel.innerHTML = `<div class="admin-alert">${error.message}</div>`;
  }
});
