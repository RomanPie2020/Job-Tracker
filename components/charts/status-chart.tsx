"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStatusLabel, useLanguage } from "@/lib/language-context";
import { useJobsStore } from "@/store/useJobsStore";
import { JOB_STATUSES, JobStatus } from "@/utils/job-types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS: Record<JobStatus, string> = {
  Applied: "#3b82f6",
  Screening: "#eab308",
  Interview: "#a855f7",
  Offer: "#22c55e",
  Rejected: "#ef4444",
};

export function StatusChart() {
  const jobs = useJobsStore((state) => state.jobs);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const data = JOB_STATUSES.map((status) => ({
    name: getStatusLabel(status, t),
    value: jobs.filter((job) => job.status === status).length,
    status: status,
  })).filter((item) => item.value > 0);

  if (jobs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t.applicationStatusOverview}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] items-center justify-center text-muted-foreground">
            {t.noDataYet}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{t.applicationStatusOverview}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={!isMobile 
                  ? ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`
                  : false
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={COLORS[entry.status as JobStatus]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {JOB_STATUSES.map((status) => {
              const count = jobs.filter((job) => job.status === status).length;
              return (
                <div
                  key={status}
                  className="flex flex-col items-center rounded-lg border p-3"
                >
                  <div
                    className="mb-2 h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[status] }}
                  />
                  <p className="text-xs font-medium text-muted-foreground">
                    {getStatusLabel(status, t)}
                  </p>
                  <p className="text-2xl font-bold">{count}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
