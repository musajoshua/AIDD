"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      router.replace(user ? "/dashboard" : "/auth");
    }
  }, [user, loading, router]);

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-1 w-24 overflow-hidden rounded-full bg-surface-container-high">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-primary" />
        </div>
        <p className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest">
          Loading
        </p>
      </div>
    </div>
  );
}
