/**
 * Domain DTOs returned by the gateway (`HubDataSource`) and consumed by UI
 * components. These mirror the Prisma models but are shaped for the screen:
 * dates are ISO strings, Mongolian text is carried verbatim.
 */

export type Locale = "en" | "mn";

export type Semester = "AUTUMN" | "SPRING" | "SUMMER";

export type HeaderPattern =
  | "teal-waves"
  | "purple-lowpoly"
  | "gray-hexagons"
  | "green-circles"
  | "blue-circles"
  | "pink-diamonds";

/** See docs/00-assumptions.md §5 for how Moodle data maps to these. */
export type AccessStatus =
  | "PENDING"
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ACTIVE_UNTRACKED"
  | "SUSPENDED";

export type LetterGrade =
  | "A"
  | "A-"
  | "B+"
  | "B"
  | "B-"
  | "C+"
  | "C"
  | "C-"
  | "D+"
  | "D"
  | "F";

export interface Person {
  id: string;
  /** Full display name, used for alt text and tooltips. */
  name: string;
  initials: string;
  /** Null renders Moodle's grey default silhouette. */
  avatarUrl: string | null;
}

export interface Student extends Person {
  studentNo: string;
  email: string;
  locale: Locale;
}

export interface CourseGrade {
  percentage: number;
  letter: LetterGrade;
  /** ISO timestamp of the upstream change. */
  lastUpdated: string;
  source: "moodle" | "registry";
  /** True for illustrative seed values (the screenshot has no grades). */
  demo?: boolean;
}

export interface CourseHeader {
  pattern: HeaderPattern;
  /** Uploaded Moodle course image; overrides the generated pattern. */
  imageUrl?: string;
  /** Text baked into an uploaded image (MAT112 department banner). */
  overlayTextMn?: string;
}

export interface CourseSummary {
  id: string;
  moodleCourseId: number;
  /** "ECN221". */
  code: string;
  /** Exactly as in Moodle, never translated: "БИЗНЕСИЙН СТАТИСТИК". */
  titleMn: string;
  titleEn?: string;
  academicYear: string; // "2026-2027"
  semester: Semester;
  /** "Намар" / "Хавар" as it appears in the Moodle full name. */
  semesterWordMn: string;
  /**
   * Moodle full name override for entries that do not follow
   * "CODE / TITLE YEAR TERM" (e.g. "CE BADGE-BDG101 хөтөлбөр").
   */
  fullNameOverride?: string;
  /** Term badge chip text, e.g. "Намрын улирал". Null hides the chip. */
  termBadgeMn: string | null;
  credits: number;
  header: CourseHeader;
  accessStatus: AccessStatus;
  /** 0–100, or null when completion tracking is off. */
  progressPercent: number | null;
  instructors: Person[];
  grade: CourseGrade | null;
  /** Shown as a card in the grid (false = sidebar-only, e.g. programme badges). */
  showInGrid: boolean;
  href: string;
}

export type NotificationKind =
  | "COURSE_ALERT"
  | "GRADE_POSTED"
  | "DEADLINE"
  | "CAMPUS_NOTICE"
  | "TICKET_UPDATE";

export interface HubNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  body?: string;
  href?: string;
  createdAt: string;
  read: boolean;
}

export type AnnouncementChannel = "DEPARTMENT" | "ACADEMIC_REGISTRY" | "STUDENT_EVENTS";

export interface Announcement {
  id: string;
  channel: AnnouncementChannel;
  priority: "LOW" | "NORMAL" | "HIGH" | "URGENT";
  titleMn: string;
  titleEn?: string;
  href?: string;
  publishedAt: string;
}

export interface AssignmentItem {
  id: string;
  courseId: string;
  title: string;
  weightPercent: number;
  maxPoints: number;
  /** Null = not graded yet; the what-if calculator lets the student fill it. */
  pointsEarned: number | null;
  dueAt: string | null;
}

export interface ExamEntry {
  id: string;
  courseId: string;
  courseCode: string;
  type: "MIDTERM" | "FINAL" | "RETAKE" | "QUIZ" | "PRACTICAL";
  startsAt: string;
  endsAt: string;
  room: string;
}

export interface TimetableEntry {
  id: string;
  courseId: string;
  courseCode: string;
  type: "LECTURE" | "SEMINAR" | "LAB";
  dayOfWeek: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  startMinute: number;
  endMinute: number;
  room: string;
  instructorName: string;
}

export interface PrerequisiteEdge {
  from: string; // prerequisite course code
  to: string; // dependent course code
}

export interface DegreeAuditNode {
  code: string;
  titleMn: string;
  credits: number;
  status: "COMPLETED" | "IN_PROGRESS" | "AVAILABLE" | "LOCKED";
}
