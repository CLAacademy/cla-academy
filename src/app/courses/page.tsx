import { Header } from "@/components/Header";

type PageProps = {
  params: {
    slug: string;
  };
};

export default function CoursePage({ params }: PageProps) {
  const { slug } = params;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          Course: {slug}
        </h1>
      </main>
    </div>
  );
}