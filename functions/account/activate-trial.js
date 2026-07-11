import { getNativeSession, loginRedirect, withIdentity } from "../_shared/oidc.js";

function clean(value, max = 1000) { return String(value || "").trim().slice(0, max); }
function cleanEmail(value) { return clean(value, 254).toLowerCase(); }

function getAccessIdentity(request) {
  const nativeEmail = request.headers.get("x-ja-auth-email") || "";
  return { email: cleanEmail(nativeEmail), name: clean(request.headers.get("x-ja-auth-name") || nativeEmail, 160) };
}

async function tokenBalance(DB, email) {
  const row = await DB.prepare(`SELECT COALESCE(SUM(amount), 0) AS balance FROM builder_token_ledger WHERE lower(email) = lower(?)`).bind(email).first();
  return Number(row?.balance || 0);
}

async function activeSubscription(DB, email) {
  try {
    const row = await DB.prepare(`
      SELECT plan_name, status, current_period_end, trial_end
      FROM stripe_subscriptions
      WHERE lower(customer_email) = lower(?)
        AND lower(COALESCE(status, '')) IN ('active', 'trialing')
        AND (
          current_period_end IS NULL
          OR current_period_end = ''
          OR datetime(current_period_end) > datetime('now')
        )
      ORDER BY COALESCE(current_period_end, trial_end, subscription_start, updated_at) DESC
      LIMIT 1
    `).bind(email).first();
    return row || null;
  } catch {
    return null;
  }
}

export async function onRequestGet(context) {
  const { request, env } = context;

  if (!env.DB) {
    return new Response("Database binding DB is missing.", { status: 500 });
  }

  // Get authenticated customer identity
  const identity = await getNativeSession(request, env, "customer");
  if (!identity || !identity.email) {
    return loginRedirect(request, "customer");
  }

  const email = cleanEmail(identity.email);
  const now = new Date();
  const expires = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
  const trialId = crypto.randomUUID();

  try {
    // 1. Check if they have already used/claimed the free trial
    const existing = await env.DB.prepare(`SELECT * FROM trial_access_tokens WHERE lower(email) = lower(?)`).bind(email).first();
    if (existing) {
      await env.DB.prepare(`
        INSERT INTO admin_audit_log (id, actor_email, action, entity_type, entity_id, summary, metadata)
        VALUES (?, ?, ?, 'profiles', ?, ?, ?)
      `).bind(
        crypto.randomUUID(),
        email,
        "trial_activation_failed",
        email,
        `Customer free trial claim rejected: already claimed.`,
        JSON.stringify({ customer: email, claim_identifier: trialId, reason: "already_claimed", success: false })
      ).run();

      return new Response(null, {
        status: 302,
        headers: {
          Location: "/account/dashboard/?trial_error=already_claimed",
          "Cache-Control": "no-store"
        }
      });
    }

    // 2. Check if they have an active paid subscription
    const subscription = await activeSubscription(env.DB, email);
    if (subscription) {
      await env.DB.prepare(`
        INSERT INTO admin_audit_log (id, actor_email, action, entity_type, entity_id, summary, metadata)
        VALUES (?, ?, ?, 'profiles', ?, ?, ?)
      `).bind(
        crypto.randomUUID(),
        email,
        "trial_activation_failed",
        email,
        `Customer free trial claim rejected: active paid subscription.`,
        JSON.stringify({ customer: email, claim_identifier: trialId, reason: "paid_subscription", success: false })
      ).run();

      return new Response(null, {
        status: 302,
        headers: {
          Location: "/account/dashboard/?trial_error=paid_plan",
          "Cache-Control": "no-store"
        }
      });
    }

    // 3. Perform atomic batch D1 activation
    const currentBalance = await tokenBalance(env.DB, email);
    const balanceAfter = currentBalance + 30;
    const ledgerId = crypto.randomUUID();

    const statements = [
      env.DB.prepare(`INSERT INTO trial_access_tokens (id, email, activated_at, expires_at, token_allowance) VALUES (?, ?, ?, ?, 30)`).bind(
        trialId, email, now.toISOString(), expires.toISOString()
      ),
      env.DB.prepare(`INSERT INTO builder_token_ledger (id, email, amount, balance_after, source, reason, metadata) VALUES (?, ?, 30, ?, 'trial', 'One-time 14-day trial Builder Usage Tokens', ?)`).bind(
        ledgerId, email, balanceAfter, JSON.stringify({ trialId, claim_identifier: trialId })
      ),
      env.DB.prepare(`INSERT INTO customer_timeline_events (id, email, event_type, title, detail, actor_type, actor_email, metadata) VALUES (?, ?, 'trial_activated', 'Free Trial Activated', ?, 'system', 'system', ?)`).bind(
        crypto.randomUUID(),
        email,
        `Activated 14-day free trial ending ${expires.toLocaleDateString("en-GB")}. Credited 30 Builder Usage Tokens once only.`,
        JSON.stringify({ trialId, expires_at: expires.toISOString(), tokens_credited: 30 })
      ),
      env.DB.prepare(`INSERT INTO admin_audit_log (id, actor_email, action, entity_type, entity_id, summary, metadata) VALUES (?, ?, ?, 'profiles', ?, ?, ?)`).bind(
        crypto.randomUUID(),
        email,
        "trial_activated",
        email,
        `Customer free trial claimed successfully.`,
        JSON.stringify({
          customer: email,
          claim_identifier: trialId,
          activated_at: now.toISOString(),
          expires_at: expires.toISOString(),
          tokens_credited: 30,
          success: true
        })
      )
    ];

    if (typeof env.DB.batch === "function") {
      await env.DB.batch(statements);
    } else {
      for (const statement of statements) {
        await statement.run();
      }
    }

    // 4. Set secure browser cookie for immediate UI and redirect with success param
    const headers = new Headers({
      Location: "/account/dashboard/?trial_success=1",
      "Cache-Control": "no-store"
    });
    headers.append("Set-Cookie", `ja_trial_activated=1; Path=/; Max-Age=1209600; Secure; SameSite=Lax`);
    return new Response(null, { status: 302, headers });

  } catch (error) {
    console.error(JSON.stringify({
      event: "trial_activation_exception",
      customer: email,
      message: error instanceof Error ? error.message : "Unknown error",
      claim_identifier: trialId
    }));

    return new Response("An error occurred while activating your free trial. Please try again or contact support.", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" }
    });
  }
}
