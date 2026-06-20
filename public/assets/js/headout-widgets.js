(function () {
  const SCRIPT_SRC = "https://partner.headout.com/embed/script?affiliate_code=JL2D9u&currency=GBP&utm_source=https://tours.jagroupservices.co.uk&language=en";

  const headoutDestinations = [
    { slug: "london", name: "London", cityCode: "LONDON" },
    { slug: "lisbon", name: "Lisbon", cityCode: "LISBON" },
    { slug: "new-york", name: "New York", cityCode: "NEW_YORK" },
    { slug: "paris", name: "Paris", cityCode: "PARIS" },
    { slug: "rome", name: "Rome", cityCode: "ROME" },
    { slug: "barcelona", name: "Barcelona", cityCode: "BARCELONA" },
    { slug: "dubai", name: "Dubai", cityCode: "DUBAI" },
    { slug: "amsterdam", name: "Amsterdam", cityCode: "AMSTERDAM" },
    { slug: "orlando", name: "Orlando", cityCode: "ORLANDO" },
    { slug: "singapore", name: "Singapore", cityCode: "SINGAPORE" },
    { slug: "abu-dhabi", name: "Abu Dhabi", cityCode: "ABU_DHABI" },
    { slug: "edinburgh", name: "Edinburgh", cityCode: "EDINBURGH" },
    { slug: "venice", name: "Venice", cityCode: "VENICE" },
    { slug: "florence", name: "Florence", cityCode: "FLORENCE" },
    { slug: "madrid", name: "Madrid", cityCode: "MADRID" },
    { slug: "prague", name: "Prague", cityCode: "PRAGUE" },
    { slug: "vienna", name: "Vienna", cityCode: "VIENNA" },
    { slug: "berlin", name: "Berlin", cityCode: "BERLIN" },
    { slug: "athens", name: "Athens", cityCode: "ATHENS" },
    { slug: "istanbul", name: "Istanbul", cityCode: "ISTANBUL" },
    { slug: "bangkok", name: "Bangkok", cityCode: "BANGKOK" },
    { slug: "tokyo", name: "Tokyo", cityCode: "TOKYO" },
    { slug: "porto", name: "Porto", cityCode: "PORTO" },
    { slug: "algarve", name: "Algarve", cityCode: "ALGARVE" },
    { slug: "funchal", name: "Funchal", cityCode: "FUNCHAL" },
    { slug: "madeira", name: "Madeira", cityCode: "FUNCHAL" },
    { slug: "manchester", name: "Manchester", cityCode: "MANCHESTER" },
    { slug: "liverpool", name: "Liverpool", cityCode: "LIVERPOOL" },
    { slug: "york", name: "York", cityCode: "YORK" },
    { slug: "alicante", name: "Alicante", cityCode: "ALICANTE" },
    { slug: "rhodes", name: "Rhodes", cityCode: "RHODES" },
    { slug: "tenerife", name: "Tenerife", cityCode: "TENERIFE" },
    { slug: "santorini", name: "Santorini", cityCode: "SANTORINI" },
    { slug: "sao-paulo", name: "Sao Paulo", cityCode: "SAO_PAULO" },
    { slug: "rotterdam", name: "Rotterdam", cityCode: "ROTTERDAM" },
    { slug: "normandy", name: "Normandy", cityCode: "NORMANDY" },
    { slug: "marrakech", name: "Marrakech", cityCode: "MARRAKESH" },
    { slug: "malaga", name: "Malaga", cityCode: "MALAGA" },
    { slug: "las-vegas", name: "Las Vegas", cityCode: "LAS_VEGAS" },
    { slug: "ibiza", name: "Ibiza", cityCode: "IBIZA" },
    { slug: "dublin", name: "Dublin", cityCode: "DUBLIN" },
    { slug: "cape-town", name: "Cape Town", cityCode: "CAPE_TOWN" },
    { slug: "budapest", name: "Budapest", cityCode: "BUDAPEST" },
    { slug: "belfast", name: "Belfast", cityCode: "BELFAST" },
    { slug: "albufeira", name: "Albufeira", cityCode: "ALBUFEIRA" }
  ];

  const madeiraLinks = [
    {
      title: "Yellow Bus Madeira, Funchal, Camara de Lobos and Cabo Girao",
      href: "https://www.headout.com/hop-on-hop-off-bus-tours/yellow-bus-madeira-funchal-camara-de-lobos-cabo-girao-3-in-1-hop-on-hop-off-bus-tour-e-19695/?utm_source=https%3A%2F%2Ftours.jagroupservices.co.uk&utm_medium=affiliate&affiliate_code=JL2D9u&utm_campaign=madeira&languageCode=en&currencyCode=GBP&utm_content=link"
    },
    {
      title: "City Sightseeing Funchal hop-on hop-off bus tour",
      href: "https://www.headout.com/hop-on-hop-off-bus-tours/city-sightseeing-funchal-hop-on-hop-off-bus-tour-e-33226/?utm_source=https%3A%2F%2Ftours.jagroupservices.co.uk&utm_medium=affiliate&affiliate_code=JL2D9u&utm_campaign=madeira&languageCode=en&currencyCode=GBP&utm_content=link"
    }
  ];

  const headoutCountries = [
    country("GB", "United Kingdom", "Headout activity widgets for selected UK destinations.", ["london", "edinburgh", "manchester", "liverpool", "york", "belfast"]),
    country("PT", "Portugal", "Headout activity widgets for Portugal, Madeira and Algarve destinations.", ["lisbon", "porto", "algarve", "funchal", "madeira", "albufeira"]),
    country("ES", "Spain", "Headout activity widgets for selected Spanish mainland and island destinations.", ["barcelona", "madrid", "alicante", "malaga", "tenerife", "ibiza"]),
    country("FR", "France", "Headout activity widgets for selected French destinations.", ["paris", "normandy"]),
    country("IT", "Italy", "Headout activity widgets for selected Italian city destinations.", ["rome", "venice", "florence"]),
    country("GR", "Greece", "Headout activity widgets for selected Greek destinations.", ["athens", "rhodes", "santorini"]),
    country("AE", "United Arab Emirates", "Headout activity widgets for the United Arab Emirates.", ["dubai", "abu-dhabi"]),
    country("US", "United States", "Headout activity widgets for selected United States destinations.", ["new-york", "orlando", "las-vegas"]),
    country("NL", "Netherlands", "Headout activity widgets for selected Netherlands destinations.", ["amsterdam", "rotterdam"]),
    country("DE", "Germany", "Headout activity widgets for Germany.", ["berlin"]),
    country("AT", "Austria", "Headout activity widgets for Austria.", ["vienna"]),
    country("CZ", "Czech Republic", "Headout activity widgets for the Czech Republic.", ["prague"]),
    country("TR", "Turkey", "Headout activity widgets for Turkey.", ["istanbul"]),
    country("TH", "Thailand", "Headout activity widgets for Thailand.", ["bangkok"]),
    country("JP", "Japan", "Headout activity widgets for Japan.", ["tokyo"]),
    country("SG", "Singapore", "Headout activity widgets for Singapore.", ["singapore"]),
    country("MA", "Morocco", "Headout activity widgets for Morocco.", ["marrakech"]),
    country("ZA", "South Africa", "Headout activity widgets for South Africa.", ["cape-town"]),
    country("HU", "Hungary", "Headout activity widgets for Hungary.", ["budapest"]),
    country("BR", "Brazil", "Headout activity widgets for Brazil.", ["sao-paulo"])
  ];

  let selectedHeadoutCountry = null;
  let selectedHeadoutDestination = null;

  function country(code, name, description, destinationSlugs) {
    return { code, name, description, destinationSlugs };
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char];
    });
  }

  function getDestinationBySlug(slug) {
    return headoutDestinations.find(function (destination) {
      return destination.slug === slug;
    });
  }

  function renderGallery(destination) {
    return `
      <div class="headout-gallery" data-headout-city="${escapeHtml(destination.cityCode)}">
        <div data-hawt="gallery" data-city="${escapeHtml(destination.cityCode)}" data-max-count="100" data-show-read-more="[object Object]"></div>
      </div>`;
  }

  function flagUrl(code) {
    return `https://flagcdn.com/w80/${code.toLowerCase()}.png`;
  }

  function loadHeadoutScript() {
    if (document.querySelector('script[src*="partner.headout.com/embed/script"]')) {
      initialiseHeadoutWidgets();
      return;
    }
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = SCRIPT_SRC;
    script.onload = function () {
      try {
        if (typeof HWS !== "undefined" && HWS.init) HWS.init();
      } catch (error) {
        console.warn("Headout widgets could not be initialised.", error);
      }
    };
    document.body.appendChild(script);
  }

  function initialiseHeadoutWidgets() {
    window.setTimeout(function () {
      try {
        if (typeof HWS !== "undefined" && HWS.init) HWS.init();
      } catch (error) {
        console.warn("Headout widgets could not be initialised.", error);
      }
    }, 0);
  }

  function renderDestinationWidget() {
    const root = document.getElementById("destinationGuide");
    if (!root) return false;
    const destination = getDestinationBySlug(root.dataset.slug);
    if (!destination) return false;
    const supportSection = document.getElementById("support");
    const section = document.createElement("section");
    section.className = "section alt headout-destination-section";
    section.id = "headout-activities";
    section.innerHTML = `
      <div class="container">
        <div class="section-heading left">
          <span class="kicker">Headout activities</span>
          <h2>Browse ${escapeHtml(destination.name)} experiences</h2>
          <p>Use the Headout gallery to view current third-party attractions, tours and activity options for ${escapeHtml(destination.name)}.</p>
        </div>
        ${renderGallery(destination)}
        ${destination.slug === "madeira" ? renderMadeiraLinks() : ""}
        <div class="notice affiliate-notice"><strong>Affiliate disclosure:</strong> Bookings made through Headout are made with Headout or the relevant third-party provider. JA Group Services Ltd may receive a commission where eligible.</div>
      </div>`;
    if (supportSection) {
      supportSection.before(section);
    } else {
      root.appendChild(section);
    }
    return true;
  }

  function renderMadeiraLinks() {
    return `
      <div class="headout-link-grid">
        ${madeiraLinks.map(function (link) {
          return `<a class="headout-link-card" href="${escapeHtml(link.href)}" target="_blank" rel="sponsored noopener noreferrer"><span>Madeira affiliate link</span><strong>${escapeHtml(link.title)}</strong></a>`;
        }).join("")}
      </div>`;
  }

  function renderHeadoutDirectory() {
    const grid = document.getElementById("headoutWidgetGrid");
    if (!grid) return false;
    const title = document.getElementById("headoutBrowserTitle");
    const help = document.getElementById("headoutBrowserHelp");
    const back = document.getElementById("headoutBrowserBack");

    function renderCountries() {
      selectedHeadoutCountry = null;
      selectedHeadoutDestination = null;
      if (title) title.textContent = "Explore Headout countries";
      if (help) help.textContent = "Choose a country to view available Headout destinations and open the activity widget.";
      if (back) back.classList.remove("show");
      grid.className = "partner-browser-grid headout-widget-grid";
      grid.innerHTML = headoutCountries.map(function (item) {
        const destinations = item.destinationSlugs.map(getDestinationBySlug).filter(Boolean);
        return `
          <button class="partner-browser-card" type="button" data-headout-country="${escapeHtml(item.name)}">
            <div class="partner-browser-card-top"><img src="${escapeHtml(flagUrl(item.code))}" alt="${escapeHtml(item.name)} flag" loading="lazy"><span>View</span></div>
            <h3>${escapeHtml(item.name)}</h3>
            <p>${destinations.length} ${destinations.length === 1 ? "destination" : "destinations"}</p>
          </button>`;
      }).join("");
    }

    function renderCountryPage(item, destinationSlug) {
      const destinations = item.destinationSlugs.map(getDestinationBySlug).filter(Boolean);
      const destination = getDestinationBySlug(destinationSlug) || destinations[0];
      if (!destination) return;
      selectedHeadoutCountry = item;
      selectedHeadoutDestination = destination;
      if (title) title.textContent = item.name;
      if (help) help.textContent = item.description;
      if (back) back.classList.add("show");
      grid.className = "partner-browser-result";
      grid.innerHTML = `
        <section class="partner-country-page">
          <div class="partner-country-hero">
            <div>
              <span class="kicker">Country activity page</span>
              <h3>${escapeHtml(item.name)}</h3>
              <p>${escapeHtml(item.description)}</p>
            </div>
            <img src="${escapeHtml(flagUrl(item.code))}" alt="${escapeHtml(item.name)} flag" loading="lazy">
          </div>
          <div class="partner-destination-tabs" aria-label="${escapeHtml(item.name)} destinations">
            ${destinations.map(function (entry) {
              return `<button class="${entry.slug === destination.slug ? "active" : ""}" type="button" data-headout-destination="${escapeHtml(entry.slug)}">${escapeHtml(entry.name)}</button>`;
            }).join("")}
          </div>
          <div class="partner-widget-stage">
            <div class="partner-widget-heading">
              <span class="kicker">Widget now showing</span>
              <h4>${escapeHtml(destination.name)}</h4>
              <p>Browse current Headout activities, attractions and tours for ${escapeHtml(destination.name)}.</p>
            </div>
            ${renderGallery(destination)}
            ${destination.slug === "madeira" ? renderMadeiraLinks() : ""}
          </div>
        </section>`;
      loadHeadoutScript();
    }

    grid.addEventListener("click", function (event) {
      const countryButton = event.target.closest("[data-headout-country]");
      const destinationButton = event.target.closest("[data-headout-destination]");
      if (countryButton) {
        const item = headoutCountries.find(function (entry) { return entry.name === countryButton.dataset.headoutCountry; });
        if (item) renderCountryPage(item);
      }
      if (destinationButton && selectedHeadoutCountry) {
        renderCountryPage(selectedHeadoutCountry, destinationButton.dataset.headoutDestination);
      }
    });

    if (back) {
      back.addEventListener("click", renderCountries);
    }

    renderCountries();
    return true;
  }

  function renderLegacyHeadoutDirectory() {
    const grid = document.getElementById("headoutWidgetGrid");
    if (!grid) return false;
    grid.innerHTML = headoutDestinations.map(function (destination) {
      return `
        <article class="headout-widget-section">
          <div class="section-heading left">
            <span class="kicker">Headout</span>
            <h2>${escapeHtml(destination.name)}</h2>
          </div>
          ${renderGallery(destination)}
        </article>`;
    }).join("");
    return true;
  }

  const rendered = renderDestinationWidget() || renderHeadoutDirectory() || document.querySelector("[data-hawt]");
  if (rendered) loadHeadoutScript();

  window.JA_HEADOUT_DESTINATIONS = headoutDestinations;
})();
