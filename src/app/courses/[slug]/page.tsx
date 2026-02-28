import { Header } from "@/components/Header";
import Link from "next/link";
import { CourseDetail } from "./CourseDetail";

export default function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <Link href="/courses" className="text-sm text-academy-400 hover:underline">
          ← Courses
        </Link>
        <CourseDetail slug={slug} />
      </main>
    </div>
  );
}
