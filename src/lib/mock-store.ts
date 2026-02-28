"use client";

import type { User, Course, AvailabilitySlot, Session, Booking } from "@/types/mock";

const STORAGE_KEYS = {
  user: "cla-academy-user",
  courses: "cla-academy-courses",
  slots: "cla-academy-slots",
  sessions: "cla-academy-sessions",
  bookings: "cla-academy-bookings",
} as const;

function get<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const s = localStorage.getItem(key);
    return s ? (JSON.parse(s) as T) : fallback;
  } catch {
    return fallback;
  }
}

function set(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

const defaultCourses: Course[] = [
  {
    id: "c1",
    teacherId: "t1",
    title: "Introduction to Web Development",
    slug: "intro-web-dev",
    description: "Learn HTML, CSS, and JavaScript basics.",
    priceCents: 2999,
    published: true,
  },
];

const defaultSessions: Session[] = [
  {
    id: "s1",
    courseId: "c1",
    teacherId: "t1",
    title: "Session 1: HTML & CSS",
    priceCents: 4999,
    durationMinutes: 60,
    meetingProvider: "zoom",
    meetingLink: "https://zoom.us/j/example",
  },
];

const defaultTeacher: User = {
  id: "t1",
  email: "teacher@cla.academy",
  fullName: "Alex Teacher",
  role: "teacher",
};

export const mockStore = {
  getUser(): User | null {
    return get(STORAGE_KEYS.user, null);
  },
  setUser(user: User | null) {
    set(STORAGE_KEYS.user, user);
  },

  getCourses(): Course[] {
    return get(STORAGE_KEYS.courses, defaultCourses);
  },
  setCourses(courses: Course[]) {
    set(STORAGE_KEYS.courses, courses);
  },
  addCourse(course: Omit<Course, "id">) {
    const list = this.getCourses();
    const newCourse: Course = {
      ...course,
      id: "c" + Date.now(),
    };
    this.setCourses([...list, newCourse]);
    return newCourse;
  },
  updateCourse(id: string, updates: Partial<Course>) {
    const list = this.getCourses().map((c) => (c.id === id ? { ...c, ...updates } : c));
    this.setCourses(list);
  },

  getSlots(): AvailabilitySlot[] {
    return get(STORAGE_KEYS.slots, []);
  },
  setSlots(slots: AvailabilitySlot[]) {
    set(STORAGE_KEYS.slots, slots);
  },

  getSessions(): Session[] {
    return get(STORAGE_KEYS.sessions, defaultSessions);
  },
  setSessions(sessions: Session[]) {
    set(STORAGE_KEYS.sessions, sessions);
  },
  addSession(session: Omit<Session, "id">) {
    const list = this.getSessions();
    const newSession: Session = { ...session, id: "s" + Date.now() };
    this.setSessions([...list, newSession]);
    return newSession;
  },
  updateSession(id: string, updates: Partial<Session>) {
    const list = this.getSessions().map((s) => (s.id === id ? { ...s, ...updates } : s));
    this.setSessions(list);
  },

  getBookings(): Booking[] {
    return get(STORAGE_KEYS.bookings, []);
  },
  setBookings(bookings: Booking[]) {
    set(STORAGE_KEYS.bookings, bookings);
  },
  addBooking(booking: Omit<Booking, "id">) {
    const list = this.getBookings();
    const newBooking: Booking = { ...booking, id: "b" + Date.now() };
    this.setBookings([...list, newBooking]);
    return newBooking;
  },
  updateBooking(id: string, updates: Partial<Booking>) {
    const list = this.getBookings().map((b) => (b.id === id ? { ...b, ...updates } : b));
    this.setBookings(list);
  },
};

export function getDefaultTeacher(): User {
  return defaultTeacher;
}
