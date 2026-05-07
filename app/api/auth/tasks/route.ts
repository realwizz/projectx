<<<<<<< HEAD
import { NextResponse } from "next/server";
import { addTask, getTasksByProject } from "@/lib/db";

export async function POST(req: Request) {
  const { projectId, title } = await req.json();

  const task = {
    id: Date.now(),
    projectId,
    title,
    status: "todo",
  };

  addTask(task);

  return NextResponse.json(task);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const projectId = Number(searchParams.get("projectId"));

  const tasks = getTasksByProject(projectId);

  return NextResponse.json(tasks);
=======
import { updateTaskStatus } from "@/lib/db";

export async function POST(req: Request) {
  const { taskId, status } = await req.json();

  updateTaskStatus(taskId, status);

  return Response.json({ success: true });
>>>>>>> c9fdf41 (updated projects page to dynamically change on new project creation)
}