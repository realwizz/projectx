"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function ReportsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/reports");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to load report stats", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <div className="p-10 text-center">Analysing data...</div>;
  if (!stats)
    return (
      <div className="p-10 text-center text-red-500">
        Error loading reports.
      </div>
    );

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight">
          Performance Analytics
        </h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive breakdown of project throughput and completion rates.
        </p>
      </header>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold uppercase text-slate-500">
              Global Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">
              {stats.globalProgress}%
            </div>
            <Progress value={stats.globalProgress} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold uppercase text-slate-500">
              Task Velocity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {stats.tasksCompleted} / {stats.totalTasks}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Total tasks completed across all projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold uppercase text-slate-500">
              Active Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Currently being tracked in Postgres
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-50 border-dashed border-2">
        <CardContent className="pt-6">
          <h3 className="font-bold text-lg mb-2">How is this calculated?</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This system uses a <strong>Weighted Completion Algorithm</strong>.
            Total progress is the sum of completed task weights divided by the
            total possible weight.
          </p>
          <div className="mt-4 p-3 bg-white border rounded text-center font-serif italic">
            Progress % = (Completed Weights ÷ Total Weights) × 100
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
