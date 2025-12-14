'use client'

import { IJob } from '@/shared/types/job-types'
import { JobModal } from './job-modal/job-modal'

interface IDeleteJobModalProps {
  job: IJob
  trigger?: React.ReactNode
}

export function DeleteJobModal({ job, trigger }: IDeleteJobModalProps) {
  return <JobModal variant="delete" job={job} trigger={trigger} />
}
