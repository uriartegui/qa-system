import { RuleService } from "./rule.service.js";
import { TopicService } from "./topic.service.js";
import { attachRulesEvents } from "./rules.events.js";

export function render() {
  const content = document.getElementById("content");

  content.innerHTML = `
    <div class="rules-layout">

      <div class="rules-left">

        <div class="rules-header">
          <h3>Tópicos</h3>

          <div class="rules-actions">
            <input id="searchCase" placeholder="Pesquisar Case">
            <button id="add-topic-btn">Adicionar Tópico</button>
          </div>
        </div>

        <div class="topics-list">
          ${renderTopics()}
        </div>

      </div>

      <div class="resizer" id="resizer"></div>

      <div class="rules-editor" id="editor-panel">
        Selecione uma regra
      </div>

    </div>
  `;

  attachRulesEvents();
}

function renderTopics() {
  return TopicService.getAll()
    .map((topic) => {
      const rules = RuleService.getByTopic(topic.id);
      const risk = RuleService.calculateTopicRisk(topic.id);

      return `
        <div class="topic-block">

          <div class="topic-title" data-topic-id="${topic.id}">
            <span class="arrow"></span>

            <span>${topic.name}</span>

            <span class="risk-badge ${risk.toLowerCase()}">
              ${risk}
            </span>
          </div>

          <div class="subrules hidden" id="topic-${topic.id}">
            ${rules
              .map(
                (rule) => `
              <div class="subrule-item" data-rule-id="${rule.id}">
                <span>${rule.title}</span>

                <div class="case-menu" data-menu="${rule.id}">⋯</div>

                <div class="case-dropdown" id="dropdown-${rule.id}">
                  <div data-action="rename" data-id="${rule.id}">Renomear</div>
                  <div data-action="edit" data-id="${rule.id}">Editar</div>
                  <div data-action="delete" data-id="${rule.id}" class="danger">Excluir</div>
                </div>

              </div>
            `,
              )
              .join("")}
          </div>

        </div>
      `;
    })
    .join("");
}
