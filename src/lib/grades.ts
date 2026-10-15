import type { LetterGrade } from "@/types/hub";

/**
 * Percentage → letter/points scale. ESTIMATE, to be confirmed by the Academic
 * Registry (docs/00-assumptions.md §9). Ordered from highest to lowest.
 */
export const gradeScale: { min: number; letter: LetterGrade; points: number }[] = [
  { min: 95, letter: "A", points: 4.0 },
  { min: 90, letter: "A-", points: 3.7 },
  { min: 87, letter: "B+", points: 3.3 },
  { min: 83, letter: "B", points: 3.0 },
  { min: 80, letter: "B-", points: 2.7 },
  { min: 77, letter: "C+", points: 2.3 },
  { min: 73, letter: "C", points: 2.0 },
  { min: 70, letter: "C-", points: 1.7 },
  { min: 67, letter: "D+", points: 1.3 },
  { min: 60, letter: "D", points: 1.0 },
  { min: 0, letter: "F", points: 0 },
];

export function letterFor(percentage: number): LetterGrade {
  return gradeScale.find((s) => percentage >= s.min)?.letter ?? "F";
}

export type GradeBand = "a" | "b" | "c" | "f";

export function bandFor(letter: LetterGrade): GradeBand {
  if (letter.startsWith("A")) return "a";
  if (letter.startsWith("B")) return "b";
  if (letter.startsWith("C")) return "c";
  return "f";
}
