"use client";

import { StatusChart } from "@/components/charts/status-chart"
import { Board } from "@/components/kanban/board"
import { AddJobModal } from "@/components/modals/add-job-modal"
import { Navbar } from "@/components/navbar"
import { useLanguage } from "@/lib/language-context"
import { Job } from "@/shared/types/job-types"
import { useJobsStore } from "@/store/useJobsStore"
import { useEffect } from "react"

interface IDashboardClientProps {
  initialJobs: Job[];
}

export function DashboardClient({ initialJobs }: IDashboardClientProps) {
  const setJobs = useJobsStore((state) => state.setJobs);
  const { t } = useLanguage();

  useEffect(() => {
    setJobs(initialJobs);
  }, [initialJobs, setJobs]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold sm:text-3xl">{t.myApplications}</h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              {t.trackAndManage}
            </p>
          </div>
          <div className="shrink-0">
            <AddJobModal />
          </div>
        </div>

        <div className="space-y-8">
          <Board />
          <StatusChart />
        </div>
      </main>
    </div>
  );
}
