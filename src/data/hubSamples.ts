/**
 * SAMPLE data for the UFE Hub sections (Phase 2-4 previews). Everything here
 * is illustrative; real values come from Moodle and the registry.
 */
export const DEMO_NOW = "2026-10-15T09:00:00Z";

/** Registry history before the current term (credits, credit-weighted GPA). */
export const priorRecord = { credits: 67, gpa: 3.45 };

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "WAITING_ON_STUDENT" | "RESOLVED";
export const tickets = [
  { id: "HD-1042", category: "IT", subject: "Moodle login loop on mobile", status: "IN_PROGRESS" as TicketStatus, updated: "2026-10-15T07:10:00Z", assignee: "IT Helpdesk" },
  { id: "HD-1037", category: "Tuition", subject: "Second instalment receipt missing", status: "WAITING_ON_STUDENT" as TicketStatus, updated: "2026-10-14T12:30:00Z", assignee: "Finance Office" },
  { id: "HD-1021", category: "Academic Registry", subject: "Transcript copy request", status: "RESOLVED" as TicketStatus, updated: "2026-10-09T09:45:00Z", assignee: "Academic Registry" },
];

export type LostFoundArt = "wallet" | "card" | "umbrella" | "usb" | "keys" | "phone";
export const lostFound = [
  { id: "lf-1", kind: "FOUND" as const, art: "wallet" as LostFoundArt, title: "Black wallet", place: "Номын сан, 2 давхар", date: "2026-10-14", status: "Open" },
  { id: "lf-2", kind: "LOST" as const, art: "card" as LostFoundArt, title: "Student card (Б2419…)", place: "А байр, 1-р давхар", date: "2026-10-13", status: "Claim pending" },
  { id: "lf-3", kind: "FOUND" as const, art: "umbrella" as LostFoundArt, title: "Blue umbrella", place: "Цайны газар", date: "2026-10-12", status: "Open" },
  { id: "lf-4", kind: "LOST" as const, art: "usb" as LostFoundArt, title: "USB drive, 64 GB", place: "Лаб-2", date: "2026-10-10", status: "Returned" },
  { id: "lf-5", kind: "FOUND" as const, art: "keys" as LostFoundArt, title: "Keys with red tag", place: "Б байр, үүдний хаалга", date: "2026-10-09", status: "Open" },
  { id: "lf-6", kind: "FOUND" as const, art: "phone" as LostFoundArt, title: "Phone in grey case", place: "Лекцийн танхим Б-305", date: "2026-10-08", status: "Open" },
];

export const officeHours = [
  { id: "oh-1", instructor: "Instructor A", course: "ECN221", day: "Tue", time: "14:00–15:00", room: "Б-412", status: "Open" },
  { id: "oh-2", instructor: "Instructor A", course: "ECN221", day: "Thu", time: "10:00–11:00", room: "Б-412", status: "Booked" },
  { id: "oh-3", instructor: "Instructor E", course: "APL121", day: "Wed", time: "15:30–16:30", room: "Лаб-2", status: "Open" },
  { id: "oh-4", instructor: "Instructor F", course: "DBM121", day: "Fri", time: "11:00–12:00", room: "Online", status: "Open" },
];

/** Prior courses so the audit chart has completed nodes and a credit total. */
export const auditExtra = { creditsRequired: 133, creditsEarned: 67 };
