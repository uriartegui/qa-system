let confirmCallback = null;

export function initUI() {
  initSidebar();
}

function initSidebar() {
  const collapseBtn = document.querySelector(".collapse-btn");
  const sidebar = document.getElementById("sidebar");

  collapseBtn?.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });
}

export function showModal(message, title = "Aviso") {
  const modal = document.getElementById("app-modal");
  const confirmBtn = document.getElementById("app-modal-confirm");
  const cancelBtn = document.getElementById("app-modal-cancel");

  document.getElementById("app-modal-title").innerText = title;
  document.getElementById("app-modal-message").innerText = message;

  cancelBtn.style.display = "none";

  modal.classList.remove("hidden");
  modal.classList.add("show");

  confirmBtn.replaceWith(confirmBtn.cloneNode(true));

  const newConfirmBtn = document.getElementById("app-modal-confirm");

  newConfirmBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    modal.classList.add("hidden");
  });
}

export function showConfirm(message, onConfirm, title = "Confirmação") {
  const modal = document.getElementById("app-modal");

  document.getElementById("app-modal-title").innerText = title;
  document.getElementById("app-modal-message").innerText = message;

  document.getElementById("app-modal-cancel").style.display = "inline-block";

  confirmCallback = onConfirm;

  modal.classList.remove("hidden");
  modal.classList.add("show");

  document.getElementById("app-modal-confirm").onclick = () => {
    if (confirmCallback) confirmCallback();
    closeModal();
  };

  document.getElementById("app-modal-cancel").onclick = closeModal;
}

export function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function closeModal() {
  const modal = document.getElementById("app-modal");
  modal.classList.remove("show");
  modal.classList.add("hidden");
}
