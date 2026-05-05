import { getProjects } from "@/lib/db";

export async function GET() {
  const projects = getProjects();

  const completedTasks = tasks.filter(t => t.status === "done").length;

  return Response.json({
    projects: projects.length,
    completedTasks,
    overdue: 0,
  });
}