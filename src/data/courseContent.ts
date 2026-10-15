/**
 * SAMPLE weekly course content (16-week term, week 1 = Mon 31 Aug 2026).
 * Topics are illustrative English placeholders; real ones come from Moodle.
 * Weights always total 100: 7 assignments x4, 4 quizzes x3, midterm 25,
 * final 30, participation 5. Scores for past items are deterministic.
 */
import { DEMO_NOW } from "./hubSamples";

export type ItemKind = "lecture" | "reading" | "lab" | "assignment" | "quiz" | "exam" | "project";
export type ItemStatus = "graded" | "submitted" | "due-soon" | "upcoming" | "available";

export interface WeekItem {
  id: string;
  kind: ItemKind;
  title: string;
  dueAt?: string;
  weight?: number;
  maxPoints?: number;
  score?: number | null; // null = not graded yet
  status: ItemStatus;
}

export interface CourseWeek {
  week: number;
  startsOn: string; // ISO date
  topic: string;
  state: "past" | "current" | "future";
  items: WeekItem[];
}

const TERM_START = Date.UTC(2026, 7, 31);
const DAY = 86_400_000;
const NOW = new Date(DEMO_NOW).getTime();

export const topics: Record<string, string[]> = {
  ECN221: ["Data and measurement", "Descriptive statistics", "Probability basics", "Random variables", "Discrete distributions", "Normal distribution", "Sampling distributions", "Midterm review and exam", "Confidence intervals", "Hypothesis testing", "Two-sample tests", "Chi-square tests", "Correlation", "Simple regression", "Multiple regression", "Review and final exam"],
  MAT112: ["Functions and limits", "Derivatives", "Applications of derivatives", "Integrals", "Techniques of integration", "Differential equations", "Sequences and series", "Midterm review and exam", "Vectors", "Matrices", "Systems of equations", "Optimisation", "Multivariable functions", "Partial derivatives", "Applied modelling", "Review and final exam"],
  APL121: ["Programs and algorithms", "Variables and control flow", "Functions", "Arrays and strings", "Recursion", "Searching and sorting", "Complexity basics", "Midterm review and exam", "Pointers and memory", "Structures", "File I/O", "Modules", "Intro to OOP", "Error handling", "Mini project", "Review and final exam"],
  DBM121: ["Data and databases", "The relational model", "SQL: SELECT", "SQL: joins", "Aggregation and grouping", "Subqueries", "Schema design", "Midterm review and exam", "Normalisation", "ER modelling", "Indexes", "Transactions", "Views and security", "NoSQL overview", "Project demo", "Review and final exam"],
  ISA332: ["What is business analysis", "Stakeholders", "Requirements elicitation", "Process modelling", "Use cases", "User stories", "Data modelling", "Midterm review and exam", "Business rules", "Cost-benefit analysis", "Prioritisation", "Solution evaluation", "Agile analysis", "Case study", "Presentations", "Review and final exam"],
  ISA331: ["Systems thinking", "SDLC models", "Feasibility study", "Requirements capture", "Data flow diagrams", "UML overview", "Class diagrams", "Midterm review and exam", "Sequence diagrams", "UI design", "Architecture", "Testing strategy", "Implementation planning", "Maintenance", "Project demo", "Review and final exam"],
};

function score(seed: number, i: number): number {
  const x = Math.sin(seed * 12.9898 + i * 78.233) * 43758.5453;
  return 68 + Math.round((x - Math.floor(x)) * 30); // 68..98
}

const iso = (ms: number) => new Date(ms).toISOString();

export function buildWeeks(code: string, seed: number, graded = true): CourseWeek[] {
  const list = topics[code] ?? Array.from({ length: 16 }, (_, i) => `Topic ${i + 1}`);
  const asg = [2, 4, 6, 8, 10, 12, 14];
  const quiz = [3, 7, 11, 15];
  let n = 0;
  return list.map((topic, i) => {
    const week = i + 1;
    const start = TERM_START + i * 7 * DAY;
    const end = start + 7 * DAY;
    const state: CourseWeek["state"] = NOW >= end ? "past" : NOW >= start ? "current" : "future";
    const items: WeekItem[] = [
      { id: `${code}-w${week}-lec`, kind: "lecture", title: `Lecture ${week}: ${topic}`, status: state === "future" ? "upcoming" : "available" },
      { id: `${code}-w${week}-read`, kind: "reading", title: `Reading and slides: ${topic}`, status: state === "future" ? "upcoming" : "available" },
    ];
    if (week % 2 === 1 && week < 15) items.push({ id: `${code}-w${week}-lab`, kind: "lab", title: `Lab ${Math.ceil(week / 2)}: practice set`, status: state === "future" ? "upcoming" : "available" });
    const add = (kind: ItemKind, title: string, weight: number, dueDay: number, max = 100) => {
      const dueAt = iso(start + dueDay * DAY + 15 * 3600_000);
      const due = new Date(dueAt).getTime();
      const past = due < NOW;
      const k = n++;
      const s = past && graded ? Math.round((score(seed, k) / 100) * max) : null;
      const status: ItemStatus = past ? (graded ? "graded" : "submitted") : due - NOW < 3 * DAY ? "due-soon" : "upcoming";
      items.push({ id: `${code}-w${week}-${kind}`, kind, title, dueAt, weight, maxPoints: max, score: s, status });
    };
    if (asg.includes(week)) add("assignment", `Assignment ${asg.indexOf(week) + 1}`, 4, 4);
    if (quiz.includes(week)) add("quiz", `Quiz ${quiz.indexOf(week) + 1}`, 3, 3, 20);
    if (week === 8) add("exam", "Midterm exam", 25, 2);
    if (week === 16) add("exam", "Final exam", 30, 3);
    if (week === 6) add("project", "Participation record (continuous)", 5, 6);
    return { week, startsOn: iso(start).slice(0, 10), topic, state, items };
  });
}

export interface GradeBreakdown { kind: ItemKind; label: string; weight: number; earned: number; graded: number }

/** Current % over graded items only, plus per-category rows. */
export function summarize(weeks: CourseWeek[]) {
  const items = weeks.flatMap((w) => w.items).filter((i) => i.weight);
  const gradedItems = items.filter((i) => i.score !== null && i.score !== undefined);
  const gw = gradedItems.reduce((a, i) => a + i.weight!, 0);
  const earned = gradedItems.reduce((a, i) => a + (i.weight! * i.score!) / i.maxPoints!, 0);
  const label: Record<string, string> = { assignment: "Assignments", quiz: "Quizzes", exam: "Exams", project: "Participation" };
  const rows: GradeBreakdown[] = (["assignment", "quiz", "exam", "project"] as ItemKind[]).map((kind) => {
    const k = items.filter((i) => i.kind === kind);
    const kg = k.filter((i) => i.score !== null && i.score !== undefined);
    return { kind, label: label[kind], weight: k.reduce((a, i) => a + i.weight!, 0), earned: kg.reduce((a, i) => a + (i.weight! * i.score!) / i.maxPoints!, 0), graded: kg.reduce((a, i) => a + i.weight!, 0) };
  });
  return { percentage: gw ? (earned / gw) * 100 : null, gradedWeight: gw, totalWeight: items.reduce((a, i) => a + i.weight!, 0), rows };
}
