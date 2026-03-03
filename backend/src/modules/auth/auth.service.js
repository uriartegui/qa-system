const SESSION_KEY = "qa:session";
const SESSION_DURATION = 60 * 60 * 1000;

export const AuthService = {
  async login(email, password) {
    if (!email || !password) return false;

    const validEmail = "admin@qualyra.dev";
    const validPass = "qualyra123";

    if (email !== validEmail || password !== validPass) {
      return false;
    }

    const session = {
      token: "mock-jwt-token-123",
      user: {
        id: "user-1",
        name: "Guilherme Uriarte",
        email: validEmail,
        role: "OWNER",
      },
      organization: {
        id: "org-1",
        name: "Qualyra Labs",
      },
      expiresAt: Date.now() + SESSION_DURATION,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
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

  getToken() {
    return this.getSession()?.token || null;
  },

  isAuthenticated() {
    return !!this.getSession();
  },
};
