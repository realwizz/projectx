<<<<<<< HEAD
import { createProject, getProjects } from "@/lib/db";

export async function GET() {
  return Response.json(getProjects());
}

export async function POST(req: Request) {
  const { name } = await req.json();

  if (!name) {
    return Response.json({ error: "Name required" }, { status: 400 });
  }

  const project = createProject(name, 1); // temp userId

  return Response.json(project);
=======
import { NextResponse } from "next/server";
import { createProject, getProjects } from "@/lib/db";

export async function GET() {
  const projects = getProjects();

  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const body = await req.json();

  const project = {
    id: Date.now(),
    name: body.name,
    userId: body.userId,
  };

  createProject(project);

  return NextResponse.json(project);
>>>>>>> c9fdf41 (updated projects page to dynamically change on new project creation)
}