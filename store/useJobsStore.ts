import { CreateJobData, Job, JobStatus } from "@/utils/job-types";
import toast from "react-hot-toast";
import { create } from "zustand";

interface JobsStore {
  jobs: Job[];
  isSyncing: boolean;
  lastError?: string;
  setJobs: (jobs: Job[]) => void;
  optimisticCreate: (jobData: CreateJobData) => Promise<void>;
  optimisticUpdate: (id: string, patch: Partial<Job>) => Promise<void>;
  optimisticDelete: (id: string) => Promise<void>;
  optimisticUpdateStatus: (id: string, status: JobStatus) => Promise<void>;
}

export const useJobsStore = create<JobsStore>((set, get) => ({
  jobs: [],
  isSyncing: false,
  lastError: undefined,

  setJobs: (jobs) => set({ jobs }),

  optimisticCreate: async (jobData) => {
    const tempId = `tmp-${Date.now()}`;
    const tempJob: Job = {
      id: tempId,
      title: jobData.title,
      company: jobData.company,
      status: "Applied",
      createdAt: Date.now(),
      notes: jobData.notes,
    };

    // Optimistically add to UI
    set((state) => ({
      jobs: [...state.jobs, tempJob],
      isSyncing: true,
      lastError: undefined,
    }));

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error("Failed to create job");
      }

      const updatedJobs = await response.json();
      set({ jobs: updatedJobs, isSyncing: false });
      toast.success("Job added successfully!");
    } catch (error) {
      // Rollback on error
      set((state) => ({
        jobs: state.jobs.filter((j) => j.id !== tempId),
        isSyncing: false,
        lastError: "Failed to create job",
      }));
      toast.error("Failed to add job");
      console.error("Error creating job:", error);
    }
  },

  optimisticUpdate: async (id, patch) => {
    const { jobs } = get();
    const oldJob = jobs.find((j) => j.id === id);
    if (!oldJob) return;

    const updatedJob = { ...oldJob, ...patch };

    // Optimistically update UI
    set((state) => ({
      jobs: state.jobs.map((j) => (j.id === id ? updatedJob : j)),
      isSyncing: true,
      lastError: undefined,
    }));

    try {
      const response = await fetch("/api/jobs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedJob),
      });

      if (!response.ok) {
        throw new Error("Failed to update job");
      }

      const updatedJobs = await response.json();
      set({ jobs: updatedJobs, isSyncing: false });
      toast.success("Job updated!");
    } catch (error) {
      // Rollback on error
      set((state) => ({
        jobs: state.jobs.map((j) => (j.id === id ? oldJob : j)),
        isSyncing: false,
        lastError: "Failed to update job",
      }));
      toast.error("Failed to update job");
      console.error("Error updating job:", error);
    }
  },

  optimisticDelete: async (id) => {
    const { jobs } = get();
    const deletedJob = jobs.find((j) => j.id === id);
    if (!deletedJob) return;

    // Optimistically remove from UI
    set((state) => ({
      jobs: state.jobs.filter((j) => j.id !== id),
      isSyncing: true,
      lastError: undefined,
    }));

    try {
      const response = await fetch(`/api/jobs?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }

      const updatedJobs = await response.json();
      set({ jobs: updatedJobs, isSyncing: false });
      toast.success("Job deleted!");
    } catch (error) {
      // Rollback on error
      set((state) => ({
        jobs: [...state.jobs, deletedJob],
        isSyncing: false,
        lastError: "Failed to delete job",
      }));
      toast.error("Failed to delete job");
      console.error("Error deleting job:", error);
    }
  },

  optimisticUpdateStatus: async (id, status) => {
    const { jobs } = get();
    const oldJob = jobs.find((j) => j.id === id);
    if (!oldJob) return;

    // Optimistically update status
    set((state) => ({
      jobs: state.jobs.map((j) => (j.id === id ? { ...j, status } : j)),
      isSyncing: true,
      lastError: undefined,
    }));

    try {
      const response = await fetch("/api/jobs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update job status");
      }

      const updatedJobs = await response.json();
      set({ jobs: updatedJobs, isSyncing: false });
    } catch (error) {
      // Rollback on error
      set((state) => ({
        jobs: state.jobs.map((j) => (j.id === id ? oldJob : j)),
        isSyncing: false,
        lastError: "Failed to update job status",
      }));
      toast.error("Failed to update status");
      console.error("Error updating job status:", error);
    }
  },
}));
