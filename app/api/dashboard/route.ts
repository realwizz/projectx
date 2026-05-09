import { NextResponse } from "next/server";
import { getDashboardStats } from "@/lib/db";

export async function GET() {
  const stats = await getDashboardStats();
  
  // Summarise KPIs for the top of the dashboard
  const totalProjects = stats.length;
  const avgProgress = stats.length > 0 
    ? Math.round(stats.reduce((acc, p) => acc + p.progress, 0) / stats.length) 
    : 0;

  return NextResponse.json({
    projects: stats,
    summary: {
      totalProjects,
      avgProgress
    }
  });
}