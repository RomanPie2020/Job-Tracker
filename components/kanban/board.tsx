"use client";

import { JOB_STATUSES, JobStatus } from "@/shared/types/job-types"
import { useJobsStore } from "@/store/useJobsStore"
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { motion } from "framer-motion"
import { useState } from "react"
import { Column } from "./column"
import { JobCard } from "./job-card"

export function Board() {
  const jobs = useJobsStore((state) => state.jobs);
  const optimisticUpdateStatus = useJobsStore(
    (state) => state.optimisticUpdateStatus
  );
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const jobId = active.id as string;
    const newStatus = over.id as JobStatus;

    // Check if the drop target is a valid status
    if (JOB_STATUSES.includes(newStatus)) {
      const job = jobs.find((j) => j.id === jobId);
      if (job && job.status !== newStatus) {
        optimisticUpdateStatus(jobId, newStatus);
      }
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const getJobsByStatus = (status: JobStatus) => {
    return jobs.filter((job) => job.status === status);
  };

  const activeJob = activeId ? jobs.find((job) => job.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-5"
      >
        {JOB_STATUSES.map((status) => (
          <Column key={status} status={status} jobs={getJobsByStatus(status)} />
        ))}
      </motion.div>

      <DragOverlay>
        {activeJob ? (
          <div className="rotate-3 cursor-grabbing opacity-80">
            <JobCard job={activeJob} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
