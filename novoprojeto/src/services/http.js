import { API } from "@/config/api.js";

export async function http(path, options = {}) {
  try {
    const response = await fetch(`${API.baseURL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json().catch(() => null);

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
