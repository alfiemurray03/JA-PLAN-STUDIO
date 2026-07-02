# Production Checklist

## D1 Migrations

- [ ] Apply the latest D1 migration set to the target environment.
- [ ] Verify all additive columns and new tables exist.
- [ ] Confirm existing customer data remains intact.

## Environment Variables

- [ ] `ADMIN_EMAIL` or `ADMIN_EMAILS`
- [ ] `STRIPE_PUBLISHABLE_KEY`
- [ ] `STRIPE_SECRET_KEY`
- [ ] `STRIPE_WEBHOOK_SECRET`
- [ ] Email provider credentials
- [ ] Any required Microsoft Entra environment bindings

## Cloudflare Pages Configuration

- [ ] Confirm Pages project bindings for Functions and D1.
- [ ] Confirm static assets deploy from the expected branch.
- [ ] Confirm cache and headers match production requirements.

## Microsoft Entra Configuration

- [ ] Verify the existing External ID application remains unchanged.
- [ ] Confirm customer login works.
- [ ] Confirm administrator login works.
- [ ] Confirm logout works.
- [ ] Confirm profile loading still works after sign-in.

## Stripe Configuration

- [ ] Confirm Stripe secret values are present and masked in admin UI.
- [ ] Confirm customer billing linkage still resolves correctly.
- [ ] Confirm no authentication or webhook settings were altered.

## Deployment Sequence

1. Apply D1 migrations.
2. Deploy Cloudflare Functions.
3. Deploy static assets.
4. Verify customer portal routes.
5. Verify administrator routes.
6. Verify public website routes.

## Smoke Tests

- [ ] Homepage loads.
- [ ] Destinations load.
- [ ] Plans load.
- [ ] Contact form loads.
- [ ] Customer dashboard loads.
- [ ] Customer profile loads.
- [ ] Support workspace loads.
- [ ] GDPR workspace loads.
- [ ] Administrator dashboard loads.
- [ ] Customer explorer loads.
- [ ] Notifications workspace loads.

## Post-Deployment Verification

- [ ] Confirm no placeholder pages remain.
- [ ] Confirm no redirect loops.
- [ ] Confirm audit logs capture admin actions.
- [ ] Confirm customer data isolation is preserved.
- [ ] Confirm route protection still blocks unauthorised access.

## Rollback Plan

- [ ] Revert the Pages deployment if a regression is detected.
- [ ] Roll forward schema changes with compatible migrations if needed.
- [ ] Do not remove production data during rollback.
