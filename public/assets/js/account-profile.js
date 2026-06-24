async function loadAccessProfile() {
  bindDashboardShell();
  await applyAccountBranding();

  const params = new URLSearchParams(window.location.search);
  const shouldHydrateProfile = params.get("signedin") === "1" || params.get("hydrate") === "1";

  if (!shouldHydrateProfile) {
    // Silent check: sometimes Cloudflare Access authenticates and returns the user
    // to /account/ without the signedin=1 query parameter. In that case, try a
    // JSON fetch to /account/profile to see if a valid session/profile exists
    // and hydrate the page client-side. This avoids touching Access settings.
    try {
      const check = await fetch("/account/profile", {
        credentials: "include",
        cache: "no-store",
        headers: { "Accept": "application/json" }
      });

      if (check.ok) {
        try {
          const data = await check.json();
          const profile = data.profile;

          updateProfile(profile);
          populateForm(profile);
          populateConsent(data.consent || {});
          if (hasEligibleAccess(profile)) {
            bindProfileForm(profile);
            await loadAccountRequests();
            bindAccountRequestForms();
          } else {
            renderRestrictedLists();
          }
          return;
        } catch (e) {
          }
      }
    } catch (e) {
      // ignore and fall back to signed-out landing
    }

    showSignedOutLanding();
    return;
  }

  try {
    const response = await fetch("/account/profile", {
      credentials: "include",
      cache: "no-store",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Profile response was not available.");
    }

    try {
      const data = await response.json();
      const profile = data.profile;

      updateProfile(profile);
      populateForm(profile);
      populateConsent(data.consent || {});
      if (hasEligibleAccess(profile)) {
        bindProfileForm(profile);
        await loadAccountRequests();
        bindAccountRequestForms();
      } else {
        renderRestrictedLists();
      }
    } catch (err) {
      throw err;
    }
  } catch (error) {
    showProfileError(error);
  }
}

function showSignedOutLanding() {
  setAccountSignedInState(false, false);
  setText("accountHeroTitle", "Customer account access");
  setText("accountHeroText", "Sign in with JA Group Services CIAM to access eligible customer services, data requests and support reports.");
  setText("secureAccountBadge", "Secure access");
}

