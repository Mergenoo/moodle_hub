"use client";

import { bandFor } from "@/lib/grades";
import { useI18n } from "@/lib/i18n";
import type { GradePillProps } from "../props";

const bandClass = {
  a: "bg-grade-a-bg text-grade-a-fg",
  b: "bg-grade-b-bg text-grade-b-fg",
  c: "bg-grade-c-bg text-grade-c-fg",
  f: "bg-grade-f-bg text-grade-f-fg",
} as const;

/** "88% / B+". Text carries the value; colour band is supplementary. */
export function GradePill({ grade }: GradePillProps) {
  const { t } = useI18n();
  const pct = Number.isInteger(grade.percentage) ? grade.percentage : grade.percentage.toFixed(1);
  const updated = new Date(grade.lastUpdated).toLocaleString();
  return (
    <span
      className={`inline-flex h-7 items-center gap-1 rounded-pill px-2.5 text-chip font-bold tabular-nums ${bandClass[bandFor(grade.letter)]}`}
      title={`${t("grade")} · ${updated}${grade.demo ? ` · ${t("demoGrade")}` : ""}`}
    >
      <span className="sr-only">{t("grade")}: </span>
      {pct}% / {grade.letter}
    </span>
  );
}
