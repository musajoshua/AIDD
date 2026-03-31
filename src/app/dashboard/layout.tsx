"use client";

import type { ReactNode } from "react";
import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <Header />
      <main className="pt-24 pb-12 px-6 max-w-[1024px] mx-auto w-full flex-1">
        {children}
      </main>
    </ProtectedRoute>
  );
}
