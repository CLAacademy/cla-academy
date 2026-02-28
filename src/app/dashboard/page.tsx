"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { mockStore } from "@/lib/mock-store";
import { format } from "date-fns";
import type { Booking } from "@/types/mock";

export default function StudentDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const user = mockStore.getUser();
    if (!user) return;
    setBookings(
      mockStore.getBookings().filter((b) => b.studentId === user.id)
    );
  }, []);

  const upcoming = bookings.filter(
    (b) => b.status !== "cancelled" && new Date(b.scheduledAt) > new Date()
  );
  const past = bookings.filter(
    (b) => b.status === "completed" || new Date(b.scheduledAt) <= new Date()
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--foreground)]">My bookings</h1>
      <p className="mt-1 text-[var(--muted-foreground)]">
        Upcoming sessions. Reminder emails when Resend is connected.
      </p>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">Upcoming</h2>
        {upcoming.length === 0 ? (
          <p className="mt-2 text-[var(--muted-foreground)]">No upcoming sessions.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {upcoming.map((b) => (
              <li
                key={b.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4"
              >
                <div>
                  <p className="font-medium text-[var(--card-foreground)]">
                    Session on {format(new Date(b.scheduledAt), "EEEE, MMM d, yyyy")} at{" "}
                    {format(new Date(b.scheduledAt), "h:mm a")}
                  </p>
                </div>
                {b.meetingLink && (
                  <a
                    href={b.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-academy-600 px-4 py-2 text-sm font-medium text-white hover:bg-academy-500"
                  >
                    Join meeting
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">Past</h2>
        {past.length === 0 ? (
          <p className="mt-2 text-[var(--muted-foreground)]">No past bookings.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {past.slice(0, 10).map((b) => (
              <li
                key={b.id}
                className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-3 text-sm"
              >
                {format(new Date(b.scheduledAt), "MMM d, yyyy")} — {b.status}
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="mt-8">
        <Link
          href="/courses"
          className="inline-flex items-center rounded-lg bg-academy-600 px-4 py-2 text-sm font-medium text-white hover:bg-academy-500"
        >
          Browse courses
        </Link>
      </div>
    </div>
  );
}
