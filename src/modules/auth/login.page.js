import { AuthService } from "./auth.service.js";
import { navigate } from "@/core/router.js";
import { initLayout } from "@/layout/layout.init.js";

export function render() {
  const content = document.getElementById("content");

  content.innerHTML = `
  <div class="login-page">
    <div class="login-card">
      <div class="login-logo">Qualyra</div>

      <div class="login-form">
        <label for="login-email" class="login-label">E-mail</label>
        <input id="login-email" type="email" class="login-input" placeholder="voce@empresa.com" />

        <label for="login-pass" class="login-label">Senha</label>
        <input id="login-pass" type="password" class="login-input" placeholder="••••••••" />

        <button id="login-btn" class="login-button">
          Entrar
        </button>

        <p id="login-error" class="login-error">
          E-mail ou senha inválidos.
        </p>
      </div>
    </div>
  </div>
`;

  const emailInput = document.getElementById("login-email");
  const passInput = document.getElementById("login-pass");
  const errorEl = document.getElementById("login-error");

  document.getElementById("login-btn")?.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    const pass = passInput.value.trim();

    if (!email || !pass) {
      errorEl.textContent = "Preencha e-mail e senha.";
      errorEl.style.display = "block";
      return;
    }

    const success = await AuthService.login(email, pass);

    if (success) {
      errorEl.style.display = "none";

      const sidebar = document.getElementById("sidebar");
      sidebar.classList.remove("hidden");
      localStorage.setItem("sidebar-collapsed", "false");
      document.body.classList.remove("sidebar-collapsed");

      initLayout();
      navigate("dashboard");
    } else {
      errorEl.textContent = "E-mail ou senha inválidos.";
      errorEl.style.display = "block";
    }
  });
}
