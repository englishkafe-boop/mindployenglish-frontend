import { apiClient } from "../api/client";

export function login(payload) {
  return apiClient.post("/auth/login", payload);
}

export function getCurrentUser() {
  return apiClient.get("/auth/me");
}
