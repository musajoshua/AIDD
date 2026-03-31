"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await signOut();
      router.push("/auth");
    } catch {
      setSigningOut(false);
    }
  }

  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/dashboard"
          className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          TaskFlow
        </Link>

        {user && (
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-zinc-600 dark:text-zinc-400 sm:inline">
              {user.email}
            </span>
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              {signingOut ? "Signing out…" : "Sign out"}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
