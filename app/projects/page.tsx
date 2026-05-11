"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState("");

  const loadProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Failed to load projects", err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        userId: 1, // temporary placeholder for demo
      }),
    });

    setName("");
    loadProjects();
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Projects</h1>
          <p className="text-muted-foreground text-sm">
            Manage and track your weighted progress.
          </p>
        </div>
      </header>

      {/* Create Project Section */}
      <form
        onSubmit={createProject}
        className="flex flex-row items-center gap-2 w-full max-w-md"
      >
        <Input
          placeholder="New Project Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium whitespace-nowrap hover:bg-blue-700 transition-colors">
          Create Project
        </button>
      </form>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            progress={project.progress || 0}
          />
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed rounded-xl">
          <p className="text-muted-foreground">
            No projects found. Create your first one above!
          </p>
        </div>
      )}
    </div>
  );
}
