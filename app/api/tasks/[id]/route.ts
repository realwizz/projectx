import { NextResponse } from "next/server";
import { db, tasks } from "@/lib/db";
import { eq } from "drizzle-orm";

// UPDATE TASK (Title, Weight, or Status)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updatedTask = await db
      .update(tasks)
      .set({
        ...(body.title && { title: body.title }),
        ...(body.weight && { weight: body.weight }),
        ...(body.status && { status: body.status }),
      })
      .where(eq(tasks.id, Number(id)))
      .returning();

    return NextResponse.json(updatedTask[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

// DELETE TASK
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await db.delete(tasks).where(eq(tasks.id, Number(id)));

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}