"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { mockStore } from "@/lib/mock-store";
import { formatCurrency } from "@/lib/utils";
import type { Course, Session } from "@/types/mock";

export default function TeacherCourseEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [priceCents, setPriceCents] = useState("");
  const [published, setPublished] = useState(false);

  useEffect(() => {
    const user = mockStore.getUser();
    if (!user || user.role !== "teacher") {
      router.replace("/login");
      return;
    }
    const c = mockStore.getCourses().find((x) => x.id === id && x.teacherId === user.id);
    if (!c) {
      router.replace("/dashboard/teacher/courses");
      return;
    }
    setCourse(c);
    setTitle(c.title);
    setSlug(c.slug);
    setDescription(c.description);
    setPriceCents(String(c.priceCents));
    setPublished(c.published);
    setSessions(mockStore.getSessions().filter((s) => s.courseId === c.id));
  }, [id, router]);

  const saveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!course) return;
    mockStore.updateCourse(course.id, {
      title,
      slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
      description,
      priceCents: parseInt(priceCents, 10) || 0,
      published,
    });
    router.refresh();
  };

  const addSession = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const titleInput = form.querySelector('[name="title"]') as HTMLInputElement;
    const priceInput = form.querySelector('[name="price_cents"]') as HTMLInputElement;
    const durationInput = form.querySelector('[name="duration_minutes"]') as HTMLInputElement;
    const providerInput = form.querySelector('[name="meeting_provider"]') as HTMLSelectElement;
    const linkInput = form.querySelector('[name="meeting_link"]') as HTMLInputElement;
    if (!course || !titleInput?.value) return;
    mockStore.addSession({
      courseId: course.id,
      teacherId: course.teacherId,
      title: titleInput.value,
      priceCents: parseInt(priceInput?.value || "0", 10),
      durationMinutes: parseInt(durationInput?.value || "60", 10),
      meetingProvider: (providerInput?.value as "zoom" | "teams" | "google_meet") || "zoom",
      meetingLink: linkInput?.value || null,
    });
    setSessions(mockStore.getSessions().filter((s) => s.courseId === course.id));
    titleInput.value = "";
    if (priceInput) priceInput.value = "0";
    if (durationInput) durationInput.value = "60";
    if (linkInput) linkInput.value = "";
  };

  if (!course) return <p className="text-[var(--muted-foreground)]">Loading…</p>;

  return (
    <div>
      <Link href="/dashboard/teacher/courses" className="text-sm text-academy-400 hover:underline">
        ← Courses
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-[var(--foreground)]">{course.title}</h1>
      <p className="mt-1 text-[var(--muted-foreground)]">{formatCurrency(course.priceCents)}</p>

      <form onSubmit={saveCourse} className="mt-6 max-w-xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--muted-foreground)]">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-[var(--foreground)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--muted-foreground)]">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-[var(--foreground)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--muted-foreground)]">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-[var(--foreground)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--muted-foreground)]">Price (cents)</label>
          <input
            type="number"
            value={priceCents}
            onChange={(e) => setPriceCents(e.target.value)}
            min={0}
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-[var(--foreground)]"
          />
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="rounded border-[var(--border)]"
          />
          <span className="text-sm text-[var(--muted-foreground)]">Published</span>
        </label>
        <button
          type="submit"
          className="rounded-lg bg-academy-600 px-4 py-2 text-sm font-medium text-white hover:bg-academy-500"
        >
          Save
        </button>
      </form>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">Sessions (Zoom/Teams links)</h2>
        {sessions.length === 0 ? (
          <p className="mt-2 text-[var(--muted-foreground)]">No sessions. Add one below.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {sessions.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--card)] p-3"
              >
                <span className="font-medium text-[var(--card-foreground)]">{s.title}</span>
                <span className="text-sm text-[var(--muted-foreground)]">
                  {s.durationMinutes} min · {formatCurrency(s.priceCents)} · {s.meetingProvider}
                </span>
              </li>
            ))}
          </ul>
        )}
        <form onSubmit={addSession} className="mt-4 flex flex-wrap gap-3">
          <input
            name="title"
            placeholder="Session title"
            required
            className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)]"
          />
          <input
            name="price_cents"
            type="number"
            placeholder="Price cents"
            defaultValue={0}
            className="w-24 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)]"
          />
          <input
            name="duration_minutes"
            type="number"
            placeholder="Mins"
            defaultValue={60}
            className="w-20 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)]"
          />
          <select
            name="meeting_provider"
            className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)]"
          >
            <option value="zoom">Zoom</option>
            <option value="teams">Teams</option>
            <option value="google_meet">Google Meet</option>
          </select>
          <input
            name="meeting_link"
            placeholder="Meeting URL"
            className="min-w-[200px] rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)]"
          />
          <button
            type="submit"
            className="rounded-lg bg-academy-600 px-4 py-2 text-sm text-white hover:bg-academy-500"
          >
            Add session
          </button>
        </form>
      </section>
    </div>
  );
}
