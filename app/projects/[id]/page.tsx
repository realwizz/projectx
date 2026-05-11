"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [weight, setWeight] = useState(1);

  const load = async () => {
    try {
      const res = await fetch(`/api/projects/${id}`);
      const data = await res.json();

      setProject(data);
      setTasks(data.tasks || []);
    } catch (err) {
      console.error("Failed to load project:", err);
    }
  };

  useEffect(() => {
    if (id) load();
  }, [id]);

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: Number(id),
        title,
        weight: Number(weight),
      }),
    });

    setTitle("");
    setWeight(1);
    load();
  };

  const toggleTask = async (taskId: number, currentStatus: string) => {
    await fetch("/api/tasks/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskId,
        status: currentStatus === "done" ? "todo" : "done",
      }),
    });

    load();
  };

  if (!project)
    return <div className="p-10 text-center">Loading Project...</div>;

  // Calculate progress
  const totalWeight = tasks.reduce((sum, t) => sum + (t.weight || 1), 0);
  const completedWeight = tasks.reduce(
    (sum, t) => sum + (t.status === "done" ? t.weight || 1 : 0),
    0,
  );
  const progress =
    tasks.length > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Header & Progress */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          <p className="text-muted-foreground">Project Workspace</p>
        </div>
        <div className="text-right">
          <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">
            Progress
          </span>
          <p className="text-3xl font-bold">{progress}%</p>
        </div>
      </div>

      <Progress value={progress} className="h-3" />

      {/* Add Task Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={addTask}
            className="flex gap-2 items-center bg-slate-50 p-4 rounded-lg"
          >
            <Input
              placeholder="Task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            <select
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="border rounded p-2 text-sm bg-white"
            >
              <option value={1}>Low (1)</option>
              <option value={3}>Medium (3)</option>
              <option value={5}>High (5)</option>
            </select>
            <Button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Task
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Task List */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Tasks</h2>
        {tasks.length === 0 && (
          <p className="text-muted-foreground text-sm py-4">
            No tasks yet. Add one above!
          </p>
        )}
        {tasks.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Checkbox
                id={`task-${t.id}`}
                checked={t.status === "done"}
                onCheckedChange={() => toggleTask(t.id, t.status)}
              />
              <label
                htmlFor={`task-${t.id}`}
                className={`font-medium ${t.status === "done" ? "line-through text-muted-foreground" : ""}`}
              >
                {t.title}
              </label>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">
                W: {t.weight || 1}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${t.status === "done" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
              >
                {t.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
