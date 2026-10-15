"use client";

import Link from "next/link";
import { useId } from "react";
import { courseFullName, isInProgress } from "@/lib/course";
import { useI18n } from "@/lib/i18n";
import { Icon } from "../Icon";
import type { CourseListProps } from "../props";

export function CourseList({ courses, query, onQueryChange, inProgressOnly, onInProgressOnlyChange }: CourseListProps) {
  const { t } = useI18n();
  const searchId = useId();
  const switchId = useId();
  const q = query.trim().toLocaleLowerCase();
  const visible = courses
    .filter((c) => !inProgressOnly || isInProgress(c))
    .filter((c) => !q || courseFullName(c).toLocaleLowerCase().includes(q))
    .sort((a, b) => courseFullName(a).localeCompare(courseFullName(b)));

  return (
    <div className="flex min-h-0 flex-col">
      <div className="px-1 pb-1">
        <label htmlFor={searchId} className="sr-only">
          {t("searchCourses")}
        </label>
        <div className="flex h-11 items-center gap-3 rounded-control bg-surface-sunken px-4">
          <Icon name="search" className="size-4 shrink-0 text-ink-secondary" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={t("search")}
            className="min-w-0 flex-1 bg-transparent text-nav-sm text-ink placeholder:text-ink-placeholder focus:outline-none"
          />
        </div>
      </div>

      <div className="mx-1 my-1 flex h-12 items-center gap-3 rounded-control border border-line px-4">
        <button
          id={switchId}
          type="button"
          role="switch"
          aria-checked={inProgressOnly}
          onClick={() => onInProgressOnlyChange(!inProgressOnly)}
          className={`relative h-5 w-9 shrink-0 rounded-pill border-2 transition-colors ${
            inProgressOnly ? "border-brand bg-brand" : "border-ink-muted bg-surface"
          }`}
        >
          <span
            className={`absolute top-1/2 size-3 -translate-y-1/2 rounded-full transition-all ${
              inProgressOnly ? "left-[18px] bg-white" : "left-0.5 bg-ink-muted"
            }`}
          />
        </button>
        <label htmlFor={switchId} className="cursor-pointer text-nav-sm text-ink-secondary">
          {t("inProgressOnly")}
        </label>
      </div>

      <ul className="max-h-64 min-h-40 flex-1 overflow-y-auto overscroll-contain py-1 [scrollbar-width:thin]" aria-label={t("myCourses")}>
        {visible.map((c) => (
          <li key={c.id}>
            <Link
              href={c.href}
              className="flex items-start gap-3 rounded-control px-4 py-2.5 text-nav-sm text-ink-secondary hover:bg-surface-muted"
            >
              <Icon name="course" className="mt-1 size-5 shrink-0" />
              <span className="min-w-0">{courseFullName(c)}</span>
            </Link>
          </li>
        ))}
        {visible.length === 0 && <li className="px-4 py-3 text-nav-sm text-ink-muted">{t("noCourses")}</li>}
      </ul>
    </div>
  );
}
