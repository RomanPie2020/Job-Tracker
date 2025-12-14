export type TJobStatus =
  | 'Applied'
  | 'Screening'
  | 'Interview'
  | 'Offer'
  | 'Rejected'

export interface IJob {
  id: string
  title: string
  company: string
  status: TJobStatus
  createdAt: number
  notes?: string
}

export interface ICreateJobData {
  title: string
  company: string
  notes?: string
}

export interface IJobsStore {
  jobs: IJob[]
  isSyncing: boolean
  lastError?: string
  setJobs: (jobs: IJob[]) => void
  optimisticCreate: (jobData: ICreateJobData) => Promise<void>
  optimisticUpdate: (id: string, patch: Partial<IJob>) => Promise<void>
  optimisticDelete: (id: string) => Promise<void>
  optimisticUpdateStatus: (id: string, status: TJobStatus) => Promise<void>
}

export const JOB_STATUSES: TJobStatus[] = [
  'Applied',
  'Screening',
  'Interview',
  'Offer',
  'Rejected',
]

export const STATUS_COLORS: Record<TJobStatus, string> = {
  Applied: 'bg-blue-500',
  Screening: 'bg-yellow-500',
  Interview: 'bg-purple-500',
  Offer: 'bg-green-500',
  Rejected: 'bg-red-500',
}
