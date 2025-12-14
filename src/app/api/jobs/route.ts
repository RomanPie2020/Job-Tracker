import {
  createJob,
  deleteJob,
  getJobs,
  updateJob,
  updateJobStatus,
} from '@/server-utils/jobs.server'
import { ICreateJobData, IJob, TJobStatus } from '@/shared/types/job-types'
import { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

function getEmail(req: NextRequest): string {
  const email = req.headers.get('x-user-email')
  if (!email) throw new Error('Unauthorized')
  return email
}

export async function GET(req: NextRequest) {
  try {
    const email = getEmail(req)
    const jobs = await getJobs(email)
    return NextResponse.json(jobs)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const email = getEmail(req)
    const body = await req.json()
    const jobData: ICreateJobData = {
      title: body.title,
      company: body.company,
      notes: body.notes,
    }

    if (!jobData.title || !jobData.company) {
      return NextResponse.json(
        { error: 'Title and company are required' },
        { status: 400 }
      )
    }

    const jobs = await createJob(email, jobData)
    return NextResponse.json(jobs)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const email = getEmail(req)
    const body = await req.json()

    if (body.id && body.status && Object.keys(body).length === 2) {
      const jobs = await updateJobStatus(
        email,
        body.id,
        body.status as TJobStatus
      )
      return NextResponse.json(jobs)
    }

    const job: IJob = body
    if (!job.id) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 })
    }

    const jobs = await updateJob(email, job)
    return NextResponse.json(jobs)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const email = getEmail(req)
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 })
    }

    const jobs = await deleteJob(email, id)
    return NextResponse.json(jobs)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 })
  }
}
