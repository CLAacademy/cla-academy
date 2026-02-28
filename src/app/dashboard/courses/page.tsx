"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { mockStore } from "@/lib/mock-store";
import type { Course } from "@/types/mock";

export default function StudentCoursesPage() {
  const [enrolled, setEnrolled] = useState<Course[]>([]);

  useEffect(() => {
    const user = mockStore.getUser();
    if (!user) return;
    const bookings = mockStore.getBookings().filter((b) => b.studentId === user.id);
    const courseIds = [...new Set(bookings.map((b) => mockStore.getSessions().find((s) => s.id === b.sessionId)?.courseId).filter(Boolean))] as string[];
    const courses = mockStore.getCourses().filter((c) => courseIds.includes(c.id));
    setEnrolled(courses);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--foreground)]">My courses</h1>
      <p className="mt-1 text-[var(--muted-foreground)]">
        Courses you’re in. Full enrollment with Stripe when you add it.
      </p>

      {enrolled.length === 0 ? (
        <p className="mt-8 text-[var(--muted-foreground)]">No enrollments yet.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {enrolled.map((c) => (
            <li
              key={c.id}
              className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--card)] p-4"
            >
              <p className="font-medium text-[var(--card-foreground)]">{c.title}</p>
              <Link
                href={`/courses/${c.slug}`}
                className="rounded-lg bg-academy-600 px-3 py-1.5 text-sm text-white hover:bg-academy-500"
              >
                Open
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link href="/courses" className="mt-6 inline-block text-academy-400 hover:underline">
        Browse all courses →
      </Link>
    </div>
  );
}
