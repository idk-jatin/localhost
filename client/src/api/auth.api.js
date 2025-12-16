import api from "./axios";

export const loginApi = (data) =>
  api.post("/auth/login", data);

export const registerApi = (data) =>
  api.post("/auth/register", data);

export const verifyOtpApi = (data) =>
  api.post("/auth/verify-otp", data);

export const logoutApi = () =>
  api.post("/auth/logout");

export const fetchMeApi = () =>
  api.get("/auth/me");

export const refreshApi = () =>
  api.post("/auth/refresh");
