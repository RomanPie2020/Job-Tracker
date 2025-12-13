import { jobsApi } from "@/lib/api-client"
import { CreateJobData, Job, JobsStore } from "@/shared/types/job-types"
import toast from "react-hot-toast"
import { create } from "zustand"

/**
 * Helper function to create a temporary job for optimistic updates
 */
const createTempJob = (jobData: CreateJobData): Job => ({
  id: `tmp-${Date.now()}`,
  title: jobData.title,
  company: jobData.company,
  status: "Applied",
  createdAt: Date.now(),
  notes: jobData.notes,
});

/**
 * Helper function to handle API errors with rollback
 */
const handleApiError = <T>(
  error: unknown,
  rollback: () => void,
  errorMessage: string
) => {
  console.error(errorMessage, error);
  rollback();
  toast.error(errorMessage);
};

export const useJobsStore = create<JobsStore>((set, get) => ({
  jobs: [],
  isSyncing: false,
  lastError: undefined,

  setJobs: (jobs) => set({ jobs }),

  optimisticCreate: async (jobData) => {
    const tempJob = createTempJob(jobData);
    const tempId = tempJob.id;

    // Optimistically add to UI
    set((state) => ({
      jobs: [...state.jobs, tempJob],
      isSyncing: true,
      lastError: undefined,
    }));

    try {
      const updatedJobs = await jobsApi.create(jobData);
      set({ jobs: updatedJobs, isSyncing: false });
      toast.success("Job added successfully!");
    } catch (error) {
      handleApiError(
        error,
        () => {
          set((state) => ({
            jobs: state.jobs.filter((j) => j.id !== tempId),
            isSyncing: false,
            lastError: "Failed to create job",
          }));
        },
        "Failed to add job"
      );
    }
  },

  optimisticUpdate: async (id, patch) => {
    const { jobs } = get();
    const oldJob = jobs.find((j) => j.id === id);
    
    if (!oldJob) {
      console.warn(`Job with id ${id} not found`);
      return;
    }

    const updatedJob = { ...oldJob, ...patch };

    // Optimistically update UI
    set((state) => ({
      jobs: state.jobs.map((j) => (j.id === id ? updatedJob : j)),
      isSyncing: true,
      lastError: undefined,
    }));

    try {
      const updatedJobs = await jobsApi.update(updatedJob);
      set({ jobs: updatedJobs, isSyncing: false });
      toast.success("Job updated!");
    } catch (error) {
      handleApiError(
        error,
        () => {
          set((state) => ({
            jobs: state.jobs.map((j) => (j.id === id ? oldJob : j)),
            isSyncing: false,
            lastError: "Failed to update job",
          }));
        },
        "Failed to update job"
      );
    }
  },

  optimisticDelete: async (id) => {
    const { jobs } = get();
    const deletedJob = jobs.find((j) => j.id === id);
    
    if (!deletedJob) {
      console.warn(`Job with id ${id} not found`);
      return;
    }

    // Optimistically remove from UI
    set((state) => ({
      jobs: state.jobs.filter((j) => j.id !== id),
      isSyncing: true,
      lastError: undefined,
    }));

    try {
      const updatedJobs = await jobsApi.delete(id);
      set({ jobs: updatedJobs, isSyncing: false });
      toast.success("Job deleted!");
    } catch (error) {
      handleApiError(
        error,
        () => {
          set((state) => ({
            jobs: [...state.jobs, deletedJob],
            isSyncing: false,
            lastError: "Failed to delete job",
          }));
        },
        "Failed to delete job"
      );
    }
  },

  optimisticUpdateStatus: async (id, status) => {
    const { jobs } = get();
    const oldJob = jobs.find((j) => j.id === id);
    
    if (!oldJob) {
      console.warn(`Job with id ${id} not found`);
      return;
    }

    // Optimistically update status
    set((state) => ({
      jobs: state.jobs.map((j) => (j.id === id ? { ...j, status } : j)),
      isSyncing: true,
      lastError: undefined,
    }));

    try {
      const updatedJobs = await jobsApi.updateStatus(id, status);
      set({ jobs: updatedJobs, isSyncing: false });
    } catch (error) {
      handleApiError(
        error,
        () => {
          set((state) => ({
            jobs: state.jobs.map((j) => (j.id === id ? oldJob : j)),
            isSyncing: false,
            lastError: "Failed to update job status",
          }));
        },
        "Failed to update status"
      );
    }
  },
}));
