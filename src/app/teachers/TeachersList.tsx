"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { mockStore, getDefaultTeacher } from "@/lib/mock-store";

export function TeachersList() {
  const [teachers, setTeachers] = useState<{ id: string; fullName: string }[]>([]);

  useEffect(() => {
    const courses = mockStore.getCourses();
    const teacherIds = [...new Set(courses.map((c) => c.teacherId))];
    const defaultT = getDefaultTeacher();
    setTeachers(
      teacherIds.map((id) => ({
        id,
        fullName: id === defaultT.id ? defaultT.fullName : "Teacher",
      }))
    );
  }, []);

  if (teachers.length === 0) {
    return <p className="mt-12 text-[var(--muted-foreground)]">No teachers yet.</p>;
  }

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {teachers.map((t) => (
        <div
          key={t.id}
          className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6"
        >
          <h2 className="font-semibold text-[var(--card-foreground)]">{t.fullName}</h2>
          <Link href="/courses" className="mt-4 inline-block text-sm text-academy-400 hover:underline">
            View courses →
          </Link>
        </div>
      ))}
    </div>
  );
}
