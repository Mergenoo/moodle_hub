"use client";

import { useState } from "react";
import type { Announcement, AnnouncementChannel } from "@/types/hub";
import { MainContent } from "../main/MainContent";
import { PageHeader } from "../main/PageHeader";
import { SampleBadge, fmtDate } from "./Section";

const channels: { id: AnnouncementChannel | "ALL"; label: string }[] = [
  { id: "ALL", label: "All" }, { id: "DEPARTMENT", label: "Department" }, { id: "ACADEMIC_REGISTRY", label: "Academic Registry" }, { id: "STUDENT_EVENTS", label: "Student Events" },
];
const prio = { URGENT: "bg-grade-f-bg text-grade-f-fg", HIGH: "bg-grade-c-bg text-grade-c-fg", NORMAL: "bg-surface-muted text-ink-chip", LOW: "bg-surface-muted text-ink-chip" } as const;

export function NewsView({ announcements }: { announcements: Announcement[] }) {
  const [ch, setCh] = useState<AnnouncementChannel | "ALL">("ALL");
  const [collapsed, setCollapsed] = useState(false);
  const list = announcements.filter((a) => ch === "ALL" || a.channel === ch).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const top = announcements.find((a) => a.priority === "URGENT");
  return (
    <MainContent>
      <PageHeader title="Campus News" />
      <SampleBadge />
      {top && (
        <div className="mb-5 rounded-card border border-grade-f-fg bg-grade-f-bg p-4 text-grade-f-fg">
          <button type="button" aria-expanded={!collapsed} onClick={() => setCollapsed(!collapsed)} className="flex w-full items-center justify-between text-left text-nav font-bold">
            Important notice <span aria-hidden="true">{collapsed ? "＋" : "−"}</span>
          </button>
          {!collapsed && <p className="mt-2 text-nav-sm">{top.titleMn}<br /><span className="opacity-80">{top.titleEn}</span></p>}
        </div>
      )}
      <div role="group" aria-label="Channels" className="mb-5 flex flex-wrap gap-2">
        {channels.map((c) => (
          <button key={c.id} type="button" aria-pressed={ch === c.id} onClick={() => setCh(c.id)} className={`h-9 rounded-pill px-4 text-nav-sm font-semibold ${ch === c.id ? "bg-brand text-ink-inverse" : "bg-surface-muted text-ink-secondary hover:bg-surface-raised"}`}>{c.label}</button>
        ))}
      </div>
      <ul className="flex flex-col gap-3" aria-live="polite">
        {list.map((a) => (
          <li key={a.id} className="rounded-card border border-line bg-surface p-4 shadow-card">
            <div className="mb-1 flex flex-wrap items-center gap-2 text-meta text-ink-muted">
              <span className={`rounded-pill px-2.5 py-0.5 font-semibold ${prio[a.priority]}`}>{a.priority.toLowerCase()}</span>
              <span>{channels.find((c) => c.id === a.channel)?.label}</span><span>·</span><time dateTime={a.publishedAt}>{fmtDate(a.publishedAt)}</time>
            </div>
            <p className="text-nav font-semibold text-ink">{a.titleMn}</p>
            {a.titleEn && <p className="text-nav-sm text-ink-secondary">{a.titleEn}</p>}
          </li>
        ))}
        {list.length === 0 && <li className="py-8 text-center text-ink-muted">No notices in this channel.</li>}
      </ul>
    </MainContent>
  );
}
