"use client";

import Link from "next/link";
import { useState } from "react";
import { CardHeaderImage } from "@/components/course/CardHeaderImage";
import { GradePill } from "@/components/course/GradePill";
import { InstructorAvatars } from "@/components/course/InstructorAvatars";
import { Card } from "@/components/hub/Section";
import { courseFullName } from "@/lib/course";
import { useI18n } from "@/lib/i18n";
import { DEMO_NOW } from "@/data/hubSamples";
import { summarize, type CourseWeek, type ItemKind, type WeekItem } from "@/data/courseContent";
import type { CourseSummary } from "@/types/hub";
import { MainContent } from "./MainContent";

const kindMeta: Record<ItemKind, { label: string; cls: string }> = {
  lecture: { label: "Lecture", cls: "bg-surface-muted text-ink-chip" },
  reading: { label: "Reading", cls: "bg-surface-muted text-ink-chip" },
  lab: { label: "Lab", cls: "bg-grade-a-bg text-grade-a-fg" },
  assignment: { label: "Assignment", cls: "bg-brand-soft text-brand" },
  quiz: { label: "Quiz", cls: "bg-grade-c-bg text-grade-c-fg" },
  exam: { label: "Exam", cls: "bg-grade-f-bg text-grade-f-fg" },
  project: { label: "Participation", cls: "bg-surface-muted text-ink-chip" },
};
const filters: { id: "all" | "graded" | "deadlines"; label: string }[] = [
  { id: "all", label: "Everything" }, { id: "graded", label: "Graded work" }, { id: "deadlines", label: "Upcoming deadlines" },
];
const fmt = (iso: string) => new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Ulaanbaatar" });
const range = (iso: string) => {
  const a = new Date(iso), b = new Date(a.getTime() + 6 * 86_400_000);
  const f = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
  return `${f(a)} – ${f(b)}`;
};

function ItemRow({ i }: { i: WeekItem }) {
  const m = kindMeta[i.kind];
  return (
    <li className="flex flex-wrap items-center justify-between gap-2 py-2.5">
      <div className="flex min-w-0 items-center gap-3">
        <span className={`w-24 shrink-0 rounded-pill px-2.5 py-0.5 text-center text-meta font-semibold ${m.cls}`}>{m.label}</span>
        <div className="min-w-0">
          <p className="text-nav-sm text-ink">{i.title}</p>
          {i.dueAt && <p className="text-meta text-ink-muted">Due {fmt(i.dueAt)}{i.weight ? ` · ${i.weight}% of grade` : ""}</p>}
        </div>
      </div>
      {i.weight ? (
        i.score !== null && i.score !== undefined ? (
          <span className="rounded-pill bg-grade-a-bg px-3 py-0.5 text-meta font-bold tabular-nums text-grade-a-fg">{i.score}/{i.maxPoints}</span>
        ) : i.status === "submitted" ? (
          <span className="rounded-pill bg-surface-muted px-3 py-0.5 text-meta font-semibold text-ink-chip">Submitted · awaiting grade</span>
        ) : i.status === "due-soon" ? (
          <span className="rounded-pill bg-grade-c-bg px-3 py-0.5 text-meta font-bold text-grade-c-fg">Due soon</span>
        ) : (
          <span className="rounded-pill bg-brand-soft px-3 py-0.5 text-meta font-semibold text-brand">Upcoming</span>
        )
      ) : null}
    </li>
  );
}

export function CoursePlaceholder({ course, weeks, prereqs }: { course: CourseSummary; weeks: CourseWeek[] | null; prereqs: string[] }) {
  const { t } = useI18n();
  const [filter, setFilter] = useState<"all" | "graded" | "deadlines">("all");
  const sum = weeks ? summarize(weeks) : null;
  const now = new Date(DEMO_NOW).getTime();
  const upcoming = weeks
    ? weeks.flatMap((w) => w.items).filter((i) => i.weight && i.dueAt && new Date(i.dueAt).getTime() >= now).sort((a, b) => a.dueAt!.localeCompare(b.dueAt!)).slice(0, 5)
    : [];
  const currentWeek = weeks?.find((w) => w.state === "current")?.week ?? 1;
  const keep = (i: WeekItem) => (filter === "all" ? true : filter === "graded" ? !!i.weight : !!i.weight && i.dueAt! >= DEMO_NOW);

  return (
    <MainContent>
      <div className="mt-8 overflow-hidden rounded-card border border-line bg-surface shadow-card">
        <CardHeaderImage header={course.header} seed={course.moodleCourseId} />
        <div className="flex flex-col gap-3 p-6">
          <p className="text-meta font-semibold uppercase tracking-wide text-ink-muted">{t("courseTitle")} · {course.credits} credits · {course.academicYear} {course.semesterWordMn}</p>
          <h1 className="text-2xl font-extrabold text-ink">{courseFullName(course)}</h1>
          <div className="flex flex-wrap items-center gap-3">
            {course.grade && <GradePill grade={course.grade} />}
            <InstructorAvatars instructors={course.instructors} />
          </div>
          {sum && <p className="text-nav-sm text-ink-secondary">Week {currentWeek} of 16 · {sum.gradedWeight}% of the grade is graded so far.</p>}
        </div>
      </div>

      {!weeks ? (
        <p className="mt-6 rounded-card border border-line p-6 text-nav-sm text-ink-secondary">{t("coursePlaceholder")}</p>
      ) : (
        <div className="mt-6 grid gap-5 laptop:grid-cols-[1fr_20rem]">
          <div>
            <div role="group" aria-label="Filter course content" className="mb-4 flex flex-wrap gap-2">
              {filters.map((f) => (
                <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}
                  className={`h-9 rounded-pill px-4 text-nav-sm font-semibold ${filter === f.id ? "bg-brand text-ink-inverse" : "bg-surface-muted text-ink-secondary hover:bg-surface-raised"}`}>{f.label}</button>
              ))}
            </div>
            <ol className="flex flex-col gap-3">
              {weeks.map((w) => {
                const items = w.items.filter(keep);
                if (filter !== "all" && items.length === 0) return null;
                return (
                  <li key={w.week}>
                    <details open={w.state === "current"} className="group rounded-card border border-line bg-surface shadow-card">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
                        <span>
                          <span className="block text-meta font-semibold uppercase tracking-wide text-ink-muted">Week {w.week} · {range(w.startsOn)}</span>
                          <span className="block text-card-title text-ink">{w.topic}</span>
                        </span>
                        <span className={`shrink-0 rounded-pill px-3 py-0.5 text-meta font-semibold ${w.state === "current" ? "bg-brand text-ink-inverse" : w.state === "past" ? "bg-surface-muted text-ink-chip" : "bg-brand-soft text-brand"}`}>
                          {w.state === "current" ? "This week" : w.state === "past" ? "Done" : "Upcoming"}
                        </span>
                      </summary>
                      <ul className="divide-y divide-line border-t border-line px-4">
                        {items.map((i) => <ItemRow key={i.id} i={i} />)}
                      </ul>
                    </details>
                  </li>
                );
              })}
            </ol>
          </div>

          <aside className="flex flex-col gap-5" aria-label="Course summary">
            <Card title="Grade breakdown">
              {sum?.percentage != null ? (
                <>
                  <p className="mb-3 text-3xl font-extrabold tabular-nums text-ink">{sum.percentage.toFixed(1)}%<span className="ml-2 text-meta font-normal text-ink-muted">of graded work</span></p>
                  <ul className="flex flex-col gap-3">
                    {sum.rows.map((r) => (
                      <li key={r.kind}>
                        <div className="flex justify-between text-meta text-ink-secondary"><span>{r.label} · {r.weight}%</span><span className="tabular-nums">{r.graded ? `${((r.earned / r.graded) * 100).toFixed(0)}%` : "not graded"}</span></div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-pill bg-progress-track"><div className="h-full rounded-pill bg-gradient-to-r from-progress-from to-progress-to" style={{ width: `${r.weight ? (r.graded / r.weight) * 100 : 0}%` }} /></div>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-meta text-ink-muted">Bars show how much of each category is graded.</p>
                </>
              ) : (
                <p className="text-nav-sm text-ink-muted">Grades are not released for this course yet.</p>
              )}
            </Card>
            <Card title="Next deadlines">
              <ul className="flex flex-col gap-3">
                {upcoming.map((i) => (
                  <li key={i.id}><p className="text-nav-sm text-ink">{i.title}</p><p className="text-meta text-ink-muted">{fmt(i.dueAt!)} · {i.weight}%</p></li>
                ))}
              </ul>
            </Card>
            <Card title="About this course">
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-nav-sm">
                <dt className="text-ink-muted">Credits</dt><dd className="text-ink">{course.credits}</dd>
                <dt className="text-ink-muted">Term</dt><dd className="text-ink">{course.academicYear} {course.semesterWordMn}</dd>
                <dt className="text-ink-muted">Prerequisites</dt><dd className="text-ink">{prereqs.length ? prereqs.join(", ") : "None"}</dd>
                <dt className="text-ink-muted">English title</dt><dd className="text-ink">{course.titleEn}</dd>
              </dl>
            </Card>
            <p className="text-meta text-ink-muted">Sample content: topics, deadlines and scores are illustrative.</p>
          </aside>
        </div>
      )}
      <Link href="/" className="mt-8 inline-block text-nav-sm font-semibold text-brand hover:underline">← {t("backToCourses")}</Link>
    </MainContent>
  );
}
