import {
  errorResponse,
  jsonResponse,
  withAuth,
} from '@/server-utils/auth-check-helper'
import {
  createJob,
  deleteJob,
  getJobs,
  updateJob,
  updateJobStatus,
} from '@/server-utils/jobs.server'
import { ICreateJobData, IJob, TJobStatus } from '@/shared/types/job-types'
import { NextRequest } from 'next/server'

export async function GET() {
  return withAuth(async (email) => {
    const jobs = await getJobs(email)
    return jsonResponse(jobs)
  })
}

export async function POST(request: NextRequest) {
  return withAuth(async (email) => {
    const body = await request.json()
    const jobData: ICreateJobData = {
      title: body.title,
      company: body.company,
      notes: body.notes,
    }

    if (!jobData.title || !jobData.company) {
      return errorResponse('Title and company are required', 400)
    }

    const jobs = await createJob(email, jobData)
    return jsonResponse(jobs)
  }, request)
}

export async function PUT(request: NextRequest) {
  return withAuth(async (email) => {
    const body = await request.json()

    if (body.id && body.status && Object.keys(body).length === 2) {
      const jobs = await updateJobStatus(
        email,
        body.id,
        body.status as TJobStatus
      )
      return jsonResponse(jobs)
    }

    const job: IJob = body
    if (!job.id) {
      return errorResponse('Job ID is required', 400)
    }

    const jobs = await updateJob(email, job)
    return jsonResponse(jobs)
  }, request)
}

export async function DELETE(request: NextRequest) {
  return withAuth(async (email) => {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return errorResponse('Job ID is required', 400)
    }

    const jobs = await deleteJob(email, id)
    return jsonResponse(jobs)
  }, request)
}

// ---- Previous Code ---- //

// async function getAuthenticatedEmail() {
//   const session = await getServerSession(authOptions)
//   if (!session?.user?.email) {
//     return null
//   }
//   return session.user.email
// }

// export async function GET() {
//   try {
//     const email = await getAuthenticatedEmail()
//     if (!email) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     const jobs = await getJobs(email)
//     return NextResponse.json(jobs)
//   } catch (error) {
//     console.error('GET /api/jobs error:', error)
//     return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const email = await getAuthenticatedEmail()
//     if (!email) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     const body = await request.json()
//     const jobData: ICreateJobData = {
//       title: body.title,
//       company: body.company,
//       notes: body.notes,
//     }

//     if (!jobData.title || !jobData.company) {
//       return NextResponse.json(
//         { error: 'Title and company are required' },
//         { status: 400 }
//       )
//     }

//     const jobs = await createJob(email, jobData)
//     return NextResponse.json(jobs)
//   } catch (error) {
//     console.error('POST /api/jobs error:', error)
//     return NextResponse.json({ error: 'Failed to create job' }, { status: 500 })
//   }
// }

// export async function PUT(request: NextRequest) {
//   try {
//     const email = await getAuthenticatedEmail()
//     if (!email) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     const body = await request.json()

//     // Check if this is a status update or full job update
//     if (body.id && body.status && Object.keys(body).length === 2) {
//       const jobs = await updateJobStatus(
//         email,
//         body.id,
//         body.status as TJobStatus
//       )
//       return NextResponse.json(jobs)
//     }

//     const job: IJob = body
//     if (!job.id) {
//       return NextResponse.json({ error: 'Job ID is required' }, { status: 400 })
//     }

//     const jobs = await updateJob(email, job)
//     return NextResponse.json(jobs)
//   } catch (error) {
//     console.error('PUT /api/jobs error:', error)
//     return NextResponse.json({ error: 'Failed to update job' }, { status: 500 })
//   }
// }

// export async function DELETE(request: NextRequest) {
//   try {
//     const email = await getAuthenticatedEmail()
//     if (!email) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     const { searchParams } = new URL(request.url)
//     const id = searchParams.get('id')

//     if (!id) {
//       return NextResponse.json({ error: 'Job ID is required' }, { status: 400 })
//     }

//     const jobs = await deleteJob(email, id)
//     return NextResponse.json(jobs)
//   } catch (error) {
//     console.error('DELETE /api/jobs error:', error)
//     return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 })
//   }
// }
