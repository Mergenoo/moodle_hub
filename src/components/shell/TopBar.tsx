"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { Icon } from "../Icon";
import type { TopBarProps } from "../props";
import { NotificationDropdown } from "./NotificationDropdown";
import { UfeLogo } from "./UfeLogo";
import { useDisclosure } from "./useDisclosure";

const iconButton =
  "relative flex size-control items-center justify-center rounded-control text-ink-secondary transition-colors hover:bg-surface-muted";

export function TopBar({
  student,
  locale,
  onLocaleChange,
  sidebarOpen,
  onToggleSidebar,
  theme,
  onToggleTheme,
  notifications,
  onMarkAllRead,
  unreadMessages,
}: TopBarProps) {
  const { t } = useI18n();
  const bell = useDisclosure();
  const user = useDisclosure();
  const unread = notifications.filter((n) => !n.read).length;
  const nextLocale = locale === "en" ? "mn" : "en";

  return (
    <header className="sticky top-0 z-20 flex h-topbar items-center gap-2 border-b border-line bg-surface px-3 tablet:px-4">
      <button
        type="button"
        onClick={onToggleSidebar}
        aria-controls="ufe-sidebar"
        aria-expanded={sidebarOpen ?? undefined}
        className={`${iconButton} bg-brand-soft text-brand hover:bg-brand-soft`}
      >
        <Icon name="sidebar" label={t("toggleSidebar")} />
      </button>

      <Link href="/" className="mx-2 flex items-center rounded-control px-1 py-1">
        <UfeLogo className="h-6 w-auto" />
      </Link>

      <span className="h-6 w-px bg-line" aria-hidden="true" />

      <button
        type="button"
        onClick={() => onLocaleChange(nextLocale)}
        aria-label={`${t("language")}: ${locale === "en" ? "English" : "Монгол"}. ${
          nextLocale === "mn" ? "Монгол хэл рүү шилжих" : "Switch to English"
        }`}
        className="ml-1 flex h-control items-center gap-2 rounded-control bg-surface-raised px-3 text-meta font-bold text-ink hover:bg-surface-muted"
      >
        <Icon name="flag" className="size-[18px]" />
        <span aria-hidden="true">{locale.toUpperCase()}</span>
      </button>

      <div className="ml-auto flex items-center gap-1 tablet:gap-2">
        <button
          type="button"
          onClick={onToggleTheme}
          aria-pressed={theme === "dark"}
          className={`${iconButton} bg-surface-warm hover:bg-surface-warm`}
        >
          <Icon name={theme === "dark" ? "sun" : "moon"} label={t("darkMode")} />
        </button>

        <div ref={bell.rootRef} className="relative">
          <button
            ref={bell.triggerRef}
            id="ufe-bell"
            type="button"
            aria-expanded={bell.open}
            aria-controls="ufe-bell-panel"
            onClick={() => bell.setOpen(!bell.open)}
            className={iconButton}
          >
            <Icon name="bell" className="size-[22px]" label={`${t("notifications")}${unread ? `, ${unread} ${t("unread")}` : ""}`} />
            {unread > 0 && (
              <span
                className="absolute right-0.5 top-0.5 flex min-w-[18px] items-center justify-center rounded-pill bg-brand px-1 text-[11px] font-bold leading-[18px] text-ink-inverse ring-2 ring-brand-ring"
                aria-hidden="true"
              >
                {unread}
              </span>
            )}
          </button>
          <NotificationDropdown
            open={bell.open}
            triggerId="ufe-bell"
            notifications={notifications}
            onMarkAllRead={onMarkAllRead}
            onClose={() => bell.setOpen(false)}
          />
        </div>

        <Link href="/messages" className={iconButton}>
          <Icon name="chat" className="size-[22px]" label={t("messages")} />
          {unreadMessages > 0 && <span className="absolute right-2 top-2 size-2 rounded-full bg-brand" aria-hidden="true" />}
        </Link>

        <div ref={user.rootRef} className="relative">
          <button
            ref={user.triggerRef}
            type="button"
            aria-expanded={user.open}
            aria-controls="ufe-user-menu"
            onClick={() => user.setOpen(!user.open)}
            className="flex items-center gap-1 rounded-control pr-1 hover:bg-surface-muted"
          >
            <span className="flex size-control items-center justify-center rounded-control border border-line bg-surface text-meta font-extrabold text-ink">
              <span aria-hidden="true">{student.initials}</span>
            </span>
            <Icon name="chevron-down" className="size-3.5 text-ink-muted" />
            <span className="sr-only">
              {t("userMenu")}: {student.name}
            </span>
          </button>
          {user.open && (
            <ul
              id="ufe-user-menu"
              className="absolute right-0 top-[calc(100%+8px)] z-50 w-52 overflow-hidden rounded-card border border-line bg-surface py-1 shadow-dropdown"
            >
              <li className="border-b border-line px-4 py-2.5">
                <p className="text-nav-sm font-semibold text-ink">{student.name}</p>
                <p className="text-meta text-ink-muted">{student.email}</p>
              </li>
              {(
                [
                  ["profile", "/profile"],
                  ["gradesMenu", "/grades"],
                  ["preferences", "/preferences"],
                  ["logOut", "/logout"],
                ] as const
              ).map(([key, href]) => (
                <li key={key}>
                  <Link
                    href={href}
                    onClick={() => user.setOpen(false)}
                    className="block px-4 py-2 text-nav-sm text-ink-secondary hover:bg-surface-muted"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
