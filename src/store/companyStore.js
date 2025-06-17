import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useCompanyStore = create((set, get) => ({
  companies: [],
  loading: false,

  getCompanies: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/company");
      set({ companies: response.data.companies });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      set({ loading: false });
    }
  },
  createCompany: async (company) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/company/create", company);

      set({ companies: [...get().companies, response.data.company] });
      toast.success(response.data.message || "Company created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      set({ loading: false });
    }
  },
}));
