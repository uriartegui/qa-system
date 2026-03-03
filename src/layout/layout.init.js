import { AuthService } from "@/modules/auth/auth.service.js";

export function initLayout() {
  const session = AuthService.getSession();
  const user = session?.user;
  const org = session?.organization;

  const nameEl = document.getElementById("sidebar-user-name");
  const orgEl = document.getElementById("sidebar-org-name");

  if (nameEl && user) nameEl.textContent = user.name;
  if (orgEl && org) orgEl.textContent = org.name;
}
