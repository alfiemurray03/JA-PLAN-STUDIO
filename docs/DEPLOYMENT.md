# Deployment Guide

## Cloudflare Pages

- Deploy the repository through Cloudflare Pages.
- Keep the customer portal and administrator portal on the same origin so the shared functions and D1 binding stay consistent.
- Do not deploy unvalidated auth changes.

## D1 Migrations

- Apply migrations before releasing any UI that depends on new tables or columns.
- Use additive schema changes whenever possible.
- Keep customer identity data in `profiles` rather than duplicating Microsoft-managed identity attributes.

## Environment Variables

Common environment variables used by the platform include:

- `ADMIN_EMAIL`
- `ADMIN_EMAILS`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `EMAIL_API_TOKEN`
- `RESEND_API_KEY`
- `SENDGRID_API_KEY`
- `POSTMARK_API_KEY`
- `BREVO_API_KEY`

## Secrets

- Store production secrets in Cloudflare, not in the repository.
- Never commit Microsoft Entra, Microsoft Graph, Stripe, or email credentials.

## Microsoft Entra Configuration

- Keep the existing Microsoft Entra External ID application and callback configuration unchanged unless a specific identity defect is discovered.
- Do not modify the established OIDC / PKCE / session flow as part of portal releases.

## Stripe Configuration

- Stripe remains a separate production baseline.
- Validate any Stripe configuration updates in the administrator UI before release.
- Do not change Stripe authentication or webhooks as part of the portal refactor.

## Deployment Order

1. Apply D1 migrations.
2. Deploy functions.
3. Deploy static assets.
4. Verify customer login.
5. Verify administrator login.
6. Verify key customer and administrator workspaces.

## Rollback Process

- Revert the deployed Pages release if a regression is found.
- If schema changes were applied, roll forward with a compatible migration instead of deleting production data.
- Keep authentication and profile synchronisation paths intact during rollback.
