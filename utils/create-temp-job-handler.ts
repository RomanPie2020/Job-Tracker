import { ICreateJobData, IJob } from '@/shared/types/job-types'

export const createTempJob = (jobData: ICreateJobData): IJob => ({
  id: `tmp-${Date.now()}`,
  title: jobData.title,
  company: jobData.company,
  status: 'Applied',
  createdAt: Date.now(),
  notes: jobData.notes,
})
