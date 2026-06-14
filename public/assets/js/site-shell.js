document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");

  if (header) {
    header.innerHTML = `
      <header class="site-header">
        <a class="brand" href="/">
          <span class="brand-mark" aria-hidden="true"></span>
          <span>
            <strong>JA Experiences &amp; Discovery</strong>
            <span>by JA Group Services Ltd</span>
          </span>
        </a>

        <nav class="main-nav" aria-label="Main navigation">
          <a href="/about/">About</a>
          <a href="/plans-pricing/">Plans</a>
          <a href="/activities/">Activities</a>
          <a href="/destinations/">Destinations</a>
          <a href="/affiliate-partners/">Partners</a>
        </nav>

        <div class="header-actions">
          <a class="sign-in" href="/login/">Sign in</a>
          <a class="cta-small" href="/contact/">Reach Out</a>
        </div>
      </header>
    `;
  }

  if (footer) {
    footer.innerHTML = `
      <footer class="site-footer">
        <div class="footer-grid">
          <div>
            <h3>JA Experiences &amp; Discovery</h3>
            <p>Destination discovery, activity signposting and online planning guidance operated by JA Group Services Ltd.</p>
            <p><strong>Important:</strong> Customers remain responsible for arranging their own travel and transport.</p>
          </div>

          <div>
            <h4>Explore</h4>
            <a href="/about/">About</a>
            <a href="/plans-pricing/">Plans &amp; Pricing</a>
            <a href="/activities/">Activities</a>
            <a href="/destinations/">Destinations</a>
            <a href="/affiliate-partners/">Affiliate Partners</a>
          </div>

          <div>
            <h4>Support</h4>
            <a href="/contact/">Contact</a>
            <a href="/login/">Sign In</a>
            <a href="/account/">Create Account</a>
          </div>
        </div>

        <div class="footer-bottom">
          &copy; JA Group Services Ltd and its licensors. JA Experiences &amp; Discovery is being prepared as a division/service line of JA Group Services Ltd.
        </div>
      </footer>
    `;
  }
});
