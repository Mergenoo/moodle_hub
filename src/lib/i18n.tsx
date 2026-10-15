"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Locale } from "@/types/hub";

/**
 * UI chrome strings. Course titles, term badges and department names are data
 * and are never translated (docs/00-assumptions.md §18).
 */
const messages = {
  en: {
    skipToContent: "Skip to main content",
    siteHome: "Site home",
    dashboard: "Dashboard",
    calendar: "Calendar",
    privateFiles: "Private files",
    myCourses: "My Courses",
    myCoursesTitle: "My courses",
    hubSection: "UFE Hub",
    grades: "Grades & GPA",
    planner: "Planner",
    news: "News",
    services: "Services",
    soon: "Soon",
    search: "Search",
    searchCourses: "Search courses",
    inProgressOnly: "Only courses in progress",
    courseOverview: "Course overview",
    allCourses: "List of all available courses",
    getAccess: "Get access",
    getAccessTo: "Get access to",
    complete: "complete",
    progressOf: "progress",
    grade: "Current grade",
    demoGrade: "sample value",
    noCourses: "No courses match your search.",
    toggleSidebar: "Toggle sidebar",
    closeSidebar: "Close sidebar",
    language: "Language",
    notifications: "Notifications",
    unread: "unread",
    markAllRead: "Mark all as read",
    noNotifications: "You're all caught up.",
    messages: "Messages",
    darkMode: "Dark mode",
    userMenu: "User menu",
    profile: "Profile",
    gradesMenu: "Grades",
    preferences: "Preferences",
    logOut: "Log out",
    instructors: "Instructors",
    comingTitle: "Coming in phase",
    comingBody: "This section is part of the roadmap and is not built in the Phase 1 prototype.",
    backToCourses: "Back to My courses",
    courseTitle: "Course",
    coursePlaceholder: "Course pages stay in Moodle for now. In production this button opens the course on online.ufe.edu.mn.",
  },
  mn: {
    skipToContent: "Үндсэн агуулга руу шилжих",
    siteHome: "Сайтын нүүр",
    dashboard: "Хянах самбар",
    calendar: "Хуанли",
    privateFiles: "Хувийн файлууд",
    myCourses: "Миний хичээлүүд",
    myCoursesTitle: "Миний хичээлүүд",
    hubSection: "UFE Hub",
    grades: "Шалгалтын хуваарь ба голч дүн",
    planner: "Хичээлийн хуваарь / Төлөвлөгөө",
    news: "Албан ёсны мэдээ, зарлал",
    services: "Оюутны үйлчилгээ",
    soon: "Удахгүй",
    search: "Хайх",
    searchCourses: "Хичээл хайх",
    inProgressOnly: "Зөвхөн явагдаж буй хичээлүүд",
    courseOverview: "Хичээлийн тойм",
    allCourses: "Бүх хичээлийн жагсаалт",
    getAccess: "Хичээлд орох",
    getAccessTo: "Хичээлд орох:",
    complete: "гүйцэтгэсэн",
    progressOf: "явц",
    grade: "Одоогийн дүн",
    demoGrade: "жишээ утга",
    noCourses: "Хайлтад тохирох хичээл олдсонгүй.",
    toggleSidebar: "Хажуу цэсийг нээх/хаах",
    closeSidebar: "Хажуу цэсийг хаах",
    language: "Хэл",
    notifications: "Мэдэгдэл",
    unread: "уншаагүй",
    markAllRead: "Бүгдийг уншсан болгох",
    noNotifications: "Шинэ мэдэгдэл алга.",
    messages: "Зурвас",
    darkMode: "Харанхуй горим",
    userMenu: "Хэрэглэгчийн цэс",
    profile: "Профайл",
    gradesMenu: "Дүн",
    preferences: "Тохиргоо",
    logOut: "Гарах",
    instructors: "Багш нар",
    comingTitle: "Хөгжүүлэлтийн үе шат",
    comingBody: "Энэ хэсэг төлөвлөгөөнд багтсан бөгөөд 1-р үе шатын прототипт хараахан хийгдээгүй.",
    backToCourses: "Миний хичээлүүд рүү буцах",
    courseTitle: "Хичээл",
    coursePlaceholder: "Одоогоор хичээлийн хуудас Moodle дээр хэвээр байна. Бодит системд энэ товч online.ufe.edu.mn дээрх хичээлийг нээнэ.",
  },
} as const;

export type MessageKey = keyof (typeof messages)["en"];

interface I18nValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: MessageKey) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ initialLocale, children }: { initialLocale: Locale; children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ufe-locale");
      if (saved === "en" || saved === "mn") setLocaleState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem("ufe-locale", l);
    } catch {}
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: (k) => messages[locale][k] }}>{children}</I18nContext.Provider>
  );
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
