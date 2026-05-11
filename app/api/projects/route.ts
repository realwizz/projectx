import { NextResponse } from "next/server";
import { getDashboardStats, createProject } from "@/lib/db";

export async function GET() {
  try {
    const projectsWithStats = await getDashboardStats();
    return NextResponse.json(projectsWithStats);
  } catch (error) {
    console.error("GET Projects Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" }, 
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const project = await createProject(body.name, body.userId || 1);

    return NextResponse.json(project);
  } catch (error) {
    console.error("POST Project Error:", error);
    return NextResponse.json(
      { error: "Failed to create project" }, 
      { status: 500 }
    );
  }
}