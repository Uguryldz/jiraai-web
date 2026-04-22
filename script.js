/**
 * Jira AI Orkestra — tek sayfa etkileşim
 */
(() => {
  const form = document.getElementById("demo-form");
  const status = document.getElementById("cta-status");
  if (!form || !status) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input[type=email]");
    const email = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      status.textContent = "⚠ Geçerli bir e-posta gir";
      status.style.color = "#ff8080";
      input.setAttribute("aria-invalid", "true");
      input.focus();
      return;
    }
    status.textContent = "✓ Demo linki gönderildi: " + email;
    status.style.color = "var(--accent)";
    input.removeAttribute("aria-invalid");
    form.reset();
  });
})();