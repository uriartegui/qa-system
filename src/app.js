import "./assets/styles/style.css";
import { ENV } from "@/config/env.js";
import { AuthService } from "@/modules/auth/auth.service.js";
import { initRouter, navigate } from "@/core/router.js";

document.title = ENV.appName;

let sidebarEl = null;

function handleDocumentClick(e) {
  const logoutBtn = e.target.closest("#logout-btn");
  if (logoutBtn) {
    AuthService.logout();
    if (sidebarEl) sidebarEl.classList.add("hidden");
    document
      .querySelectorAll(".nav-item")
      .forEach((btn) => btn.classList.remove("nav-item--active"));
    navigate("login");
    return;
  }

  const navItem = e.target.closest(".nav-item[data-route]");
  if (!navItem) return;

  e.preventDefault();

  document
    .querySelectorAll(".nav-item")
    .forEach((btn) => btn.classList.remove("nav-item--active"));

  navItem.classList.add("nav-item--active");
  navigate(navItem.dataset.route);
}

function initSidebarUI() {
  const sidebar = sidebarEl || document.getElementById("sidebar");
  const collapseBtn = document.querySelector(".collapse-btn");
  const logoIcon = document.querySelector(".logo-icon");
  if (!sidebar) return;

  const isCollapsed = localStorage.getItem("sidebar-collapsed") === "true";
  if (isCollapsed) {
    sidebar.classList.add("collapsed");
  } else {
    sidebar.classList.remove("collapsed");
  }

  if (collapseBtn) {
    collapseBtn.addEventListener("click", () => {
      const collapsed = sidebar.classList.toggle("collapsed");
      localStorage.setItem("sidebar-collapsed", collapsed ? "true" : "false");
    });
  }

  if (logoIcon) {
    logoIcon.style.cursor = "pointer";
    logoIcon.addEventListener("click", () => {
      if (sidebar.classList.contains("collapsed")) {
        sidebar.classList.remove("collapsed");
        localStorage.setItem("sidebar-collapsed", "false");
      }
    });
  }

  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileOverlay = document.getElementById("mobile-overlay");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("mobile-open");
      mobileOverlay.classList.toggle("active");
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener("click", () => {
      sidebar.classList.remove("mobile-open");
      mobileOverlay.classList.remove("active");
    });
  }
}

function initApp() {
  sidebarEl = document.getElementById("sidebar");
  const headerEl = document.getElementById("app-header");
  if (!sidebarEl) return;

  initRouter();
  initSidebarUI();

  const userNameEl = document.getElementById("app-user-name");
  const orgNameEl = document.getElementById("app-org-name");
  const sidebarUserNameEl = document.getElementById("sidebar-user-name");
  const sidebarOrgNameEl = document.getElementById("sidebar-org-name");
  const sidebarUserAvatarEl = document.getElementById("sidebar-user-avatar");

  const currentUser = AuthService.getUser();
  if (currentUser) {
    const name = currentUser.username || "Usuário";
    const org = "Qualyra";

    if (userNameEl) userNameEl.textContent = name;
    if (orgNameEl) orgNameEl.textContent = org;
    if (sidebarUserNameEl) sidebarUserNameEl.textContent = name;
    if (sidebarOrgNameEl) sidebarOrgNameEl.textContent = org;

    if (sidebarUserAvatarEl) {
      sidebarUserAvatarEl.textContent = name.charAt(0).toUpperCase();
    }
  }

  if (AuthService.isAuthenticated()) {
    sidebarEl.classList.remove("hidden");
    if (headerEl) headerEl.classList.remove("hidden");
    navigate("dashboard");
  } else {
    sidebarEl.classList.add("hidden");
    if (headerEl) headerEl.classList.add("hidden");
    navigate("login");
  }

  document.removeEventListener("click", handleDocumentClick);
  document.addEventListener("click", handleDocumentClick);
}

initApp();

setInterval(() => {
  if (!AuthService.isAuthenticated()) {
    const header = document.getElementById("app-header");
    if (sidebarEl) sidebarEl.classList.add("hidden");
    if (header) header.classList.add("hidden");
    navigate("login");
  }
}, 30_000);
