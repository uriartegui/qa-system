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
    <div class="p-8 max-w-5xl mx-auto">

      <!-- Header -->
      <div class="mb-8 flex items-baseline justify-between gap-4">
  <div>
    <h1 class="text-xl font-semibold text-text-main">Workspace</h1>
    <p class="text-sm text-muted mt-1">
      Bem-vindo ao painel de qualidade da Qualyra.
    </p>
  </div>
  <span class="text-xs px-2.5 py-1 rounded-full bg-card border border-border text-muted">
    Ambiente de desenvolvimento
  </span>
</div>


      <!-- Stats cards -->
      <div class="grid grid-cols-3 gap-4 mb-8">
        <div class="bg-surface rounded-xl p-5 border border-border">
          <p class="text-muted text-xs uppercase tracking-wider mb-1">Não Conformidades</p>
          <p class="text-3xl font-bold text-white">0</p>
          <p class="text-success text-xs mt-1">↑ 0 esta semana</p>
        </div>
        <div class="bg-surface rounded-xl p-5 border border-border">
          <p class="text-muted text-xs uppercase tracking-wider mb-1">Em Progresso</p>
          <p class="text-3xl font-bold text-warning">0</p>
          <p class="text-muted text-xs mt-1">Aguardando resolução</p>
        </div>
        <div class="bg-surface rounded-xl p-5 border border-border">
          <p class="text-muted text-xs uppercase tracking-wider mb-1">Críticas</p>
          <p class="text-3xl font-bold text-danger">0</p>
          <p class="text-muted text-xs mt-1">Requerem atenção imediata</p>
        </div>
      </div>

      <!-- Continue de onde parou + Última regressão -->
      <div class="grid grid-cols-2 gap-4 mb-8">
        <div class="bg-surface rounded-xl p-5 border border-border">
          <h3 class="text-sm font-medium text-muted uppercase tracking-wider mb-3">Continue de onde parou</h3>
          <div class="bg-card rounded-lg p-4 border border-border">
            <p class="text-white text-sm">${lastCase ? lastCase.title : "Nenhum case recente"}</p>
            ${lastCase ? `<p class="text-muted text-xs mt-1">Última atualização recente</p>` : ""}
          </div>
        </div>
        <div class="bg-surface rounded-xl p-5 border border-border">
          <h3 class="text-sm font-medium text-muted uppercase tracking-wider mb-3">Última regressão</h3>
          <div class="bg-card rounded-lg p-4 border border-border">
            <p class="text-white text-sm">${lastRegression ? lastRegression.name : "Nenhuma regressão criada"}</p>
            ${lastRegression ? `<p class="text-muted text-xs mt-1">${new Date(lastRegression.date).toLocaleDateString()}</p>` : ""}
          </div>
        </div>
      </div>

      <!-- Atualizados recentemente -->
      <div class="bg-surface rounded-xl p-5 border border-border mb-8">
        <h3 class="text-sm font-medium text-muted uppercase tracking-wider mb-3">Atualizados recentemente</h3>
        ${
          recentCases.length
            ? recentCases
                .map(
                  (c) => `
            <div class="flex items-center gap-3 py-3 border-b border-border last:border-0">
              <div class="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
              <span class="text-white text-sm">${c.title}</span>
            </div>`,
                )
                .join("")
            : `<p class="text-muted text-sm">Nenhum case ainda</p>`
        }
      </div>

      <!-- Ações rápidas -->
      <div>
        <h3 class="text-sm font-medium text-muted uppercase tracking-wider mb-3">Ações rápidas</h3>
        <div class="flex gap-3">
          <button data-route="rules" class="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm rounded-lg transition-colors">
            + Novo Case
          </button>
          <button data-route="regressions" class="px-4 py-2 bg-surface hover:bg-card text-white text-sm rounded-lg border border-border transition-colors">
            + Nova Regressão
          </button>
          <button data-route="templates" class="px-4 py-2 bg-surface hover:bg-card text-white text-sm rounded-lg border border-border transition-colors">
            + Novo Template
          </button>
        </div>
      </div>

    </div>
  `;
}
