export type UserRole = "student" | "teacher";

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
}

export interface Course {
  id: string;
  teacherId: string;
  title: string;
  slug: string;
  description: string;
  priceCents: number;
  published: boolean;
}

export interface AvailabilitySlot {
  id: string;
  teacherId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface Session {
  id: string;
  courseId: string;
  teacherId: string;
  title: string;
  priceCents: number;
  durationMinutes: number;
  meetingProvider: "zoom" | "teams" | "google_meet";
  meetingLink: string | null;
}

export interface Booking {
  id: string;
  studentId: string;
  teacherId: string;
  sessionId: string;
  scheduledAt: string;
  endAt: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  meetingLink: string | null;
}
