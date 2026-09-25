document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initModalListeners();
  updateCopyrightYear();
});

function updateCopyrightYear() {
  const el = document.getElementById("currentYear");
  if (el) {
    el.textContent = new Date().getFullYear();
  }
}

function initMobileNav() {
  const toggle = document.querySelector(".mobile-nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("mobile-open");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("mobile-open");
      });
    });
  }
}

function openProjectModal(title, description, detailsHtml) {
  const modal = document.getElementById("projectModal");
  const modalContent = document.getElementById("modalContent");

  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <h3 style="margin-bottom: 12px; color: var(--text-pure-white);">${escapeHtml(title)}</h3>
    <p style="color: var(--text-muted); line-height: 1.6;">${escapeHtml(description)}</p>
    ${detailsHtml ? `<div style="margin-top: 16px;">${detailsHtml}</div>` : ""}
  `;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  if (modal) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
}

function initModalListeners() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProjectModal();
    }
  });
}

function escapeHtml(string) {
  if (!string) return "";
  return String(string)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
