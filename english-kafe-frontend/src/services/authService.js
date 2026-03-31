import { apiClient } from "../api/client";

export function login(payload) {
  return apiClient.post("/auth/login", payload);
}

export function register(payload) {
  return apiClient.post("/auth/register", payload);
}

export function resendVerification(payload) {
  return apiClient.post("/auth/resend-verification", payload);
}

export function forgotPassword(payload) {
  return apiClient.post("/auth/forgot-password", payload);
}

export function resetPassword(token, payload) {
  return apiClient.post(`/auth/reset-password/${token}`, payload);
}

export function getCurrentUser() {
  return apiClient.get("/auth/me");
}

export function updateProfile(payload) {
  return apiClient.put("/user", payload);
}
