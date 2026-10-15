"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Icon } from "../Icon";
import type { SidebarProps } from "../props";
import { CourseList } from "./CourseList";
import { FooterLinks } from "./FooterLinks";
import { NavItem } from "./NavItem";

/**
 * ≥1024 px: fixed column (collapsible from the top-bar toggle).
 * <1024 px: off-canvas modal dialog; Escape or the backdrop closes it and focus
 * returns to the toggle (handled by AppShell).
 */
export function Sidebar({ primaryNav, hubNav, courses, totalEnrolments, activePath, open, onClose }: SidebarProps) {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [inProgressOnly, setInProgressOnly] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023.98px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!(open === true && isMobile)) return;
    panelRef.current?.querySelector<HTMLElement>("a,button,input")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, isMobile, onClose]);

  const modal = open === true && isMobile;
  // null = viewport default: shown from 1024 px, hidden below.
  const visibility = open === null ? "hidden laptop:flex" : open ? "flex" : "hidden";

  return (
    <>
      {modal && <div className="fixed inset-0 z-30 bg-black/40 laptop:hidden" onClick={onClose} aria-hidden="true" />}
      <aside
        ref={panelRef}
        id="ufe-sidebar"
        aria-label="Sidebar"
        role={modal ? "dialog" : undefined}
        aria-modal={modal || undefined}
        className={`${visibility} fixed inset-y-0 left-0 z-40 w-sidebar flex-col gap-4 overflow-y-auto bg-surface-sunken p-gutter laptop:z-10`}
      >
        {modal && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-2 top-2 flex size-control items-center justify-center rounded-control text-ink-secondary hover:bg-surface-muted"
          >
            <Icon name="close" label={t("closeSidebar")} />
          </button>
        )}

        <nav aria-label="Primary" className="rounded-card bg-surface p-1 shadow-panel">
          <ul className="flex flex-col gap-0.5">
            {primaryNav.map((item) => (
              <NavItem key={item.id} item={item} active={activePath === item.href} />
            ))}
          </ul>
        </nav>

        <section aria-labelledby="ufe-mycourses" className="flex min-h-0 flex-col rounded-card bg-surface shadow-panel">
          <div className="p-1">
            <Link
              id="ufe-mycourses"
              href="/"
              className="flex h-nav-item items-center gap-3 rounded-control px-3 text-nav text-ink-secondary hover:bg-surface-muted"
            >
              <Icon name="courses" className="size-5 shrink-0" />
              <span className="flex-1">{t("myCourses")}</span>
              <span className="rounded-button bg-surface-muted px-2 py-0.5 text-meta text-ink">{totalEnrolments}</span>
            </Link>
          </div>
          <div className="flex max-h-[24rem] min-h-0 flex-col px-0.5">
            <CourseList
              courses={courses}
              query={query}
              onQueryChange={setQuery}
              inProgressOnly={inProgressOnly}
              onInProgressOnlyChange={setInProgressOnly}
            />
          </div>
          <FooterLinks
            links={[
              { id: "overview", label: t("courseOverview"), href: "/", icon: "info" },
              { id: "all", label: t("allCourses"), href: "/courses", icon: "arrow-right" },
            ]}
          />
        </section>

        <nav aria-label={t("hubSection")} className="rounded-card bg-surface p-1 shadow-panel">
          <p className="px-3 pb-1 pt-3 text-meta font-semibold uppercase tracking-wide text-ink-muted">
            {t("hubSection")}
          </p>
          <ul className="flex flex-col gap-0.5">
            {hubNav.map((item) => (
              <NavItem key={item.id} item={item} active={activePath === item.href} />
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
