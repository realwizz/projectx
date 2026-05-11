"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Edit2, Trash2, Save, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ProjectCard({
  project,
  progress,
  onUpdate,
  onDelete,
}: {
  project: any;
  progress: number;
  onUpdate: (id: number, newName: string) => void;
  onDelete: (id: number) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(project.name);

  const handleSave = () => {
    if (editName.trim() && editName !== project.name) {
      onUpdate(project.id, editName);
    }
    setIsEditing(false);
  };

  return (
    <div className="group bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between h-full">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6 gap-2">
        <div className="flex-1">
          {isEditing ? (
            <div className="flex items-center gap-2 mb-2">
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="h-8 text-sm font-bold"
                autoFocus
              />
              <button
                onClick={handleSave}
                className="p-1.5 bg-green-50 text-green-600 rounded-md hover:bg-green-100"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
              {project.name}
            </h3>
          )}
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">
            ID: {project.id}
          </p>
        </div>

        {/* Action Buttons*/}
        {!isEditing && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="Edit Project"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this project?",
                  )
                )
                  onDelete(project.id);
              }}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              title="Delete Project"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Footer Section: Progress & Link */}
      <div className="mt-auto space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className="text-xs font-bold text-slate-500 uppercase">
              Weighted Progress
            </span>
            <span className="text-sm font-bold text-blue-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Link
          href={`/projects/${project.id}`}
          className="flex items-center justify-center gap-2 w-full py-2 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-lg text-sm font-semibold transition-colors"
        >
          View Tasks
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
