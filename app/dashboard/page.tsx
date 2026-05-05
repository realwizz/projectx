"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="border p-4">
          <p>Total Projects</p>
          <h2 className="text-xl">{data.projects}</h2>
        </div>

        <div className="border p-4">
          <p>Tasks Completed</p>
          <h2 className="text-xl">{data.completedTasks}</h2>
        </div>

        <div className="border p-4">
          <p>Overdue Tasks</p>
          <h2 className="text-xl">{data.overdue}</h2>
        </div>
      </div>
    </div>
  );
}