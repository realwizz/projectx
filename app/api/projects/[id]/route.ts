<<<<<<< HEAD
import { getProjectById, getTasksByProject } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const project = getProjectById(Number(params.id));
  const tasks = getTasksByProject(Number(params.id));

  return Response.json({ project, tasks });
=======
import { NextRequest, NextResponse } from "next/server";
import { getProjects, getTasksByProject } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const projectId = Number(id);

    const project = getProjects().find(
      (p) => p.id === projectId
    );

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    const tasks = getTasksByProject(projectId);

    return NextResponse.json({
      project,
      tasks,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load project" },
      { status: 500 }
    );
  }
>>>>>>> c9fdf41 (updated projects page to dynamically change on new project creation)
}