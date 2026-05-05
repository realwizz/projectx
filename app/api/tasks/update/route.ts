import { updateTaskStatus } from "@/lib/db";

export async function POST(req: Request) {
  const { taskId, status } = await req.json();

  updateTaskStatus(taskId, status);

  return Response.json({ success: true });
}