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
import { letterFor } from "@/lib/grades";
import { buildWeeks, summarize } from "./courseContent";
import { CURRENT_SEMESTER, plan } from "./curriculum";
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

const baseCourses: CourseSummary[] = [
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

/** Weekly content per course (ISA332: nothing released, so no grade pill). */
export const courseWeeks = Object.fromEntries(
  baseCourses.map((c) => [c.code, buildWeeks(c.code, c.moodleCourseId, c.code !== "ISA332")]),
);

/** Grade pills are computed from graded items so they agree with the course page and simulator. */
export const courses: CourseSummary[] = baseCourses.map((c) => {
  const sum = courseWeeks[c.code] && summarize(courseWeeks[c.code]);
  if (!sum || sum.percentage === null) return { ...c, grade: null };
  const percentage = Math.round(sum.percentage);
  return { ...c, grade: { percentage, letter: letterFor(percentage), lastUpdated: updated, source: "moodle" as const, demo: true } };
});

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

export const assignments: AssignmentItem[] = baseCourses.flatMap((c) =>
  (courseWeeks[c.code] ?? [])
    .flatMap((w) => w.items)
    .filter((i) => i.weight)
    .map((i) => ({
      id: i.id,
      courseId: c.id,
      title: i.title,
      weightPercent: i.weight!,
      maxPoints: i.maxPoints!,
      pointsEarned: i.score ?? null,
      dueAt: i.dueAt ?? null,
    })),
);

export const exams: ExamEntry[] = [
  { id: "e-1", courseId: "c-ecn221", courseCode: "ECN221", type: "MIDTERM", startsAt: "2026-10-21T02:00:00Z", endsAt: "2026-10-21T03:30:00Z", room: "Б-305" },
  { id: "e-2", courseId: "c-apl121", courseCode: "APL121", type: "MIDTERM", startsAt: "2026-10-22T05:00:00Z", endsAt: "2026-10-22T06:30:00Z", room: "Лаб-2" },
];

const tt = (
  n: number, courseId: string, courseCode: string, type: TimetableEntry["type"], dayOfWeek: TimetableEntry["dayOfWeek"],
  start: [number, number], room: string, instructorName: string,
): TimetableEntry => ({ id: `tt-${n}`, courseId, courseCode, type, dayOfWeek, startMinute: start[0] * 60 + start[1], endMinute: start[0] * 60 + start[1] + 90, room, instructorName });

export const timetable: TimetableEntry[] = [
  tt(1, "c-ecn221", "ECN221", "LECTURE", 1, [9, 20], "Б-305", "Instructor A"),
  tt(2, "c-apl121", "APL121", "LECTURE", 1, [11, 0], "А-201", "Instructor E"),
  tt(3, "c-csc301", "CSC301", "SEMINAR", 1, [14, 20], "Б-114", "Instructor I"),
  tt(4, "c-isa331", "ISA331", "LECTURE", 2, [9, 20], "А-305", "Instructor G"),
  tt(5, "c-apl121", "APL121", "LAB", 2, [11, 0], "Лаб-2", "Instructor E"),
  tt(6, "c-dbm121", "DBM121", "LAB", 2, [14, 20], "Лаб-3", "Instructor F"),
  tt(7, "c-ecn221", "ECN221", "SEMINAR", 3, [9, 20], "Б-305", "Instructor B"),
  tt(8, "c-isa332", "ISA332", "SEMINAR", 3, [11, 0], "Б-210", "Instructor H"),
  tt(9, "c-dbm121", "DBM121", "LECTURE", 3, [14, 20], "А-210", "Instructor F"),
  tt(10, "c-isa331", "ISA331", "SEMINAR", 4, [9, 20], "А-305", "Instructor G"),
  tt(11, "c-csc301", "CSC301", "LECTURE", 4, [11, 0], "Б-114", "Instructor I"),
  tt(12, "c-ecn221", "ECN221", "LECTURE", 4, [14, 20], "Б-305", "Instructor A"),
  tt(13, "c-csc301", "CSC301", "LAB", 5, [9, 20], "Лаб-1", "Instructor I"),
  tt(14, "c-isa332", "ISA332", "LECTURE", 5, [12, 40], "Б-210", "Instructor H"),
];

/** Prerequisite edges and audit nodes derive from the 133-credit sample plan (curriculum.ts). */
export const prerequisites: PrerequisiteEdge[] = plan.flatMap((p) => p.prereqs.map((from) => ({ from, to: p.code })));

export const degreeAudit: DegreeAuditNode[] = plan.map((p) => {
  const done = (code: string) => plan.find((x) => x.code === code)!.semester < CURRENT_SEMESTER;
  const status: DegreeAuditNode["status"] =
    p.semester < CURRENT_SEMESTER ? "COMPLETED" : p.semester === CURRENT_SEMESTER ? "IN_PROGRESS" : p.prereqs.every(done) ? "AVAILABLE" : "LOCKED";
  return { code: p.code, titleMn: p.titleMn, credits: p.credits, status };
});
