"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  CheckCircle2,
  Layout,
  Info,
  TrendingUp,
} from "lucide-react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh] flex-col gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        <p className="text-slate-500 font-medium animate-pulse">
          Aggregating weighted metrics...
        </p>
      </div>
    );

  if (!stats)
    return (
      <div className="p-10 text-center text-red-500">
        Error loading reports.
      </div>
    );

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      {/* --- PAGE HEADER --- */}
      <header className="flex justify-between items-end border-b pb-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Performance Analytics
          </h1>
          <p className="text-slate-500 mt-2 flex items-center gap-2 font-medium">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            Comprehensive breakdown of dissertation throughput.
          </p>
        </div>
      </header>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Global Progress */}
        <Card className="border-none shadow-md bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-blue-100 flex items-center justify-between">
              Global Completion
              <BarChart3 className="w-4 h-4 opacity-70" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black mb-4">
              {stats.globalProgress}%
            </div>
            <div className="bg-white/20 h-2 w-full rounded-full overflow-hidden">
              <div
                className="bg-white h-full"
                style={{ width: `${stats.globalProgress}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Task Velocity */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-2 text-slate-500">
            <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center justify-between">
              Task Velocity
              <CheckCircle2 className="w-4 h-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-slate-900 leading-none">
              {stats.tasksCompleted} <span className="text-slate-300">/</span>{" "}
              {stats.totalTasks}
            </div>
            <p className="text-xs text-slate-400 mt-4 font-medium uppercase tracking-tight">
              Tasks cleared across the workspace
            </p>
          </CardContent>
        </Card>

        {/* Active Projects */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-2 text-slate-500">
            <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center justify-between">
              Active Scope
              <Layout className="w-4 h-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-slate-900 leading-none">
              {stats.totalProjects}
            </div>
            <p className="text-xs text-slate-400 mt-4 font-medium uppercase tracking-tight">
              Live projects tracked in Postgres
            </p>
          </CardContent>
        </Card>
      </div>

      {/* --- ALGORITHM EXPLANATION --- */}
      <Card className="bg-white border-slate-200 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="p-8 md:w-2/3 border-r">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <Info className="text-blue-600 w-5 h-5" />
              Weighted Completion Methodology
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Standard task lists assume all work is equal. This system rejects
              that premise. By assigning <strong>weights (1, 3, 5)</strong>, the
              algorithm ensures that high-impact tasks (e.g., Core Engine
              Implementation) contribute more to your final score than
              low-impact administrative tasks.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">
                  W:1
                </span>
                <span className="text-xs font-semibold">Trivial/Minor</span>
              </div>
              <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
                <span className="block text-[10px] font-bold text-blue-400 uppercase">
                  W:3
                </span>
                <span className="text-xs font-semibold text-blue-700">
                  Standard Research
                </span>
              </div>
              <div className="bg-amber-50 px-4 py-2 rounded-lg border border-amber-100">
                <span className="block text-[10px] font-bold text-amber-500 uppercase">
                  W:5
                </span>
                <span className="text-xs font-semibold text-amber-700">
                  Critical Milestone
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 md:w-1/3 bg-slate-50 flex flex-col justify-center items-center text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase mb-4">
              Verification Formula
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-inner text-blue-600">
              <BlockMath math="\text{Progress} = \left( \frac{\sum w_{\text{done}}}{\sum w_{\text{total}}} \right) \times 100" />
            </div>
            <p className="text-[10px] text-slate-400 mt-4 max-w-[150px]">
              Objectively verified progress through mathematical weighting.
            </p>
          </div>
        </div>
      </Card>

      {/* --- INDIVIDUAL PROJECT BARS --- */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-slate-800">Workspace Snapshot</h3>
        <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
          {stats.projectSummary.map((p: any, i: number) => (
            <div
              key={i}
              className="p-4 border-b last:border-b-0 hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-slate-700">
                  {p.name}
                </span>
                <span className="text-xs font-bold text-blue-600">
                  {p.progress}%
                </span>
              </div>
              <Progress value={p.progress} className="h-1.5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
