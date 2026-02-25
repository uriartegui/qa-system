import { TemplateService } from "./template.service.js";
import { TopicService } from "../rules/topic.service.js";
import { RuleService } from "../rules/rule.service.js";
import { attachTemplateEvents } from "./templates.events.js";

export function renderTemplates() {
  const templates = TemplateService.getAll();
  const content = document.getElementById("content");

  content.innerHTML = `
    <h2>Templates</h2>
    <button id="new-template-btn">+ Novo Template</button>
    <hr>

    <div class="templates-grid">
      ${templates
        .map(
          (t) => `
          <div class="card template-card" data-template-id="${t.id}">

            <div class="template-header">
              <strong>${t.name}</strong>
            </div>

            <div class="template-body">
              <p>${t.description || ""}</p>
              <small>Criado em: ${new Date(t.createdAt).toLocaleString()}</small><br>
              <small>Atualizado em: ${new Date(t.updatedAt).toLocaleString()}</small>

              <div class="template-actions hidden">
  <button class="view-btn">Ver</button>
  <button class="edit-btn">Editar</button>
  <button class="delete-btn danger">Excluir</button>
</div>
            </div>

          </div>
        `,
        )
        .join("")}
    </div>
  `;

  attachTemplateListEvents();
  attachTemplateEvents();
}

export function renderCreateTemplate() {
  const topics = TopicService.getAll();
  const content = document.getElementById("content");

  content.innerHTML = `
    <div class="card">
      <h2>Novo Template</h2>

      <label>Nome</label>
      <input id="new-template-name">

      <label>Descrição</label>
      <textarea id="new-template-description"></textarea>

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
                        <input type="checkbox" data-rule="${rule.id}">
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
        <button id="save-template">Salvar</button>
        <button id="cancel-template">Cancelar</button>
      </div>
    </div>
  `;

  attachTemplateEvents(true);
}

function attachTemplateListEvents() {
  document.querySelectorAll(".template-card").forEach((card) => {
    const actions = card.querySelector(".template-actions");
    const templateId = Number(card.dataset.templateId);

    card.addEventListener("click", (e) => {
      if (e.target.closest("button")) return;

      const isOpen = !actions.classList.contains("hidden");

      document
        .querySelectorAll(".template-actions")
        .forEach((a) => a.classList.add("hidden"));

      if (!isOpen) {
        actions.classList.remove("hidden");
      }
    });

    card.querySelector(".edit-btn")?.addEventListener("click", (e) => {
      e.stopPropagation();
      openTemplateEditor(templateId);
    });

    card.querySelector(".delete-btn")?.addEventListener("click", (e) => {
      e.stopPropagation();
      TemplateService.delete(templateId);
      renderTemplates();
    });
  });
}
