"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <>
      {/* Header section */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-zinc-50 mb-1">
            Active Tasks
          </h1>
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            {user?.email ?? "Workspace"}
          </p>
        </div>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-32 border border-dashed border-zinc-800/60 rounded-xl bg-surface-container-lowest/30">
        <p className="text-zinc-500 text-sm tracking-tight">
          No tasks yet. Create one to get started.
        </p>
      </div>
    </>
  );
}
