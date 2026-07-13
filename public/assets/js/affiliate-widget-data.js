(function () {
  const providers = Object.create(null);

  function normalise(value) {
    return String(value || "").trim().toLocaleLowerCase("en-GB").replace(/\s+/g, " ");
  }

  function searchableText(record) {
    return normalise([
      record.provider,
      record.countryName,
      record.countryCode,
      record.city,
      record.destinationName,
      record.destinationSlug,
      record.widgetName,
      record.category,
      ...(Array.isArray(record.searchKeywords) ? record.searchKeywords : [])
    ].filter(Boolean).join(" "));
  }

  function matches(record, query) {
    const term = normalise(query);
    return !term || searchableText(record).includes(term);
  }

  function register(provider, records) {
    providers[normalise(provider)] = Object.freeze((records || []).map(function (record) {
      return Object.freeze({ ...record, provider });
    }));
    return providers[normalise(provider)];
  }

  window.JA_AFFILIATE_WIDGET_DATA = Object.freeze({ providers, normalise, searchableText, matches, register });

  if (typeof document !== "undefined") {
    document.addEventListener("click", function (event) {
      const clearButton = event.target.closest("[data-clear-search]");
      if (!clearButton) return;
      const input = document.getElementById(clearButton.dataset.clearSearch || "");
      if (!input) return;
      input.value = "";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.focus();
    });
  }
})();
