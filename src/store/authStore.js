import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  isCheckingAuth: false,
  isAuthenticated: false,
  loginModal: false,
  message: "",

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/auth/signup", {
        email,
        password,
        name,
      });
      set({
        user: response.data.user,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      set({
        error:
          error.response.data.message ||
          "Error signing up, please try again later.",
        isLoading: false,
      });
      throw error;
    }
  },
  VerifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance("/auth/verify-email", {
        code,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error:
          error.response.data.message ||
          "Error verifying email, please try again later.",
        isLoading: false,
      });
    }
  },
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data.message ||
          "Error logging in, please try again later.",
        isLoading: false,
      });
      throw error;
    }
  },
  setLoginModal: () => {
    if (get().loginModal === true) {
      return set({ loginModal: false });
    } else {
      return set({ loginModal: true });
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axiosInstance.get("/auth/check-auth");
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
      throw error;
    }
  },
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/auth/forgot-password", {
        email,
      });
      set({ loading: false, message: response.data.message });
    } catch (error) {
      toast.error(error.response.data.message);
      set({
        isLoading: false,
        error:
          error.response.data.message || "Error sending reset password email",
      });
      throw error;
    }
  },
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post(
        "/auth/reset-password/${token}",
        {
          password,
        }
      );

      set({ isLoading: false });
      toast.success(response.data.message);
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error resetting password",
      });
      toast.error(error.response.data.message);
      throw error;
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/auth/logout");
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      toast.success(response.data.message);
    } catch (error) {
      set({
        error: "Error logging out, please try again later.",
        isLoading: false,
      });
      toast.error("Error logging out, please try again later.");
      console.log(error);
      throw error;
    }
  },
  updateUser: async (role) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.put("/auth/update-user", {
        role,
      });
      set({ user: response.data.user, isLoading: false });
      toast.success(response.data.message);
    } catch (error) {
      set({
        error: "Error updating user, please try again later.",
        isLoading: false,
      });
      toast.error("Error updating user, please try again later.");
      console.log(error);
      throw error;
    }
  },
}));
