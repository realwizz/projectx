import { NextResponse } from "next/server";
import { getTasksByProject } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const projectId = Number(searchParams.get("projectId"));

  const tasks = getTasksByProject(projectId);

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "done").length;

  const completionRate = total === 0 ? 0 : (completed / total) * 100;

  return NextResponse.json({
    total,
    completed,
    completionRate,
  });
}