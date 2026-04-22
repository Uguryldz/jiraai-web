/**
 * Jira AI Orkestra — Landing Page Etkileşimleri
 * - Form validation + submit handling
 * - Analytics event tracking (opt-in, defansif)
 * - Smooth scroll (nav link'leri HTML scroll-behavior ile hallediyor)
 */
(() => {
  "use strict";

  /**
   * Analytics event gönder. gtag yoksa veya hata olursa sessiz — sayfayı bozmaz.
   * @param {string} name - event adı (örn. "cta-click")
   * @param {object} [data] - event payload
   */
  function trackEvent(name, data = {}) {
    if (typeof window.gtag !== "function") return;
    try {
      window.gtag("event", name, data);
    } catch {
      /* sessiz — analytics hatası sayfayı etkilememeli */
    }
  }

  // Data-track attribute'lu element'lere click listener
  document.querySelectorAll("[data-track]").forEach((el) => {
    el.addEventListener("click", () => {
      trackEvent("click", { target: el.getAttribute("data-track") });
    });
  });

  // Form submit handling
  const form = document.getElementById("demo-form");
  const status = document.getElementById("cta-status");
  if (!form || !status) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input[type=email]");
    const email = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!valid) {
      status.textContent = "⚠ Geçerli bir e-posta girin";
      status.style.color = "#ff8080";
      input.setAttribute("aria-invalid", "true");
      input.focus();
      trackEvent("form-error", { reason: "invalid-email" });
      return;
    }

    status.textContent = "✓ Demo linki gönderildi: " + email;
    status.style.color = "var(--accent)";
    input.removeAttribute("aria-invalid");
    form.reset();
    trackEvent("form-submit", { email_domain: email.split("@")[1] });
  });

  // Export for testing
  if (typeof window !== "undefined") {
    window.__orkestra = { trackEvent };
  }
})();