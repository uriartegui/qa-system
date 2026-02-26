import { AuthService } from "./auth.service.js";
import { navigate } from "@/core/router.js";

export function render() {
  const content = document.getElementById("content");

  content.innerHTML = `
    <div class="card" style="max-width:400px;margin:80px auto;">
      <h2>Login</h2>

      <input id="login-user" placeholder="Usuário" />
      <input id="login-pass" type="password" placeholder="Senha" />

      <button id="login-btn">Entrar</button>
    </div>
  `;

  document.getElementById("login-btn")?.addEventListener("click", () => {
    const user = document.getElementById("login-user").value;
    const pass = document.getElementById("login-pass").value;

    const success = AuthService.login(user, pass);

    if (success) {
      location.reload();
    } else {
      alert("Usuário ou senha inválidos");
    }
  });
}
