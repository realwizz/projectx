"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { Input } from "@/components/ui/input";
import { Plus, Download, Settings, Loader2 } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Failed to load projects", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // --- CREATE ---
  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, userId: 1 }),
    });
    setName("");
    loadProjects();
  };

  // --- UPDATE ---
  const updateProject = async (id: number, newName: string) => {
    setProjects(
      projects.map((p) => (p.id === id ? { ...p, name: newName } : p)),
    );
    await fetch(`/api/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });
  };

  // --- DELETE ---
  const deleteProject = async (id: number) => {
    // Optimistic UI update
    setProjects(projects.filter((p) => p.id !== id));
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
  };

  return (
    <div className="min-h-screen bg-slate-50/30">
      {/* HEADER*/}
      <div className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                Project Dashboard{" "}
                <span className="bg-blue-100 text-blue-700 text-[10px] uppercase px-2 py-0.5 rounded-full font-bold">
                  Live
                </span>
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                Manage your weighted dissertation metrics
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <form
                onSubmit={createProject}
                className="flex items-center gap-2 mr-2"
              >
                <Input
                  placeholder="New project name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white w-48 md:w-64 h-10 shadow-sm border-slate-200"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 h-10 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-all shadow-sm active:scale-95"
                >
                  <Plus className="w-4 h-4" /> Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-8 py-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="text-sm text-slate-500 font-medium">
              Loading your projects...
            </p>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                progress={project.progress || 0}
                onUpdate={updateProject}
                onDelete={deleteProject}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white border-2 border-dashed border-slate-200 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mt-4">
              No projects found
            </h3>
            <p className="text-slate-500 max-w-xs mx-auto mt-1 mb-6">
              You haven't created any dissertation projects yet.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
