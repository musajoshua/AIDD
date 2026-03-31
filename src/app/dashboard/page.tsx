"use client";

import { useCallback, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import CreateTaskForm from "@/components/CreateTaskForm";
import type { Task } from "@/types";

function formatDate(timestamp: { seconds: number } | null): string {
  if (!timestamp) return "—";
  return new Date(timestamp.seconds * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    high: "bg-error-container/20 text-error border-error/20",
    medium: "bg-zinc-800 text-zinc-400 border-zinc-700",
    low: "bg-zinc-800/50 text-zinc-500 border-zinc-700/50",
  };

  return (
    <span
      className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-tighter ${styles[priority] ?? styles.medium}`}
    >
      {priority}
    </span>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Task[];
        setTasks(docs);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore query error:", error.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  const handleCreated = useCallback(() => {
    setShowForm(false);
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-zinc-50 mb-1">
            Active Tasks
          </h1>
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            {user?.email ?? "Workspace"}
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-zinc-50 text-zinc-950 text-xs font-semibold px-4 py-2 rounded hover:bg-zinc-200 transition-all flex items-center gap-2"
          >
            + NEW TASK
          </button>
        )}
      </div>

      {/* Create form */}
      {showForm && (
        <CreateTaskForm
          onClose={() => setShowForm(false)}
          onCreated={handleCreated}
        />
      )}

      {/* Task list */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="h-1 w-24 overflow-hidden rounded-full bg-surface-container-high">
            <div className="h-full w-1/3 animate-pulse rounded-full bg-primary" />
          </div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 border border-dashed border-zinc-800/60 rounded-xl bg-surface-container-lowest/30">
          <p className="text-zinc-500 text-sm tracking-tight">
            No tasks yet. Create one to get started.
          </p>
        </div>
      ) : (
        <div className="w-full overflow-hidden border border-zinc-800/50 rounded-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50 border-b border-zinc-800">
                <th className="text-[11px] font-mono font-medium text-zinc-500 uppercase tracking-widest px-4 py-3">
                  Title
                </th>
                <th className="text-[11px] font-mono font-medium text-zinc-500 uppercase tracking-widest px-4 py-3 w-32 text-center">
                  Due Date
                </th>
                <th className="text-[11px] font-mono font-medium text-zinc-500 uppercase tracking-widest px-4 py-3 w-28 text-center">
                  Priority
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/50">
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="group hover:bg-zinc-900 transition-colors"
                >
                  <td className="px-4 py-3">
                    <span className="text-sm text-zinc-200 font-medium">
                      {task.title}
                    </span>
                    {task.description && (
                      <p className="text-[11px] text-zinc-600 mt-0.5 truncate max-w-md">
                        {task.description}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs font-mono text-zinc-400">
                      {formatDate(task.dueDate as { seconds: number } | null)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      <PriorityBadge priority={task.priority} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
