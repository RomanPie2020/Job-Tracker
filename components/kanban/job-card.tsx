"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useJobsStore } from "@/store/useJobsStore";
import { Job } from "@/utils/job-types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { GripVertical, Trash2 } from "lucide-react";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const optimisticDelete = useJobsStore((state) => state.optimisticDelete);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: job.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Delete "${job.title}" at ${job.company}?`)) {
      optimisticDelete(job.id);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: isDragging ? 1 : 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`group cursor-move transition-shadow hover:shadow-md ${
          isDragging ? "opacity-50 shadow-lg" : ""
        }`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base font-semibold leading-tight">
              {job.title}
            </CardTitle>
            <div className="flex items-center gap-1">
              <button
                {...attributes}
                {...listeners}
                className="cursor-grab touch-none opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing"
              >
                <GripVertical className="h-4 w-4 text-muted-foreground" />
              </button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            {job.company}
          </p>
          {job.notes && (
            <p className="line-clamp-2 text-xs text-muted-foreground">
              {job.notes}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            {formatDate(job.createdAt)}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
