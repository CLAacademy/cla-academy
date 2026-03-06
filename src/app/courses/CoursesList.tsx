"use client";

import { mockStore } from "@/lib/mock-store";
import { formatCurrency } from "@/lib/utils";
import type { Course } from "@/types/mock";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CoursesList() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    setCourses(mockStore.getCourses().filter((c) => c.published));
  }, []);

  if (courses.length === 0) {
    return (
      <p className="mt-12 text-[var(--muted-foreground)]">
        No published courses yet. Sign in as a teacher to create one.
      </p>
    );
  }

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((c) => (
        <Link
          key={c.id}
          href={`/courses/${c.slug}`}
          className="block rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 hover:border-academy-500/50 transition-colors"
        >
          <h2 className="font-semibold text-[var(--card-foreground)]">
            {c.title}
          </h2>
          <p className="mt-2 text-academy-400 font-medium">
            {formatCurrency(c.priceCents)}
          </p>
        </Link>
      ))}
    </div>
  );
}
