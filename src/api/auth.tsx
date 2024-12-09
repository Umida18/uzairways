import axios from "axios";
import { BASE_URL } from "../config";
import { handleApiError } from "@/utils/apiErrorHandler";
import { useNavigate } from "react-router-dom";

export const login = async (data: { username: string; password: string }) => {
  const navigate = useNavigate();
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, data);
    console.log("Login response:", response);

    const token = response.data?.token;
    const userId = response.data.userId;
    const userRole = response.data.userRole;
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userRole", userRole);
      console.log("Token saved to localStorage:", token);
      return response.data;
    } else {
      throw new Error("Token not found in login response.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    handleApiError(error, navigate);
    throw error;
  }
};
export const register = async (data: {
  username: string;
  surname: string;
  password: string;
  email: string;
  birthDate: string;
  phoneNumber: string;
  address: string;
  passportSeries: string;
  role: string;
  balance: number;
}) => {
  try {
    console.log("Sending registration data:", data);
    const response = await axios.post(`${BASE_URL}/auth/register`, data);
    console.log("Full registration response:", response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error during registration:", error.response?.data);
      console.error("Error status:", error.response?.status);
      console.error("Error headers:", error.response?.headers);
    } else {
      console.error("Unexpected error during registration:", error);
    }
    throw error;
  }
};
