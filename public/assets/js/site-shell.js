document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");

  if (header) {
    header.innerHTML = 
      <header class="site-header">
        <a class="logo" href="/">
          JA Experiences &amp; Discovery
          <span>A new division by JA Group Services Ltd</span>
        </a>

        <nav class="main-nav" aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/about/">About</a>
          <a href="/plans-pricing/">Plans &amp; Pricing</a>
          <a href="/activities/">Activities</a>
          <a href="/destinations/">Destinations</a>
          <a href="/affiliate-partners/">Affiliate Partners</a>
          <a href="/contact/">Contact</a>
          <a href="/login/">Login</a>
        </nav>
      </header>
    ;
  }

  if (footer) {
    footer.innerHTML = 
      <footer class="site-footer">
        <div class="footer-inner">
          <p><strong>JA Experiences &amp; Discovery</strong></p>
          <p>JA Experiences &amp; Discovery is being prepared as a new division/service line of JA Group Services Ltd.</p>

          <div class="footer-links">
            <a href="/">Home</a>
            <a href="/about/">About</a>
            <a href="/plans-pricing/">Plans &amp; Pricing</a>
            <a href="/activities/">Activities</a>
            <a href="/destinations/">Destinations</a>
            <a href="/affiliate-partners/">Affiliate Partners</a>
            <a href="/contact/">Contact</a>
          </div>

          <p class="small-print">© JA Group Services Ltd and its licensors.</p>
        </div>
      </footer>
    ;
  }
});
