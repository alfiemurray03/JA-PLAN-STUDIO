document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("enquiryList");
  const status = document.getElementById("enquiryStatus");
  const panel = document.getElementById("threadPanel");
  const summary = document.getElementById("threadSummary");
  const messages = document.getElementById("threadMessages");
  const form = document.getElementById("replyForm");
  const reply = document.getElementById("customerReply");
  const replyStatus = document.getElementById("replyStatus");
  let currentReference = "";

  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
  const formatDate = (value) => value ? new Date(value).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }) : "Not available";
  const setStatus = (element, message, type = "") => { element.className = `notice ${type}`.trim(); element.textContent = message; };

  async function request(url = "/account/enquiries-api", options = {}) {
    const response = await fetch(url, { cache: "no-store", headers: { Accept: "application/json", "Content-Type": "application/json" }, ...options });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.ok) throw new Error(data.message || "The request could not be completed.");
    return data;
  }

  async function loadList() {
    try {
      const data = await request();
      setStatus(status, data.enquiries.length ? "Select an enquiry to view the conversation." : "You do not have any enquiries yet.");
      list.innerHTML = data.enquiries.map((item) => `<button class="enquiry-card" type="button" data-reference="${escapeHtml(item.reference)}"><strong>${escapeHtml(item.subject || item.reference)}</strong><span>${escapeHtml(item.reference)} · ${escapeHtml(item.category || "General Enquiry")}</span><span>Updated ${escapeHtml(formatDate(item.updated_at))}</span><span class="badge">${escapeHtml(item.status || "New")}</span></button>`).join("");
      list.querySelectorAll("[data-reference]").forEach((button) => button.addEventListener("click", () => loadThread(button.dataset.reference)));
    } catch (error) {
      setStatus(status, error.message, "error");
    }
  }

  async function loadThread(reference) {
    try {
      setStatus(status, "Loading conversation…");
      const data = await request(`/account/enquiries-api?reference=${encodeURIComponent(reference)}`);
      renderThread(data.thread);
      setStatus(status, "Conversation loaded.");
    } catch (error) {
      setStatus(status, error.message, "error");
    }
  }

  function renderThread(thread) {
    currentReference = thread.enquiry.reference;
    panel.hidden = false;
    summary.className = "thread-summary";
    summary.innerHTML = `<div><span>Reference</span><strong>${escapeHtml(thread.enquiry.reference)}</strong></div><div><span>Status</span><strong>${escapeHtml(thread.enquiry.status)}</strong></div><div><span>Subject</span><strong>${escapeHtml(thread.enquiry.subject)}</strong></div><div><span>Category</span><strong>${escapeHtml(thread.enquiry.category)}</strong></div>`;
    messages.innerHTML = thread.messages.map((item) => `<article class="message ${item.author_type === "administrator" ? "admin" : "customer"}"><header><strong>${item.author_type === "administrator" ? "JA Experiences & Discovery" : "You"}</strong><span>${escapeHtml(formatDate(item.created_at))}</span></header><p>${escapeHtml(item.message)}</p></article>`).join("");
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!currentReference || !form.reportValidity()) return;
    const button = form.querySelector("button");
    button.disabled = true;
    setStatus(replyStatus, "Sending reply…");
    try {
      const data = await request("/account/enquiries-api", { method: "POST", body: JSON.stringify({ reference: currentReference, message: reply.value }) });
      reply.value = "";
      renderThread(data.thread);
      setStatus(replyStatus, "Your reply has been saved and sent to the support team.", "success");
      await loadList();
    } catch (error) {
      setStatus(replyStatus, error.message, "error");
    } finally {
      button.disabled = false;
    }
  });

  loadList();
});
