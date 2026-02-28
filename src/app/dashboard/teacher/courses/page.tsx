"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { mockStore } from "@/lib/mock-store";
import { formatCurrency } from "@/lib/utils";
import type { Course } from "@/types/mock";

export default function TeacherCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const user = mockStore.getUser();
    if (!user || user.role !== "teacher") return;
    setCourses(mockStore.getCourses().filter((c) => c.teacherId === user.id));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">My courses</h1>
        <Link
          href="/dashboard/teacher/courses/new"
          className="rounded-lg bg-academy-600 px-4 py-2 text-sm font-medium text-white hover:bg-academy-500"
        >
          New course
        </Link>
      </div>
      <p className="mt-1 text-[var(--muted-foreground)]">
        Create and manage courses. Stripe for payments when you add it.
      </p>

      {courses.length === 0 ? (
        <p className="mt-8 text-[var(--muted-foreground)]">No courses yet.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {courses.map((c) => (
            <li
              key={c.id}
              className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--card)] p-4"
            >
              <div>
                <p className="font-medium text-[var(--card-foreground)]">{c.title}</p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {formatCurrency(c.priceCents)} · {c.published ? "Published" : "Draft"}
                </p>
              </div>
              <Link
                href={`/dashboard/teacher/courses/${c.id}`}
                className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm hover:bg-[var(--muted)]"
              >
                Edit
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
