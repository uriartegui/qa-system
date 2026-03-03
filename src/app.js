import "./assets/styles/style.css";
import { ENV } from "@/config/env.js";
import { AuthService } from "@/modules/auth/auth.service.js";
import { initRouter, navigate } from "@/core/router.js";

document.title = ENV.appName;

function initSidebarUI() {
  const sidebar = document.getElementById("sidebar");
  const collapseBtn = document.querySelector(".collapse-btn");

  if (!collapseBtn) return;

  collapseBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    localStorage.setItem(
      "sidebar-collapsed",
      sidebar.classList.contains("collapsed"),
    );
  });

  const isCollapsed = localStorage.getItem("sidebar-collapsed") === "true";
  if (isCollapsed) {
    sidebar.classList.add("collapsed");
  }
}

function initLogout() {
  const sidebar = document.getElementById("sidebar");

  document.addEventListener("click", (e) => {
    const logoutBtn = e.target.closest("#logout-btn");
    if (!logoutBtn) return;

    AuthService.logout();
    if (sidebar) {
      sidebar.classList.add("hidden");
      document.body.classList.add("sidebar-collapsed");
    }
    navigate("login");
  });
}

function initApp() {
  const sidebar = document.getElementById("sidebar");

  initRouter();
  initSidebarUI();
  initLogout();

  if (AuthService.isAuthenticated()) {
    sidebar.classList.remove("hidden");
    navigate("dashboard");
  } else {
    sidebar.classList.add("hidden");
    navigate("login");
  }

  document.addEventListener("click", (e) => {
    const logoIcon = e.target.closest(".logo-icon");
    if (logoIcon) {
      if (sidebar.classList.contains("collapsed")) {
        sidebar.classList.remove("collapsed");
        localStorage.setItem("sidebar-collapsed", "false");
      }
      return;
    }

    const navItem = e.target.closest(".nav-item");
    if (!navItem || !navItem.dataset.route) return;

    document
      .querySelectorAll(".nav-item")
      .forEach((btn) => btn.classList.remove("nav-item--active"));

    navItem.classList.add("nav-item--active");
    navigate(navItem.dataset.route);
  });

  setInterval(() => {
    if (!AuthService.isAuthenticated()) {
      sidebar.classList.add("hidden");
      navigate("login");
    }
  }, 30_000);
}

document.addEventListener("DOMContentLoaded", initApp);
