"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useI18n } from "@/lib/i18n";
import type { NotificationDropdownProps } from "../props";

const kindLabel = {
  en: { COURSE_ALERT: "Course", GRADE_POSTED: "Grade", DEADLINE: "Deadline", CAMPUS_NOTICE: "Campus", TICKET_UPDATE: "Helpdesk" },
  mn: { COURSE_ALERT: "Хичээл", GRADE_POSTED: "Дүн", DEADLINE: "Хугацаа", CAMPUS_NOTICE: "Сургууль", TICKET_UPDATE: "Тусламж" },
} as const;

/**
 * One bell for course alerts and campus notices. Disclosure pattern: the
 * trigger has aria-expanded/aria-controls; focus moves to the panel heading on
 * open; Escape closes and returns focus to the bell.
 */
export function NotificationDropdown({ notifications, onMarkAllRead, onClose, open, triggerId }: NotificationDropdownProps) {
  const { t, locale } = useI18n();
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (open) headingRef.current?.focus();
  }, [open]);

  if (!open) return null;
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div
      id={`${triggerId}-panel`}
      role="region"
      aria-labelledby={`${triggerId}-heading`}
      className="absolute right-0 top-[calc(100%+8px)] z-50 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-card border border-line bg-surface shadow-dropdown"
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <h2 id={`${triggerId}-heading`} ref={headingRef} tabIndex={-1} className="text-nav text-ink focus:outline-none">
          {t("notifications")}
          {unread > 0 && (
            <span className="ml-2 text-meta text-ink-muted">
              {unread} {t("unread")}
            </span>
          )}
        </h2>
        {unread > 0 && (
          <button type="button" onClick={onMarkAllRead} className="text-meta font-semibold text-brand hover:underline">
            {t("markAllRead")}
          </button>
        )}
      </div>
      {notifications.length === 0 ? (
        <p className="px-4 py-8 text-center text-nav-sm text-ink-muted">{t("noNotifications")}</p>
      ) : (
        <ul className="max-h-96 overflow-y-auto">
          {notifications.map((n) => (
            <li key={n.id} className="border-b border-line last:border-b-0">
              <Link
                href={n.href ?? "#"}
                onClick={onClose}
                className={`flex gap-3 px-4 py-3 hover:bg-surface-muted ${n.read ? "" : "bg-brand-soft/40"}`}
              >
                <span
                  className={`mt-1.5 size-2 shrink-0 rounded-full ${n.read ? "bg-transparent" : "bg-brand"}`}
                  aria-hidden="true"
                />
                <span className="min-w-0">
                  <span className="block text-meta font-semibold uppercase tracking-wide text-ink-muted">
                    {kindLabel[locale][n.kind]}
                    {!n.read && <span className="sr-only">, {t("unread")}</span>}
                  </span>
                  <span className="block text-nav-sm text-ink">{n.title}</span>
                  {n.body && <span className="block text-meta text-ink-secondary">{n.body}</span>}
                  <time dateTime={n.createdAt} className="mt-0.5 block text-meta text-ink-muted">
                    {new Date(n.createdAt).toLocaleString(locale === "mn" ? "mn-MN" : "en-GB", {
                      dateStyle: "medium",
                      timeStyle: "short",
                      timeZone: "Asia/Ulaanbaatar",
                    })}
                  </time>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
