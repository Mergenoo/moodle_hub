"use client";

import { useState } from "react";
import { auditExtra } from "@/data/hubSamples";
import type { DegreeAuditNode, PrerequisiteEdge, TimetableEntry } from "@/types/hub";
import { MainContent } from "../main/MainContent";
import { PageHeader } from "../main/PageHeader";
import { Card, SampleBadge } from "./Section";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const START = 8 * 60, END = 18 * 60, ROW = 48; // px per hour
const typeTint = { LECTURE: "bg-brand-soft text-brand border-brand", LAB: "bg-grade-a-bg text-grade-a-fg border-grade-a-fg", SEMINAR: "bg-grade-c-bg text-grade-c-fg border-grade-c-fg" } as const;
const hm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

function Timetable({ entries }: { entries: TimetableEntry[] }) {
  const [sel, setSel] = useState<TimetableEntry | null>(null);
  const hours = Array.from({ length: (END - START) / 60 }, (_, i) => START / 60 + i);
  return (
    <>
      <div className="overflow-x-auto">
        <div className="grid min-w-[40rem]" style={{ gridTemplateColumns: "3rem repeat(5, 1fr)" }} role="table" aria-label="Weekly timetable">
          <div role="row" className="contents">
            <span role="columnheader" className="sr-only">Time</span>
            {days.map((d) => <span key={d} role="columnheader" className="border-b border-line pb-2 text-center text-meta font-semibold text-ink-muted">{d}</span>)}
          </div>
          <div className="relative" style={{ height: hours.length * ROW }}>
            {hours.map((h, i) => <span key={h} className="absolute right-2 text-meta text-ink-muted" style={{ top: i * ROW - 8 }}>{String(h).padStart(2, "0")}:00</span>)}
          </div>
          {days.map((_, di) => (
            <div key={di} role="cell" className="relative border-l border-line" style={{ height: hours.length * ROW }}>
              {hours.map((h, i) => <span key={h} className="absolute inset-x-0 border-t border-line/60" style={{ top: i * ROW }} />)}
              {entries.filter((e) => e.dayOfWeek === di + 1).map((e) => (
                <button key={e.id} type="button" onClick={() => setSel(e)} aria-pressed={sel?.id === e.id}
                  className={`absolute inset-x-1 overflow-hidden rounded-button border-l-4 p-1.5 text-left text-meta ${typeTint[e.type]}`}
                  style={{ top: ((e.startMinute - START) / 60) * ROW, height: ((e.endMinute - e.startMinute) / 60) * ROW - 2 }}>
                  <strong>{e.courseCode}</strong> {e.type.toLowerCase()}<br />{e.room}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 min-h-5 text-nav-sm text-ink-secondary" aria-live="polite">
        {sel ? `${sel.courseCode} ${sel.type.toLowerCase()} · ${days[sel.dayOfWeek - 1]} ${hm(sel.startMinute)}–${hm(sel.endMinute)} · Room ${sel.room} · ${sel.instructorName}` : "Select a session for details."}
      </p>
    </>
  );
}

const statusStyle = {
  COMPLETED: "border-grade-a-fg bg-grade-a-bg text-grade-a-fg",
  IN_PROGRESS: "border-brand bg-brand-soft text-brand",
  AVAILABLE: "border-line bg-surface text-ink",
  LOCKED: "border-line bg-surface-muted text-ink-muted",
} as const;
const statusText = { COMPLETED: "Completed", IN_PROGRESS: "In progress", AVAILABLE: "Available", LOCKED: "Locked" } as const;

function levelOf(code: string, edges: PrerequisiteEdge[]): number {
  const parents = edges.filter((e) => e.to === code).map((e) => e.from);
  return parents.length ? 1 + Math.max(...parents.map((p) => levelOf(p, edges))) : 0;
}

function Audit({ nodes, edges }: { nodes: DegreeAuditNode[]; edges: PrerequisiteEdge[] }) {
  const lv = new Map(nodes.map((n) => [n.code, levelOf(n.code, edges)]));
  const cols = Math.max(...lv.values()) + 1;
  const W = 150, H = 64, GX = 54, GY = 20;
  const rows = new Map<number, number>();
  const pos = new Map(nodes.map((n) => { const l = lv.get(n.code)!; const r = rows.get(l) ?? 0; rows.set(l, r + 1); return [n.code, { x: l * (W + GX), y: r * (H + GY) }]; }));
  const maxRows = Math.max(...rows.values());
  const width = cols * W + (cols - 1) * GX, height = maxRows * H + (maxRows - 1) * GY;
  return (
    <>
      <div className="overflow-x-auto" aria-hidden="true">
        <svg viewBox={`0 0 ${width} ${height}`} className="mx-auto" style={{ minWidth: width, height }}>
          <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 8 4 0 8z" className="fill-ink-muted" /></marker></defs>
          {edges.map((e) => { const a = pos.get(e.from)!, b = pos.get(e.to)!; return <path key={e.from + e.to} d={`M${a.x + W} ${a.y + H / 2} C ${a.x + W + GX / 2} ${a.y + H / 2}, ${b.x - GX / 2} ${b.y + H / 2}, ${b.x} ${b.y + H / 2}`} className="fill-none stroke-ink-muted" strokeWidth="1.5" markerEnd="url(#arr)" />; })}
          {nodes.map((n) => { const p = pos.get(n.code)!; return (
            <foreignObject key={n.code} x={p.x} y={p.y} width={W} height={H}>
              <div className={`h-full rounded-card border-2 p-2 text-meta ${statusStyle[n.status]}`}><strong>{n.code}</strong> · {n.credits} cr<br />{statusText[n.status]}</div>
            </foreignObject>); })}
        </svg>
      </div>
      {/* Text alternative for screen readers: prerequisites by depth. */}
      <ul className="sr-only">
        {nodes.map((n) => <li key={n.code}>{n.code}, {n.titleMn}, {statusText[n.status]}{edges.filter((e) => e.to === n.code).length ? `, requires ${edges.filter((e) => e.to === n.code).map((e) => e.from).join(", ")}` : ""}</li>)}
      </ul>
    </>
  );
}

export function PlannerView({ timetable, nodes, edges }: { timetable: TimetableEntry[]; nodes: DegreeAuditNode[]; edges: PrerequisiteEdge[] }) {
  const pct = Math.round((auditExtra.creditsEarned / auditExtra.creditsRequired) * 100);
  return (
    <MainContent>
      <PageHeader title="Subject Planner" />
      <SampleBadge />
      <Card title="Weekly timetable"><Timetable entries={timetable} /></Card>
      <Card title="Degree audit" className="mt-5">
        <p className="mb-4 text-nav-sm text-ink-secondary">{auditExtra.creditsEarned} of {auditExtra.creditsRequired} credits ({pct}%)</p>
        <div role="progressbar" aria-label="Degree credits" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} className="mb-6 h-1.5 overflow-hidden rounded-pill bg-progress-track">
          <div className="h-full rounded-pill bg-gradient-to-r from-progress-from to-progress-to" style={{ width: `${pct}%` }} />
        </div>
        <Audit nodes={nodes} edges={edges} />
        <ul className="mt-4 flex flex-wrap gap-2 text-meta">
          {(Object.keys(statusText) as (keyof typeof statusText)[]).map((k) => <li key={k} className={`rounded-pill border px-3 py-1 ${statusStyle[k]}`}>{statusText[k]}</li>)}
        </ul>
      </Card>
    </MainContent>
  );
}
