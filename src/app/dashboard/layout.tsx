"use client";

import { useAuth } from "@/app/providers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login?next=/dashboard");
      return;
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <p className="text-[var(--muted-foreground)]">Loading…</p>
      </div>
    );
  }

  if (!user) return null;

  const isTeacher = user.role === "teacher";

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="font-semibold text-academy-400">
            CLA Academy
          </Link>
          <nav className="flex gap-4 text-sm">
            {isTeacher ? (
              <>
                <Link href="/dashboard/teacher" className="text-[var(--muted-foreground)] hover:text-white">
                  Dashboard
                </Link>
                <Link href="/dashboard/teacher/availability" className="text-[var(--muted-foreground)] hover:text-white">
                  Availability
                </Link>
                <Link href="/dashboard/teacher/courses" className="text-[var(--muted-foreground)] hover:text-white">
                  Courses
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="text-[var(--muted-foreground)] hover:text-white">
                  My bookings
                </Link>
                <Link href="/dashboard/courses" className="text-[var(--muted-foreground)] hover:text-white">
                  My courses
                </Link>
                <Link href="/courses" className="text-[var(--muted-foreground)] hover:text-white">
                  Browse courses
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
