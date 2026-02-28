"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../providers";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !fullName.trim()) return;
    login(email.trim(), fullName.trim(), role);
    router.push(role === "teacher" ? "/dashboard/teacher" : "/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-xl">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-academy-400">
            CLA Academy
          </Link>
          <h1 className="mt-4 text-xl font-semibold text-[var(--card-foreground)]">
            Sign in (demo)
          </h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            No account yet? Enter your details — we’ll add Google/Apple login when Supabase is connected.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--muted-foreground)]">Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
              required
              className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-[var(--foreground)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--muted-foreground)]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-[var(--foreground)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--muted-foreground)]">I am a</label>
            <div className="mt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                  role === "student"
                    ? "border-academy-500 bg-academy-500/20 text-academy-300"
                    : "border-[var(--border)] bg-[var(--muted)] text-[var(--muted-foreground)]"
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole("teacher")}
                className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                  role === "teacher"
                    ? "border-academy-500 bg-academy-500/20 text-academy-300"
                    : "border-[var(--border)] bg-[var(--muted)] text-[var(--muted-foreground)]"
                }`}
              >
                Teacher
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-academy-600 py-2.5 font-medium text-white hover:bg-academy-500"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
          <Link href="/" className="text-academy-400 hover:underline">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
