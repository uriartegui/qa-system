import { RuleService } from "./rule.service.js";
import { renderRules } from "./rules.page.js";
import { saveDB } from "../../core/db.js";

let editingRuleId = null;
let editingDraft = null;
let isDirty = false;

export function attachRulesEvents() {
  toggleTopics();
  openRule();
  dropdownLogic();
  searchLogic();
  resizerLogic();

  attachRenameEvents();
  attachDeleteEvents();
}

function toggleTopics() {
  document.querySelectorAll(".topic-title").forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.dataset.topicId;
      const container = document.getElementById(`topic-${id}`);
      const arrow = el.querySelector(".arrow");

      container.classList.toggle("hidden");
      arrow.classList.toggle("arrow--open");
    });
  });
}

function openRule() {
  document.querySelectorAll(".subrule-item").forEach((el) => {
    el.addEventListener("click", (e) => {
      if (e.target.closest(".case-menu")) return;
      if (e.target.closest(".case-dropdown")) return;

      const id = el.dataset.ruleId;

      if (isDirty) {
        showUnsavedModal(id);
        return;
      }

      viewRule(id);
    });
  });
}

function showUnsavedModal(nextRuleId) {
  const modal = document.getElementById("unsaved-modal");

  modal.classList.remove("hidden");
  modal.classList.add("show");

  document.getElementById("continue-editing").onclick = () => {
    modal.classList.remove("show");
    modal.classList.add("hidden");
  };

  document.getElementById("discard-changes").onclick = () => {
    isDirty = false;
    modal.classList.remove("show");
    modal.classList.add("hidden");
    viewRule(nextRuleId);
  };

  document.getElementById("save-changes").onclick = () => {
    RuleService.update(editingRuleId, editingDraft);
    saveDB();
    isDirty = false;

    modal.classList.remove("show");
    modal.classList.add("hidden");
    viewRule(nextRuleId);
  };
}

function dropdownLogic() {
  document.querySelectorAll(".case-menu").forEach((menu) => {
    menu.addEventListener("click", (e) => {
      e.stopPropagation();

      const id = menu.dataset.menu;

      document
        .querySelectorAll(".case-dropdown")
        .forEach((d) => d.classList.remove("open"));

      document.getElementById(`dropdown-${id}`).classList.toggle("open");
    });
  });

  document.addEventListener("click", () => {
    document
      .querySelectorAll(".case-dropdown")
      .forEach((d) => d.classList.remove("open"));
  });
}

function searchLogic() {
  const input = document.getElementById("searchCase");
  if (!input) return;

  input.addEventListener("blur", () => {
    const term = input.value.toLowerCase();

    document.querySelectorAll(".subrule-item").forEach((el) => {
      el.style.display = el.innerText.toLowerCase().includes(term)
        ? "flex"
        : "none";
    });
  });
}

function resizerLogic() {
  const resizer = document.getElementById("resizer");
  const left = document.querySelector(".rules-left");

  if (!resizer || !left) return;

  let isResizing = false;

  resizer.addEventListener("mousedown", () => {
    isResizing = true;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isResizing) return;
    left.style.width = e.clientX + "px";
  });

  document.addEventListener("mouseup", () => {
    isResizing = false;
  });
}

function viewRule(id) {
  editingRuleId = id;

  const original = RuleService.getById(id);

  editingDraft = JSON.parse(JSON.stringify(original));
  isDirty = false;

  const rule = RuleService.getById(id);
  const panel = document.getElementById("editor-panel");

  panel.innerHTML = `
    <h2>${editingDraft.title}</h2>

    <textarea id="rule-description">${editingDraft.description || ""}</textarea>

    <div id="steps-container">
  ${(editingDraft.stepsList || [])
    .map(
      (s, i) => `
    <div class="step-item"
         draggable="true"
         data-index="${i}">

      <div class="step-left">
        <span class="step-number">${i + 1}</span>
      </div>

      <div class="step-center">
        <input value="${s.text || ""}" data-step="${i}">
      </div>

      <div class="step-right">
        <button data-remove="${i}">✕</button>
      </div>

    </div>
  `,
    )
    .join("")}
</div>

    <button id="add-step">+ Passo</button>

<textarea id="rule-expected">${editingDraft.expected || ""}</textarea>


    <button id="save-rule">Salvar</button>
  `;

  attachEditorEvents(editingRuleId);
}

function attachEditorEvents(id) {
  document.getElementById("add-step")?.addEventListener("click", () => {
    editingDraft.stepsList.push({ text: "", evidence: "" });
    isDirty = true;
    updateStepsUI(id);
  });

  document.getElementById("save-rule")?.addEventListener("click", () => {
    RuleService.update(editingRuleId, editingDraft);
    saveDB();
    isDirty = false;
  });

  enableDragAndDrop(id);

  document.querySelectorAll("[data-step]").forEach((input) => {
    input.addEventListener("input", () => {
      const index = Number(input.dataset.step);

      editingDraft.stepsList[index].text = input.value;
      isDirty = true;
    });
  });

  document
    .getElementById("rule-description")
    ?.addEventListener("input", (e) => {
      editingDraft.description = e.target.value;
      isDirty = true;
    });

  document.getElementById("rule-expected")?.addEventListener("input", (e) => {
    editingDraft.expected = e.target.value;
    isDirty = true;
  });
}

function enableDragAndDrop(ruleId) {
  const container = document.getElementById("steps-container");
  if (!container) return;

  let draggedIndex = null;

  container.querySelectorAll(".step-item").forEach((item) => {
    item.addEventListener("dragstart", (e) => {
      draggedIndex = Number(item.dataset.index);
      item.classList.add("dragging");
    });

    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
    });

    item.addEventListener("dragover", (e) => {
      e.preventDefault();
      item.classList.add("over");
    });

    item.addEventListener("dragleave", () => {
      item.classList.remove("over");
    });

    item.addEventListener("drop", () => {
      item.classList.remove("over");
      const targetIndex = Number(item.dataset.index);
      reorderSteps(ruleId, draggedIndex, targetIndex);
    });
  });
}

function reorderSteps(ruleId, from, to) {
  const moved = editingDraft.stepsList.splice(from, 1)[0];
  editingDraft.stepsList.splice(to, 0, moved);

  isDirty = true;

  updateStepsUI(ruleId);
}

function updateStepsUI(ruleId) {
  const container = document.getElementById("steps-container");

  container.innerHTML = editingDraft.stepsList
    .map(
      (s, i) => `
      <div class="step-item"
           draggable="true"
           data-index="${i}">
        <div class="step-left">
          <span class="step-number">${i + 1}</span>
        </div>
        <div class="step-center">
          <input value="${s.text || ""}" data-step="${i}">
        </div>
        <div class="step-right">
          <button data-remove="${i}">✕</button>
        </div>
      </div>
    `,
    )
    .join("");

  enableDragAndDrop(ruleId);
  enableStepEvents(ruleId);
}

function enableStepEvents(id) {
  document.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      editingDraft.stepsList.splice(btn.dataset.remove, 1);
      isDirty = true;
      updateStepsUI(id);
    });
  });

  document.querySelectorAll("[data-step]").forEach((input) => {
    input.addEventListener("input", () => {
      const index = Number(input.dataset.step);
      editingDraft.stepsList[index].text = input.value;
      isDirty = true;
    });
  });
}

export function hasUnsavedChanges() {
  return isDirty;
}

export function saveCurrentRule(shouldSave = true) {
  if (!editingRuleId) return;

  if (shouldSave) {
    RuleService.update(editingRuleId, editingDraft);
    saveDB();
  }

  editingDraft = null;
  editingRuleId = null;
  isDirty = false;
}

function attachRenameEvents() {
  document.querySelectorAll('[data-action="rename"]').forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      const id = btn.dataset.id;
      openRenameModal(id);
    });
  });
}

function openRenameModal(id) {
  const rule = RuleService.getById(id);
  const modal = document.getElementById("renameCaseModal");

  document.getElementById("renameCaseInput").value = rule.title;

  modal.classList.remove("hidden");
  modal.classList.add("show");

  document.getElementById("confirmRename").onclick = () => {
    const newName = document.getElementById("renameCaseInput").value.trim();

    if (!newName) return;

    RuleService.rename(id, newName);

    modal.classList.remove("show");
    modal.classList.add("hidden");

    renderRules();
  };
}

function attachDeleteEvents() {
  document.querySelectorAll('[data-action="delete"]').forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      const id = btn.dataset.id;
      openDeleteModal(id);
    });
  });
}

function openDeleteModal(id) {
  const modal = document.getElementById("deleteModal");

  modal.classList.remove("hidden");
  modal.classList.add("show");

  document.getElementById("confirmDelete").onclick = () => {
    RuleService.delete(id);

    modal.classList.remove("show");
    modal.classList.add("hidden");

    renderRules();
  };
}
