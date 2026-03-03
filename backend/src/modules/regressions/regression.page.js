import { ExecutionService } from "./execution.service.js";
import { TemplateService } from "../templates/template.service.js";
import { navigate } from "../../core/router.js";

export function render() {
  const regressions = ExecutionService.getAll();

  let html = `
    <div class="regression-header">
      <h2>Regressões</h2>
      <button id="new-regression">+ Nova Regressão</button>
    </div>
    <hr>
  `;

  regressions.forEach((r) => {
    html += `
      <div class="card" style="margin-top:15px;">
        <strong>${r.name}</strong><br>
        <small>${new Date(r.date).toLocaleDateString()}</small>
      </div>
    `;
  });

  document.getElementById("content").innerHTML = html;

  attachRegressionEvents();
}

function attachRegressionEvents() {
  document
    .getElementById("new-regression")
    ?.addEventListener("click", openTemplateSelector);
}

function openTemplateSelector() {
  const templates = TemplateService.getAll();

  let html = `
    <div class="card">
      <h2>Escolher Template</h2>
      <hr>
  `;

  templates.forEach((template) => {
    html += `
      <div class="card template-option"
           data-template-id="${template.id}"
           style="margin-top:15px; cursor:pointer;">
        <strong>${template.name}</strong><br>
        <small>${template.ruleIds.length} regras</small>
      </div>
    `;
  });

  html += `
      <button id="cancel-regression">Cancelar</button>
    </div>
  `;

  document.getElementById("content").innerHTML = html;

  document.querySelectorAll("[data-template-id]").forEach((card) => {
    card.addEventListener("click", () => {
      const template = TemplateService.getById(card.dataset.templateId);

      if (!template.ruleIds || template.ruleIds.length === 0) {
        alert("Este template não possui regras selecionadas.");
        return;
      }

      ExecutionService.createFromTemplate(template);

      navigate("regressions");
    });
  });

  document
    .getElementById("cancel-regression")
    ?.addEventListener("click", render);
}
