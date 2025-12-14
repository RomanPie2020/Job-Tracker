'use client'

import { IJob } from '@/shared/types/job-types'
import { JobModal } from './job-modal/job-modal'

interface IEditJobModalProps {
  job: IJob
  trigger?: React.ReactNode
}

export function EditJobModal({ job, trigger }: IEditJobModalProps) {
  return <JobModal variant="edit" job={job} trigger={trigger} />
}
