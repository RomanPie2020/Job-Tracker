"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useJobsStore } from "@/store/useJobsStore";
import { Job } from "@/utils/job-types";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteJobModalProps {
  job: Job;
  trigger?: React.ReactNode;
}

export function DeleteJobModal({ job, trigger }: DeleteJobModalProps) {
  const [open, setOpen] = useState(false);
  const optimisticDelete = useJobsStore((state: { optimisticDelete: (id: string) => Promise<void> }) => state.optimisticDelete);

  const handleDelete = () => {
    optimisticDelete(job.id);
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
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Job Application</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this job application? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-lg border bg-muted/50 p-4">
          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Position
              </p>
              <p className="font-semibold">{job.title}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Company
              </p>
              <p className="font-semibold">{job.company}</p>
            </div>
            {job.notes && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Notes
                </p>
                <p className="text-sm">{job.notes}</p>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
