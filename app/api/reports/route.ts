import { NextResponse } from "next/server";
import { getProjects, db, tasks } from "@/lib/db";

export async function GET() {
  try {
    const allProjects = await getProjects();
    const allTasks = await db.select().from(tasks);

    const totalProjects = allProjects.length;
    const totalTasks = allTasks.length;

    // Calculate global weighted progress
    const totalWeight = allTasks.reduce((sum, t) => sum + (t.weight || 1), 0);
    const completedWeight = allTasks.reduce((sum, t) => 
      sum + (t.status === "done" ? (t.weight || 1) : 0), 0
    );
    
    const globalProgress = totalWeight > 0 
      ? Math.round((completedWeight / totalWeight) * 100) 
      : 0;

    return NextResponse.json({
      totalProjects,
      totalTasks,
      globalProgress,
      tasksCompleted: allTasks.filter(t => t.status === 'done').length
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load reports" }, { status: 500 });
  }
}