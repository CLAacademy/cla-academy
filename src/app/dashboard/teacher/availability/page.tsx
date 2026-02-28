"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { mockStore } from "@/lib/mock-store";
import type { AvailabilitySlot } from "@/types/mock";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function TeacherAvailabilityPage() {
  const router = useRouter();
  const [slots, setSlots] = useState<{ dayOfWeek: number; startTime: string; endTime: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const user = mockStore.getUser();
    if (!user || user.role !== "teacher") {
      router.replace("/login");
      return;
    }
    const data = mockStore.getSlots().filter((s) => s.teacherId === user.id);
    setSlots(
      data.length > 0
        ? data.map((s) => ({
            dayOfWeek: s.dayOfWeek,
            startTime: s.startTime,
            endTime: s.endTime,
          }))
        : [{ dayOfWeek: 1, startTime: "09:00", endTime: "17:00" }]
    );
    setLoading(false);
  }, [router]);

  const addSlot = () => {
    setSlots((s) => [...s, { dayOfWeek: 0, startTime: "09:00", endTime: "17:00" }]);
  };

  const updateSlot = (index: number, field: string, value: number | string) => {
    setSlots((s) => {
      const next = [...s];
      (next[index] as Record<string, unknown>)[field] = value;
      return next;
    });
  };

  const removeSlot = (index: number) => {
    setSlots((s) => s.filter((_, i) => i !== index));
  };

  const save = () => {
    const user = mockStore.getUser();
    if (!user) return;
    setSaving(true);
    const existing = mockStore.getSlots().filter((s) => s.teacherId !== user.id);
    const newSlots: AvailabilitySlot[] = slots.map((s) => ({
      id: "slot" + Math.random().toString(36).slice(2),
      teacherId: user.id,
      dayOfWeek: s.dayOfWeek,
      startTime: s.startTime,
      endTime: s.endTime,
    }));
    mockStore.setSlots([...existing, ...newSlots]);
    setSaving(false);
    router.refresh();
  };

  if (loading) return <p className="text-[var(--muted-foreground)]">Loading…</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--foreground)]">Availability</h1>
      <p className="mt-1 text-[var(--muted-foreground)]">
        Set your weekly availability. Students can book within these windows when booking is connected.
      </p>

      <div className="mt-8 space-y-4">
        {slots.map((slot, index) => (
          <div
            key={index}
            className="flex flex-wrap items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4"
          >
            <select
              value={slot.dayOfWeek}
              onChange={(e) => updateSlot(index, "dayOfWeek", parseInt(e.target.value, 10))}
              className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)]"
            >
              {DAYS.map((d, i) => (
                <option key={d} value={i}>
                  {d}
                </option>
              ))}
            </select>
            <input
              type="time"
              value={slot.startTime}
              onChange={(e) => updateSlot(index, "startTime", e.target.value)}
              className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)]"
            />
            <span className="text-[var(--muted-foreground)]">to</span>
            <input
              type="time"
              value={slot.endTime}
              onChange={(e) => updateSlot(index, "endTime", e.target.value)}
              className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)]"
            />
            <button
              type="button"
              onClick={() => removeSlot(index)}
              className="text-red-400 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          type="button"
          onClick={addSlot}
          className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--muted)]"
        >
          Add slot
        </button>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded-lg bg-academy-600 px-4 py-2 text-sm font-medium text-white hover:bg-academy-500 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save availability"}
        </button>
      </div>
    </div>
  );
}
