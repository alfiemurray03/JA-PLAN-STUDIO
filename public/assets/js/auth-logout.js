(() => {
  "use strict";

  const status = document.getElementById("logout-status");
  const retry = document.getElementById("logout-retry");
  let logoutInProgress = false;

  async function completeLogout() {
    if (logoutInProgress) return;
    logoutInProgress = true;
    retry.hidden = true;
    status.textContent = "Ending your secure access session.";

    try {
      status.textContent = "Opening Microsoft sign-out…";
      window.location.replace("/account/logout");
    } catch {
      logoutInProgress = false;
      status.textContent = "We could not complete secure sign-out. Check your connection and try again.";
      retry.hidden = false;
    }
  }

  retry.addEventListener("click", completeLogout);
  completeLogout();
})();
