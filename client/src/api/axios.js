import axios from "axios";
import { refreshApi } from "./auth.api";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});
let refreshFailed = false;

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (!err.response) {
      return Promise.reject(err);
    }

    const status = err.response.status;
    const url = original?.url || "";

    if (url.includes("/auth/refresh")) {
      refreshFailed = true;
      return Promise.reject(err);
    }

    if (status !== 401) {
      return Promise.reject(err);
    }

    if (refreshFailed) {
      return Promise.reject(err);
    }

    if (original._retry) {
      return Promise.reject(err);
    }
    original._retry = true;

    try {
      await refreshApi();
      return api(original);
    } catch (refreshErr) {
      refreshFailed = true;
      return Promise.reject(refreshErr);
    }
  }
);

export default api;
