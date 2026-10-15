"use client";

import { useRef, useState } from "react";
import { GradePill } from "@/components/course/GradePill";
import { cumulativeGpa, gradedLines, termGpa } from "@/lib/gpa";
import { DEMO_NOW, priorRecord } from "@/data/hubSamples";
import type { AssignmentItem, CourseSummary, ExamEntry } from "@/types/hub";
import { MainContent } from "../main/MainContent";
import { PageHeader } from "../main/PageHeader";
import { GPASimulator } from "./GPASimulator";
import { Card, SampleBadge, Stat, btn, fmtDate } from "./Section";

const typeLabel = { MIDTERM: "Midterm", FINAL: "Final", RETAKE: "Retake", QUIZ: "Quiz", PRACTICAL: "Practical" } as const;

function countdown(iso: string) {
  const ms = new Date(iso).getTime() - new Date(DEMO_NOW).getTime();
  const days = Math.ceil(ms / 86_400_000);
  return { days, text: days <= 0 ? "Today" : days === 1 ? "Tomorrow" : `in ${days} days`, urgent: days <= 7 };
}

export function GradesView({ courses, assignments, exams }: { courses: CourseSummary[]; assignments: AssignmentItem[]; exams: ExamEntry[] }) {
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLButtonElement>(null);
  const lines = gradedLines(courses);
  const close = () => { setOpen(false); opener.current?.focus(); };
  const graded = courses.filter((c) => c.showInGrid);
  return (
    <MainContent>
      <PageHeader title="Grades & GPA" actions={<button ref={opener} type="button" className={btn} onClick={() => setOpen(true)}>Open GPA simulator</button>} />
      <SampleBadge />
      <div className="grid gap-5 tablet:grid-cols-3">
        <Stat label="Cumulative GPA" value={cumulativeGpa(lines).toFixed(2)} hint="Official, registry · scale 4.0" />
        <Stat label="Term GPA (Autumn 2026-2027)" value={termGpa(lines).toFixed(2)} hint="Provisional, from Moodle grades" />
        <Stat label="Credits earned" value={`${priorRecord.credits} / 120`} hint="Registry" />
      </div>
      <div className="mt-5 grid gap-5 laptop:grid-cols-2">
        <Card title="Current grades">
          <ul className="divide-y divide-line">
            {graded.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0"><p className="text-nav-sm font-semibold text-ink">{c.code}</p><p className="truncate text-meta text-ink-muted">{c.titleMn}</p></div>
                {c.grade ? <GradePill grade={c.grade} /> : <span className="text-meta text-ink-muted">Not released</span>}
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Exam timetable">
          <ul className="divide-y divide-line">
            {exams.map((e) => {
              const c = countdown(e.startsAt);
              return (
                <li key={e.id} className="flex items-center justify-between gap-3 py-3">
                  <div><p className="text-nav-sm font-semibold text-ink">{e.courseCode} · {typeLabel[e.type]}</p><p className="text-meta text-ink-muted">{fmtDate(e.startsAt)} · Room {e.room}</p></div>
                  <span className={`rounded-pill px-3 py-1 text-meta font-bold ${c.urgent ? "bg-grade-c-bg text-grade-c-fg" : "bg-brand-soft text-brand"}`}>{c.text}</span>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
      <GPASimulator open={open} onClose={close} courses={courses} assignments={assignments} />
    </MainContent>
  );
}
