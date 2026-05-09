import { NextResponse } from "next/server";
import { addTask, getAllTasks } from "@/lib/db";

export async function GET() {
  const tasks = await getAllTasks();
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  try {
    const { projectId, title, weight } = await req.json();

    if (!projectId || !title) {
      return NextResponse.json({ error: "Project ID and Title are required" }, { status: 400 });
    }

    const task = await addTask(Number(projectId), title, weight || 1);

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}