import { NextResponse } from "next/server";
import { addTask, getTasksByProject } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");
  
  if (!projectId) return NextResponse.json([], { status: 400 });
  
  const tasks = await getTasksByProject(Number(projectId));
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const { projectId, title, weight } = await req.json();
  const newTask = await addTask(projectId, title, weight);
  return NextResponse.json(newTask);
}