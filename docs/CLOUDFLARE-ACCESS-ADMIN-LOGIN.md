# Cloudflare Access Administrator Login Deployment

The Administrator Control Centre remains protected by Cloudflare Access and Microsoft Entra ID. Cloudflare evaluates Access policy before any Pages Function or application middleware runs, so authentication and login-page branding must be configured in Cloudflare Zero Trust rather than application code.

No Bypass or Service Auth policy is required or permitted for the administrator application.

## Application configuration

In **Cloudflare Zero Trust → Access controls → Applications**, open the self-hosted application protecting `experiences.jagroupservices.co.uk/admin/` and confirm:

1. The protected application continues to cover `/admin/` and every `/admin/*` route.
2. Existing Allow policies, administrator membership rules, session duration and revocation settings remain unchanged.
3. Under identity providers, select only the existing **Microsoft Entra ID** provider.
4. Enable **Apply instant authentication** (`auto_redirect_to_identity`).
5. Do not add Bypass, Service Auth, Everyone or public-access rules.

With one allowed identity provider and instant authentication enabled, unauthenticated administrators go directly to Microsoft Entra ID instead of seeing Cloudflare's provider-selection page. Cloudflare retains the originally requested URL, so a successful login to a deep link returns to that deep link.

## Access login branding

In **Cloudflare Zero Trust → Reusable components → Custom pages → Access login page**, select **Manage** and apply:

- Organisation name: `JA Experiences & Discovery`
- Logo URL: `https://experiences.jagroupservices.co.uk/assets/images/ja-group-services-logo-official.png`
- Header: `Administrator Control Centre`
- Footer: `Secure administrator access for JA Experiences & Discovery, operated by JA Group Services Ltd.`
- Background colour: `#0f1720`

Use Cloudflare's preview before saving. This branding is an account-level Access component and may appear on other Access applications in the same Zero Trust organisation. Instant authentication normally skips this page for the administrator application, but the branding remains important for fallback and error states.

## Microsoft Entra ID checks

In **Cloudflare Zero Trust → Integrations → Identity providers**, open the existing Microsoft Entra ID provider and:

1. Run the supported connection test.
2. Confirm the Application ID, Directory ID and email claim remain unchanged.
3. Confirm the client secret is current and its expiry is monitored.
4. Do not recreate the provider or alter the Entra application unless the connection test fails and a controlled change is approved.

## Validation checklist

Use a private browser session after saving the manual settings:

1. Open `/admin/` and confirm automatic redirection to Microsoft Entra ID.
2. Open a protected deep link such as `/admin/?section=customers`; authenticate and confirm the same URL is restored.
3. Confirm an unauthorised Entra account is denied by the existing Access policy.
4. Confirm `/admin/api`, `/admin/customer` and all other `/admin/*` endpoints remain protected.
5. Sign out through `/admin/logout` and confirm the existing chain completes in order:
   - application session and administrator bypass session revoked;
   - Cloudflare Access session ended at `/cdn-cgi/access/logout`;
   - Microsoft session ended through `/signed-out/microsoft-logout`;
   - final return to `/signed-out/`.
6. Confirm a new visit to `/admin/` requires authentication again.

Cloudflare's team-domain URL may appear briefly as part of the managed OAuth/OIDC redirect chain. It must not be hardcoded into website navigation or application source.
