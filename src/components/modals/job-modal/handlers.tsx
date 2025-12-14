import { IJob } from '@/shared/types/job-types'

export interface ISubmitHandlerProps {
  e: React.FormEvent
  title: string
  company: string
  notes: string
  variant: 'create' | 'edit'
  job: IJob | undefined
  setOpen: (open: boolean) => void
  optimisticCreate: (data: any) => Promise<void>
  optimisticUpdate: (id: string, data: any) => Promise<void>
}

export const handleSubmit = async ({
  e,
  title,
  company,
  notes,
  variant,
  job,
  setOpen,
  optimisticCreate,
  optimisticUpdate,
}: ISubmitHandlerProps) => {
  e.preventDefault()

  if (!title.trim() || !company.trim()) {
    return
  }

  if (variant === 'create') {
    await optimisticCreate({
      title: title.trim(),
      company: company.trim(),
      notes: notes.trim() || undefined,
    })
  } else if (variant === 'edit' && job) {
    await optimisticUpdate(job.id, {
      title: title.trim(),
      company: company.trim(),
      notes: notes.trim() || undefined,
    })
  }

  setOpen(false)
}

export interface IDeleteHandlerProps {
  job: IJob | undefined
  setOpen: (open: boolean) => void
  optimisticDelete: (id: string) => Promise<void>
}
export const handleDelete = async ({
  job,
  setOpen,
  optimisticDelete,
}: IDeleteHandlerProps) => {
  if (job) {
    await optimisticDelete(job.id)
    setOpen(false)
  }
} 