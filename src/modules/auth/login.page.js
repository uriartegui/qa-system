import { AuthService } from "./auth.service.js";
import { navigate } from "@/core/router.js";
import { initLayout } from "@/layout/layout.init.js";

export function render() {
  const content = document.getElementById("content");

  content.innerHTML = `
    <div class="login-page">
      <div class="login-card">
        <div style="text-align:center;margin-bottom:28px;">
          <div style="display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;background:#4f46e5;border-radius:16px;margin-bottom:16px;">
            <span style="color:white;font-size:1.4rem;font-weight:700;">Q</span>
          </div>
          <h1 style="margin:0;font-size:1.6rem;font-weight:700;color:#e5e7eb;letter-spacing:0.05em;">qualyra</h1>
          <p style="margin:6px 0 0;font-size:0.85rem;color:#8b949e;">Gest&atilde;o de qualidade inteligente</p>
        </div>

        <h2 style="margin:0 0 20px;font-size:1rem;font-weight:600;color:#e5e7eb;">Entrar na sua conta</h2>

        <div class="login-form">
          <div>
            <label class="login-label">E-mail</label>
            <input
              id="login-email"
              type="email"
              placeholder="admin@qualyra.dev"
              class="login-input"
            />
          </div>
          <div>
            <label class="login-label">Senha</label>
            <input
              id="login-pass"
              type="password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              class="login-input"
            />
          </div>

          <div id="login-error" class="login-error">
            <p>E-mail ou senha inv&aacute;lidos.</p>
          </div>

          <button id="login-btn" class="login-button">Entrar</button>
        </div>

        <p style="text-align:center;margin:20px 0 0;font-size:0.75rem;color:#6b7280;">Qualyra &copy; 2026 &middot; Sistema de Gest&atilde;o de Qualidade</p>
      </div>
    </div>
  `;

  const emailInput = document.getElementById("login-email");
  const passInput = document.getElementById("login-pass");
  const errorEl = document.getElementById("login-error");
  const btn = document.getElementById("login-btn");

  btn.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    const pass = passInput.value.trim();
    errorEl.style.display = "none";

    if (!email || !pass) {
      errorEl.querySelector("p").textContent = "Preencha e-mail e senha.";
      errorEl.style.display = "block";
      return;
    }

    btn.textContent = "Entrando...";
    btn.disabled = true;

    const success = await AuthService.login(email, pass);
    if (success) {
      const sidebar = document.getElementById("sidebar");
      if (sidebar) sidebar.classList.remove("hidden");
      initLayout();
      navigate("dashboard");
    } else {
      errorEl.querySelector("p").textContent = "E-mail ou senha inv\u00e1lidos.";
      errorEl.style.display = "block";
      btn.textContent = "Entrar";
      btn.disabled = false;
    }
  });

  [emailInput, passInput].forEach((el) =>
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter") btn.click();
    }),
  );
}