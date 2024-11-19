import create from "zustand";
import axios from "axios";

const useDonationStore = create((set) => ({
  loading: false,
  error: null,
  donations: [],

  createDonation: async (causeId, amount) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post("/api/payments/create-payment-intent", {
        causeId,
        amount,
      });
      return response.data;
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  saveDonation: async (donationData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        "/api/payments/save-donation",
        donationData
      );
      return response.data;
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useDonationStore;
