"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Welcome{user?.email ? `, ${user.email}` : ""}!
      </h1>
      <p className="mt-2 text-zinc-500 dark:text-zinc-400">
        Your task dashboard is coming soon.
      </p>
    </div>
  );
}
