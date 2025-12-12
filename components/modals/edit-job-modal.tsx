"use client";

import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useJobsStore } from "@/store/useJobsStore"
import { Job } from "@/utils/job-types"
import { Pencil } from "lucide-react"
import { useEffect, useState } from "react"

interface EditJobModalProps {
  job: Job;
  trigger?: React.ReactNode;
}

export function EditJobModal({ job, trigger }: EditJobModalProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(job.title);
  const [company, setCompany] = useState(job.company);
  const [notes, setNotes] = useState(job.notes || "");
  const optimisticUpdate = useJobsStore((state) => state.optimisticUpdate);

  // Update form when job changes
  useEffect(() => {
    setTitle(job.title);
    setCompany(job.company);
    setNotes(job.notes || "");
  }, [job]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !company.trim()) {
      return;
    }

    await optimisticUpdate(job.id, {
      title: title.trim(),
      company: company.trim(),
      notes: notes.trim() || undefined,
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ? (
        <div onClick={() => setOpen(true)}>{trigger}</div>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      )}
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Job Application</DialogTitle>
            <DialogDescription>
              Update the job application details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="edit-title" className="text-sm font-medium">
                Job Title <span className="text-destructive">*</span>
              </label>
              <Input
                id="edit-title"
                placeholder="e.g. Senior Software Engineer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-company" className="text-sm font-medium">
                Company <span className="text-destructive">*</span>
              </label>
              <Input
                id="edit-company"
                placeholder="e.g. Google"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-notes" className="text-sm font-medium">
                Notes
              </label>
              <Textarea
                id="edit-notes"
                placeholder="Add any additional notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim() || !company.trim()}>
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

