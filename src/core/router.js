import { AuthService } from "@/modules/auth/auth.service.js";

import {
  hasUnsavedChanges,
  saveCurrentRule,
} from "@/modules/rules/rules.events.js";

const routes = {
  dashboard: () => import("@/modules/dashboard/dashboard.page.js"),
  rules: () => import("@/modules/rules/rules.page.js"),
  regressions: () => import("@/modules/regressions/regression.page.js"),
  templates: () => import("@/modules/templates/templates.page.js"),
  history: () => import("@/modules/history/history.page.js"),

  login: () => import("@/modules/auth/login.page.js"),
};

export function initRouter() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-route]");
    if (!btn) return;

    const route = btn.dataset.route;
    navigate(route);
  });
}

export async function navigate(route) {
  if (!AuthService.isAuthenticated() && route !== "login") {
    route = "login";
  }

  if (hasUnsavedChanges()) {
    showRouteModal(route);
    return;
  }

  const pageModule = await routes[route]?.();

  if (pageModule?.render) {
    pageModule.render();
  }
}

function showRouteModal(nextRoute) {
  const modal = document.getElementById("unsaved-modal");

  modal.classList.remove("hidden");
  modal.classList.add("show");

  document.getElementById("continue-editing").onclick = () => {
    modal.classList.remove("show");
    modal.classList.add("hidden");
  };

  document.getElementById("discard-changes").onclick = () => {
    saveCurrentRule(false);
    modal.classList.remove("show");
    modal.classList.add("hidden");
    navigate(nextRoute);
  };

  document.getElementById("save-changes").onclick = () => {
    saveCurrentRule(true);
    modal.classList.remove("show");
    modal.classList.add("hidden");
    navigate(nextRoute);
  };
}
