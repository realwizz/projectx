import { getProjectById, getTasksByProject } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const project = getProjectById(Number(params.id));
  const tasks = getTasksByProject(Number(params.id));

  return Response.json({ project, tasks });
}