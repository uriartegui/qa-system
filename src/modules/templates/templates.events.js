import { TemplateService } from "./template.service.js";
import { navigate } from "@/core/router.js";

import { TopicService } from "../rules/topic.service.js";
import { RuleService } from "../rules/rule.service.js";

import { ExecutionService } from "../regressions/execution.service.js";

import { showModal } from "../../core/ui.js";

export function attachTemplateEvents(isCreate = false) {
  document
    .getElementById("new-template-btn")
    ?.addEventListener("click", () => navigate("templates"));

  if (isCreate) {
    document.getElementById("save-template")?.addEventListener("click", () => {
      const name = document.getElementById("new-template-name").value.trim();
      const description = document
        .getElementById("new-template-description")
        .value.trim();

      const selectedRules = [
        ...document.querySelectorAll("[data-rule]:checked"),
      ].map((cb) => Number(cb.dataset.rule));

      if (!name) {
        showModal("Informe o nome do template.");
        return;
      }

      if (selectedRules.length === 0) {
        showModal("Selecione pelo menos uma regra.");
        return;
      }

      const template = TemplateService.create(name, description);

      TemplateService.update(template.id, {
        ruleIds: selectedRules,
      });

      navigate("templates");
    });

    document
      .getElementById("cancel-template")
      ?.addEventListener("click", () => navigate("templates"));

    document.querySelectorAll("[data-topic-toggle]").forEach((header) => {
      header.addEventListener("click", () => {
        const topicId = header.dataset.topicToggle;
        const body = document.getElementById(`tpl-topic-${topicId}`);
        const arrow = header.querySelector(".arrow");

        body.classList.toggle("hidden");
        arrow.classList.toggle("open");
      });
    });
  }
}

function openCreateTemplate() {
  const content = document.getElementById("content");

  content.innerHTML = `
    <div class="card">
      <h2>Novo Template</h2>

      <label>Nome</label>
      <input id="template-name">

      <label>Descrição</label>
      <textarea id="template-description"></textarea>

      <div style="margin-top:20px">
        <button id="save-template">Salvar</button>
        <button id="cancel-template">Cancelar</button>
      </div>
    </div>
  `;

  document.getElementById("save-template")?.addEventListener("click", () => {
    const name = document.getElementById("template-name").value.trim();

    const description = document
      .getElementById("template-description")
      .value.trim();

    if (!name) return;

    TemplateService.create(name, description);
    navigate("templates");
  });

  document
    .getElementById("cancel-template")
    ?.addEventListener("click", () => navigate("templates"));
}

function openTemplateEditor(id) {
  const template = TemplateService.getById(id);
  if (!template) return;

  const topics = TopicService.getAll();
  const content = document.getElementById("content");

  content.innerHTML = `
    <div class="card">
      <h2>Editando Template</h2>

      <label>Nome</label>
      <input id="edit-template-name" value="${template.name}">

      <label>Descrição</label>
      <textarea id="edit-template-description">
${template.description || ""}
      </textarea>

      <hr style="margin:30px 0;">

      <h3>Selecionar Regras</h3>

      ${topics
        .map((topic) => {
          const rules = RuleService.getByTopic(topic.id);
          if (!rules.length) return "";

          return `
            <div class="template-section">

              <div class="section-header" data-topic-toggle="${topic.id}">
                <span class="arrow"></span>
                <strong>${topic.name}</strong>
              </div>

              <div class="section-body hidden" id="tpl-topic-${topic.id}">
                ${rules
                  .map(
                    (rule) => `
                      <div class="template-row">
                        <input type="checkbox"
                          data-rule-toggle="${rule.id}"
                          ${template.ruleIds.includes(rule.id) ? "checked" : ""}
                        >
                        <span>${rule.title}</span>
                      </div>
                    `,
                  )
                  .join("")}
              </div>

            </div>
          `;
        })
        .join("")}

      <div style="margin-top:30px;">
  <button id="update-template">Salvar</button>
  <button id="delete-template" class="danger-btn">Excluir</button>
  <button id="back-templates">Voltar</button>
</div>
    </div>
  `;

  attachTemplateEditorEvents(id);
}

function attachTemplateEditorEvents(templateId) {
  document.getElementById("update-template")?.addEventListener("click", () => {
    const template = TemplateService.getById(templateId);

    if (!template.ruleIds || template.ruleIds.length === 0) {
      alert("O template precisa ter pelo menos uma regra selecionada.");
      return;
    }

    TemplateService.update(templateId, {
      name: document.getElementById("edit-template-name").value.trim(),
      description: document
        .getElementById("edit-template-description")
        .value.trim(),
    });

    navigate("templates");
  });

  document.getElementById("delete-template")?.addEventListener("click", () => {
    TemplateService.delete(templateId);
    navigate("templates");
  });

  document
    .getElementById("back-templates")
    ?.addEventListener("click", renderTemplates);

  document.querySelectorAll("[data-rule-toggle]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      TemplateService.toggleRule(
        templateId,
        Number(checkbox.dataset.ruleToggle),
      );
    });
  });

  document.querySelectorAll("[data-topic-toggle]").forEach((header) => {
    header.addEventListener("click", () => {
      const topicId = header.dataset.topicToggle;
      const body = document.getElementById(`tpl-topic-${topicId}`);
      const arrow = header.querySelector(".arrow");

      body.classList.toggle("hidden");
      arrow.classList.toggle("open");
    });
  });
}
