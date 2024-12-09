import axios from "axios";
import { BASE_URL } from "../config";
import { handleApiError } from "@/utils/apiErrorHandler";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

const navigate = useNavigate();

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      console.warn(
        "Token mavjud emas, foydalanuvchini login sahifasiga yo'naltiring."
      );
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const { data } = await axios.post(
            `${BASE_URL}/api/auth/refresh-token`,
            {
              refreshToken,
            }
          );
          localStorage.setItem("token", data.newToken);
          error.config.headers["Authorization"] = `Bearer ${data.newToken}`;
          return api.request(error.config);
        } catch (refreshError) {
          console.error("Refresh token xatosi:", refreshError);
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          handleApiError(refreshError, navigate);
        }
      }
    }
    return Promise.reject(error);
  }
);

// Response interceptor to handle userId from the response
if (typeof window !== "undefined") {
  api.interceptors.response.use(
    (response) => {
      // Assuming the response contains `userId` in the data object
      const { userId, token } = response.data; // Extract userId from response
      if (userId) {
        // Optionally, you can store the userId locally if needed
        localStorage.setItem("userId", userId);
        console.log("Token", token);
      }
      return response;
    },
    (error) => Promise.reject(error)
  );
}

localStorage.getItem("userId");
export default api;
