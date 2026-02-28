"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { mockStore } from "@/lib/mock-store";

export default function NewCoursePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [priceCents, setPriceCents] = useState("");
  const [published, setPublished] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockStore.getUser();
    if (!user) return;
    const course = mockStore.addCourse({
      teacherId: user.id,
      title,
      slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
      description,
      priceCents: parseInt(priceCents, 10) || 0,
      published,
    });
    router.push(`/dashboard/teacher/courses/${course.id}`);
    router.refresh();
  };

  return (
    <div>
      <Link href="/dashboard/teacher/courses" className="text-sm text-academy-400 hover:underline">
        ← Courses
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-[var(--foreground)]">New course</h1>
      <p className="mt-1 text-[var(--muted-foreground)]">
        Add a course. You can add sessions and meeting links in the next step.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--muted-foreground)]">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-[var(--foreground)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--muted-foreground)]">Slug (URL)</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder={title ? title.toLowerCase().replace(/\s+/g, "-") : "my-course"}
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
          <label className="block text-sm font-medium text-[var(--muted-foreground)]">Price (cents, e.g. 2999 = $29.99)</label>
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
        <div className="flex gap-4">
          <button
            type="submit"
            className="rounded-lg bg-academy-600 px-4 py-2 text-sm font-medium text-white hover:bg-academy-500"
          >
            Create course
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm hover:bg-[var(--muted)]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
