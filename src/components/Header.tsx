"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/dashboard", label: "Tasks" },
] as const;

function UserInitials({ email }: { email: string }) {
  const initials = email
    .split("@")[0]
    .split(/[._-]/)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div className="h-8 w-8 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center">
      <span className="text-[10px] font-mono font-bold text-on-surface-variant">
        {initials || "U"}
      </span>
    </div>
  );
}

export default function Header() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [signingOut, setSigningOut] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

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
    <header className="fixed top-0 w-full h-16 z-50 bg-zinc-950/70 backdrop-blur-md border-b border-zinc-800/50 flex items-center justify-between px-6">
      <div className="flex items-center gap-8">
        <Link
          href="/dashboard"
          className="text-lg font-semibold tracking-tighter text-zinc-50"
        >
          TaskFlow
        </Link>
        <nav className="hidden md:flex items-center gap-6 h-16">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-tight transition-colors h-full flex items-center ${
                  isActive
                    ? "text-zinc-50 border-b-2 border-indigo-400"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="focus:outline-none"
            >
              <UserInitials email={user.email ?? "user"} />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-12 w-48 bg-surface-container border border-outline-variant/30 rounded-lg shadow-[0px_8px_24px_-4px_rgba(0,0,0,0.6)] py-1 z-50">
                <div className="px-3 py-2 border-b border-outline-variant/20">
                  <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                    Account
                  </p>
                  <p className="text-xs text-zinc-300 truncate mt-1">
                    {user.email}
                  </p>
                </div>
                <button
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="w-full text-left px-3 py-2 text-xs text-zinc-400 hover:bg-surface-container-high hover:text-zinc-200 transition-colors disabled:opacity-50"
                >
                  {signingOut ? "Signing out…" : "Sign out"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
