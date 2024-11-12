import create from "zustand";
import axios from "../api/axios";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true });
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      set({ user: res.data.user, isAuthenticated: true, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        loading: false,
      });
    }
  },

  register: async (userData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/api/auth/register", userData);
      set({ user: res.data.user, isAuthenticated: true, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Registration failed",
        loading: false,
      });
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
