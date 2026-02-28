import { Header } from "@/components/Header";
import Link from "next/link";
import { CoursesList } from "./CoursesList";

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">Courses</h1>
        <p className="mt-2 text-[var(--muted-foreground)]">
          Browse courses. Payments (Stripe) can be added when you’re ready.
        </p>
        <CoursesList />
      </main>
    </div>
  );
}
