"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/providers";

const nav = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/teachers", label: "Teachers" },
];

export function Header() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-academy-400">
          CLA Academy
        </Link>
        <nav className="flex items-center gap-6">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors hover:text-academy-400 ${
                pathname === href ? "text-academy-400" : "text-[var(--muted-foreground)]"
              }`}
            >
              {label}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href={user.role === "teacher" ? "/dashboard/teacher" : "/dashboard"}
                className="text-sm font-medium text-[var(--muted-foreground)] hover:text-academy-400"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={signOut}
                className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm hover:bg-[var(--muted)]"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-academy-600 px-4 py-2 text-sm font-medium text-white hover:bg-academy-500"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
