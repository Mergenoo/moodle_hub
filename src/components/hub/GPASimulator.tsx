"use client";

import { useEffect, useRef, useState } from "react";
import { cumulativeGpa, gradedLines, letterFor, pointsFor, projectCourse, termGpa } from "@/lib/gpa";
import { Icon } from "../Icon";
import type { AssignmentItem, CourseSummary } from "@/types/hub";

/**
 * Slide-out drawer (role=dialog). Focus moves in on open, Esc/backdrop closes,
 * focus returns to the opener. What-if: pending items take a guessed % and the
 * projected course grade, term GPA and cumulative GPA update live.
 */
export function GPASimulator({ open, onClose, courses, assignments }: { open: boolean; onClose: () => void; courses: CourseSummary[]; assignments: AssignmentItem[] }) {
  const panel = useRef<HTMLDivElement>(null);
  const withPending = [...new Set(assignments.filter((a) => a.pointsEarned === null).map((a) => a.courseId))];
  const [courseId, setCourseId] = useState(withPending[0]);
  const [guess, setGuess] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLElement>("button,select,input")?.focus();
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open, onClose]);

  if (!open) return null;
  const items = assignments.filter((a) => a.courseId === courseId);
  const pending = items.filter((a) => a.pointsEarned === null);
  const projected = projectCourse(items, guess);
  const letter = letterFor(projected);
  const base = gradedLines(courses);
  const lines = base.map((l) => (l.code === courses.find((c) => c.id === courseId)?.code ? { ...l, points: pointsFor(letter) } : l));
  const selected = courses.find((c) => c.id === courseId);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div ref={panel} role="dialog" aria-modal="true" aria-labelledby="gpa-title" className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col overflow-y-auto bg-surface p-6 shadow-dropdown">
        <div className="flex items-start justify-between">
          <h2 id="gpa-title" className="text-xl font-extrabold text-ink">GPA simulator</h2>
          <button type="button" onClick={onClose} className="flex size-control items-center justify-center rounded-control hover:bg-surface-muted">
            <Icon name="close" label="Close GPA simulator" />
          </button>
        </div>
        <p className="mt-1 text-nav-sm text-ink-secondary">Estimate how pending assignments change your grades. Estimates only; the registry posts official GPA.</p>

        <label htmlFor="gpa-course" className="mt-5 text-meta font-semibold text-ink-muted">Course</label>
        <select id="gpa-course" value={courseId} onChange={(e) => setCourseId(e.target.value)} className="mt-1 h-11 rounded-control border border-line bg-surface px-3 text-nav-sm text-ink">
          {withPending.map((id) => {
            const c = courses.find((x) => x.id === id)!;
            return <option key={id} value={id}>{c.code} / {c.titleMn}</option>;
          })}
        </select>

        <ul className="mt-5 flex flex-col gap-4">
          {items.map((a) => (
            <li key={a.id} className="rounded-card border border-line p-3">
              <div className="flex justify-between text-nav-sm">
                <span className="text-ink">{a.title}</span>
                <span className="text-ink-muted">{a.weightPercent}% of grade</span>
              </div>
              {a.pointsEarned !== null ? (
                <p className="mt-1 text-meta text-ink-secondary">Graded: {a.pointsEarned}/{a.maxPoints}</p>
              ) : (
                <>
                  <label htmlFor={`g-${a.id}`} className="mt-2 block text-meta text-ink-secondary">
                    If I score <strong className="tabular-nums">{guess[a.id] ?? 80}%</strong>
                  </label>
                  <input id={`g-${a.id}`} type="range" min={0} max={100} value={guess[a.id] ?? 80} onChange={(e) => setGuess({ ...guess, [a.id]: +e.target.value })} className="mt-1 w-full accent-[var(--ufe-brand)]" />
                </>
              )}
            </li>
          ))}
        </ul>
        {pending.length === 0 && <p className="mt-4 text-nav-sm text-ink-muted">No pending items.</p>}

        <div className="mt-6 grid grid-cols-3 gap-3 text-center" aria-live="polite">
          <div className="rounded-card bg-brand-soft p-3"><p className="text-meta text-ink-muted">{selected?.code}</p><p className="text-xl font-extrabold tabular-nums text-brand">{projected.toFixed(1)}% / {letter}</p></div>
          <div className="rounded-card bg-surface-muted p-3"><p className="text-meta text-ink-muted">Term GPA</p><p className="text-xl font-extrabold tabular-nums text-ink">{termGpa(lines).toFixed(2)}</p></div>
          <div className="rounded-card bg-surface-muted p-3"><p className="text-meta text-ink-muted">Cumulative</p><p className="text-xl font-extrabold tabular-nums text-ink">{cumulativeGpa(lines).toFixed(2)}</p></div>
        </div>
      </div>
    </div>
  );
}
