'use client'

import { useLanguage } from '@/lib/language-context'
import { cn } from '@/lib/utils'
import { Job, JobStatus, STATUS_COLORS } from '@/shared/types/job-types'
import { getJobStatusLabel } from '@/utils/job-statuses-language-helper'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { JobCard } from './job-card'

interface ColumnProps {
  status: JobStatus
  jobs: Job[]
}

export function Column({ status, jobs }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  })
  const { t } = useLanguage()

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex min-h-[500px] flex-col rounded-lg border-2 border-dashed bg-muted/20 p-4 transition-colors',
        isOver && 'border-primary bg-primary/5'
      )}
    >
      <div className="mb-4 flex items-center gap-2">
        <div className={cn('h-3 w-3 rounded-full', STATUS_COLORS[status])} />
        <h3 className="font-semibold">{getJobStatusLabel(status, t)}</h3>
        <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
          {jobs.length}
        </span>
      </div>

      <SortableContext
        items={jobs.map((job) => job.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-1 flex-col gap-3">
          {jobs.length === 0 ? (
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
              {t.noJobsYet}
            </div>
          ) : (
            jobs.map((job) => <JobCard key={job.id} job={job} />)
          )}
        </div>
      </SortableContext>
    </div>
  )
}
