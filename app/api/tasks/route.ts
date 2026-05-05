import { addTask } from "@/lib/db";

export async function POST(req: Request) {
  const { projectId, title } = await req.json();

  if (!title) {
    return Response.json({ error: "Title required" }, { status: 400 });
  }

  const task = addTask(projectId, title);

  return Response.json(task);
}