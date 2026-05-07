<<<<<<< HEAD
export default function ProjectDetails({ params }) {
  const tasks = [
    { name: "Design UI", status: "Done" },
    { name: "Build API", status: "In Progress" },
  ];

  return (
    <div>
      <h1>Project {params.id}</h1>

      {tasks.map((t, i) => (
        <div key={i}>
          <p>{t.name} - {t.status}</p>
        </div>
      ))}
=======
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  const load = async () => {
    try {
      const res = await fetch(`/api/projects/${id}`);
      const data = await res.json();

      setProject(data.project);
      setTasks(data.tasks);
    } catch (err) {
      console.error("Failed to load project:", err);
    }
  };

  useEffect(() => {
    if (!id) return;
    load();
  }, [id]);

  const addTask = async () => {
    if (!title) return;

    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId: Number(id),
        title,
      }),
    });

    setTitle("");
    load();
  };

  const toggleTask = async (taskId: number, current: string) => {
    await fetch("/api/tasks/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskId,
        status: current === "done" ? "todo" : "done",
      }),
    });

    load();
  };

  if (!project) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{project.name}</h1>

      <div className="mt-4 flex gap-2">
        <input
          placeholder="New Task"
          className="border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={addTask}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>

      <ul className="mt-6 space-y-2">
        {tasks.map((t) => (
          <li
            key={t.id}
            className="border p-3 rounded flex justify-between"
          >
            <span>{t.title}</span>

            <button onClick={() => toggleTask(t.id, t.status)}>
              {t.status === "done" ? "✔ Done" : "Mark Done"}
            </button>
          </li>
        ))}
      </ul>
>>>>>>> c9fdf41 (updated projects page to dynamically change on new project creation)
    </div>
  );
}