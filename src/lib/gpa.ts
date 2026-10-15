import { gradeScale, letterFor } from "./grades";
import { priorRecord } from "@/data/hubSamples";
import type { AssignmentItem, CourseSummary } from "@/types/hub";

export const pointsFor = (letter: string) => gradeScale.find((g) => g.letter === letter)?.points ?? 0;

export interface TermLine { code: string; credits: number; points: number }

export function termGpa(lines: TermLine[]): number {
  const cr = lines.reduce((a, l) => a + l.credits, 0);
  return cr ? lines.reduce((a, l) => a + l.points * l.credits, 0) / cr : 0;
}

export function cumulativeGpa(term: TermLine[]): number {
  const cr = term.reduce((a, l) => a + l.credits, 0);
  const total = priorRecord.gpa * priorRecord.credits + term.reduce((a, l) => a + l.points * l.credits, 0);
  return total / (priorRecord.credits + cr);
}

export function gradedLines(courses: CourseSummary[]): TermLine[] {
  return courses.filter((c) => c.showInGrid && c.grade).map((c) => ({ code: c.code, credits: c.credits, points: pointsFor(c.grade!.letter) }));
}

/** Projected course % when pending items are filled with `guess[id]` (0-100). */
export function projectCourse(items: AssignmentItem[], guess: Record<string, number>): number {
  return items.reduce((sum, a) => {
    const pct = a.pointsEarned !== null ? (a.pointsEarned / a.maxPoints) * 100 : (guess[a.id] ?? 80);
    return sum + (a.weightPercent * pct) / 100;
  }, 0);
}

export { letterFor };
