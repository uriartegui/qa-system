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
        <p style="margin:6px 0 0;font-size:0.85rem;color:#8b949e;">Gestão de qualidade inteligente</p>
      </div>

      <div class="auth-views">
        <!-- VIEW LOGIN -->
        <div id="view-login" class="auth-view auth-view--active">
          <h2 style="margin:0 0 20px;font-size:1rem;font-weight:600;color:#e5e7eb;">
            Entrar na sua conta
          </h2>

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
                placeholder="●●●●●●●●"
                class="login-input"
              />
            </div>

            <div id="login-error" class="login-error">
              <p>E-mail ou senha inválidos.</p>
            </div>

            <button id="login-btn" class="login-button" type="button">
              Entrar
            </button>

            <div class="login-actions">
              <button id="forgot-btn" class="login-link" type="button">
                Esqueci minha senha
              </button>
              <button id="register-btn" class="login-link" type="button">
                Criar conta
              </button>
            </div>
          </div>
        </div>

        <!-- VIEW CRIAR CONTA -->
        <div id="view-register" class="auth-view">
          <h2 style="margin:0 0 8px;font-size:1rem;font-weight:600;color:#e5e7eb;">
            Criar conta
          </h2>
          <p style="margin:0 0 16px;font-size:0.85rem;color:var(--color-muted);">
            Em breve você poderá criar sua conta diretamente por aqui. Por enquanto, preencha os dados apenas para simular o fluxo.
          </p>

          <div class="login-form" style="gap:10px;">
            <div>
              <label class="login-label">Nome completo</label>
              <input id="register-name" type="text" class="login-input" />
            </div>
            <div>
              <label class="login-label">E-mail</label>
              <input id="register-email" type="email" class="login-input" />
            </div>
            <div>
              <label class="login-label">Senha</label>
              <input id="register-pass" type="password" class="login-input" />
            </div>
            <div>
              <label class="login-label">Confirmar senha</label>
              <input id="register-pass-confirm" type="password" class="login-input" />
            </div>

            <div id="register-error" class="login-error">
              <p>Preencha todos os campos.</p>
            </div>

            <div style="display:flex;justify-content:space-between;gap:8px;margin-top:10px;">
              <button id="register-back" class="login-link" type="button">
                Voltar para login
              </button>
              <button id="register-confirm" class="btn btn--primary" type="button">
                Criar conta
              </button>
            </div>
          </div>
        </div>

        <!-- VIEW ESQUECI SENHA -->
        <div id="view-forgot" class="auth-view">
          <h2 style="margin:0 0 8px;font-size:1rem;font-weight:600;color:#e5e7eb;">
            Recuperar senha
          </h2>
          <p style="margin:0 0 16px;font-size:0.85rem;color:var(--color-muted);">
            Informe o e-mail da sua conta. Quando o backend estiver pronto, enviaremos um link de redefinição para você.
          </p>

          <div class="login-form" style="gap:10px;">
            <div>
              <label class="login-label">E-mail</label>
              <input id="forgot-email" type="email" class="login-input" />
            </div>

            <div id="forgot-error" class="login-error">
              <p>Informe um e-mail válido.</p>
            </div>

            <div style="display:flex;justify-content:space-between;gap:8px;margin-top:10px;">
              <button id="forgot-back" class="login-link" type="button">
                Voltar para login
              </button>
              <button id="forgot-confirm" class="btn btn--primary" type="button">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>

      <p style="text-align:center;margin:20px 0 0;font-size:0.75rem;color:#6b7280;">
        Qualyra &copy; 2026 · Sistema de Gestão de Qualidade
      </p>
    </div>
  </div>

  <div id="notify-overlay" class="notify-overlay" role="dialog" aria-modal="true" aria-labelledby="notify-title">
    <div class="notify-box">
      <div class="notify-box-header">
        <div id="notify-icon" class="notify-icon">!</div>
        <h3 id="notify-title">Mensagem</h3>
      </div>
      <p id="notify-message"></p>
      <div class="notify-actions">
        <button id="notify-ok" class="btn btn--primary" type="button">
          OK
        </button>
      </div>
    </div>
  </div>
  `;

  //
  // Notify popup
  //
  const notifyOverlay = document.getElementById("notify-overlay");
  const notifyBox = notifyOverlay.querySelector(".notify-box");
  const notifyTitle = document.getElementById("notify-title");
  const notifyMessage = document.getElementById("notify-message");
  const notifyOk = document.getElementById("notify-ok");
  const notifyIcon = document.getElementById("notify-icon");

  function showNotify({ type = "success", title, message, onClose }) {
    const safeType = type === "error" ? "error" : "success";

    notifyBox.classList.remove("success", "error");
    notifyBox.classList.add(safeType);

    notifyIcon.textContent = safeType === "success" ? "✓" : "!";
    notifyTitle.textContent =
      title || (safeType === "success" ? "Tudo certo" : "Ops");
    notifyMessage.textContent = message || "";

    notifyOverlay.classList.add("notify-overlay--show");
    notifyOk.focus();

    function handleClose() {
      notifyOverlay.classList.remove("notify-overlay--show");
      notifyOk.removeEventListener("click", handleClose);
      document.removeEventListener("keydown", handleEsc);
      notifyOverlay.removeEventListener("click", handleBackdrop);
      if (typeof onClose === "function") onClose();
    }

    function handleEsc(e) {
      if (e.key === "Escape") handleClose();
    }

    function handleBackdrop(e) {
      if (e.target === notifyOverlay) handleClose();
    }

    notifyOk.addEventListener("click", handleClose);
    document.addEventListener("keydown", handleEsc);
    notifyOverlay.addEventListener("click", handleBackdrop);
  }

  //
  // helpers de view
  //
  const viewLogin = document.getElementById("view-login");
  const viewRegister = document.getElementById("view-register");
  const viewForgot = document.getElementById("view-forgot");

  function setView(target) {
    [viewLogin, viewRegister, viewForgot].forEach((v) =>
      v.classList.remove("auth-view--active"),
    );

    if (target === "login") viewLogin.classList.add("auth-view--active");
    if (target === "register") viewRegister.classList.add("auth-view--active");
    if (target === "forgot") viewForgot.classList.add("auth-view--active");
  }

  //
  // LOGIN (view login)
  //
  const emailInput = document.getElementById("login-email");
  const passInput = document.getElementById("login-pass");
  const errorEl = document.getElementById("login-error");
  const btn = document.getElementById("login-btn");

  errorEl.style.display = "none";

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
    emailInput.disabled = true;
    passInput.disabled = true;

    const success = await AuthService.login(email, pass);

    if (success) {
      const sidebar = document.getElementById("sidebar");
      if (sidebar) sidebar.classList.remove("hidden");
      initLayout();
      navigate("dashboard");
    } else {
      errorEl.querySelector("p").textContent = "E-mail ou senha inválidos.";
      errorEl.style.display = "block";
      btn.textContent = "Entrar";
      btn.disabled = false;
      emailInput.disabled = false;
      passInput.disabled = false;
    }
  });

  [emailInput, passInput].forEach((el) =>
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter") btn.click();
    }),
  );

  //
  // Navegação entre views
  //
  const forgotBtn = document.getElementById("forgot-btn");
  const registerBtn = document.getElementById("register-btn");
  const registerBack = document.getElementById("register-back");
  const forgotBack = document.getElementById("forgot-back");

  //
  // Mock criar conta
  //
  const registerName = document.getElementById("register-name");
  const registerEmail = document.getElementById("register-email");
  const registerPass = document.getElementById("register-pass");
  const registerPassConfirm = document.getElementById("register-pass-confirm");
  const registerError = document.getElementById("register-error");
  const registerConfirm = document.getElementById("register-confirm");

  registerError.style.display = "none";

  function resetRegisterForm() {
    if (!registerName) return;
    registerError.style.display = "none";
    registerName.value = "";
    registerEmail.value = "";
    registerPass.value = "";
    registerPassConfirm.value = "";
  }

  //
  // Mock esqueci senha
  //
  const forgotEmail = document.getElementById("forgot-email");
  const forgotError = document.getElementById("forgot-error");
  const forgotConfirm = document.getElementById("forgot-confirm");

  forgotError.style.display = "none";

  function resetForgotForm() {
    if (!forgotEmail) return;
    forgotError.style.display = "none";
    forgotEmail.value = "";
  }

  // Navegação
  if (registerBtn) {
    registerBtn.addEventListener("click", () => {
      resetRegisterForm();
      setView("register");
    });
  }

  if (forgotBtn) {
    forgotBtn.addEventListener("click", () => {
      resetForgotForm();
      setView("forgot");
    });
  }

  if (registerBack) {
    registerBack.addEventListener("click", () => {
      resetRegisterForm();
      setView("login");
    });
  }

  if (forgotBack) {
    forgotBack.addEventListener("click", () => {
      resetForgotForm();
      setView("login");
    });
  }

  // Criar conta (mock)
  if (registerConfirm) {
    registerConfirm.addEventListener("click", () => {
      registerError.style.display = "none";

      const name = registerName.value.trim();
      const email = registerEmail.value.trim();
      const pass = registerPass.value.trim();
      const pass2 = registerPassConfirm.value.trim();

      if (!name || !email || !pass || !pass2) {
        registerError.querySelector("p").textContent =
          "Preencha todos os campos.";
        registerError.style.display = "block";
        return;
      }

      if (pass !== pass2) {
        registerError.querySelector("p").textContent =
          "As senhas não conferem.";
        registerError.style.display = "block";
        return;
      }

      // MOCK: aqui no futuro vai o POST /auth/register
      showNotify({
        type: "success",
        title: "Conta criada",
        message:
          "Sua conta (mock) foi criada com sucesso. Você já pode entrar usando este e-mail.",
        onClose: () => {
          setView("login");
          emailInput.value = email;
        },
      });
    });
  }

  // Esqueci senha (mock)
  if (forgotConfirm) {
    forgotConfirm.addEventListener("click", () => {
      forgotError.style.display = "none";

      const email = forgotEmail.value.trim();
      if (!email) {
        forgotError.querySelector("p").textContent = "Informe um e-mail.";
        forgotError.style.display = "block";
        return;
      }

      // MOCK: aqui no futuro vai o POST /auth/forgot-password
      showNotify({
        type: "success",
        title: "E-mail de recuperação",
        message:
          "Se este e-mail existir, enviaremos um link de recuperação (mock).",
        onClose: () => {
          setView("login");
        },
      });
    });
  }
}
