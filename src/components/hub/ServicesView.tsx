"use client";

import { useState } from "react";
import { lostFound, officeHours, tickets, type TicketStatus } from "@/data/hubSamples";
import { ItemPhoto } from "./ItemPhoto";
import { MainContent } from "../main/MainContent";
import { PageHeader } from "../main/PageHeader";
import { Card, SampleBadge, btn, fmtDate } from "./Section";

const tabs = ["Helpdesk", "Lost & Found", "Office hours"] as const;
const statusLabel: Record<TicketStatus, string> = { OPEN: "Open", IN_PROGRESS: "In progress", WAITING_ON_STUDENT: "Waiting on you", RESOLVED: "Resolved" };
const statusCls: Record<TicketStatus, string> = { OPEN: "bg-brand-soft text-brand", IN_PROGRESS: "bg-grade-c-bg text-grade-c-fg", WAITING_ON_STUDENT: "bg-grade-f-bg text-grade-f-fg", RESOLVED: "bg-grade-a-bg text-grade-a-fg" };

export function ServicesView() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Helpdesk");
  const [booked, setBooked] = useState<Record<string, boolean>>({});
  return (
    <MainContent>
      <PageHeader title="Campus Services" />
      <SampleBadge />
      <div role="tablist" aria-label="Services" className="mb-5 flex gap-2 overflow-x-auto">
        {tabs.map((t) => (
          <button key={t} role="tab" id={`tab-${t}`} aria-selected={tab === t} aria-controls="svc-panel" tabIndex={tab === t ? 0 : -1} onClick={() => setTab(t)}
            onKeyDown={(e) => { const i = tabs.indexOf(tab); if (e.key === "ArrowRight") setTab(tabs[(i + 1) % 3]); if (e.key === "ArrowLeft") setTab(tabs[(i + 2) % 3]); }}
            className={`h-10 shrink-0 rounded-pill px-5 text-nav-sm font-semibold ${tab === t ? "bg-brand text-ink-inverse" : "bg-surface-muted text-ink-secondary"}`}>{t}</button>
        ))}
      </div>
      <div id="svc-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
        {tab === "Helpdesk" && (
          <Card title="My tickets" action={<button type="button" className={btn}>New ticket</button>}>
            <ul className="divide-y divide-line">
              {tickets.map((t) => (
                <li key={t.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <div><p className="text-nav-sm font-semibold text-ink">{t.id} · {t.subject}</p><p className="text-meta text-ink-muted">{t.category} · {t.assignee} · updated {fmtDate(t.updated)}</p></div>
                  <span className={`rounded-pill px-3 py-1 text-meta font-bold ${statusCls[t.status]}`}>{statusLabel[t.status]}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}
        {tab === "Lost & Found" && (
          <Card title="Board" action={<button type="button" className={btn}>Report item</button>}>
            <ul className="grid gap-4 tablet:grid-cols-2">
              {lostFound.map((i) => (
                <li key={i.id} className="rounded-card border border-line p-4">
                  <ItemPhoto art={i.art} label={i.title} />
                  <span className="block h-3" />
                  <p className="text-nav-sm font-semibold text-ink"><span className={`mr-2 rounded-pill px-2 py-0.5 text-meta ${i.kind === "FOUND" ? "bg-grade-a-bg text-grade-a-fg" : "bg-grade-c-bg text-grade-c-fg"}`}>{i.kind.toLowerCase()}</span>{i.title}</p>
                  <p className="mt-1 text-meta text-ink-muted">{i.place} · {i.date} · {i.status}</p>
                  {i.kind === "FOUND" && i.status === "Open" && <button type="button" className="mt-3 text-nav-sm font-semibold text-brand hover:underline">Claim (answer a verification question)</button>}
                </li>
              ))}
            </ul>
          </Card>
        )}
        {tab === "Office hours" && (
          <Card title="Faculty office hours">
            <ul className="divide-y divide-line">
              {officeHours.map((o) => {
                const isBooked = booked[o.id] ?? o.status === "Booked";
                return (
                  <li key={o.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                    <div><p className="text-nav-sm font-semibold text-ink">{o.instructor} · {o.course}</p><p className="text-meta text-ink-muted">{o.day} {o.time} · {o.room}</p></div>
                    <button type="button" aria-pressed={isBooked} onClick={() => setBooked({ ...booked, [o.id]: !isBooked })} className={isBooked ? "h-10 rounded-button border border-brand px-4 text-button text-brand" : btn}>{isBooked ? "Booked · cancel" : "Book"}</button>
                  </li>
                );
              })}
            </ul>
          </Card>
        )}
      </div>
    </MainContent>
  );
}
