import axios from "axios";

const api = axios.create({
  baseURL: "http://64.227.151.3:8080/api",
  timeout: 30000,
});
export const baseURL = "http://64.227.151.3:8080/api";

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
