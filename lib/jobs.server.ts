import { CreateJobData, Job, JobStatus } from "@/utils/job-types";
import { kv } from "@vercel/kv";
import { v4 as uuidv4 } from "uuid";

const getJobsKey = (email: string) => `jobs:${email}`;

export async function getJobs(email: string): Promise<Job[]> {
  try {
    const jobs = await kv.get<Job[]>(getJobsKey(email));
    return jobs || [];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

export async function createJob(
  email: string,
  jobData: CreateJobData
): Promise<Job[]> {
  try {
    const jobs = await getJobs(email);
    const newJob: Job = {
      id: uuidv4(),
      title: jobData.title,
      company: jobData.company,
      status: "Applied",
      createdAt: Date.now(),
      notes: jobData.notes,
    };

    const updatedJobs = [...jobs, newJob];
    await kv.set(getJobsKey(email), updatedJobs);
    return updatedJobs;
  } catch (error) {
    console.error("Error creating job:", error);
    throw new Error("Failed to create job");
  }
}

export async function updateJob(email: string, job: Job): Promise<Job[]> {
  try {
    const jobs = await getJobs(email);
    const updatedJobs = jobs.map((j) => (j.id === job.id ? job : j));
    await kv.set(getJobsKey(email), updatedJobs);
    return updatedJobs;
  } catch (error) {
    console.error("Error updating job:", error);
    throw new Error("Failed to update job");
  }
}

export async function deleteJob(email: string, id: string): Promise<Job[]> {
  try {
    const jobs = await getJobs(email);
    const updatedJobs = jobs.filter((j) => j.id !== id);
    await kv.set(getJobsKey(email), updatedJobs);
    return updatedJobs;
  } catch (error) {
    console.error("Error deleting job:", error);
    throw new Error("Failed to delete job");
  }
}

export async function updateJobStatus(
  email: string,
  id: string,
  status: JobStatus
): Promise<Job[]> {
  try {
    const jobs = await getJobs(email);
    const updatedJobs = jobs.map((j) =>
      j.id === id ? { ...j, status } : j
    );
    await kv.set(getJobsKey(email), updatedJobs);
    return updatedJobs;
  } catch (error) {
    console.error("Error updating job status:", error);
    throw new Error("Failed to update job status");
  }
}
