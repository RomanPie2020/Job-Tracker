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
