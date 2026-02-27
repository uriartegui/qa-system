import { AuthService } from "./auth.service.js";
import { navigate } from "@/core/router.js";

export function render() {
  const content = document.getElementById("content");

  content.innerHTML = `
    <div class="card" style="max-width:400px;margin:80px auto;">
      <h2>Login</h2>

      <input id="login-user" placeholder="Usuário" />
      <input id="login-pass" type="password" placeholder="Senha" />

      <button id="login-btn" class="btn btn--primary" style="margin-top:16px;">Entrar</button>
    </div>
  `;

  document.getElementById("login-btn")?.addEventListener("click", async () => {
    const user = document.getElementById("login-user").value;
    const pass = document.getElementById("login-pass").value;

    const success = await AuthService.login(user, pass);

    if (success) {
      const sidebar = document.getElementById("sidebar");
      sidebar.classList.remove("hidden");

      localStorage.setItem("sidebar-collapsed", "false");
      document.body.classList.remove("sidebar-collapsed");
      navigate("dashboard");
    } else {
      alert("Usuário ou senha inválidos");
    }
  });
}
