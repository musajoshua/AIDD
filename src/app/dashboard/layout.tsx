"use client";

import type { ReactNode } from "react";
import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-6 sm:px-6">
        {children}
      </main>
    </ProtectedRoute>
  );
}
