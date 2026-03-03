import { db } from "@/core/db.js";

export function render() {
  let html = `<div class="card"><h3>Histórico</h3>`;

  db.executions
    .slice()
    .reverse()
    .forEach((exec) => {
      html += `
        <div>
          ${exec.date} -
          <span class="badge risk-${exec.risk.toLowerCase()}">
            ${exec.risk}
          </span>
        </div>
      `;
    });

  html += "</div>";

  document.getElementById("content").innerHTML = html;
}
