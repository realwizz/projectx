import { NextResponse } from "next/server";
import { updateTaskStatus } from "@/lib/db";

export async function PATCH(req: Request) {
  try {
    const { taskId, status } = await req.json();

    if (!taskId || !status) {
      return NextResponse.json({ error: "Task ID and Status are required" }, { status: 400 });
    }

    const updatedTask = await updateTaskStatus(Number(taskId), status);

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}