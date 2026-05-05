"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState("");

  const loadProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const createProject = async () => {
    await fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    setName("");
    loadProjects();
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Projects</h1>

      <div className="mt-4">
        <input
          placeholder="New Project"
          className="border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={createProject} className="ml-2 bg-black text-white p-2">
          Create
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {projects.map((p) => (
          <li key={p.id} className="border p-2">
            <Link href={`/projects/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}