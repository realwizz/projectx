import { NextResponse } from "next/server";
import { createProject, getProjects } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getProjects());
}

export async function POST(req: Request) {
  const { name, userId } = await req.json();

  const project = {
    id: Date.now(),
    name,
    userId,
  };

  createProject(project);

  return NextResponse.json(project);
}