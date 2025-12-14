'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useLanguage } from '@/providers/language-context'
import { IJob } from '@/shared/types/job-types'
import { useJobsStore } from '@/store/useJobsStore'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DeleteVariant } from './delete-variant'
import { handleDelete, handleSubmit } from './handlers'
import { JobForm } from './job-form'
import { JobModalTrigger } from './trigger'

interface IJobModalProps {
  variant: 'create' | 'edit' | 'delete'
  job?: IJob
  trigger?: React.ReactNode
}

export function JobModal({ variant, job, trigger }: IJobModalProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [notes, setNotes] = useState('')

  const { t } = useLanguage()
  const optimisticCreate = useJobsStore((state) => state.optimisticCreate)
  const optimisticUpdate = useJobsStore((state) => state.optimisticUpdate)
  const optimisticDelete = useJobsStore((state) => state.optimisticDelete)

  // Initialize form state when modal opens
  useEffect(() => {
    if (open) {
      if (variant === 'create') {
        setTitle('')
        setCompany('')
        setNotes('')
      } else if (job) {
        setTitle(job.title)
        setCompany(job.company)
        setNotes(job.notes || '')
      }
    }
  }, [open, variant, job])

  // Content Configuration
  const isDelete = variant === 'delete'
  const isCreate = variant === 'create'
  
  let modalTitle = ''
  let modalDesc = ''

  if (isCreate) {
    modalTitle = t.addNewJob
    modalDesc = t.trackNewJob
  } else if (variant === 'edit') {
    modalTitle = t.editJob
    modalDesc = t.updateJobDetails
  } else {
    modalTitle = t.deleteJob
    modalDesc = t.deleteConfirmation
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <JobModalTrigger variant={variant} trigger={trigger} />
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>{modalDesc}</DialogDescription>
        </DialogHeader>

        {isDelete ? <DeleteVariant job={job} /> : <JobForm
        handleSubmit={(e) => handleSubmit({
          e,
          title,
          company,
          notes,
          variant,
          job,
          setOpen,
          optimisticCreate,
          optimisticUpdate
        })}
        title={title}
        setTitle={setTitle}
        company={company}
        setCompany={setCompany}
        notes={notes}
        setNotes={setNotes}
      />}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            {t.cancel}
          </Button>
          {isDelete ? (
            <Button variant="destructive" onClick={() => handleDelete({
              job, 
              setOpen,
              optimisticDelete
            })}>
              <Trash2 className="mr-2 h-4 w-4" />
              {t.delete}
            </Button>
          ) : (
            <Button
              type="submit"
              form="job-form"
              disabled={!title.trim() || !company.trim()}
            >
              {isCreate ? t.addJob : t.saveChanges}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
