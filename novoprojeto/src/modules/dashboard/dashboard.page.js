import { RuleService } from "../rules/rule.service.js";
import { db } from "../../core/db.js";
import { navigate } from "../../core/router.js";

export function render() {
  const lastCase = RuleService.getAll().sort(
    (a, b) => b.lastUpdated - a.lastUpdated,
  )[0];

  const recentCases = RuleService.getAll()
    .sort((a, b) => b.lastUpdated - a.lastUpdated)
    .slice(0, 5);

  const lastRegression = [...db.regressions].sort((a, b) => b.date - a.date)[0];

  document.getElementById("content").innerHTML = `
    <div class="dashboard-flow">
      <h1>Workspace</h1>

      <div class="dash-block">
        <h3>Continue de onde parou</h3>
        <div class="dash-card" id="last-case">
          ${lastCase ? lastCase.title : "Nenhum case recente"}
        </div>
      </div>

      <div class="dash-block">
        <h3>Atualizados recentemente</h3>
        ${
          recentCases.length
            ? recentCases
                .map(
                  (c) => `
              <div class="dash-item" data-id="${c.id}">
                ${c.title}
              </div>
            `,
                )
                .join("")
            : `<div class="dash-muted">Nenhum case ainda</div>`
        }
      </div>

      <div class="dash-block">
        <h3>Última regressão</h3>
        <div class="dash-card" id="last-regression">
          ${lastRegression ? lastRegression.name : "Nenhuma regressão criada"}
        </div>
      </div>

      <div class="dash-block">
        <h3>Ações rápidas</h3>
        <div class="dash-actions">
          <button data-route="rules">Novo Case</button>
          <button data-route="regressions">Nova Regressão</button>
          <button data-route="templates">Novo Template</button>
        </div>
      </div>
    </div>
  `;

  attachDashboardEvents(lastCase, lastRegression);
}

function attachDashboardEvents(lastCase, lastRegression) {
  if (lastCase) {
    document.getElementById("last-case")?.addEventListener("click", () => {
      navigate("rules");
    });
  }

  document.querySelectorAll(".dash-item").forEach((item) => {
    item.addEventListener("click", () => {
      navigate("rules");
    });
  });

  if (lastRegression) {
    document
      .getElementById("last-regression")
      ?.addEventListener("click", () => {
        navigate("regressions");
      });
  }
}
