const SESSION_KEY = "qa:session";
const SESSION_DURATION = 60 * 60 * 1000; // 1 hora

export const AuthService = {
  async login(username, password) {
    if (!username || !password) return false;

    const session = {
      token: "mock-jwt-token",
      user: {
        id: "mock-id",
        username,
        role: "ADMIN",
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

  getToken() {
    return this.getSession()?.token || null;
  },

  isAuthenticated() {
    return !!this.getSession();
  },
};
