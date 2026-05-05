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
}