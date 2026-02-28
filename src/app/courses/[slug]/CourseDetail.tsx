"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { mockStore } from "@/lib/mock-store";
import { formatCurrency } from "@/lib/utils";
import type { Course, Session } from "@/types/mock";

export function CourseDetail({ slug }: { slug: string }) {
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const c = mockStore.getCourses().find((x) => x.slug === slug);
    setCourse(c ?? null);
    if (c) setSessions(mockStore.getSessions().filter((s) => s.courseId === c.id));
  }, [slug]);

  if (!course) {
    return <p className="mt-8 text-[var(--muted-foreground)]">Course not found.</p>;
  }

  const handleEnroll = () => {
    alert("Payments (Stripe) will be available when you add your domain and Stripe. For now this is a demo.");
  };

  const handleBookSession = (session: Session) => {
    const user = mockStore.getUser();
    if (!user || user.role !== "student") {
      router.push("/login?next=/courses/" + slug);
      return;
    }
    alert("Booking flow will create a session and send reminder emails when Supabase + Resend are connected. For now you can use the Teacher dashboard to manage availability.");
    router.push("/dashboard");
  };

  return (
    <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-start">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">{course.title}</h1>
        {course.description && (
          <p className="mt-4 text-[var(--foreground)]">{course.description}</p>
        )}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Sessions</h2>
          {sessions.length === 0 ? (
            <p className="mt-2 text-[var(--muted-foreground)]">No sessions in this course.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {sessions.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--card)] p-3"
                >
                  <span className="font-medium text-[var(--card-foreground)]">{s.title}</span>
                  <span className="text-sm text-[var(--muted-foreground)]">
                    {s.durationMinutes} min · {formatCurrency(s.priceCents)}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleBookSession(s)}
                    className="rounded-lg bg-academy-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-academy-500"
                  >
                    Book session
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      <aside className="w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 md:w-80">
        <p className="text-2xl font-bold text-academy-400">{formatCurrency(course.priceCents)}</p>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">Full course</p>
        <button
          type="button"
          onClick={handleEnroll}
          className="mt-4 w-full rounded-lg bg-academy-600 py-2.5 font-medium text-white hover:bg-academy-500"
        >
          Enroll (Stripe coming soon)
        </button>
        <p className="mt-2 text-xs text-[var(--muted-foreground)]">
          Add your domain and Stripe to enable payments.
        </p>
      </aside>
    </div>
  );
}
