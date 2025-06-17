import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useSavedJobsStore = create((set, get) => ({
  loading: false,
  savedJobs: [],
  jobSaved: false,
  addSavedJob: async (jobId) => {
    try {
      const response = await axiosInstance.post("/saved-jobs/create", {
        jobId,
      });
      set({
        savedJobs: [...get().savedJobs, response?.data?.savedJob],
      });
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error saving job:", error);
      toast.error(error.response?.data?.message || "Failed to save job");
    }
  },
  getSavedJobs: async () => {
    try {
      const response = await axiosInstance.get("/saved-jobs");
      set({
        savedJobs: response.data.savedJobs,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to get saved jobs");
    }
  },
  deleteSavedJob: async (jobId) => {
    try {
      const response = await axiosInstance.delete(`/saved-jobs/${jobId}`);

      set((state) => {
        const updatedJobs = state.savedJobs.filter(
          (job) => job.job_id && String(job.job_id._id) !== String(jobId)
        );
        return { savedJobs: updatedJobs };
      });

      toast.success(response.data.message);
      return true;
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error(error.response?.data?.message);
      return false;
    }
  },
}));
