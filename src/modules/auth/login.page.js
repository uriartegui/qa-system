import { AuthService } from "./auth.service.js";
import { navigate } from "@/core/router.js";
import { initLayout } from "@/layout/layout.init.js";

export function render() {
  const content = document.getElementById("content");

  content.innerHTML = `
    <div style="position:fixed;inset:0;background:#0d1117;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1rem;z-index:50;">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl"></div>
      </div>
      <div class="relative w-full max-w-md">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-2xl mb-4 shadow-lg">
            <span class="text-white text-2xl font-bold">Q</span>
          </div>
          <h1 class="text-3xl font-bold text-white tracking-tight">qualyra</h1>
          <p class="text-muted text-sm mt-2">Gestão de qualidade inteligente</p>
        </div>
        <div class="bg-surface border border-border rounded-2xl p-8 shadow-2xl">
          <h2 class="text-lg font-semibold text-white mb-6">Entrar na sua conta</h2>
          <div class="space-y-4">
            <input
              id="login-email"
              type="email"
              placeholder="E-mail"
              class="w-full bg-card border border-border rounded-xl px-4 py-3 text-white placeholder-muted text-sm focus:outline-none focus:border-primary transition-all"
            />
            <input
              id="login-pass"
              type="password"
              placeholder="Senha"
              class="w-full bg-card border border-border rounded-xl px-4 py-3 text-white placeholder-muted text-sm focus:outline-none focus:border-primary transition-all"
            />
            <div id="login-error" class="hidden bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-xl px-4 py-3">
              <p class="text-red-400 text-sm">E-mail ou senha inválidos.</p>
            </div>
            <button
              id="login-btn"
              class="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-xl transition-all text-sm active:scale-95"
            >
              Entrar
            </button>
          </div>
        </div>
        <p class="text-center text-muted text-xs mt-6">Qualyra © 2026 · Sistema de Gestão de Qualidade</p>
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
    errorEl.classList.add("hidden");

    if (!email || !pass) {
      errorEl.querySelector("p").textContent = "Preencha e-mail e senha.";
      errorEl.classList.remove("hidden");
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
      errorEl.querySelector("p").textContent = "E-mail ou senha inválidos.";
      errorEl.classList.remove("hidden");
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
