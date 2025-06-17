import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useApplicationStore = create((set, get) => ({
  loading: false,
  applications: [],
  candidateApplications: [],

  createApplication: async (formData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post(
        "/application/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data.application?.resume) {
        throw new Error("Resume upload failed");
      }

      set({
        applications: [...get().applications, response.data.application],
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getApplications: async (jobId) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/application/${jobId}`);
      set({
        applications: response.data.applications,
      });
    } catch (error) {
      toast.error(error.response?.data?.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getCandidateApplications: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/application");
      set({ candidateApplications: response.data.applications });
    } catch (error) {
      toast.error(error.response?.data?.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateApplication: async (id, status) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.put(`/application/update/${id}`, {
        status,
      });
      const updatedApplication = response.data.application;

      set({
        application: get().applications.map((application) =>
          application._id === id ? updatedApplication : application
        ),
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));
