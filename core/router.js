import { renderDashboard } from "../modules/dashboard/dashboard.page.js";
import { renderRules } from "../modules/rules/rules.page.js";
import {
  hasUnsavedChanges,
  saveCurrentRule,
} from "../modules/rules/rules.events.js";
import { renderRegressions } from "../modules/regressions/regression.page.js";
import { renderTemplates } from "../modules/templates/templates.page.js";
import { renderHistory } from "../modules/history/history.page.js";

const routes = {
  dashboard: renderDashboard,
  rules: renderRules,
  regressions: renderRegressions,
  templates: renderTemplates,
  history: renderHistory,
};

export function initRouter() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-route]");
    if (!btn) return;

    const route = btn.dataset.route;
    navigate(route);
  });

  navigate("dashboard");
}

export function navigate(route) {
  if (hasUnsavedChanges()) {
    showRouteModal(route);
    return;
  }

  routes[route]?.();
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
    routes[nextRoute]?.();
  };

  document.getElementById("save-changes").onclick = () => {
    saveCurrentRule(true);
    modal.classList.remove("show");
    modal.classList.add("hidden");
    routes[nextRoute]?.();
  };
}
