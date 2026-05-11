import Link from "next/link";
import { ArrowRight, Target, TrendingUp, BarChart3 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-full bg-white flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
      {/* --- HERO SECTION --- */}
      <div className="max-w-3xl space-y-6 mt-10 lg:mt-0">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide uppercase border border-blue-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          ProjectX v1.0
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Master your dissertation with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            weighted metrics.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl">
          Stop treating every task equally. ProjectX assigns priority weights to
          your milestones, giving you a mathematically accurate view of your
          actual progress.
        </p>

        {/* Call to Action Button */}
        <div className="pt-6 flex flex-col sm:flex-row items-start gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95 text-lg"
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* --- FEATURES GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-24 border-t border-slate-100 pt-16 pb-12">
        {/* Feature 1 */}
        <div className="space-y-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Smart Weighting</h3>
          <p className="text-slate-500 leading-relaxed text-sm">
            Assign point values to your tasks. Checking off a core engine
            chapter moves the needle significantly more than fixing a minor
            typo.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="space-y-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Real-time Progress
          </h3>
          <p className="text-slate-500 leading-relaxed text-sm">
            Watch your completion percentage calculate dynamically. The
            algorithm adjusts your progress bar based on the specific weight of
            finished milestones.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="space-y-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Supervisor Reports
          </h3>
          <p className="text-slate-500 leading-relaxed text-sm">
            Generate clean, professional data exports to share with your
            dissertation supervisor to objectively prove your week-over-week
            velocity.
          </p>
        </div>
      </div>
    </div>
  );
}
