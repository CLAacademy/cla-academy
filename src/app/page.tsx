import Link from "next/link";
import { Header } from "@/components/Header";
import { Calendar, Mail, Video, BookOpen, Users, CreditCard } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-[var(--border)] px-4 py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-academy-500/10 to-transparent" />
          <div className="relative mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] md:text-6xl">
              Learn with the best.
              <br />
              <span className="text-academy-400">CLA Academy</span>
            </h1>
            <p className="mt-6 text-lg text-[var(--muted-foreground)]">
              Sign in as a student or teacher. Book sessions, manage courses and availability.
              Add your GoDaddy domain and payment provider when you’re ready.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/login"
                className="rounded-xl bg-academy-600 px-6 py-3 text-lg font-semibold text-white hover:bg-academy-500"
              >
                Sign in / Sign up
              </Link>
              <Link
                href="/courses"
                className="rounded-xl border border-[var(--border)] px-6 py-3 text-lg font-semibold hover:bg-[var(--muted)]"
              >
                Browse courses
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-center text-2xl font-bold text-[var(--foreground)]">
            What you can do
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Users, title: "Teacher & Student login", desc: "Separate flows. Sign in and choose your role." },
              { icon: Calendar, title: "Sessions & availability", desc: "Teachers set slots. Students book sessions." },
              { icon: Mail, title: "Email notifications", desc: "Add Resend later for booking and reminder emails." },
              { icon: CreditCard, title: "Payments", desc: "Add Stripe when ready for sessions and courses." },
              { icon: Video, title: "Zoom & Teams", desc: "Add meeting links to sessions. Shown in reminders." },
              { icon: BookOpen, title: "Courses", desc: "Create courses and sessions. Enroll students later." },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6"
              >
                <Icon className="h-10 w-10 text-academy-400" />
                <h3 className="mt-4 font-semibold text-[var(--card-foreground)]">{title}</h3>
                <p className="mt-2 text-sm text-[var(--muted-foreground)]">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-[var(--border)] px-4 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[var(--muted-foreground)]">
              Connect your GoDaddy domain and add Supabase, Stripe, and Resend when you’re ready.
            </p>
            <Link href="/login" className="mt-4 inline-block text-academy-400 hover:underline">
              Get started →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
