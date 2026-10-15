/**
 * Seed data reproducing the production My courses page (15 Oct 2026).
 *
 * Exact from the screenshot / brief: course codes, Mongolian titles, years,
 * semester words, term badges, header patterns, footer state, avatar counts,
 * the "8" enrolment badge and the "3" notification badge.
 *
 * Illustrative (marked `demo`): grades, instructor names, Moodle ids, and
 * everything used only by later phases (assignments, exams, timetable).
 */
import type {
  Announcement,
  AssignmentItem,
  CourseSummary,
  DegreeAuditNode,
  ExamEntry,
  HubNotification,
  PrerequisiteEdge,
  Student,
  TimetableEntry,
} from "@/types/hub";

export const student: Student = {
  id: "u-0001",
  name: "Demo Student",
  initials: "MO",
  avatarUrl: null,
  studentNo: "DEMO0001",
  email: "student@demo.ufe.edu.mn",
  locale: "en",
};

/** Moodle reports 8 enrolments; only 7 are known from the screenshot. */
export const totalEnrolments = 8;

const autumnBadge = "Намрын улирал";
const updated = "2026-10-14T08:30:00Z";

export const courses: CourseSummary[] = [
  {
    id: "c-ecn221",
    moodleCourseId: 2211,
    code: "ECN221",
    titleMn: "БИЗНЕСИЙН СТАТИСТИК",
    titleEn: "Business Statistics",
    academicYear: "2026-2027",
    semester: "AUTUMN",
    semesterWordMn: "Намар",
    termBadgeMn: autumnBadge,
    credits: 3,
    header: { pattern: "teal-waves" },
    accessStatus: "NOT_STARTED",
    progressPercent: null,
    instructors: [
      { id: "t-1", name: "Instructor A", initials: "БА", avatarUrl: null },
      { id: "t-2", name: "Instructor B", initials: "ОН", avatarUrl: null },
      { id: "t-3", name: "Instructor C", initials: "ЭС", avatarUrl: null },
    ],
    grade: { percentage: 88, letter: "B+", lastUpdated: updated, source: "moodle", demo: true },
    showInGrid: true,
    href: "/course/ECN221",
  },
  {
    id: "c-mat112",
    moodleCourseId: 1121,
    code: "MAT112",
    titleMn: "ХЭРЭГЛЭЭНИЙ МАТЕМАТИК II",
    titleEn: "Applied Mathematics II",
    academicYear: "2025-2026",
    semester: "SPRING",
    semesterWordMn: "Хавар",
    // Production shows the Autumn badge on a Spring course (assumptions §7).
    termBadgeMn: autumnBadge,
    credits: 3,
    header: { pattern: "purple-lowpoly", overlayTextMn: "СУУРЬ ШИНЖЛЭХ УХААНЫ ТЭНХИМ" },
    accessStatus: "NOT_STARTED",
    progressPercent: null,
    // One teacher without a profile photo → grey silhouette.
    instructors: [{ id: "t-4", name: "Instructor D", initials: "", avatarUrl: null }],
    grade: { percentage: 91, letter: "A-", lastUpdated: updated, source: "moodle", demo: true },
    showInGrid: true,
    href: "/course/MAT112",
  },
  {
    id: "c-apl121",
    moodleCourseId: 1211,
    code: "APL121",
    titleMn: "АЛГОРИТМ, ПРОГРАМЧЛАЛЫН ХЭЛ",
    titleEn: "Algorithms and Programming Languages",
    academicYear: "2026-2027",
    semester: "AUTUMN",
    semesterWordMn: "Намар",
    termBadgeMn: autumnBadge,
    credits: 3,
    header: { pattern: "gray-hexagons" },
    accessStatus: "IN_PROGRESS",
    progressPercent: 26,
    instructors: [],
    grade: { percentage: 79, letter: "C+", lastUpdated: updated, source: "moodle", demo: true },
    showInGrid: true,
    href: "/course/APL121",
  },
  {
    id: "c-dbm121",
    moodleCourseId: 1212,
    code: "DBM121",
    titleMn: "ӨГӨГДЛИЙН САНГИЙН ҮНДЭС",
    titleEn: "Database Fundamentals",
    academicYear: "2026-2027",
    semester: "AUTUMN",
    semesterWordMn: "Намар",
    termBadgeMn: autumnBadge,
    credits: 3,
    header: { pattern: "green-circles" },
    accessStatus: "ACTIVE_UNTRACKED",
    progressPercent: null,
    instructors: [],
    grade: { percentage: 95, letter: "A", lastUpdated: updated, source: "moodle", demo: true },
    showInGrid: true,
    href: "/course/DBM121",
  },
  {
    id: "c-isa332",
    moodleCourseId: 3322,
    code: "ISA332",
    titleMn: "БИЗНЕСИЙН ШИНЖИЛГЭЭ",
    titleEn: "Business Analysis",
    academicYear: "2026-2027",
    semester: "AUTUMN",
    semesterWordMn: "Намар",
    termBadgeMn: autumnBadge,
    credits: 3,
    header: { pattern: "blue-circles" },
    accessStatus: "ACTIVE_UNTRACKED",
    progressPercent: null,
    instructors: [],
    grade: null, // no grade released yet → no pill
    showInGrid: true,
    href: "/course/ISA332",
  },
  {
    id: "c-isa331",
    moodleCourseId: 3311,
    code: "ISA331",
    titleMn: "СИСТЕМИЙН ШИНЖИЛГЭЭ БА ЗОХИОМЖ",
    titleEn: "Systems Analysis and Design",
    academicYear: "2026-2027",
    semester: "AUTUMN",
    semesterWordMn: "Намар",
    termBadgeMn: autumnBadge,
    credits: 3,
    header: { pattern: "pink-diamonds" },
    accessStatus: "ACTIVE_UNTRACKED",
    progressPercent: null,
    instructors: [],
    grade: { percentage: 84, letter: "B", lastUpdated: updated, source: "moodle", demo: true },
    showInGrid: true,
    href: "/course/ISA331",
  },
  {
    id: "c-bdg101",
    moodleCourseId: 1010,
    code: "CE BADGE-BDG101",
    titleMn: "хөтөлбөр",
    academicYear: "2026-2027",
    semester: "AUTUMN",
    semesterWordMn: "",
    fullNameOverride: "CE BADGE-BDG101 хөтөлбөр",
    termBadgeMn: null,
    credits: 0,
    header: { pattern: "blue-circles" },
    accessStatus: "ACTIVE_UNTRACKED",
    progressPercent: null,
    instructors: [],
    grade: null,
    showInGrid: false, // sidebar only, not a card in production
    href: "/course/BDG101",
  },
];

export const notifications: HubNotification[] = [
  {
    id: "n-1",
    kind: "GRADE_POSTED",
    title: "ECN221: Бие даалт 1 graded",
    body: "Your grade was updated to 88% / B+.",
    href: "/course/ECN221",
    createdAt: "2026-10-15T07:40:00Z",
    read: false,
  },
  {
    id: "n-2",
    kind: "DEADLINE",
    title: "APL121: Лаборатори 3 due in 2 days",
    href: "/course/APL121",
    createdAt: "2026-10-15T06:00:00Z",
    read: false,
  },
  {
    id: "n-3",
    kind: "CAMPUS_NOTICE",
    title: "Academic Registry: Autumn midterm timetable published",
    href: "/news",
    createdAt: "2026-10-14T10:15:00Z",
    read: false,
  },
  {
    id: "n-4",
    kind: "COURSE_ALERT",
    title: "MAT112: New forum post",
    href: "/course/MAT112",
    createdAt: "2026-10-13T12:00:00Z",
    read: true,
  },
];

// ───────────── Later-phase sample data (demo) ─────────────

export const announcements: Announcement[] = [
  {
    id: "a-1",
    channel: "ACADEMIC_REGISTRY",
    priority: "HIGH",
    titleMn: "Намрын улирлын явцын шалгалтын хуваарь гарлаа",
    titleEn: "Autumn midterm timetable published",
    href: "/news/a-1",
    publishedAt: "2026-10-14T10:15:00Z",
  },
  {
    id: "a-2",
    channel: "DEPARTMENT",
    priority: "NORMAL",
    titleMn: "Мэдээллийн системийн тэнхимийн семинар 10/20",
    titleEn: "IS department seminar on 20 Oct",
    publishedAt: "2026-10-13T09:00:00Z",
  },
  {
    id: "a-3",
    channel: "STUDENT_EVENTS",
    priority: "LOW",
    titleMn: "Оюутны клубүүдийн өдөрлөг",
    titleEn: "Student clubs fair",
    publishedAt: "2026-10-12T09:00:00Z",
  },
];

export const assignments: AssignmentItem[] = [
  { id: "as-1", courseId: "c-ecn221", title: "Бие даалт 1", weightPercent: 15, maxPoints: 100, pointsEarned: 88, dueAt: "2026-10-01T15:00:00Z" },
  { id: "as-2", courseId: "c-ecn221", title: "Явцын шалгалт", weightPercent: 30, maxPoints: 100, pointsEarned: null, dueAt: "2026-10-28T02:00:00Z" },
  { id: "as-3", courseId: "c-ecn221", title: "Төгсгөлийн шалгалт", weightPercent: 40, maxPoints: 100, pointsEarned: null, dueAt: "2026-12-20T02:00:00Z" },
  { id: "as-5", courseId: "c-ecn221", title: "Хичээлийн оролцоо", weightPercent: 15, maxPoints: 100, pointsEarned: 90, dueAt: null },
  { id: "as-4", courseId: "c-apl121", title: "Лаборатори 3", weightPercent: 10, maxPoints: 20, pointsEarned: null, dueAt: "2026-10-17T15:00:00Z" },
];

export const exams: ExamEntry[] = [
  { id: "e-1", courseId: "c-ecn221", courseCode: "ECN221", type: "MIDTERM", startsAt: "2026-10-28T02:00:00Z", endsAt: "2026-10-28T03:30:00Z", room: "Б-305" },
  { id: "e-2", courseId: "c-apl121", courseCode: "APL121", type: "MIDTERM", startsAt: "2026-10-30T05:00:00Z", endsAt: "2026-10-30T06:30:00Z", room: "Лаб-2" },
];

export const timetable: TimetableEntry[] = [
  { id: "tt-1", courseId: "c-ecn221", courseCode: "ECN221", type: "LECTURE", dayOfWeek: 1, startMinute: 9 * 60 + 20, endMinute: 10 * 60 + 50, room: "Б-305", instructorName: "Instructor A" },
  { id: "tt-2", courseId: "c-apl121", courseCode: "APL121", type: "LAB", dayOfWeek: 2, startMinute: 11 * 60, endMinute: 12 * 60 + 30, room: "Лаб-2", instructorName: "Instructor E" },
  { id: "tt-4", courseId: "c-isa331", courseCode: "ISA331", type: "SEMINAR", dayOfWeek: 4, startMinute: 9 * 60 + 20, endMinute: 10 * 60 + 50, room: "А-305", instructorName: "Instructor G" },
  { id: "tt-5", courseId: "c-isa332", courseCode: "ISA332", type: "LECTURE", dayOfWeek: 5, startMinute: 12 * 60 + 40, endMinute: 14 * 60 + 10, room: "Б-210", instructorName: "Instructor H" },
  { id: "tt-3", courseId: "c-dbm121", courseCode: "DBM121", type: "LECTURE", dayOfWeek: 3, startMinute: 14 * 60 + 20, endMinute: 15 * 60 + 50, room: "А-210", instructorName: "Instructor F" },
];

/** APL121 → DBM121 → ISA331 / ISA332 (from the brief). */
export const prerequisites: PrerequisiteEdge[] = [
  { from: "MAT112", to: "ECN221" },
  { from: "APL121", to: "DBM121" },
  { from: "DBM121", to: "ISA331" },
  { from: "DBM121", to: "ISA332" },
];

export const degreeAudit: DegreeAuditNode[] = [
  { code: "MAT112", titleMn: "ХЭРЭГЛЭЭНИЙ МАТЕМАТИК II", credits: 3, status: "COMPLETED" },
  { code: "ECN221", titleMn: "БИЗНЕСИЙН СТАТИСТИК", credits: 3, status: "IN_PROGRESS" },
  { code: "APL121", titleMn: "АЛГОРИТМ, ПРОГРАМЧЛАЛЫН ХЭЛ", credits: 3, status: "IN_PROGRESS" },
  { code: "DBM121", titleMn: "ӨГӨГДЛИЙН САНГИЙН ҮНДЭС", credits: 3, status: "IN_PROGRESS" },
  { code: "ISA331", titleMn: "СИСТЕМИЙН ШИНЖИЛГЭЭ БА ЗОХИОМЖ", credits: 3, status: "LOCKED" },
  { code: "ISA332", titleMn: "БИЗНЕСИЙН ШИНЖИЛГЭЭ", credits: 3, status: "LOCKED" },
];
