import { NextResponse } from "next/server";
import { createProject, getProjects } from "@/lib/db";

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name) {
      return NextResponse.json({ error: "Name required" }, { status: 400 });
    }

    const project = await createProject(body.name, body.userId || 1);

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}