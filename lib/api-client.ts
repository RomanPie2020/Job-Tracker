import { CreateJobData, Job, JobStatus } from "@/shared/types/job-types"
import axios, { AxiosError } from "axios"

const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - could redirect to login
      console.error("Unauthorized access");
    }
    return Promise.reject(error);
  }
);

export const jobsApi = {
  getAll: async (): Promise<Job[]> => {
    const response = await apiClient.get<Job[]>("/jobs");
    return response.data;
  },

  create: async (jobData: CreateJobData): Promise<Job[]> => {
    const response = await apiClient.post<Job[]>("/jobs", jobData);
    return response.data;
  },

  update: async (job: Job): Promise<Job[]> => {
    const response = await apiClient.put<Job[]>("/jobs", job);
    return response.data;
  },

  updateStatus: async (id: string, status: JobStatus): Promise<Job[]> => {
    const response = await apiClient.put<Job[]>("/jobs", { id, status });
    return response.data;
  },

  delete: async (id: string): Promise<Job[]> => {
    const response = await apiClient.delete<Job[]>("/jobs", {
      params: { id },
    });
    return response.data;
  },
};

