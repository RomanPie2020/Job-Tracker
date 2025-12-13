export type JobStatus = "Applied" | "Screening" | "Interview" | "Offer" | "Rejected";

export interface Job {
  id: string;
  title: string;
  company: string;
  status: JobStatus;
  createdAt: number;
  notes?: string;
}

export interface CreateJobData {
  title: string;
  company: string;
  notes?: string;
}

export interface JobsStore {
  jobs: Job[];
  isSyncing: boolean;
  lastError?: string;
  setJobs: (jobs: Job[]) => void;
  optimisticCreate: (jobData: CreateJobData) => Promise<void>;
  optimisticUpdate: (id: string, patch: Partial<Job>) => Promise<void>;
  optimisticDelete: (id: string) => Promise<void>;
  optimisticUpdateStatus: (id: string, status: JobStatus) => Promise<void>;
}

export const JOB_STATUSES: JobStatus[] = [
  "Applied",
  "Screening",
  "Interview",
  "Offer",
  "Rejected",
];

export const STATUS_COLORS: Record<JobStatus, string> = {
  Applied: "bg-blue-500",
  Screening: "bg-yellow-500",
  Interview: "bg-purple-500",
  Offer: "bg-green-500",
  Rejected: "bg-red-500",
};
