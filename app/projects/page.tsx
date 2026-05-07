"use client";

<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import { useEffect, useState } from "react";
>>>>>>> c9fdf41 (updated projects page to dynamically change on new project creation)
import Link from "next/link";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState("");

  const loadProjects = async () => {
<<<<<<< HEAD
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
=======
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Failed to load projects", err);
    }
>>>>>>> c9fdf41 (updated projects page to dynamically change on new project creation)
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const createProject = async () => {
<<<<<<< HEAD
    await fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify({ name }),
=======
    if (!name) return;

    await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        userId: 1,
      }),
>>>>>>> c9fdf41 (updated projects page to dynamically change on new project creation)
    });

    setName("");
    loadProjects();
  };

  return (
<<<<<<< HEAD
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
=======
    <div className="p-6">
      <h1 className="text-2xl font-bold">Projects</h1>

      <div className="mt-4 flex gap-2">
        <input
          placeholder="Project Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={createProject}
          className="bg-black text-white px-4 py-2 rounded"
        >
>>>>>>> c9fdf41 (updated projects page to dynamically change on new project creation)
          Create
        </button>
      </div>

<<<<<<< HEAD
      <ul className="mt-4 space-y-2">
        {projects.map((p) => (
          <li key={p.id} className="border p-2">
            <Link href={`/projects/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
=======
      <div className="mt-6 space-y-2">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="block border p-4 rounded hover:bg-gray-100"
          >
            <h2 className="font-semibold">{project.name}</h2>
          </Link>
        ))}
      </div>
>>>>>>> c9fdf41 (updated projects page to dynamically change on new project creation)
    </div>
  );
}