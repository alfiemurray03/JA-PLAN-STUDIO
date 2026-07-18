function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });
}

function emailOf(request) { return String(request.headers.get("x-ja-auth-email") || "").trim().toLowerCase(); }
function clean(value, max = 4000) { return String(value || "").trim().slice(0, max); }
function sameOrigin(request) {
  const origin = request.headers.get("Origin");
  return !origin || origin === new URL(request.url).origin;
}

async function ensureTables(DB) {
  await DB.prepare(`CREATE TABLE IF NOT EXISTS support_tickets (
    id TEXT PRIMARY KEY, reference TEXT UNIQUE, customer_email TEXT, customer_name TEXT,
    category TEXT, department TEXT, assigned_admin TEXT, subject TEXT, status TEXT,
    priority TEXT, sla_target TEXT, notes TEXT, customer_replies TEXT DEFAULT '[]',
    attachments TEXT DEFAULT '[]', resolution_summary TEXT, audit_log TEXT DEFAULT '[]',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`).run();
  await DB.prepare(`CREATE TABLE IF NOT EXISTS support_ticket_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT, ticket_id TEXT NOT NULL, sender_type TEXT NOT NULL,
    sender_name TEXT, sender_email TEXT, message TEXT NOT NULL, is_internal INTEGER DEFAULT 0,
    read_by_admin INTEGER DEFAULT 0, created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`).run();
}

function ticket(row) {
  return { id: row.id, uuid: row.reference || row.id, name: row.customer_name || "Customer",
    email: row.customer_email, subject: row.subject, message: row.notes || "",
    category: String(row.category || "general").toLowerCase(), priority: String(row.priority || "normal").toLowerCase(),
    status: String(row.status || "open").toLowerCase().replaceAll(" ", "_"),
    createdAt: row.created_at, updatedAt: row.updated_at };
}

export async function onRequest({ request, env }) {
  try {
    if (!env.DB) return json({ success: false, error: "Support service is temporarily unavailable." }, 503);
    const email = emailOf(request);
    if (!email) return json({ success: false, error: "Please sign in to use customer support." }, 401);
    if (!["GET", "HEAD"].includes(request.method) && !sameOrigin(request)) return json({ success: false, error: "Request origin was rejected." }, 403);
    await ensureTables(env.DB);
    const parts = new URL(request.url).pathname.split("/").filter(Boolean).slice(2);

    if (request.method === "POST" && parts[0] === "submit") {
      const body = await request.json().catch(() => ({}));
      const subject = clean(body.subject, 500), message = clean(body.message, 8000);
      if (subject.length < 5 || message.length < 20) return json({ success: false, error: "Please provide a subject and a detailed message." }, 400);
      const id = crypto.randomUUID();
      const reference = `SUP-${Date.now().toString(36).toUpperCase()}`;
      await env.DB.prepare(`INSERT INTO support_tickets (id,reference,customer_email,customer_name,category,subject,status,priority,notes) VALUES (?,?,?,?,?,?,'Open',?,?,?)`)
        .bind(id, reference, email, clean(body.name, 160) || email, clean(body.category, 80) || "general", subject, clean(body.priority, 40) || "normal", message).run();
      await env.DB.prepare(`INSERT INTO support_ticket_messages (ticket_id,sender_type,sender_name,sender_email,message,read_by_admin) VALUES (?,'customer',?,?,?,0)`)
        .bind(id, clean(body.name, 160) || email, email, message).run();
      return json({ success: true, ticketId: id, reference }, 201);
    }

    if (parts[0] !== "tickets") return json({ success: false, error: "Support route not found." }, 404);
    const ticketId = parts[1];
    if (!ticketId && request.method === "GET") {
      const rows = await env.DB.prepare(`SELECT * FROM support_tickets WHERE lower(customer_email)=lower(?) ORDER BY updated_at DESC`).bind(email).all();
      return json({ success: true, tickets: (rows.results || []).map(ticket) });
    }
    const owned = await env.DB.prepare(`SELECT * FROM support_tickets WHERE id=? AND lower(customer_email)=lower(?)`).bind(ticketId, email).first();
    if (!owned) return json({ success: false, error: "Support ticket not found." }, 404);
    if (parts[2] === "messages") {
      if (request.method === "POST") {
        const body = await request.json().catch(() => ({}));
        const message = clean(body.message, 8000);
        if (!message) return json({ success: false, error: "Message is required." }, 400);
        await env.DB.prepare(`INSERT INTO support_ticket_messages (ticket_id,sender_type,sender_name,sender_email,message,read_by_admin) VALUES (?,'customer',?,?,?,0)`)
          .bind(ticketId, email, email, message).run();
        await env.DB.prepare(`UPDATE support_tickets SET status=CASE WHEN lower(status) IN ('closed','resolved') THEN 'Open' ELSE status END,updated_at=CURRENT_TIMESTAMP WHERE id=?`).bind(ticketId).run();
      }
      const rows = await env.DB.prepare(`SELECT id,sender_type,sender_name,message,created_at FROM support_ticket_messages WHERE ticket_id=? AND COALESCE(is_internal,0)=0 ORDER BY created_at,id`).bind(ticketId).all();
      return json({ success: true, messages: (rows.results || []).map(row => ({ id: row.id, senderType: row.sender_type, senderName: row.sender_name, message: row.message, createdAt: row.created_at })) });
    }
    return json({ success: true, ticket: ticket(owned) });
  } catch (error) {
    console.error(JSON.stringify({ event: "customer_support_error", message: String(error?.message || error) }));
    return json({ success: false, error: "The Help Centre could not complete that request. Please try again." }, 503);
  }
}
