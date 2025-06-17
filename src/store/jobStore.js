import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

/**
 * Job Store - Zustand store for managing job-related state
 * State includes:
 * - jobs: Array of job listings
 * - loading: Loading state flag
 * - error: Error message if any
 * - currentPage: Current pagination page
 * - totalPages: Total available pages
 * - totalJobs: Total count of jobs
 *
 * Actions:
 * - getJobs: Fetches jobs from API with pagination
 * - createJob: Creates a new job posting
 */
export const useJobStore = create((set, get) => ({
  // Initial state
  loading: false,
  jobs: [],
  job: {},
  searchedJobs: [],
  recruiterJobs: [],
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalJobs: 0,

  /**
   * Fetches jobs from API with pagination
   * @param {number} pageNum - Page number to fetch (default: 1)
   * Updates state with fetched jobs and pagination info
   * Handles loading and error states
   */
  getJobs: async (pageNum = 1) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(
        `/jobs?page=${pageNum}&limit=10`
      );

      // Update state with fetched data
      set({
        jobs: response.data.jobs,
        currentPage: response.data.page,
        totalPages: response.data.totalPages,
        totalJobs: response.data.totalJobs,
      });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
    } finally {
      set({ loading: false });
    }
  },

  // getting a single job
  getJob: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/jobs/${id}`);

      // Update state with fetched data
      set({ job: response.data.job });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
    } finally {
      set({ loading: false });
    }
  },

  /**
   * Creates a new job posting
   * @param {object} jobData - Job data to create
   * @returns {boolean} success - Whether creation was successful
   * Updates jobs list with newly created job
   * Shows toast notifications for success/error
   */
  createJob: async (jobData) => {
    set({ loading: true });
    try {
      let success = false;
      const response = await axiosInstance.post("/jobs/create", jobData);

      // Add new job to state and show success toast
      set({ jobs: [...get().jobs, response.data.job] });
      toast.success(response.data.message);
      success = true;
      return success;
    } catch (error) {
      toast.error(error.response?.data?.message || "error creating job");
    } finally {
      set({ loading: false });
    }
  },
  getSearchedJobs: async (search) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post(
        `/jobs/search?search=${search}`
      );
      console.log(response.data);
      set({ searchedJobs: response.data.jobs, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
      throw Error(error.response?.data?.message || error.message);
    } finally {
      set({ loading: false, error: null });
    }
  },
  updateJobStatus: async (id, isOpen) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.put(`/jobs/${id}/status`, {
        isOpen,
      });
      set((state) => ({
        job: { ...state.job, isOpen: response.data.job.isOpen },
        loading: false,
      }));
      toast.success(response.data.message);
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "error updating job status");
      throw Error(error.response?.data?.message || error.message);
    }
  },
  getRecruiterJobs: async (id) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/jobs/employer/${id}`);
      set({ recruiterJobs: response.data.jobs, loading: false });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "error getting recruiter jobs"
      );
      throw Error(error.response?.data?.message || error.message);
    } finally {
      set({ loading: false });
    }
  },
  deleteJobById: async (id) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.delete(`/jobs/${id}`);
      set((state) => ({
        jobs: state.jobs.filter((job) => job._id !== id),
        loading: false,
      }));
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "error deleting job");
      throw Error(error.response?.data?.message || error.message);
    }
  },
}));
