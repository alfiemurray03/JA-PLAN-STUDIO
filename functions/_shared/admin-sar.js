export function cleanSarValue(value, max = 4000) {
  return String(value ?? "").replace(/\u0000/g, "").trim().slice(0, max);
}

export function sarPublicStatus(value) {
  const status = String(value || "new").trim().toLowerCase();
  if (["completed", "closed", "sent"].includes(status)) return "completed";
  if (["rejected", "refused / not applicable"].includes(status)) return "rejected";
  if (["unable to complete", "unable_to_complete"].includes(status)) return "unable_to_complete";
  if (["ready", "ready to send"].includes(status)) return "ready";
  if (["processing", "in progress"].includes(status)) return "processing";
  if (["in review", "under review"].includes(status)) return "in_review";
  return "submitted";
}

export function sarDatabaseStatus(value) {
  return {
    submitted: "New",
    in_review: "In Review",
    processing: "In Progress",
    ready: "Ready to Send",
    completed: "Completed",
    rejected: "Rejected",
    unable_to_complete: "Refused / Not Applicable"
  }[String(value || "")] || "New";
}

function sarType(value) {
  const text = String(value || "").toLowerCase();
  if (text.includes("delete") || text.includes("erasure")) return "deletion";
  if (text.includes("correct") || text.includes("rectification")) return "rectification";
  if (text.includes("restrict")) return "restriction";
  if (text.includes("portability")) return "portability";
  if (text.includes("object")) return "objection";
  if (text.includes("export")) return "export";
  return "sar";
}

export function sarDto(row) {
  const deadlineAt = row.due_at || new Date(new Date(row.created_at || Date.now()).getTime() + 30 * 86400000).toISOString();
  const daysRemaining = Math.ceil((new Date(deadlineAt).getTime() - Date.now()) / 86400000);
  const status = sarPublicStatus(row.status);
  const terminal = ["completed", "rejected", "unable_to_complete"].includes(status);
  let audit = [];
  try { audit = JSON.parse(row.audit_log || "[]"); } catch { audit = []; }
  const identityEvent = Array.isArray(audit) ? [...audit].reverse().find((event) => /identity verified/i.test(String(event?.type || ""))) : null;
  return {
    id: row.id,
    uuid: row.reference || row.id,
    userId: row.user_id || row.customer_email,
    email: row.customer_email || "",
    fullName: row.customer_name || row.customer_email || "Customer",
    requestType: sarType(row.request_type),
    notes: row.customer_message || null,
    status,
    deadlineAt,
    deadlineExtendedAt: null,
    deadlineExtendReason: null,
    identityVerified: Boolean(identityEvent),
    identityVerifiedBy: identityEvent?.actor || null,
    identityVerifiedAt: identityEvent?.timestamp || null,
    identityNotes: null,
    assignedTo: row.assigned_admin_id || null,
    adminNotes: row.internal_notes || null,
    rejectionReason: ["rejected", "unable_to_complete"].includes(status) ? row.internal_notes || null : null,
    processedBy: null,
    processedAt: row.completed_at || null,
    exportGeneratedAt: null,
    exportGeneratedBy: null,
    exportFileSizeBytes: null,
    downloadCount: 0,
    daysRemaining,
    isOverdue: daysRemaining < 0 && !terminal,
    isUrgent: daysRemaining >= 0 && daysRemaining <= 5 && !terminal,
    createdAt: row.created_at || row.submitted_at,
    updatedAt: row.updated_at || row.created_at || row.submitted_at
  };
}

export function sarSummary(rows) {
  return {
    total: rows.length,
    submitted: rows.filter((row) => row.status === "submitted").length,
    in_review: rows.filter((row) => row.status === "in_review").length,
    processing: rows.filter((row) => row.status === "processing").length,
    ready: rows.filter((row) => row.status === "ready").length,
    completed: rows.filter((row) => row.status === "completed").length,
    overdue: rows.filter((row) => row.isOverdue).length,
    urgent: rows.filter((row) => row.isUrgent).length
  };
}
