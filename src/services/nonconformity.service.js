import { http } from "@/services/http.js";

export const NonConformityService = {
  async findAll(page = 0, size = 20) {
    return await http(`/non-conformities?page=${page}&size=${size}`);
  },

  async findById(id) {
    return await http(`/non-conformities/${id}`);
  },

  async create(dto) {
    return await http("/non-conformities", {
      method: "POST",
      body: JSON.stringify(dto),
    });
  },

  async update(id, dto) {
    return await http(`/non-conformities/${id}`, {
      method: "PUT",
      body: JSON.stringify(dto),
    });
  },

  async remove(id) {
    return await http(`/non-conformities/${id}`, {
      method: "DELETE",
    });
  },
};
