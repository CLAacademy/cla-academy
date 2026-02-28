"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { mockStore } from "@/lib/mock-store";
import { format } from "date-fns";

export default function TeacherDashboardPage() {
  const [upcoming, setUpcoming] = useState<{ id: string; scheduledAt: string; meetingLink: string | null }[]>([]);
  const [coursesCount, setCoursesCount] = useState(0);
  const [slotsCount, setSlotsCount] = useState(0);

  useEffect(() => {
    const user = mockStore.getUser();
    if (!user || user.role !== "teacher") return;
    const bookings = mockStore
      .getBookings()
      .filter((b) => b.teacherId === user.id && new Date(b.scheduledAt) > new Date() && b.status !== "cancelled")
      .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
      .slice(0, 10)
      .map((b) => ({ id: b.id, scheduledAt: b.scheduledAt, meetingLink: b.meetingLink }));
    setUpcoming(bookings);
    setCoursesCount(mockStore.getCourses().filter((c) => c.teacherId === user.id).length);
    setSlotsCount(mockStore.getSlots().filter((s) => s.teacherId === user.id).length);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--foreground)]">Teacher dashboard</h1>
      <p className="mt-1 text-[var(--muted-foreground)]">
        Manage availability and courses. Add Supabase for real data.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard/teacher/availability"
          className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 hover:border-academy-500/50"
        >
          <p className="text-2xl font-bold text-academy-400">{slotsCount}</p>
          <p className="mt-1 text-[var(--muted-foreground)]">Availability slots</p>
        </Link>
        <Link
          href="/dashboard/teacher/courses"
          className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 hover:border-academy-500/50"
        >
          <p className="text-2xl font-bold text-academy-400">{coursesCount}</p>
          <p className="mt-1 text-[var(--muted-foreground)]">Courses</p>
        </Link>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">Upcoming sessions</h2>
        {upcoming.length === 0 ? (
          <p className="mt-2 text-[var(--muted-foreground)]">No upcoming sessions.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {upcoming.map((b) => (
              <li
                key={b.id}
                className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--card)] p-4"
              >
                <p className="font-medium text-[var(--card-foreground)]">
                  {format(new Date(b.scheduledAt), "EEEE, MMM d 'at' h:mm a")}
                </p>
                {b.meetingLink && (
                  <a
                    href={b.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-academy-600 px-3 py-1.5 text-sm text-white hover:bg-academy-500"
                  >
                    Join link
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="mt-8 flex gap-4">
        <Link
          href="/dashboard/teacher/availability"
          className="rounded-lg bg-academy-600 px-4 py-2 text-sm font-medium text-white hover:bg-academy-500"
        >
          Set availability
        </Link>
        <Link
          href="/dashboard/teacher/courses/new"
          className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--muted)]"
        >
          Create course
        </Link>
      </div>
    </div>
  );
}
