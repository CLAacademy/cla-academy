import { Header } from "@/components/Header";
import { TeachersList } from "./TeachersList";

export default function TeachersPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">Teachers</h1>
        <p className="mt-2 text-[var(--muted-foreground)]">
          Meet our teachers. Book sessions from their courses.
        </p>
        <TeachersList />
      </main>
    </div>
  );
}
