"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import type { AppShellProps, NavItemData } from "../props";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

/**
 * Layout: fixed sidebar (288 px) on the left; top bar + main content on the
 * right. Landmarks: header (top bar), aside > nav (sidebar), main.
 */
export function AppShell({ student, courses, totalEnrolments, notifications: initial, children }: Omit<AppShellProps, "activePath">) {
  const { t, locale, setLocale } = useI18n();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState<boolean | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [notifications, setNotifications] = useState(initial);

  useEffect(() => {
    try {
      if (localStorage.getItem("ufe-theme") === "dark") setTheme("dark");
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Close the off-canvas sidebar after navigating on small screens.
  useEffect(() => {
    if (window.matchMedia("(max-width: 1023.98px)").matches) setSidebarOpen(null);
  }, [pathname]);

  const toggleSidebar = () => {
    const mobile = window.matchMedia("(max-width: 1023.98px)").matches;
    setSidebarOpen((prev) => (prev === null ? mobile : !prev));
  };

  const closeSidebar = useCallback(() => {
    setSidebarOpen(null);
    document.querySelector<HTMLButtonElement>('[aria-controls="ufe-sidebar"]')?.focus();
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("ufe-theme", next);
    } catch {}
  };

  const primaryNav: NavItemData[] = [
    { id: "home", label: t("siteHome"), href: "/", icon: "home" },
    { id: "dashboard", label: t("dashboard"), href: "/dashboard", icon: "dashboard" },
    { id: "calendar", label: t("calendar"), href: "/calendar", icon: "calendar" },
    { id: "files", label: t("privateFiles"), href: "/files", icon: "files" },
  ];
  const hubNav: NavItemData[] = [
    { id: "grades", label: t("grades"), href: "/grades", icon: "grades" },
    { id: "planner", label: t("planner"), href: "/planner", icon: "planner" },
    { id: "news", label: t("news"), href: "/news", icon: "news" },
    { id: "services", label: t("services"), href: "/services", icon: "services" },
  ];

  return (
    <div className="min-h-dvh bg-surface">
      <a
        href="#main"
        className="sr-only z-50 rounded-button bg-brand px-4 py-2 text-ink-inverse focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t("skipToContent")}
      </a>
      <Sidebar
        primaryNav={primaryNav}
        hubNav={hubNav}
        courses={courses}
        totalEnrolments={totalEnrolments}
        activePath={pathname}
        open={sidebarOpen}
        onClose={closeSidebar}
      />
      <div className={`flex min-h-dvh flex-col ${sidebarOpen === false ? "" : "laptop:pl-sidebar"}`}>
        <TopBar
          student={student}
          locale={locale}
          onLocaleChange={setLocale}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={toggleSidebar}
          theme={theme}
          onToggleTheme={toggleTheme}
          notifications={notifications}
          onMarkAllRead={() => setNotifications((ns) => ns.map((n) => ({ ...n, read: true })))}
          unreadMessages={0}
        />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
}
