import { create } from "zustand";
import axios from "../api/axios";

const useCauseStore = create((set, get) => ({
  causes: [],
  selectedCause: null,
  loading: false,
  error: null,

  fetchCauses: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/api/causes");
      set({ causes: res.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch causes",
        loading: false,
      });
    }
  },

  createCause: async (causeData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/api/causes", causeData);
      set((state) => ({
        causes: [...state.causes, res.data],
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to create cause",
        loading: false,
      });
    }
  },

  likeCause: async (causeId) => {
    try {
      const res = await axios.post(`/api/causes/${causeId}/like`);
      set((state) => ({
        causes: state.causes.map((cause) =>
          cause._id === causeId ? { ...cause, likes: res.data.likes } : cause
        ),
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to like cause" });
    }
  },
}));

export default useCauseStore;
