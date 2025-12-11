"use client";

import { StatusChart } from "@/components/charts/status-chart";
import { Board } from "@/components/kanban/board";
import { AddJobModal } from "@/components/modals/add-job-modal";
import { Navbar } from "@/components/navbar";
import { useJobsStore } from "@/store/useJobsStore";
import { Job } from "@/utils/job-types";
import { useEffect } from "react";

interface DashboardClientProps {
  initialJobs: Job[];
}

export function DashboardClient({ initialJobs }: DashboardClientProps) {
  const setJobs = useJobsStore((state) => state.setJobs);

  useEffect(() => {
    setJobs(initialJobs);
  }, [initialJobs, setJobs]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Applications</h1>
            <p className="text-muted-foreground">
              Track and manage your job applications
            </p>
          </div>
          <AddJobModal />
        </div>

        <div className="space-y-8">
          <Board />
          <StatusChart />
        </div>
      </main>
    </div>
  );
}
