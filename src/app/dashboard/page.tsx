import { authOptions } from '@//providers/google-auth-options'
import { getJobs } from '@//server-utils/jobs.server'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { DashboardClient } from './dashboard-client'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect('/')
  }

  const jobs = await getJobs(session.user.email)

  return <DashboardClient initialJobs={jobs} />
}
