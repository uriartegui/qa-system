import { http } from "@/services/http.js";

const SESSION_KEY = "qa:session";
const SESSION_DURATION = 60 * 60 * 1000;

export const AuthService = {
  async login(email, password) {
    if (!email || !password) return false;

    try {
      const data = await http("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const session = {
        token: data.token,
        user: {
          id: data.user?.id,
          name: data.user?.name,
          email: data.user?.email,
          role: data.user?.role,
        },
        organization: {
          id: data.user?.organizationId,
          name: data.user?.organizationName,
        },
        expiresAt: Date.now() + SESSION_DURATION,
      };

      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  },

  logout() {
    localStorage.removeItem(SESSION_KEY);
  },

  getSession() {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (Date.now() > session.expiresAt) {
      this.logout();
      return null;
    }
    return session;
  },

  getUser() {
    return this.getSession()?.user || null;
  },

  getOrganization() {
    return this.getSession()?.organization || null;
  },

  isAuthenticated() {
    return this.getSession() !== null;
  },
};
