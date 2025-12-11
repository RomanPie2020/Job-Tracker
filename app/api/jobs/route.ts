import { authOptions } from "@/lib/auth";
import {
    createJob,
    deleteJob,
    getJobs,
    updateJob,
    updateJobStatus,
} from "@/lib/jobs.server";
import { CreateJobData, Job, JobStatus } from "@/utils/job-types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

async function getAuthenticatedEmail() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return null;
  }
  return session.user.email;
}

export async function GET() {
  try {
    const email = await getAuthenticatedEmail();
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const jobs = await getJobs(email);
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("GET /api/jobs error:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const email = await getAuthenticatedEmail();
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const jobData: CreateJobData = {
      title: body.title,
      company: body.company,
      notes: body.notes,
    };

    if (!jobData.title || !jobData.company) {
      return NextResponse.json(
        { error: "Title and company are required" },
        { status: 400 }
      );
    }

    const jobs = await createJob(email, jobData);
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("POST /api/jobs error:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const email = await getAuthenticatedEmail();
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    
    // Check if this is a status update or full job update
    if (body.id && body.status && Object.keys(body).length === 2) {
      const jobs = await updateJobStatus(email, body.id, body.status as JobStatus);
      return NextResponse.json(jobs);
    }

    const job: Job = body;
    if (!job.id) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    const jobs = await updateJob(email, job);
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("PUT /api/jobs error:", error);
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const email = await getAuthenticatedEmail();
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    const jobs = await deleteJob(email, id);
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("DELETE /api/jobs error:", error);
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
}
