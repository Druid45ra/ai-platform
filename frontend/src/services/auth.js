// src/services/auth.js
import api from "./api";

export const authService = {
  async login(credentials) {
    const { data } = await api.post("/api/auth/login", credentials);
    return data;
  },

  async register(userData) {
    const { data } = await api.post("/api/auth/register", userData);
    return data;
  },

  async getCurrentUser() {
    const { data } = await api.get("/api/auth/me");
    return data;
  },

  logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  },
};
