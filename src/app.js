import "./assets/styles/style.css";
import { ENV } from "@/config/env.js";
import { AuthService } from "@/modules/auth/auth.service.js";
import { initRouter, navigate } from "@/core/router.js";

document.title = ENV.appName;

function initApp() {
  const sidebar = document.getElementById("sidebar");

  initRouter();
  initSidebarUI();

  if (AuthService.isAuthenticated()) {
    sidebar.classList.remove("hidden");
    navigate("dashboard");
  } else {
    sidebar.classList.add("hidden");
    navigate("login");
  }

  document.addEventListener("click", (e) => {
    const navItem = e.target.closest(".nav-item");
    const logoutBtn = e.target.closest("#logout-btn");

    if (logoutBtn) {
      AuthService.logout();
      sidebar.classList.add("hidden");
      navigate("login");
      return;
    }

    if (!navItem || !navItem.dataset.route) return;

    document
      .querySelectorAll(".nav-item")
      .forEach((btn) => btn.classList.remove("nav-item--active"));

    navItem.classList.add("nav-item--active");

    navigate(navItem.dataset.route);
  });
}

initApp();

setInterval(() => {
  if (!AuthService.isAuthenticated()) {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.add("hidden");
    navigate("login");
  }
}, 30_000);

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
