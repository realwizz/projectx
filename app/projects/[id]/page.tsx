"use client";

import { useEffect, useState, use } from "react";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  ArrowLeft,
  CheckCircle2,
  Circle,
} from "lucide-react";
import Link from "next/link";

export default function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const projectId = unwrappedParams.id;

  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [weight, setWeight] = useState(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ title: "", weight: 1 });

  const loadTasks = async () => {
    const res = await fetch(`/api/tasks?projectId=${projectId}`);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, [projectId]);

  // --- CREATE TASK ---
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: Number(projectId),
        title,
        weight,
        status: "todo",
      }),
    });
    setTitle("");
    setWeight(1);
    loadTasks();
  };

  // --- UPDATE TASK (Status or Details) ---
  const updateTask = async (id: number, updates: any) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    setEditingId(null);
  };

  // --- DELETE TASK ---
  const deleteTask = async (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  };

  // Calculate dynamic progress based on weights
  const totalWeight = tasks.reduce((sum, t) => sum + t.weight, 0);
  const completedWeight = tasks
    .filter((t) => t.status === "done")
    .reduce((sum, t) => sum + t.weight, 0);
  const progress =
    totalWeight === 0 ? 0 : Math.round((completedWeight / totalWeight) * 100);

  return (
    <div className="min-h-screen bg-slate-50/30">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/projects"
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Projects
          </Link>
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Task Manager
              </h1>
              <p className="text-slate-500 mt-1">
                Weight your tasks to calculate accurate progress.
              </p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-blue-600">
                {progress}%
              </span>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Completed
              </p>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-3 rounded-full mt-6 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-8">
        {/* Add Task Form */}
        <form
          onSubmit={addTask}
          className="flex gap-3 bg-white p-4 rounded-xl border shadow-sm mb-8"
        >
          <Input
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1"
          />
          <select
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="px-3 border rounded-md bg-slate-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={1}>Low Weight (1)</option>
            <option value={3}>Mid Weight (3)</option>
            <option value={5}>High Weight (5)</option>
          </select>
          <button
            type="submit"
            className="bg-slate-900 text-white px-5 rounded-md font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </form>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-center text-slate-400 py-10">
              No tasks yet. Add one above!
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`group flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm transition-all ${task.status === "done" ? "border-green-200 bg-green-50/30" : "border-slate-200 hover:border-blue-200"}`}
              >
                {editingId === task.id ? (
                  /* Edit Mode */
                  <div className="flex items-center gap-3 w-full mr-4">
                    <Input
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                      className="flex-1 h-9"
                    />
                    <select
                      value={editData.weight}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          weight: Number(e.target.value),
                        })
                      }
                      className="h-9 px-2 border rounded-md text-sm"
                    >
                      <option value={1}>W: 1</option>
                      <option value={3}>W: 3</option>
                      <option value={5}>W: 5</option>
                    </select>
                    <button
                      onClick={() => updateTask(task.id, editData)}
                      className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  /* View Mode */
                  <>
                    <div
                      className="flex items-center gap-4 cursor-pointer flex-1"
                      onClick={() =>
                        updateTask(task.id, {
                          status: task.status === "done" ? "todo" : "done",
                        })
                      }
                    >
                      {task.status === "done" ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-300 group-hover:text-blue-400" />
                      )}
                      <span
                        className={`font-medium ${task.status === "done" ? "line-through text-slate-400" : "text-slate-700"}`}
                      >
                        {task.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded-full ${task.weight === 5 ? "bg-amber-100 text-amber-700" : task.weight === 3 ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}
                      >
                        WEIGHT: {task.weight}
                      </span>

                      {/* Hover Actions */}
                      <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                        <button
                          onClick={() => {
                            setEditingId(task.id);
                            setEditData({
                              title: task.title,
                              weight: task.weight,
                            });
                          }}
                          className="p-1.5 text-slate-400 hover:text-blue-600 rounded"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm("Delete this task?"))
                              deleteTask(task.id);
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
