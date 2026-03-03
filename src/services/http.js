import { API } from "@/config/api.js";

function getToken() {
  try {
    const raw = localStorage.getItem("qa:session");
    if (!raw) return null;
    const session = JSON.parse(raw);
    return session?.token || null;
  } catch {
    return null;
  }
}

export async function http(path, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API.baseURL}${path}`, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => null);

    if (response.status === 401) {
      localStorage.removeItem("qa:session");
      window.location.hash = "#login";
      throw { status: 401, message: "Sessão expirada. Faça login novamente." };
    }

    if (!response.ok) {
      throw {
        status: response.status,
        message: data?.message || "Erro na requisição",
      };
    }

    return data;
  } catch (error) {
    console.error("HTTP Error:", error);
    throw error;
  }
}
