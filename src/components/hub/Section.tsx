import type { ReactNode } from "react";

export const SAMPLE_NOTE = "Sample data: shows how this section will look once connected to Moodle and the registry.";

export function SampleBadge() {
  return (
    <p className="mx-auto mb-8 max-w-xl rounded-pill bg-surface-warm px-4 py-1.5 text-center text-meta text-ink-secondary">
      {SAMPLE_NOTE}
    </p>
  );
}

export function Card({ title, children, action, className = "" }: { title: string; children: ReactNode; action?: ReactNode; className?: string }) {
  return (
    <section className={`rounded-card border border-line bg-surface p-5 shadow-card ${className}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-card-title text-ink">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-card border border-line bg-surface p-5 shadow-card">
      <p className="text-meta font-semibold uppercase tracking-wide text-ink-muted">{label}</p>
      <p className="mt-1 text-3xl font-extrabold tabular-nums text-ink">{value}</p>
      {hint && <p className="mt-1 text-meta text-ink-muted">{hint}</p>}
    </div>
  );
}

export const fmtDate = (iso: string, opts: Intl.DateTimeFormatOptions = { dateStyle: "medium", timeStyle: "short" }) =>
  new Date(iso).toLocaleString("en-GB", { ...opts, timeZone: "Asia/Ulaanbaatar" });

export const btn =
  "inline-flex h-10 items-center justify-center rounded-button bg-brand px-4 text-button text-ink-inverse hover:bg-brand-hover";
