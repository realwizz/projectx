import { NextRequest, NextResponse } from "next/server";
import { getProjectById, getTasksByProject } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = Number(id);

    // fetch data from DB
    const project = await getProjectById(projectId);
    const tasks = await getTasksByProject(projectId);

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...project,
      tasks: tasks || [],
    });
  } catch (error) {
    console.error("GET PROJECT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to load project" },
      { status: 500 }
    );
  }
}